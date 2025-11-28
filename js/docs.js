var docs = {
  'map': {
    'en': '<p>Creates a new array by calling a function on every element.</p><p>Syntax: <code>arr.map(callback)</code></p><p>Example: <code>arr.map(x => x * 2)</code> doubles each number</p><p>Example: <code>arr.map(x => x.toString())</code> converts to strings</p>',
  },
  'filter': {
    'en': '<p>Creates a new array with elements that pass a test.</p><p>Syntax: <code>arr.filter(callback)</code></p><p>Example: <code>arr.filter(x => x > 2)</code> keeps numbers > 2</p><p>Example: <code>arr.filter(x => x % 2 === 0)</code> keeps even numbers</p>',
  },
  'reduce': {
    'en': '<p>Reduces an array to a single value by applying a function.</p><p>Syntax: <code>arr.reduce(callback, initialValue)</code></p><p>Example: <code>arr.reduce((sum, x) => sum + x, 0)</code> sums all numbers</p><p>Example: <code>arr.reduce((max, x) => x > max ? x : max, arr[0])</code> finds maximum</p>',
  },
  'find': {
    'en': '<p>Returns the first element that matches a condition.</p><p>Syntax: <code>arr.find(callback)</code></p><p>Example: <code>arr.find(x => x > 3)</code> finds first number > 3</p><p>Returns undefined if no match is found.</p>',
  },
  'some': {
    'en': '<p>Checks if at least one element passes a test.</p><p>Syntax: <code>arr.some(callback)</code></p><p>Example: <code>arr.some(x => x > 3)</code> checks if any number > 3</p><p>Returns true if any element matches, false otherwise.</p>',
  },
  'every': {
    'en': '<p>Checks if all elements pass a test.</p><p>Syntax: <code>arr.every(callback)</code></p><p>Example: <code>arr.every(x => x > 0)</code> checks if all numbers are positive</p><p>Returns true only if every element matches.</p>',
  },
  'includes': {
    'en': '<p>Checks if an array contains a specific value.</p><p>Syntax: <code>arr.includes(value)</code></p><p>Example: <code>arr.includes(3)</code> checks if 3 is in the array</p><p>Returns true if found, false otherwise.</p>',
  },
  'forEach': {
    'en': '<p>Executes a function for each array element.</p><p>Syntax: <code>arr.forEach(callback)</code></p><p>Example: <code>arr.forEach(x => console.log(x))</code> logs each element</p><p>Note: forEach does not return a value, use map if you need a result.</p>',
  },
  'sort': {
    'en': '<p>Sorts the elements of an array. By default, converts to strings and sorts alphabetically.</p><p>Syntax: <code>arr.sort()</code> or <code>arr.sort(compareFunction)</code></p><p>Example: <code>arr.sort((a, b) => a - b)</code> sorts numbers ascending</p><p>Example: <code>arr.sort((a, b) => b - a)</code> sorts numbers descending</p>',
  },
  'reverse': {
    'en': '<p>Reverses the order of elements in an array. Modifies the original array.</p><p>Syntax: <code>arr.reverse()</code></p><p>Example: <code>arr.reverse()</code> reverses [1, 2, 3] to [3, 2, 1]</p>',
  },
  'slice': {
    'en': '<p>Extracts a portion of an array without modifying the original.</p><p>Syntax: <code>arr.slice(start, end)</code></p><p>Example: <code>arr.slice(1, 3)</code> gets elements at indices 1-2</p><p>Example: <code>arr.slice(2)</code> gets all elements from index 2 onwards</p>',
  },
  'concat': {
    'en': '<p>Combines arrays or values into a new array.</p><p>Syntax: <code>arr.concat(value1, value2, ...)</code></p><p>Example: <code>arr.concat([4, 5])</code> combines arrays</p><p>Example: <code>arr.concat(4, 5)</code> adds individual values</p>',
  },
  'join': {
    'en': '<p>Joins all array elements into a string with a separator.</p><p>Syntax: <code>arr.join(separator)</code></p><p>Example: <code>arr.join(",")</code> joins with commas</p><p>Example: <code>arr.join("-")</code> joins with dashes</p>',
  },
  'indexOf': {
    'en': '<p>Returns the index of the first occurrence of a value, or -1 if not found.</p><p>Syntax: <code>arr.indexOf(searchValue, fromIndex)</code></p><p>Example: <code>arr.indexOf(3)</code> finds index of 3</p><p>Example: <code>arr.indexOf(3, 2)</code> searches from index 2</p>',
  },
  'flat': {
    'en': '<p>Flattens nested arrays up to a specified depth.</p><p>Syntax: <code>arr.flat(depth)</code></p><p>Example: <code>arr.flat()</code> flattens one level (default)</p><p>Example: <code>arr.flat(2)</code> flattens two levels deep</p>',
  },
  'flatMap': {
    'en': '<p>Maps each element and flattens the result by one level. Equivalent to map() followed by flat(1).</p><p>Syntax: <code>arr.flatMap(callback)</code></p><p>Example: <code>arr.flatMap(x => [x, x*2])</code> maps and flattens</p>',
  }
};
