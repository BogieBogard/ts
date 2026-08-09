/**
 * node-shim.js — a small, faithful-enough implementation of Node's streaming
 * APIs so the streams levels can run in a browser.
 *
 * The goal is that everything you learn here transfers to real Node:
 *   - createReadStream hands you CHUNKS, and chunks split lines in half
 *   - readline stitches those chunks back into whole lines
 *   - `for await...of` pulls one item at a time
 *   - Transform/pipeline/Writable behave the way they do in Node
 *
 * Chunk size is deliberately tiny (64 chars) so the chunk-boundary problem is
 * visible on a small file instead of needing a gigabyte.
 */
(function (global) {
  'use strict';

  var CHUNK_SIZE = 64;

  // ---------------------------------------------------------------- fake files
  // Single-spaced on purpose: split(' ') should be predictable while learning.
  var LOG_LINES = [
    '2026-08-01T00:00:01Z INFO [auth] req=1 request completed',
    '2026-08-01T00:00:02Z ERROR [ingest] req=2 connection reset by peer',
    '2026-08-01T00:00:03Z INFO [router] req=3 cache miss',
    '2026-08-01T00:00:04Z WARN [storage] req=4 disk write latency spike',
    '2026-08-01T00:00:05Z ERROR [ingest] req=5 queue depth exceeded',
    '2026-08-01T00:00:06Z INFO [auth] req=6 token refreshed',
    '2026-08-01T00:00:07Z ERROR [router] req=7 backpressure applied',
    '2026-08-01T00:00:08Z INFO [storage] req=8 request completed'
  ];

  var FILES = {
    'sample.log': LOG_LINES.join('\n') + '\n',
    'small.txt': 'alpha\nbravo\ncharlie\n'
  };

  // ------------------------------------------------------------------ helpers
  function isIterable(o) {
    return o && (typeof o[Symbol.asyncIterator] === 'function' ||
                 typeof o[Symbol.iterator] === 'function');
  }

  // Everything downstream consumes an async iterable, so normalise to one.
  async function* toAsyncIterable(src) {
    if (src && typeof src[Symbol.asyncIterator] === 'function') {
      yield* src;
    } else if (src && typeof src[Symbol.iterator] === 'function') {
      for (var v of src) yield v;
    } else {
      throw new TypeError('Not iterable');
    }
  }

  // -------------------------------------------------------------- Readable
  function Readable(source) {
    this._src = source;          // async iterable
    this._handlers = {};
    this._flowing = false;
  }

  Readable.prototype[Symbol.asyncIterator] = function () {
    return toAsyncIterable(this._src)[Symbol.asyncIterator]();
  };

  Readable.prototype.on = function (event, fn) {
    (this._handlers[event] = this._handlers[event] || []).push(fn);
    // 'data' switches the stream into flowing mode, exactly like Node.
    if (event === 'data' && !this._flowing) {
      this._flowing = true;
      var self = this;
      (async function () {
        try {
          for await (var chunk of toAsyncIterable(self._src)) self._emit('data', chunk);
          self._emit('end');
          self._emit('close');
        } catch (err) {
          self._emit('error', err);
        }
      })();
    }
    return this;
  };

  Readable.prototype.once = Readable.prototype.on;

  Readable.prototype._emit = function (event, arg) {
    var hs = this._handlers[event] || [];
    for (var i = 0; i < hs.length; i++) hs[i](arg);
  };

  Readable.prototype.pipe = function (dest) {
    var self = this;
    dest._pipePromise = (async function () {
      for await (var chunk of toAsyncIterable(self._src)) await dest.write(chunk);
      await dest.end();
      return dest;
    })();
    // A Transform is readable too, so piping into it must return something
    // you can keep piping from.
    return dest;
  };

  Readable.from = function (iterable) {
    return new Readable(iterable);
  };

  // -------------------------------------------------------------- Writable
  function Writable(opts) {
    opts = opts || {};
    if (opts.write) this._write = opts.write;
    this.written = [];            // teaching aid: what this sink received
    this._handlers = {};
  }

  Writable.prototype.write = function (chunk) {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (typeof self._write === 'function') {
        self._write(chunk, 'utf8', function (err) { err ? reject(err) : resolve(); });
      } else {
        self.written.push(chunk);
        resolve();
      }
    });
  };

  Writable.prototype.end = function () {
    var self = this;
    return new Promise(function (resolve, reject) {
      if (typeof self._final === 'function') {
        self._final(function (err) { err ? reject(err) : resolve(); });
      } else resolve();
    });
  };

  Writable.prototype.on = function (event, fn) {
    (this._handlers[event] = this._handlers[event] || []).push(fn);
    return this;
  };

  // -------------------------------------------------------------- Transform
  // Supports both styles Node supports:
  //     callback(null, value)        and        this.push(value); callback();
  function Transform(opts) {
    opts = opts || {};
    if (opts.transform) this._transform = opts.transform;
    if (opts.flush) this._flush = opts.flush;
    this._handlers = {};
  }

  Transform.prototype._runOne = function (chunk) {
    var self = this;
    var out = [];
    self.push = function (v) { if (v !== null && v !== undefined) out.push(v); };
    return new Promise(function (resolve, reject) {
      self._transform(chunk, 'utf8', function (err, val) {
        if (err) return reject(err);
        if (val !== null && val !== undefined) out.push(val);
        resolve(out);
      });
    });
  };

  Transform.prototype._runFlush = function () {
    var self = this;
    var out = [];
    self.push = function (v) { if (v !== null && v !== undefined) out.push(v); };
    if (typeof self._flush !== 'function') return Promise.resolve(out);
    return new Promise(function (resolve, reject) {
      self._flush(function (err, val) {
        if (err) return reject(err);
        if (val !== null && val !== undefined) out.push(val);
        resolve(out);
      });
    });
  };

  // Applying a Transform to a source yields a new async iterable.
  Transform.prototype._apply = function (source) {
    var self = this;
    return (async function* () {
      for await (var chunk of toAsyncIterable(source)) {
        var outs = await self._runOne(chunk);
        for (var i = 0; i < outs.length; i++) yield outs[i];
      }
      var tail = await self._runFlush();
      for (var j = 0; j < tail.length; j++) yield tail[j];
    })();
  };

  // ------------------------------------------------------------- pipeline
  // pipeline(source, ...transforms, destination) -> Promise
  // Accepts Transforms, async generator functions, and a final Writable.
  function pipeline() {
    var stages = Array.prototype.slice.call(arguments);
    return (async function () {
      var current = stages[0];
      if (current instanceof Readable) current = current._src;

      for (var i = 1; i < stages.length; i++) {
        var stage = stages[i];
        var isLast = i === stages.length - 1;

        if (stage instanceof Transform) {
          current = stage._apply(current);
        } else if (typeof stage === 'function') {
          current = stage(toAsyncIterable(current));
        } else if (stage instanceof Writable) {
          if (!isLast) throw new TypeError('A Writable must be the last stage');
          for await (var chunk of toAsyncIterable(current)) await stage.write(chunk);
          await stage.end();
          return stage;
        } else if (isIterable(stage)) {
          current = stage;
        } else {
          throw new TypeError('Unsupported pipeline stage at position ' + i);
        }
      }
      // No Writable at the end — drain so side effects still run.
      var out = [];
      for await (var c of toAsyncIterable(current)) out.push(c);
      return out;
    })();
  }

  // -------------------------------------------------------------------- fs
  function createReadStream(path, encoding) {
    var name = String(path).split('/').pop();
    var content = FILES[name];
    if (content === undefined) {
      return new Readable((async function* () {
        throw Object.assign(new Error("ENOENT: no such file or directory, open '" + path + "'"), { code: 'ENOENT' });
      })());
    }
    return new Readable((async function* () {
      for (var i = 0; i < content.length; i += CHUNK_SIZE) {
        yield content.slice(i, i + CHUNK_SIZE);
      }
    })());
  }

  // -------------------------------------------------------------- readline
  // The whole point of this module: turn chunks back into whole lines.
  function createInterface(opts) {
    var input = opts && opts.input;
    if (!input) throw new TypeError('createInterface requires { input }');

    var iface = {
      _closed: false,
      close: function () { this._closed = true; },
      on: function (event, fn) {
        if (event === 'line') {
          var self = this;
          (async function () {
            for await (var line of self) fn(line);
            (self._onClose || function () {})();
          })();
        } else if (event === 'close') {
          this._onClose = fn;
        }
        return this;
      }
    };

    iface[Symbol.asyncIterator] = function () {
      return (async function* () {
        var buffer = '';
        for await (var chunk of toAsyncIterable(input)) {
          buffer += chunk;
          var idx;
          // A chunk can end mid-line, so only emit up to the last newline
          // and carry the remainder into the next chunk.
          while ((idx = buffer.indexOf('\n')) !== -1) {
            var line = buffer.slice(0, idx);
            buffer = buffer.slice(idx + 1);
            if (line.endsWith('\r')) line = line.slice(0, -1);
            yield line;
          }
        }
        if (buffer.length > 0) yield buffer;   // final line with no trailing \n
      })();
    };

    return iface;
  }

  // ---------------------------------------------------------------- require
  var MODULES = {
    fs: { createReadStream: createReadStream, __files: FILES },
    readline: { createInterface: createInterface },
    stream: { Readable: Readable, Writable: Writable, Transform: Transform, pipeline: pipeline },
    'stream/promises': { pipeline: pipeline }
  };

  global.require = function (name) {
    var key = String(name).replace(/^node:/, '');
    if (!MODULES[key]) throw new Error("Cannot find module '" + name + "'");
    return MODULES[key];
  };

  // Exposed so levels and tests can reach them directly.
  global.NodeShim = {
    Readable: Readable,
    Writable: Writable,
    Transform: Transform,
    pipeline: pipeline,
    createReadStream: createReadStream,
    createInterface: createInterface,
    FILES: FILES,
    LOG_LINES: LOG_LINES,
    CHUNK_SIZE: CHUNK_SIZE
  };
})(window);
