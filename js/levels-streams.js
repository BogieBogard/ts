/**
 * Node streams, in 14 steps.
 *
 * Built around the problem log pipelines actually care about: reading a log file
 * that's too big to hold in memory. Levels 1-2 show why the obvious approach
 * breaks, 3-4 fix it, 5-9 drill the loop, 10-14 cover composition.
 *
 * Every level runs against a fake `sample.log` with 8 lines:
 *   4 INFO, 3 ERROR, 1 WARN across 4 services (auth, ingest, router, storage).
 */

// Shared preamble so levels don't repeat the require lines.
var REQ = "const fs = require('node:fs');\n" +
  "const readline = require('node:readline');\n\n";

var ASYNC_OPEN = "const result = (async () => {\n";
var ASYNC_CLOSE = "\n})();";

var levels = [
  // ---------------------------------------------------------------- 1
  {
    name: 'a stream gives you chunks',
    instructions: {
      'en': "<p>Reading a whole file into memory works until the file is bigger than memory. A <strong>stream</strong> hands you the file in small pieces instead, so you never hold more than one piece at a time.</p>" +
        "<p><code>fs.createReadStream(path, 'utf8')</code> opens the file but reads nothing yet. You can loop over it with <code>for await...of</code> to get the pieces, called <strong>chunks</strong>.</p>" +
        "<p>Push every chunk into <code>chunks</code>, then return how many there were.</p>" +
        "<p><em>Hint: the loop body is one line, then <code>return chunks.length;</code></em></p>"
    },
    input: null,
    expected: 8,
    before: REQ + ASYNC_OPEN + "  const stream = fs.createReadStream('sample.log', 'utf8');\n  const chunks = [];\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 6,
    mdn: 'https://nodejs.org/api/fs.html#fscreatereadstreampath-options',
    mdnName: 'fs.createReadStream()',
    solution: "for await (const chunk of stream) chunks.push(chunk);\n  return chunks.length;"
  },

  // ---------------------------------------------------------------- 2
  {
    name: 'chunks are not lines',
    instructions: {
      'en': "<p>Here's the catch. A chunk is just a fixed number of characters — it has no idea where lines start or end. So a chunk boundary usually lands <strong>in the middle of a line</strong>.</p>" +
        "<p>That's why you can't just check each chunk for the text you want: you'd get half-lines and miss matches that straddle a boundary.</p>" +
        "<p>Prove it. Count how many chunks do <strong>not</strong> end with a newline character (<code>'\\n'</code>). Use <code>chunk.endsWith('\\n')</code>.</p>"
    },
    input: null,
    expected: 7,
    before: REQ + ASYNC_OPEN + "  const stream = fs.createReadStream('sample.log', 'utf8');\n  let brokenChunks = 0;\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 7,
    mdn: 'https://nodejs.org/api/stream.html#readable-streams',
    mdnName: 'Readable streams',
    solution: "for await (const chunk of stream) {\n    if (!chunk.endsWith('\\n')) brokenChunks++;\n  }\n  return brokenChunks;"
  },

  // ---------------------------------------------------------------- 3
  {
    name: 'readline stitches them back',
    instructions: {
      'en': "<p>Node ships a module that solves the chunk-boundary problem for you: <code>readline</code>. You give it a stream, and it gives you whole lines.</p>" +
        "<p><code>readline.createInterface({ input: someStream })</code> — note the curly braces. It takes <strong>one</strong> argument, and that argument is a settings object.</p>" +
        "<p>Build the interface over the file stream and return how many whole lines there are.</p>"
    },
    input: null,
    expected: 8,
    before: REQ + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  let lineCount = 0;\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 6,
    mdn: 'https://nodejs.org/api/readline.html#readlinepromisescreateinterfaceoptions',
    mdnName: 'readline.createInterface()',
    solution: "for await (const line of rl) lineCount++;\n  return lineCount;"
  },

  // ---------------------------------------------------------------- 4
  {
    name: 'collect the lines',
    instructions: {
      'en': "<p><code>for await...of</code> is the only genuinely new syntax here. A plain <code>for...of</code> loops over things that are already in memory. <code>for await...of</code> loops over things that <strong>arrive over time</strong> — like lines coming off a disk.</p>" +
        "<p>The <code>await</code> means \"pause here until the next one shows up.\" It only works inside an <code>async</code> function, which is why every level is wrapped in one.</p>" +
        "<p>Collect all 8 lines into the <code>lines</code> array and return it.</p>"
    },
    input: null,
    expected: [
      '2026-08-01T00:00:01Z INFO [auth] req=1 request completed',
      '2026-08-01T00:00:02Z ERROR [ingest] req=2 connection reset by peer',
      '2026-08-01T00:00:03Z INFO [router] req=3 cache miss',
      '2026-08-01T00:00:04Z WARN [storage] req=4 disk write latency spike',
      '2026-08-01T00:00:05Z ERROR [ingest] req=5 queue depth exceeded',
      '2026-08-01T00:00:06Z INFO [auth] req=6 token refreshed',
      '2026-08-01T00:00:07Z ERROR [router] req=7 backpressure applied',
      '2026-08-01T00:00:08Z INFO [storage] req=8 request completed'
    ],
    before: REQ + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  const lines = [];\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 6,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of',
    mdnName: 'for await...of',
    solution: "for await (const line of rl) lines.push(line);\n  return lines;"
  },

  // ---------------------------------------------------------------- 5
  {
    name: 'filter as you go',
    instructions: {
      'en': "<p>This is the shape of nearly every real log task: read a line, decide whether you care, move on. You never build up the whole file.</p>" +
        "<p>Return only the lines containing <code>'ERROR'</code>. Use <code>line.includes('ERROR')</code>.</p>" +
        "<p><em>Aside worth knowing: <code>includes</code> and <code>indexOf</code> run roughly 2-3x faster than a regular expression. On a hot path processing terabytes, that matters.</em></p>"
    },
    input: null,
    expected: [
      '2026-08-01T00:00:02Z ERROR [ingest] req=2 connection reset by peer',
      '2026-08-01T00:00:05Z ERROR [ingest] req=5 queue depth exceeded',
      '2026-08-01T00:00:07Z ERROR [router] req=7 backpressure applied'
    ],
    before: REQ + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  const hits = [];\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 7,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes',
    mdnName: 'String.prototype.includes()',
    solution: "for await (const line of rl) {\n    if (line.includes('ERROR')) hits.push(line);\n  }\n  return hits;"
  },

  // ---------------------------------------------------------------- 6
  {
    name: 'pull out a field',
    instructions: {
      'en': "<p>A log line here looks like:</p><p><code>2026-08-01T00:00:01Z INFO [auth] req=1 request completed</code></p>" +
        "<p>Split on spaces and the level is at index <code>1</code>: <code>line.split(' ')[1]</code>.</p>" +
        "<p>Return an array of just the level of every line — 8 entries.</p>"
    },
    input: null,
    expected: ['INFO', 'ERROR', 'INFO', 'WARN', 'ERROR', 'INFO', 'ERROR', 'INFO'],
    before: REQ + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  const levelsFound = [];\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 7,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    mdnName: 'String.prototype.split()',
    solution: "for await (const line of rl) {\n    levelsFound.push(line.split(' ')[1]);\n  }\n  return levelsFound;"
  },

  // ---------------------------------------------------------------- 7
  {
    name: 'tally into an object',
    instructions: {
      'en': "<p>Counting is the other half of most log work. Instead of collecting into an array, you tally into an object.</p>" +
        "<p>The idiom: <code>counts[key] = (counts[key] || 0) + 1;</code> — take the current count, or 0 if we've never seen this key, add one, store it back.</p>" +
        "<p>Return a tally of how many lines have each level. Expected: <code>{ INFO: 4, ERROR: 3, WARN: 1 }</code></p>"
    },
    input: null,
    expected: { INFO: 4, ERROR: 3, WARN: 1 },
    before: REQ + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  const counts = {};\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 8,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_objects',
    mdnName: 'Working with objects',
    solution: "for await (const line of rl) {\n    const lvl = line.split(' ')[1];\n    counts[lvl] = (counts[lvl] || 0) + 1;\n  }\n  return counts;"
  },

  // ---------------------------------------------------------------- 8
  {
    name: 'stop early with break',
    instructions: {
      'en': "<p>If you only need the <strong>first</strong> few matches, stop reading as soon as you have them. <code>break</code> exits the loop immediately — and with a stream, that means you never read the rest of the file.</p>" +
        "<p>On a 10GB log where the match is on line 3, this is the difference between instant and thirty seconds.</p>" +
        "<p>Return the first <strong>2</strong> ERROR lines.</p>"
    },
    input: null,
    expected: [
      '2026-08-01T00:00:02Z ERROR [ingest] req=2 connection reset by peer',
      '2026-08-01T00:00:05Z ERROR [ingest] req=5 queue depth exceeded'
    ],
    before: REQ + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  const hits = [];\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 9,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/break',
    mdnName: 'break',
    solution: "for await (const line of rl) {\n    if (line.includes('ERROR')) {\n      hits.push(line);\n      if (hits.length === 2) break;\n    }\n  }\n  return hits;"
  },

  // ---------------------------------------------------------------- 9
  {
    name: 'the rolling window',
    instructions: {
      'en': "<p>Now the opposite: the <strong>last</strong> N matches. You can't know which are last until you reach the end, so you must read the whole file — but you never have to hold more than N.</p>" +
        "<p>Push each match on, and if the array is too long, drop the oldest with <code>shift()</code>. <code>push</code> adds to the back, <code>shift</code> removes from the front.</p>" +
        "<p>Return the last <strong>2</strong> ERROR lines. Memory used: 2 lines, no matter how big the file.</p>"
    },
    input: null,
    expected: [
      '2026-08-01T00:00:05Z ERROR [ingest] req=5 queue depth exceeded',
      '2026-08-01T00:00:07Z ERROR [router] req=7 backpressure applied'
    ],
    before: REQ + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  const hits = [];\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 9,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift',
    mdnName: 'Array.prototype.shift()',
    solution: "for await (const line of rl) {\n    if (line.includes('ERROR')) {\n      hits.push(line);\n      if (hits.length > 2) hits.shift();\n    }\n  }\n  return hits;"
  },

  // ---------------------------------------------------------------- 10
  {
    name: 'Readable.from',
    instructions: {
      'en': "<p>Streams don't have to come from files. <code>Readable.from(array)</code> turns anything iterable into a stream, which is how you test stream code without touching a disk.</p>" +
        "<p>From here on we'll use it so the data is easy to see.</p>" +
        "<p>Make a stream from <code>['a', 'b', 'c']</code> and return the items it produces, uppercased.</p>"
    },
    input: null,
    expected: ['A', 'B', 'C'],
    before: "const { Readable } = require('node:stream');\n\n" + ASYNC_OPEN + "  const source = Readable.from(['a', 'b', 'c']);\n  const out = [];\n\n  ",
    after: ASYNC_CLOSE,
    codeLines: 7,
    mdn: 'https://nodejs.org/api/stream.html#streamreadablefromiterable-options',
    mdnName: 'Readable.from()',
    solution: "for await (const item of source) {\n    out.push(item.toUpperCase());\n  }\n  return out;"
  },

  // ---------------------------------------------------------------- 11
  {
    name: 'a Transform stream',
    instructions: {
      'en': "<p>So far you've done the work inside a loop. A <strong>Transform</strong> packages that work into a reusable piece you can drop into a pipeline — this is exactly how a log-pipeline processing function is shaped.</p>" +
        "<p>A Transform takes <code>{ transform(chunk, encoding, callback) { ... } }</code>. You call <code>callback(null, newValue)</code> to emit a value.</p>" +
        "<p>Fill in the transform body so each item comes out uppercased.</p>"
    },
    input: null,
    expected: ['A', 'B', 'C'],
    before: "const { Readable, Transform, pipeline } = require('node:stream');\n\n" + ASYNC_OPEN + "  const upper = new Transform({\n    transform(chunk, encoding, callback) {\n      ",
    after: "\n    }\n  });\n\n  return await pipeline(Readable.from(['a', 'b', 'c']), upper);" + ASYNC_CLOSE,
    codeLines: 4,
    mdn: 'https://nodejs.org/api/stream.html#implementing-a-transform-stream',
    mdnName: 'Transform streams',
    solution: "callback(null, chunk.toUpperCase());"
  },

  // ---------------------------------------------------------------- 12
  {
    name: 'push zero or many',
    instructions: {
      'en': "<p><code>callback(null, value)</code> emits exactly one value. But a Transform can emit <strong>none</strong> or <strong>several</strong> — that's how filtering and splitting work.</p>" +
        "<p>Use <code>this.push(value)</code> as many times as you like, then call <code>callback()</code> with no value. Push nothing at all and the item is dropped.</p>" +
        "<p>Emit each item <strong>twice</strong>. Input <code>['a','b']</code> should come out as <code>['a','a','b','b']</code>.</p>"
    },
    input: null,
    expected: ['a', 'a', 'b', 'b'],
    before: "const { Readable, Transform, pipeline } = require('node:stream');\n\n" + ASYNC_OPEN + "  const twice = new Transform({\n    transform(chunk, encoding, callback) {\n      ",
    after: "\n    }\n  });\n\n  return await pipeline(Readable.from(['a', 'b']), twice);" + ASYNC_CLOSE,
    codeLines: 5,
    mdn: 'https://nodejs.org/api/stream.html#transform_transformchunk-encoding-callback',
    mdnName: 'transform._transform()',
    solution: "this.push(chunk);\n      this.push(chunk);\n      callback();"
  },

  // ---------------------------------------------------------------- 13
  {
    name: 'pipeline',
    instructions: {
      'en': "<p><code>pipeline(source, ...stages)</code> wires stages together and — the important part — propagates errors and cleans up if any stage fails. Hand-wiring with <code>.pipe()</code> leaks file handles when something throws. Always reach for <code>pipeline</code>.</p>" +
        "<p>A stage can also be a plain <strong>async generator</strong>, which is often clearer than a Transform.</p>" +
        "<p>Build a pipeline over the log file that keeps only ERROR lines and returns the service name of each. Expected: <code>[\"ingest\", \"ingest\", \"router\"]</code></p>" +
        "<p><em>The service is in brackets at index 2. <code>line.split(' ')[2]</code> gives <code>'[ingest]'</code> — strip the brackets with <code>.slice(1, -1)</code>.</em></p>"
    },
    input: null,
    expected: ['ingest', 'ingest', 'router'],
    before: REQ + "const { pipeline } = require('node:stream/promises');\n\n" + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n\n  return await pipeline(rl, async function* (lines) {\n    ",
    after: "\n  });" + ASYNC_CLOSE,
    codeLines: 6,
    mdn: 'https://nodejs.org/api/stream.html#streampipelinesource-transforms-destination-options',
    mdnName: 'stream.pipeline()',
    solution: "for await (const line of lines) {\n      if (line.includes('ERROR')) yield line.split(' ')[2].slice(1, -1);\n    }"
  },

  // ---------------------------------------------------------------- 14
  {
    name: 'the whole thing',
    instructions: {
      'en': "<p>Everything at once, and close to a real log-pipeline task: read a log too big for memory, drop what you don't need, and summarise the rest.</p>" +
        "<p>A <strong>Writable</strong> is the end of a pipeline — the sink. This one collects whatever it receives into <code>sink.written</code>.</p>" +
        "<p>Write the generator stage so the pipeline keeps only <strong>ERROR</strong> lines and yields the <strong>service name</strong>. Then return a tally of the sink's contents.</p>" +
        "<p>Expected: <code>{ ingest: 2, router: 1 }</code></p>"
    },
    input: null,
    expected: { ingest: 2, router: 1 },
    before: REQ + "const { Writable } = require('node:stream');\nconst { pipeline } = require('node:stream/promises');\n\n" + ASYNC_OPEN + "  const rl = readline.createInterface({\n    input: fs.createReadStream('sample.log', 'utf8')\n  });\n  const sink = new Writable();\n\n  await pipeline(rl, async function* (lines) {\n    ",
    after: "\n  }, sink);\n\n  const counts = {};\n  for (const svc of sink.written) counts[svc] = (counts[svc] || 0) + 1;\n  return counts;" + ASYNC_CLOSE,
    codeLines: 6,
    mdn: 'https://nodejs.org/api/stream.html#implementing-a-writable-stream',
    mdnName: 'Writable streams',
    solution: "for await (const line of lines) {\n      if (line.includes('ERROR')) yield line.split(' ')[2].slice(1, -1);\n    }"
  }
];

var levelWin = {
  name: 'win',
  instructions: {
    'en': "<p>That's all 14. 🎉</p>" +
      "<p>You can now read a file too big for memory, turn chunks back into lines, filter and tally as you go, stop early, keep a rolling window, and compose the whole thing with <code>Transform</code> and <code>pipeline</code>.</p>" +
      "<p>The one sentence to say out loud in an interview: <em>\"How big can this file get? If it's large I'll stream it line by line rather than read the whole thing into memory.\"</em></p>"
  },
  before: '',
  after: ''
};
