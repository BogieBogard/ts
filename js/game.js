var game = {
  colorblind: (localStorage.colorblind && JSON.parse(localStorage.colorblind)) || 'false',
  language: window.location.hash.substring(1) || 'en',
  difficulty: 'easy',
  level: parseInt(localStorage.level, 10) || 0,
  answers: (localStorage.answers && JSON.parse(localStorage.answers)) || {},
  solved: (localStorage.solved && JSON.parse(localStorage.solved)) || [],
  changed: false,
  clickedCode: null,

  start: function() {
    // navigator.language can include '-'
    // ref: https://developer.mozilla.org/en-US/docs/Web/API/NavigatorLanguage/language
    var requestLang = window.navigator.language.split('-')[0];
    if (window.location.hash === '' && requestLang !== 'en' && messages.languageActive.hasOwnProperty(requestLang)) {
      game.language = requestLang;
      window.location.hash = requestLang;
    }

    game.translate();
    $('#level-counter .total').text(levels.length);
    $('#editor').show();
    $('#share').hide();
    $('#language').val(game.language);
    $('input[value="' + game.colorblind + '"]', '#colorblind').prop('checked', true);

    this.setHandlers();
    this.loadMenu();
    game.loadLevel(levels[game.level]);
  },

  setHandlers: function() {
    $('#next').on('click', function() {
      $('#code').focus();

      if ($(this).hasClass('disabled')) {
        if (!$('.frog').hasClass('animated')) {
          game.tryagain();
        }

        return;
      }

      $(this).removeClass('animated animation');
      $('.frog').addClass('animated bounceOutUp');
      $('.arrow, #next').addClass('disabled');

      setTimeout(function() {
        if (game.level >= levels.length - 1) {
          game.win();
        } else {
          game.next();
        }
      }, 2000);
    });

    $('#code').on('keydown', function(e) {
      if (e.keyCode === 13) {

        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          game.check();
          $('#next').click();
          return;
        }

        var max = $(this).data('lines');
        var code = $(this).val();
        var trim = code.trim();
        var codeLength = code.split('\n').length;
        var trimLength = trim.split('\n').length;

        if (codeLength >= max) {

          if (codeLength === trimLength) {
            e.preventDefault();
            $('#next').click();
          } else {
            $('#code').focus().val('').val(trim);
          }
        }
      }
    }).on('input', game.debounce(game.check, 500))
    .on('input', function() {
      game.changed = true;
      $('#next').removeClass('animated animation').addClass('disabled');
      game.highlightSyntax();
    })
    .on('scroll', function() {
      var scrollTop = $(this).scrollTop();
      var scrollLeft = $(this).scrollLeft();
      $('#code-highlight').css({
        'transform': 'translate(' + (-scrollLeft) + 'px, ' + (-scrollTop) + 'px)'
      });
    });

    $('#editor').on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
      $(this).removeClass();
    });

    $('#labelReset').on('click', function() {
      var warningReset = messages.warningReset[game.language] || messages.warningReset.en;
      var r = confirm(warningReset);

      if (r) {
        game.level = 0;
        game.answers = {};
        game.solved = [];
        game.loadLevel(levels[0]);

        $('.level-marker').removeClass('solved');
      }
    });


    $('#language').on('change', function() {
      window.location.hash = $(this).val();
    });

    $('#difficulty').on('change', function() {
      game.difficulty = $('input:checked', '#difficulty').val();

      // setting height will prevent a slight jump when the animation starts
      var $instructions = $('#instructions');
      var height = $instructions.height();
      $instructions.css('height', height);

      var $markers = $('.level-marker');

      if (game.difficulty == 'hard' || game.difficulty == 'medium') {
        $instructions.slideUp();

        $markers.each(function() {
          var $marker = $(this);
          if ($marker[0].hasAttribute('title')) {
            $marker.attr('data-title', $marker.attr('title'));
            $marker.removeAttr('title');
          }
        });
      } else {
        $instructions.css('height', '').slideDown();

        $markers.each(function() {
          var $marker = $(this);
          if ($marker[0].hasAttribute('data-title')) {
            $marker.attr('title', $marker.attr('data-title'));
            $marker.removeAttr('data-title');
          }
        });
      }
    });

    $('#colorblind').on('change', function() {
      game.colorblind = $('input:checked', '#colorblind').val();

      if (game.colorblind == 'true') {
        $('.lilypad, .frog').addClass('cb-friendly');
      } else {
        $('.lilypad, .frog').removeClass('cb-friendly');
      }
    });

    $('body').on('click', function() {
      $('.tooltip').hide();
      clickedCode = null;
    });

    $('.tooltip, .toggle, #level-indicator').on('click', function(e) {
      e.stopPropagation();
    });

    $(window).on('beforeunload', function() {
      game.saveAnswer();
      localStorage.setItem('level', game.level);
      localStorage.setItem('answers', JSON.stringify(game.answers));
      localStorage.setItem('solved', JSON.stringify(game.solved));
      localStorage.setItem('colorblind', JSON.stringify(game.colorblind));
    }).on('hashchange', function() {
      game.language = window.location.hash.substring(1) || 'en';
      game.translate();

      $('#tweet iframe').remove();
      var html = '<a href="https://twitter.com/share" class="twitter-share-button"{count} data-url="https://flexboxfroggy.com" data-via="thomashpark">Tweet</a> ' +
                 '<a href="https://twitter.com/thomashpark" class="twitter-follow-button" data-show-count="false">Follow @thomashpark</a>';
      $('#tweet').html(html);

      if (typeof twttr !== 'undefined') {
        twttr.widgets.load();
      }

      if (game.language === 'en') {
        history.replaceState({}, document.title, './');
      }
    });
  },

  prev: function() {
    this.level--;

    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  next: function() {
    if (this.difficulty === "hard") {
      this.level = Math.floor(Math.random()* levels.length)
    } else {
      this.level++
    }

    var levelData = levels[this.level];
    this.loadLevel(levelData);
  },

  loadMenu: function() {
    levels.forEach(function(level, i) {
      var levelMarker = $('<span/>').addClass('level-marker').attr({'data-level': i, 'title': level.name}).text(i+1);

      if ($.inArray(level.name, game.solved) !== -1) {
        levelMarker.addClass('solved');
      }

      levelMarker.appendTo('#levels');
    });

    $('.level-marker').on('click', function() {
      game.saveAnswer();

      var level = $(this).attr('data-level');
      game.level = parseInt(level, 10);
      game.loadLevel(levels[level]);
    });

    $('#level-indicator').on('click', function() {
      $('#levelsWrapper').toggle();
      $('#instructions .tooltip').remove();
    });

    $('.arrow.left').on('click', function() {
      if ($(this).hasClass('disabled')) {
        return;
      }

      game.saveAnswer();
      game.prev();
    });

    $('.arrow.right').on('click', function() {
      if ($(this).hasClass('disabled')) {
        return;
      }

      game.saveAnswer();
      game.next();
    });
  },

  loadLevel: function(level) {
    $('#editor').show();
    $('#share').hide();
    $('#background, #pond').removeClass('wrap').attr('style', '').empty();
    $('#levelsWrapper').hide();
    $('.level-marker').removeClass('current').eq(this.level).addClass('current');
    $('#level-counter .current').text(this.level + 1);
    $('#before').text(level.before.replace(/\n\s+/g, '\n'));
    $('#after').text(level.after.replace(/\n\s+/g, '\n'));
    $('#next').removeClass('animated animation').addClass('disabled');

    var instructions = level.instructions[game.language] || level.instructions.en;
    $('#instructions').html(instructions);

    $('.arrow.disabled').removeClass('disabled');

    if (this.level === 0) {
      $('.arrow.left').addClass('disabled');
    }

    if (this.level === levels.length - 1) {
      $('.arrow.right').addClass('disabled');
    }

    var answer = game.answers[level.name];
    $('#code').val(answer).focus();
    game.highlightSyntax();

    this.loadDocs();

    var lines = level.codeLines || 5;
    $('#code').height(20 * lines).data("lines", lines);
    game.highlightSyntax();

    // Display input array and expected output
    var displayHtml = '<div class="code-result">';
    
    if (level.input) {
      displayHtml += '<div class="input-array"><strong>Input Array:</strong> <code>' + JSON.stringify(level.input) + '</code></div>';
    }
    
    if (level.expected) {
      displayHtml += '<div class="expected-array"><strong>Expected Output:</strong> <code>' + JSON.stringify(level.expected) + '</code></div>';
    }
    
    displayHtml += '</div>';
    $('#pond').html(displayHtml);
    $('#background').html(''); // Clear background
    
    // Remove level classes and add appropriate one
    $('#background').removeClass('level-early level-mid level-advanced level-expert');
    var levelClass = 'level-early';
    if (this.level >= levels.length * 0.75) {
      levelClass = 'level-expert';
    } else if (this.level >= levels.length * 0.5) {
      levelClass = 'level-advanced';
    } else if (this.level >= levels.length * 0.25) {
      levelClass = 'level-mid';
    }
    $('#background').addClass(levelClass);
    
    // Add floating particles for visual effect
    game.createPondParticles();
    game.createPondBubbles();
    game.createFlowLines();

    // Update MDN link
    if (level.mdn) {
      $('#mdnLink').attr('href', level.mdn).text(level.mdnName || 'MDN Documentation').show();
      $('#gridGarden').show();
    } else {
      $('#mdnLink').hide();
      $('#gridGarden').hide();
    }

    game.changed = false;
    game.executeCode();
    game.check();
  },

  createPondParticles: function() {
    // Remove existing particles
    $('.pond-particle').remove();
    
    // Different types of code-like symbols
    var bracketSymbols = ['[', ']', '{', '}', '()'];
    var arrowSymbols = ['=>', '->', '→'];
    var dotSymbols = ['...', '·', '•'];
    var numberSymbols = ['1', '2', '3', '0', '[]', '{}'];
    
    var particleCount = 12;
    
    for (var i = 0; i < particleCount; i++) {
      var type = Math.random();
      var symbol, className;
      
      if (type < 0.3) {
        symbol = bracketSymbols[Math.floor(Math.random() * bracketSymbols.length)];
        className = 'bracket';
      } else if (type < 0.5) {
        symbol = arrowSymbols[Math.floor(Math.random() * arrowSymbols.length)];
        className = 'arrow';
      } else if (type < 0.7) {
        symbol = dotSymbols[Math.floor(Math.random() * dotSymbols.length)];
        className = 'dot';
      } else {
        symbol = numberSymbols[Math.floor(Math.random() * numberSymbols.length)];
        className = 'number';
      }
      
      var particle = $('<div class="pond-particle ' + className + '">' + symbol + '</div>');
      
      // Random starting position
      var startX = Math.random() * 100;
      var delay = Math.random() * 8;
      var duration = 10 + Math.random() * 10; // 10-20 seconds
      var drift = (Math.random() - 0.5) * 40; // Random horizontal drift
      
      particle.css({
        left: startX + '%',
        animationDelay: delay + 's',
        animationDuration: duration + 's',
        '--drift': drift + 'px'
      });
      
      $('#background').append(particle);
    }
  },

  createPondBubbles: function() {
    $('.pond-bubble').remove();
    
    var bubbleCount = 6;
    for (var i = 0; i < bubbleCount; i++) {
      var bubble = $('<div class="pond-bubble"></div>');
      var startX = Math.random() * 100;
      var delay = Math.random() * 8;
      var size = 6 + Math.random() * 6; // 6-12px
      
      bubble.css({
        left: startX + '%',
        bottom: Math.random() * 30 + '%',
        width: size + 'px',
        height: size + 'px',
        animationDelay: delay + 's'
      });
      
      $('#background').append(bubble);
    }
  },

  createFlowLines: function() {
    $('.pond-connection').remove();
    
    var lineCount = 3;
    for (var i = 0; i < lineCount; i++) {
      var line = $('<div class="pond-connection"></div>');
      var top = Math.random() * 100;
      var width = 30 + Math.random() * 50; // 30-80px
      var delay = Math.random() * 4;
      
      line.css({
        top: top + '%',
        width: width + 'px',
        animationDelay: delay + 's'
      });
      
      $('#background').append(line);
    }
  },



  createSuccessSparkles: function() {
    var sparkleCount = 15;
    var $pond = $('#pond');
    
    for (var i = 0; i < sparkleCount; i++) {
      var sparkle = $('<div class="pond-sparkle"></div>');
      var angle = (Math.PI * 2 * i) / sparkleCount;
      var distance = 50 + Math.random() * 30;
      var x = Math.cos(angle) * distance;
      var y = Math.sin(angle) * distance;
      
      sparkle.css({
        '--sparkle-x': x + 'px',
        '--sparkle-y': y + 'px',
        left: '50%',
        top: '50%'
      });
      
      $pond.append(sparkle);
      
      // Remove after animation
      setTimeout(function() {
        sparkle.remove();
      }, 1500);
    }
  },

  loadDocs: function() {
    $('#instructions code').each(function() {
      var code = $(this);
      var text = code.text();

      if (text in docs) {
        code.addClass('help');
        code.on('click', function(e) {
          e.stopPropagation();

          // If click same code when tooltip already displayed, just remove current tooltip.
          if ($('#instructions .tooltip').length !== 0 && clickedCode === code){
            $('#instructions .tooltip').remove();
            return;
          }

          $('#levelsWrapper').hide();
          $('#instructions .tooltip').remove();
          var html = docs[text][game.language] || docs[text].en;
          var tooltipX = code.offset().left;
          var tooltipY = code.offset().top + code.height() + 13;
          $('<div class="tooltip"></div>').html(html).css({
            top: tooltipY,
            left: tooltipX
          }).appendTo($('#instructions'));

          var getDefaultPropVal = (pValue) => {
            if (pValue == '<integer>')
              return '0';
            else if (pValue == '<flex-direction>')
              return 'row nowrap';

            return pValue;
          };

          $('#instructions .tooltip code').on('click', function(event) {
            var methodName = text;
            var methodValue = event.target.textContent.split(' ')[0];
            game.writeCode(methodName, methodValue);

            game.check();
          });
          clickedCode = code;
        });
      }
    });
  },

  executeCode: function() {
    var level = levels[game.level];
    var code = $('#code').val();
    
    // Clean up the code - trim and normalize whitespace but preserve arrow functions
    code = code.trim();
    // Replace multiple newlines/spaces with single space, but preserve => syntax
    code = code.replace(/\s*\n\s*/g, ' ').replace(/\s+/g, ' ');
    
    // Don't execute if code is empty
    if (!code) {
      game.lastResult = null;
      game.lastError = null;
      return;
    }
    
    try {
      // Build the code - user writes: "arr.map(x => x * 2)"
      // We need: "var arr = [1, 2, 3];\nconst result = arr.map(x => x * 2);"
      var beforeCode = level.before;
      var afterCode = level.after;
      
      // Build full code with dynamic array
      var fullCode = 'var arr = ' + JSON.stringify(level.input) + ';\n' + 
                     beforeCode + code + afterCode;
      
      // Execute in a function scope to capture result
      // We append an assignment to capture the result variable
      fullCode += '\nwindow.__gameResult = result;';
      
      try {
        // Transpile TypeScript to JavaScript
        var transpiled = Babel.transform(fullCode, {
          presets: ['typescript'],
          filename: 'solution.ts'
        }).code;

        (function() {
          // Execute the modified code
          eval(transpiled);
          if (window.__gameResult === undefined) {
            throw new Error('Code did not set a result. Make sure your code assigns to result.');
          }
        })();
        result = window.__gameResult;
        window.__gameResult = undefined; // Clean up
      } catch (evalError) {
        window.__gameResult = undefined; // Clean up on error
        // Log the actual error and code for debugging
        console.error('Execution error:', evalError);
        console.error('Full code:', fullCode);
        // Re-throw with the actual error message
        throw evalError;
      }
      
      // Store result for comparison
      game.lastResult = result;
      game.lastError = null;
      game.saveAnswer();
      
      // Update visual display
      game.updateDisplay(result);
    } catch (error) {
      game.lastResult = null;
      game.lastError = error.message;
      $('#pond').html('<div class="error">Error: ' + error.message + '</div>');
    }
  },

  check: async function() {
    if (!document.startViewTransition) {
      game.executeCode();
      game.compare();
      return;
    }

    const transition = document.startViewTransition(() => game.executeCode());

    try {
      await transition.finished;
    } finally {
      game.compare();
    }
  },

  compare: function() {
    var level = levels[game.level];
    var correct = false;
    
    if (game.lastResult !== undefined && game.lastResult !== null) {
      // Compare result with expected output
      var expected = level.expected;
      
      // Deep comparison for arrays and objects
      if (Array.isArray(expected) && Array.isArray(game.lastResult)) {
        correct = JSON.stringify(expected) === JSON.stringify(game.lastResult);
      } else if (typeof expected === 'object' && typeof game.lastResult === 'object') {
        correct = JSON.stringify(expected) === JSON.stringify(game.lastResult);
      } else {
        correct = expected === game.lastResult;
      }
    }

    if (correct) {
      if ($.inArray(level.name, game.solved) === -1) {
        game.solved.push(level.name);
        // Trigger success effects only when first solving
        game.triggerSuccessEffects();
      }

      $('[data-level=' + game.level + ']').addClass('solved');
      $('#next').removeClass('disabled').addClass('animated animation');
      $('#pond').addClass('success-glow');
    } else {
      game.changed = true;
      $('#next').removeClass('animated animation').addClass('disabled');
      $('#pond').removeClass('success-glow');
    }
  },

  triggerSuccessEffects: function() {
    // Create sparkle effect
    game.createSuccessSparkles();
    
    // Enhanced particle burst
    setTimeout(function() {
      for (var i = 0; i < 5; i++) {
        setTimeout(function() {
          game.createPondParticles();
        }, i * 200);
      }
    }, 100);
  },

  updateDisplay: function(result) {
    var level = levels[game.level];
    var displayHtml = '<div class="code-result">';
    
    // Show input array
    if (level.input) {
      displayHtml += '<div class="input-array"><strong>Input:</strong> <code>' + JSON.stringify(level.input) + '</code></div>';
    }
    
    // Show result
    displayHtml += '<div class="output-array"><strong>Your Result:</strong> <code>' + JSON.stringify(result) + '</code></div>';
    
    // Show expected
    if (level.expected) {
      displayHtml += '<div class="expected-array"><strong>Expected:</strong> <code>' + JSON.stringify(level.expected) + '</code></div>';
    }
    
    displayHtml += '</div>';
    $('#pond').html(displayHtml);
  },

  saveAnswer: function() {
    var level = levels[this.level];
    game.answers[level.name] = $('#code').val();
  },

  tryagain: function() {
    $('#editor').addClass('animated shake');
  },

  win: function() {
    var solution = $('#code').val();

    this.loadLevel(levelWin);

    $('#editor').hide();
    $('#code').val(solution);
    $('#share').show();
    $('.frog .bg').removeClass('pulse').addClass('bounce');
  },

  transform: function() {
    var scale = 1 + ((Math.random() / 5) - 0.2);
    var rotate = 360 * Math.random();

    return {'transform': 'scale(' + scale + ') rotate(' + rotate + 'deg)'};
  },

  translate: function() {
    document.title = messages.title[game.language] || messages.title.en;
    $('html').attr('lang', game.language);

    var level = $('#editor').is(':visible') ? levels[game.level] : levelWin;
    var instructions = level.instructions[game.language] || level.instructions.en;
    $('#instructions').html(instructions);
    game.loadDocs();

    $('.translate').each(function() {
      var label = $(this).attr('id');
      if (messages[label]) {
        var text = messages[label][game.language] || messages[label].en;
	  }

      $('#' + label).text(text);
    });
  },

  debounce: function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  },

  writeCode: function(methodName, methodValue){
    var code = $('#code').val();
    var keywords = Object.keys(docs);
    
    // Do nothing when click method name inside Tooltip
    if (keywords.includes(methodValue)) return;

    // Simple insertion - append the method call
    if (code.trim() === '') {
      code = methodName + '(' + (methodValue !== methodName ? methodValue : '') + ')';
    } else {
      // Try to insert at cursor or append
      code += '\n' + methodName + '(' + (methodValue !== methodName ? methodValue : '') + ')';
    }

    $('#code').val(code);
    $('#code').focus();
    game.highlightSyntax();
  },

  highlightSyntax: function() {
    var code = $('#code').val();
    var highlighted = game.parseCode(code);
    var $code = $('#code');
    var $highlight = $('#code-highlight');
    
    $highlight.html(highlighted);
    
    // Match textarea scroll height
    var scrollHeight = $code[0].scrollHeight;
    $highlight.css('height', scrollHeight + 'px');
    
    // Sync scroll position using transform
    var scrollTop = $code.scrollTop();
    var scrollLeft = $code.scrollLeft();
    $highlight.css({
      'transform': 'translate(' + (-scrollLeft) + 'px, ' + (-scrollTop) + 'px)'
    });
  },

  parseCode: function(code) {
    if (!code) return '';
    
    // Escape HTML
    var escapeHtml = function(text) {
      var map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, function(m) { return map[m]; });
    };
    
    // Keywords
    var keywords = ['const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do', 'switch', 'case', 'break', 'continue', 'default', 'try', 'catch', 'finally', 'throw', 'new', 'this', 'typeof', 'instanceof', 'void', 'delete', 'in', 'of', 'async', 'await', 'class', 'extends', 'super', 'static', 'import', 'export', 'from', 'as', 'type', 'interface', 'enum'];
    
    // Common array methods and functions
    var functions = ['map', 'filter', 'reduce', 'forEach', 'find', 'findIndex', 'some', 'every', 'includes', 'indexOf', 'slice', 'splice', 'concat', 'join', 'push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'toString', 'parseInt', 'parseFloat', 'isNaN', 'isFinite', 'Array', 'Object', 'String', 'Number', 'Boolean', 'Date', 'Math', 'JSON', 'console', 'log', 'error', 'warn', 'info'];
    
    var result = '';
    var i = 0;
    var inString = false;
    var stringChar = '';
    var inComment = false;
    var commentType = '';
    
    while (i < code.length) {
      var char = code[i];
      var nextChar = i + 1 < code.length ? code[i + 1] : '';
      
      // Handle comments
      if (!inString && !inComment) {
        if (char === '/' && nextChar === '/') {
          inComment = true;
          commentType = 'line';
          result += '<span class="comment">//';
          i += 2;
          continue;
        } else if (char === '/' && nextChar === '*') {
          inComment = true;
          commentType = 'block';
          result += '<span class="comment">/*';
          i += 2;
          continue;
        }
      }
      
      if (inComment) {
        if (commentType === 'line' && char === '\n') {
          inComment = false;
          result += '</span>';
        } else if (commentType === 'block' && char === '*' && nextChar === '/') {
          inComment = false;
          result += '*/</span>';
          i += 2;
          continue;
        } else {
          result += escapeHtml(char);
          i++;
          continue;
        }
      }
      
      // Handle strings
      if (!inComment && (char === '"' || char === "'" || char === '`')) {
        if (!inString) {
          inString = true;
          stringChar = char;
          result += '<span class="string">' + escapeHtml(char);
        } else if (char === stringChar && code[i - 1] !== '\\') {
          inString = false;
          result += escapeHtml(char) + '</span>';
        } else {
          result += escapeHtml(char);
        }
        i++;
        continue;
      }
      
      if (inString) {
        result += escapeHtml(char);
        i++;
        continue;
      }
      
      // Handle numbers
      if (/[0-9]/.test(char) && (i === 0 || !/[a-zA-Z_$]/.test(code[i - 1]))) {
        var num = '';
        while (i < code.length && /[0-9.]/.test(code[i])) {
          num += code[i];
          i++;
        }
        result += '<span class="number">' + escapeHtml(num) + '</span>';
        continue;
      }
      
      // Handle operators and punctuation
      if (/[=+\-*/%&|<>!?:]/.test(char)) {
        var op = char;
        if (char === '=' && nextChar === '>') {
          op = '=>';
          i++;
        } else if (char === '=' && nextChar === '=') {
          op = '==';
          i++;
        } else if (char === '!' && nextChar === '=') {
          op = '!=';
          i++;
        } else if (char === '&' && nextChar === '&') {
          op = '&&';
          i++;
        } else if (char === '|' && nextChar === '|') {
          op = '||';
          i++;
        }
        result += '<span class="operator">' + escapeHtml(op) + '</span>';
        i++;
        continue;
      }
      
      if (/[()[\]{};,]/.test(char)) {
        result += '<span class="punctuation">' + escapeHtml(char) + '</span>';
        i++;
        continue;
      }
      
      // Handle identifiers, keywords, and functions
      if (/[a-zA-Z_$]/.test(char)) {
        var word = '';
        var start = i;
        while (i < code.length && /[a-zA-Z0-9_$]/.test(code[i])) {
          word += code[i];
          i++;
        }
        
        // Check if it's a keyword
        if (keywords.indexOf(word) !== -1) {
          result += '<span class="keyword">' + escapeHtml(word) + '</span>';
        }
        // Check if it's a function name
        else if (functions.indexOf(word) !== -1) {
          result += '<span class="function">' + escapeHtml(word) + '</span>';
        }
        // Check if it's a property access (word after a dot)
        else if (start > 0 && code[start - 1] === '.') {
          result += '<span class="property">' + escapeHtml(word) + '</span>';
        }
        // Check if it's a parameter (word after opening paren in arrow function context)
        else if (start > 0 && code[start - 1] === '(' && code.substring(Math.max(0, start - 10), start).indexOf('=>') !== -1) {
          result += '<span class="parameter">' + escapeHtml(word) + '</span>';
        }
        // Default to variable
        else {
          result += '<span class="variable">' + escapeHtml(word) + '</span>';
        }
        continue;
      }
      
      // Handle whitespace and other characters
      if (char === '\n') {
        result += '\n';
      } else if (char === ' ') {
        result += ' ';
      } else {
        result += escapeHtml(char);
      }
      i++;
    }
    
    if (inString) {
      result += '</span>';
    }
    if (inComment) {
      result += '</span>';
    }
    
    return result;
  }
};

$(document).ready(function() {
  game.start();
});
