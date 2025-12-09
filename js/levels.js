var levels = [
  {
    name: 'basic types',
    instructions: {
      'en': '<p>Welcome to TypeScript! In TypeScript, we can specify the type of a variable using <code>: type</code> after the variable name.</p><p>Create a variable named <code>name</code> with the type <code>string</code> and assign it the value "Snowman".</p>',
    },
    input: [],
    expected: "Snowman",
    before: 'const name: string = ',
    after: ';\nconst result = name;',
    codeLines: 3,
    mdn: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html',
    mdnName: 'TypeScript Basic Types',
    solution: 'const name: string = "Snowman";'
  },
  {
    name: 'interfaces',
    instructions: {
      'en': '<p>Interfaces allow us to define the shape of an object. An interface specifies which properties an object must have and their types.</p><p>Create an object that matches the <code>Reindeer</code> interface: <code>interface Reindeer { name: string; noseColor: string; }</code>.</p>',
    },
    input: [],
    expected: { name: "Rudolph", noseColor: "red" },
    before: 'interface Reindeer { name: string; noseColor: string; }\n\nconst reindeer: Reindeer = ',
    after: ';\nconst result = reindeer;',
    codeLines: 5,
    mdn: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
    mdnName: 'TypeScript Interfaces',
    solution: 'const reindeer: Reindeer = { name: "Rudolph", noseColor: "red" };'
  },
  {
    name: 'optional properties',
    instructions: {
      'en': '<p>Sometimes properties are optional. In an interface, we mark them with a <code>?</code>.</p><p>Create a <code>Gift</code> object where <code>weight</code> is optional, and only provide the <code>name</code>.</p>',
    },
    input: [],
    expected: { name: "Toy Train" },
    before: 'interface Gift { name: string; weight?: number; }\n\nconst gift: Gift = ',
    after: ';\nconst result = gift;',
    codeLines: 5,
    mdn: 'https://www.typescriptlang.org/docs/handbook/2/objects.html',
    mdnName: 'Optional Properties',
    solution: 'const gift: Gift = { name: "Toy Train" };'
  },
  {
    name: 'map 1',
    instructions: {
      'en': '<p>Use the <code>map</code> method to transform each element in the array. The <code>map</code> method creates a new array by calling a function on every element.</p><p>For example, to double each number: <code>arr.map(x => x * 2)</code></p><p>Transform the array [1, 2, 3] to [2, 4, 6] by doubling each number.</p>',
    },
    input: [1, 2, 3],
    expected: [2, 4, 6],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map(x => x * 2)'
  },
  {
    name: 'map 2',
    instructions: {
      'en': '<p>Use <code>map</code> to convert an array of numbers to strings. The <code>map</code> method can transform elements to any type.</p><p>Convert [1, 2, 3] to ["1", "2", "3"].</p>',
    },
    input: [1, 2, 3],
    expected: ["1", "2", "3"],
    before: 'const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map(String)'
  },
  {
    name: 'filter 1',
    instructions: {
      'en': '<p>Use the <code>filter</code> method to create a new array with elements that pass a test. The <code>filter</code> method returns only elements where the callback returns true.</p><p>For example: <code>arr.filter(x => x > 2)</code> returns elements greater than 2.</p><p>Filter [1, 2, 3, 4, 5] to get only numbers greater than 3: [4, 5]</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [4, 5],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    mdnName: 'Array.prototype.filter()',
    solution: 'arr.filter(x => x > 3)'
  },
  {
    name: 'filter 2',
    instructions: {
      'en': '<p>Use <code>filter</code> to get only even numbers. Remember: a number is even if <code>n % 2 === 0</code>.</p><p>Filter [1, 2, 3, 4, 5, 6] to get [2, 4, 6].</p>',
    },
    input: [1, 2, 3, 4, 5, 6],
    expected: [2, 4, 6],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    mdnName: 'Array.prototype.filter()',
    solution: 'arr.filter(x => x % 2 === 0)'
  },
  {
    name: 'reduce 1',
    instructions: {
      'en': '<p>Use the <code>reduce</code> method to accumulate values. <code>reduce</code> takes a callback and an initial value, then applies the callback to each element.</p><p>For example: <code>arr.reduce((sum, x) => sum + x, 0)</code> sums all numbers.</p><p>Sum the array [1, 2, 3, 4] to get 10.</p>',
    },
    input: [1, 2, 3, 4],
    expected: 10,
    before: 'const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((sum, x) => sum + x, 0)'
  },
  {
    name: 'find 1',
    instructions: {
      'en': '<p>Use the <code>find</code> method to get the first element that matches a condition. <code>find</code> returns the first element where the callback returns true, or undefined if none match.</p><p>For example: <code>arr.find(x => x > 3)</code> finds the first number greater than 3.</p><p>Find the first number greater than 2 in [1, 2, 3, 4, 5].</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: 3,
    before: 'const result: number | undefined = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
    mdnName: 'Array.prototype.find()',
    solution: 'arr.find(x => x > 2)'
  },
  {
    name: 'some 1',
    instructions: {
      'en': '<p>Use the <code>some</code> method to check if at least one element passes a test. <code>some</code> returns true if any element satisfies the condition, false otherwise.</p><p>For example: <code>arr.some(x => x > 3)</code> checks if any number is greater than 3.</p><p>Check if [1, 2, 3, 4, 5] contains any number greater than 4.</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: true,
    before: 'const result: boolean = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some',
    mdnName: 'Array.prototype.some()',
    solution: 'arr.some(x => x > 4)',
    solution: 'arr.some(x => x > 4)'
  },
  {
    name: 'every 1',
    instructions: {
      'en': '<p>Use the <code>every</code> method to check if all elements pass a test. <code>every</code> returns true only if every element satisfies the condition.</p><p>For example: <code>arr.every(x => x > 0)</code> checks if all numbers are positive.</p><p>Check if all numbers in [2, 4, 6, 8] are even.</p>',
    },
    input: [2, 4, 6, 8],
    expected: true,
    before: 'const result: boolean = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every',
    mdnName: 'Array.prototype.every()',
    solution: 'arr.every(x => x % 2 === 0)',
    solution: 'arr.every(x => x % 2 === 0)'
  },
  {
    name: 'includes 1',
    instructions: {
      'en': '<p>Use the <code>includes</code> method to check if an array contains a specific value. <code>includes</code> returns true if the value is found, false otherwise.</p><p>For example: <code>arr.includes(3)</code> checks if 3 is in the array.</p><p>Check if [1, 2, 3, 4, 5] includes the number 3.</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: true,
    before: 'const result: boolean = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes',
    mdnName: 'Array.prototype.includes()',
    solution: 'arr.includes(3)',
    solution: 'arr.includes(3)'
  },
  {
    name: 'map and filter',
    instructions: {
      'en': '<p>Chain array methods together! First use <code>map</code> to double each number, then use <code>filter</code> to keep only numbers greater than 5.</p><p>Transform [1, 2, 3, 4, 5] by doubling each number, then filter to get numbers > 5: [6, 8, 10]</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [6, 8, 10],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map(x => x * 2).filter(x => x > 5)'
  },
  {
    name: 'reduce advanced',
    instructions: {
      'en': '<p>Use <code>reduce</code> to find the maximum value in an array. Start with the first element and compare each element to find the maximum.</p><p>Find the maximum in [3, 7, 2, 9, 1] which is 9.</p>',
    },
    input: [3, 7, 2, 9, 1],
    expected: 9,
    before: 'const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((max, x) => x > max ? x : max, arr[0])'
  },
  {
    name: 'map with objects',
    instructions: {
      'en': '<p>Use <code>map</code> to transform an array of objects. Extract a property from each object.</p><p>From [{name: "Santa", age: 1750}, {name: "Elf", age: 150}], extract the ages: [1750, 150]</p>',
    },
    input: [{ name: "Santa", age: 1750 }, { name: "Elf", age: 150 }],
    expected: [1750, 150],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map(x => x.age)'
  },
  {
    name: 'filter with objects',
    instructions: {
      'en': '<p>Use <code>filter</code> to filter an array of objects based on a property value.</p><p>From [{name: "Rudolph", age: 9}, {name: "Comet", age: 8}, {name: "Cupid", age: 9}], get only reindeer with age >= 9: [{name: "Rudolph", age: 9}, {name: "Cupid", age: 9}]</p>',
    },
    input: [{ name: "Rudolph", age: 9 }, { name: "Comet", age: 8 }, { name: "Cupid", age: 9 }],
    expected: [{ name: "Rudolph", age: 9 }, { name: "Cupid", age: 9 }],
    before: 'const result: {name: string, age: number}[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    mdnName: 'Array.prototype.filter()',
    solution: 'arr.filter(x => x.age >= 9)'
  },
  {
    name: 'sort 1',
    instructions: {
      'en': '<p>Use the <code>sort</code> method to sort an array. By default, <code>sort</code> converts elements to strings and sorts alphabetically. For numbers, provide a comparison function.</p><p>Example: <code>arr.sort((a, b) => a - b)</code> sorts numbers in ascending order.</p><p>Sort [3, 1, 4, 2, 5] in ascending order: [1, 2, 3, 4, 5]</p>',
    },
    input: [3, 1, 4, 2, 5],
    expected: [1, 2, 3, 4, 5],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    mdnName: 'Array.prototype.sort()',
    solution: 'arr.sort((a, b) => a - b)'
  },
  {
    name: 'sort 2',
    instructions: {
      'en': '<p>Use <code>sort</code> with a comparison function to sort in descending order. Return <code>b - a</code> to sort numbers from highest to lowest.</p><p>Sort [3, 1, 4, 2, 5] in descending order: [5, 4, 3, 2, 1]</p>',
    },
    input: [3, 1, 4, 2, 5],
    expected: [5, 4, 3, 2, 1],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    mdnName: 'Array.prototype.sort()',
    solution: 'arr.sort((a, b) => b - a)'
  },
  {
    name: 'reverse',
    instructions: {
      'en': '<p>Use the <code>reverse</code> method to reverse the order of elements in an array. <code>reverse</code> modifies the original array and returns it.</p><p>Example: <code>arr.reverse()</code> reverses the array.</p><p>Reverse [1, 2, 3, 4, 5] to get [5, 4, 3, 2, 1].</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [5, 4, 3, 2, 1],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse',
    mdnName: 'Array.prototype.reverse()',
    solution: 'arr.reverse()'
  },
  {
    name: 'slice 1',
    instructions: {
      'en': '<p>Use the <code>slice</code> method to extract a portion of an array. <code>slice(start, end)</code> returns elements from index <code>start</code> up to (but not including) <code>end</code>.</p><p>Example: <code>arr.slice(1, 3)</code> gets elements at indices 1 and 2.</p><p>Extract elements from index 1 to 3 (exclusive) from [10, 20, 30, 40, 50]: [20, 30]</p>',
    },
    input: [10, 20, 30, 40, 50],
    expected: [20, 30],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice',
    mdnName: 'Array.prototype.slice()',
    solution: 'arr.slice(1, 3)'
  },
  {
    name: 'slice 2',
    instructions: {
      'en': '<p>Use <code>slice</code> with one argument to get all elements from that index to the end. <code>arr.slice(2)</code> gets all elements starting from index 2.</p><p>Get all elements from index 2 onwards from [10, 20, 30, 40, 50]: [30, 40, 50]</p>',
    },
    input: [10, 20, 30, 40, 50],
    expected: [30, 40, 50],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice',
    mdnName: 'Array.prototype.slice()',
    solution: 'arr.slice(2)'
  },
  {
    name: 'concat',
    instructions: {
      'en': '<p>Use the <code>concat</code> method to combine arrays. <code>concat</code> creates a new array by merging the original array with other arrays or values.</p><p>Example: <code>arr.concat([4, 5])</code> combines arrays.</p><p>Combine [1, 2, 3] with [4, 5, 6] to get [1, 2, 3, 4, 5, 6].</p>',
    },
    input: [1, 2, 3],
    expected: [1, 2, 3, 4, 5, 6],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat',
    mdnName: 'Array.prototype.concat()',
    solution: 'arr.concat([4, 5, 6])'
  },
  {
    name: 'join',
    instructions: {
      'en': '<p>Use the <code>join</code> method to convert an array to a string. <code>join(separator)</code> concatenates all elements with the separator between them.</p><p>Example: <code>arr.join("-")</code> joins with dashes.</p><p>Join ["a", "b", "c"] with commas to get "a,b,c".</p>',
    },
    input: ["a", "b", "c"],
    expected: "a,b,c",
    before: 'const result: string = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join',
    mdnName: 'Array.prototype.join()',
    solution: 'arr.join(",")'
  },
  {
    name: 'indexOf',
    instructions: {
      'en': '<p>Use the <code>indexOf</code> method to find the index of the first occurrence of a value. Returns -1 if the value is not found.</p><p>Example: <code>arr.indexOf(3)</code> finds the index of 3.</p><p>Find the index of 30 in [10, 20, 30, 40, 30].</p>',
    },
    input: [10, 20, 30, 40, 30],
    expected: 2,
    before: 'const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf',
    mdnName: 'Array.prototype.indexOf()',
    solution: 'arr.indexOf(30)'
  },
  {
    name: 'flat',
    instructions: {
      'en': '<p>Use the <code>flat</code> method to flatten nested arrays. <code>flat(depth)</code> flattens arrays up to the specified depth (default is 1).</p><p>Example: <code>arr.flat()</code> flattens one level deep.</p><p>Flatten [[1, 2], [3, 4], [5]] to get [1, 2, 3, 4, 5].</p>',
    },
    input: [[1, 2], [3, 4], [5]],
    expected: [1, 2, 3, 4, 5],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
    mdnName: 'Array.prototype.flat()',
    solution: 'arr.flat()'
  },
  {
    name: 'map 3',
    instructions: {
      'en': '<p>Use <code>map</code> with strings to transform each element. You can manipulate string properties or methods.</p><p>Transform ["hello", "world"] to uppercase: ["HELLO", "WORLD"].</p>',
    },
    input: ["hello", "world"],
    expected: ["HELLO", "WORLD"],
    before: 'const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map(x => x.toUpperCase())'
  },
  {
    name: 'filter 3',
    instructions: {
      'en': '<p>Use <code>filter</code> with multiple conditions. Combine conditions using logical operators like <code>&&</code> (and) or <code>||</code> (or).</p><p>Filter [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] to get numbers greater than 3 AND less than 8: [4, 5, 6, 7]</p>',
    },
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    expected: [4, 5, 6, 7],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    mdnName: 'Array.prototype.filter()',
    solution: 'arr.filter(x => x > 3 && x < 8)'
  },
  {
    name: 'reduce 2',
    instructions: {
      'en': '<p>Use <code>reduce</code> to count elements. Accumulate a count based on a condition.</p><p>Count how many numbers in [1, 2, 3, 4, 5, 6, 7, 8] are even: 4</p>',
    },
    input: [1, 2, 3, 4, 5, 6, 7, 8],
    expected: 4,
    before: 'const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((count, x) => x % 2 === 0 ? count + 1 : count, 0)'
  },
  {
    name: 'reduce 3',
    instructions: {
      'en': '<p>Use <code>reduce</code> to group elements. Create an object that groups elements by a property or condition.</p><p>From [{type: "fruit", name: "apple"}, {type: "vegetable", name: "carrot"}, {type: "fruit", name: "banana"}], count items by type: {fruit: 2, vegetable: 1}</p>',
    },
    input: [{ type: "fruit", name: "apple" }, { type: "vegetable", name: "carrot" }, { type: "fruit", name: "banana" }],
    expected: { fruit: 2, vegetable: 1 },
    before: 'const result: Record<string, number> = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((acc, item) => ({...acc, [item.type]: (acc[item.type] || 0) + 1}), {})'
  },
  {
    name: 'find 2',
    instructions: {
      'en': '<p>Use <code>find</code> with objects to find the first object that matches a condition.</p><p>From [{name: "Alice", age: 25}, {name: "Bob", age: 30}, {name: "Charlie", age: 20}], find the first person with age > 25: {name: "Bob", age: 30}</p>',
    },
    input: [{ name: "Alice", age: 25 }, { name: "Bob", age: 30 }, { name: "Charlie", age: 20 }],
    expected: { name: "Bob", age: 30 },
    before: 'const result: {name: string, age: number} | undefined = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find',
    mdnName: 'Array.prototype.find()',
    solution: 'arr.find(x => x.age > 25)'
  },
  {
    name: 'map filter reduce',
    instructions: {
      'en': '<p>Chain multiple methods together! Use <code>map</code> to transform, <code>filter</code> to select, and <code>reduce</code> to aggregate.</p><p>From [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], double each number, filter to keep only numbers > 10, then sum them: 90</p>',
    },
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    expected: 90,
    before: 'const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.map(x => x * 2).filter(x => x >= 10).reduce((sum, x) => sum + x, 0)'
  },
  {
    name: 'flatMap',
    instructions: {
      'en': '<p>Use <code>flatMap</code> to map and flatten in one step. <code>flatMap</code> is equivalent to <code>map</code> followed by <code>flat(1)</code>.</p><p>From [1, 2, 3], create arrays [x, x*2] for each number and flatten: [1, 2, 2, 4, 3, 6]</p>',
    },
    input: [1, 2, 3],
    expected: [1, 2, 2, 4, 3, 6],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap',
    mdnName: 'Array.prototype.flatMap()',
    solution: 'arr.flatMap(x => [x, x * 2])'
  },
  {
    name: 'map with nested',
    instructions: {
      'en': '<p>Use <code>map</code> to transform nested arrays. You can access nested elements and transform them.</p><p>From [[1, 2], [3, 4], [5, 6]], get the first element of each sub-array: [1, 3, 5]</p>',
    },
    input: [[1, 2], [3, 4], [5, 6]],
    expected: [1, 3, 5],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map(subArr => subArr[0])'
  },
  {
    name: 'real world 1',
    instructions: {
      'en': '<p>Real-world scenario: Process holiday shopping data. From items with prices, calculate the total cost of items that cost more than $10.</p><p>From [{name: "candy cane", price: 5}, {name: "toy train", price: 50}, {name: "stocking", price: 15}], sum prices of items > $10: 65</p>',
    },
    input: [{ name: "candy cane", price: 5 }, { name: "toy train", price: 50 }, { name: "stocking", price: 15 }],
    expected: 65,
    before: 'const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((sum, item) => item.price > 10 ? sum + item.price : sum, 0)'
  },
  {
    name: 'real world 2',
    instructions: {
      'en': '<p>Real-world scenario: Format user data. Extract and format names from user objects.</p><p>From [{firstName: "Santa", lastName: "Claus"}, {firstName: "Mrs", lastName: "Claus"}], create full names: ["Santa Claus", "Mrs Claus"]</p>',
    },
    input: [{ firstName: "Santa", lastName: "Claus" }, { firstName: "Mrs", lastName: "Claus" }],
    expected: ["Santa Claus", "Mrs Claus"],
    before: 'const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map(user => `${user.firstName} ${user.lastName}`)'
  },
  {
    name: 'object keys',
    instructions: {
      'en': '<p>Use <code>Object.keys()</code> to get all property names from an object. This returns an array of the object\'s own enumerable property names.</p><p>Get all keys from {name: "Santa", age: 1750, home: "North Pole"}: ["name", "age", "home"]</p>',
    },
    input: { name: "Santa", age: 1750, home: "North Pole" },
    expected: ["name", "age", "home"],
    before: 'const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys',
    mdnName: 'Object.keys()',
    solution: 'Object.keys(arr)'
  },
  {
    name: 'object values',
    instructions: {
      'en': '<p>Use <code>Object.values()</code> to get all property values from an object. This returns an array of the object\'s own enumerable property values.</p><p>Get all values from {name: "Santa", age: 1750, home: "North Pole"}: ["Santa", 1750, "North Pole"]</p>',
    },
    input: { name: "Santa", age: 1750, home: "North Pole" },
    expected: ["Santa", 1750, "North Pole"],
    before: 'const result: (string | number)[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values',
    mdnName: 'Object.values()',
    solution: 'Object.values(arr)'
  },
  {
    name: 'object entries',
    instructions: {
      'en': '<p>Use <code>Object.entries()</code> to get key-value pairs from an object. This returns an array of [key, value] pairs.</p><p>Get entries from {a: 1, b: 2, c: 3}: [["a", 1], ["b", 2], ["c", 3]]</p>',
    },
    input: { a: 1, b: 2, c: 3 },
    expected: [["a", 1], ["b", 2], ["c", 3]],
    before: 'const result: [string, number][] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries',
    mdnName: 'Object.entries()',
    solution: 'Object.entries(arr)'
  },
  {
    name: 'destructuring arrays',
    instructions: {
      'en': '<p>Use array destructuring to extract values. The syntax <code>const [first, second] = arr</code> assigns the first element to <code>first</code> and second to <code>second</code>.</p><p>Extract the first two elements from [10, 20, 30] and return them as an array: [10, 20]</p>',
    },
    input: [10, 20, 30],
    expected: [10, 20],
    before: 'const [first, second]: number[] = ',
    after: ';\nconst result = [first, second];',
    codeLines: 4,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
    mdnName: 'Destructuring assignment',
    solution: 'arr'
  },
  {
    name: 'destructuring objects',
    instructions: {
      'en': '<p>Use object destructuring to extract properties. The syntax <code>const {name, age} = obj</code> extracts the <code>name</code> and <code>age</code> properties.</p><p>Extract name and age from {name: "Frosty", age: 5, city: "Snowland"} and return them as an array: ["Frosty", 5]</p>',
    },
    input: { name: "Frosty", age: 5, city: "Snowland" },
    expected: ["Frosty", 5],
    before: 'const {name, age}: {name: string, age: number, city: string} = ',
    after: ';\nconst result = [name, age];',
    codeLines: 4,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment',
    mdnName: 'Destructuring assignment',
    solution: 'arr'
  },
  {
    name: 'spread operator',
    instructions: {
      'en': '<p>Use the spread operator <code>...</code> to expand arrays or objects. <code>[...arr1, ...arr2]</code> combines arrays, and <code>{...obj1, ...obj2}</code> merges objects.</p><p>Combine [1, 2, 3] and [4, 5] using spread: [1, 2, 3, 4, 5]</p>',
    },
    input: [1, 2, 3],
    expected: [1, 2, 3, 4, 5],
    before: 'const arr2 = [4, 5];\n    const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
    mdnName: 'Spread syntax',
    solution: '[...arr, ...arr2]'
  },
  {
    name: 'spread objects',
    instructions: {
      'en': '<p>Use spread operator to merge objects. Later properties override earlier ones. <code>{...obj1, ...obj2}</code> creates a new object with properties from both.</p><p>Merge {a: 1, b: 2} and {b: 3, c: 4}: {a: 1, b: 3, c: 4}</p>',
    },
    input: { a: 1, b: 2 },
    expected: { a: 1, b: 3, c: 4 },
    before: 'const obj = arr;\n    const obj2 = {b: 3, c: 4};\n    const result: {a: number, b: number, c: number} = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax',
    mdnName: 'Spread syntax',
    solution: '{...obj, ...obj2}'
  },
  {
    name: 'string methods',
    instructions: {
      'en': '<p>Use string methods like <code>split()</code>, <code>replace()</code>, <code>toUpperCase()</code>, <code>toLowerCase()</code>, <code>trim()</code>, etc.</p><p>Convert "hello world" to uppercase and split by space: ["HELLO", "WORLD"]</p>',
    },
    input: "hello world",
    expected: ["HELLO", "WORLD"],
    before: 'const str: string = arr;\n    const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    mdnName: 'String.prototype.split()',
    solution: 'arr.toUpperCase().split(" ")'
  },
  {
    name: 'string replace',
    instructions: {
      'en': '<p>Use <code>replace()</code> or <code>replaceAll()</code> to replace text in strings. <code>replace()</code> replaces the first match, <code>replaceAll()</code> replaces all matches.</p><p>Replace all spaces with dashes in "hello world test": "hello-world-test"</p>',
    },
    input: "hello world test",
    expected: "hello-world-test",
    before: 'const str: string = arr;\n    const result: string = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace',
    mdnName: 'String.prototype.replace()',
    solution: 'arr.replaceAll(" ", "-")'
  },
  {
    name: 'sets',
    instructions: {
      'en': '<p>Use <code>Set</code> to store unique values. Convert an array to a Set to remove duplicates, then convert back to an array using <code>Array.from()</code> or spread operator.</p><p>Remove duplicates from [1, 2, 2, 3, 3, 3, 4]: [1, 2, 3, 4]</p>',
    },
    input: [1, 2, 2, 3, 3, 3, 4],
    expected: [1, 2, 3, 4],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
    mdnName: 'Set',
    solution: '[...new Set(arr)]'
  },
  {
    name: 'maps',
    instructions: {
      'en': '<p>Use <code>Map</code> to store key-value pairs. Create with <code>new Map()</code>, set values with <code>map.set(key, value)</code>, and convert to array with <code>Array.from(map)</code> or <code>[...map]</code>.</p><p>Create a Map from [["a", 1], ["b", 2]] and get all entries as an array: [["a", 1], ["b", 2]]</p>',
    },
    input: [["a", 1], ["b", 2]],
    expected: [["a", 1], ["b", 2]],
    before: 'const map = new Map(arr);\n    const result: [string, number][] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map',
    mdnName: 'Map',
    solution: 'Array.from(new Map(arr))'
  },
  {
    name: 'optional chaining',
    instructions: {
      'en': '<p>Use optional chaining <code>?.</code> to safely access nested properties. If any part is null/undefined, it returns undefined instead of throwing an error.</p><p>Access <code>user.address.city</code> where user might be null. Return the city or "unknown": "NYC"</p>',
    },
    input: { user: { address: { city: "NYC" } } },
    expected: "NYC",
    before: 'const data = arr;\n    const result: string | undefined = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining',
    mdnName: 'Optional chaining',
    solution: 'data?.user?.address?.city || "unknown"'
  },
  {
    name: 'nullish coalescing',
    instructions: {
      'en': '<p>Use nullish coalescing operator <code>??</code> to provide default values. It returns the right side only if the left side is <code>null</code> or <code>undefined</code> (not other falsy values).</p><p>Use <code>??</code> to return the value or "default" if null/undefined: "hello"</p>',
    },
    input: "hello",
    expected: "hello",
    before: 'const value: string | null | undefined = arr;\n    const result: string = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing',
    mdnName: 'Nullish coalescing',
    solution: 'value ?? "default"'
  },
  {
    name: 'template literals',
    instructions: {
      'en': '<p>Use template literals (backticks) to create strings with embedded expressions. Use <code>${expression}</code> to interpolate values.</p><p>Create a greeting: "Hello, Rudolph! You are 9 years old." from name="Rudolph" and age=9</p>',
    },
    input: { name: "Rudolph", age: 9 },
    expected: "Hello, Rudolph! You are 9 years old.",
    before: 'const {name, age} = arr;\n    const result: string = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals',
    mdnName: 'Template literals',
    solution: '`Hello, ${name}! You are ${age} years old.`'
  },
  {
    name: 'object from entries',
    instructions: {
      'en': '<p>Use <code>Object.fromEntries()</code> to convert an array of [key, value] pairs into an object. This is the inverse of <code>Object.entries()</code>.</p><p>Convert [["name", "Alice"], ["age", 25]] to {name: "Alice", age: 25}</p>',
    },
    input: [["name", "Alice"], ["age", 25]],
    expected: { name: "Alice", age: 25 },
    before: 'const result: {name: string, age: number} = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries',
    mdnName: 'Object.fromEntries()',
    solution: 'Object.fromEntries(arr)'
  },
  {
    name: 'object assign',
    instructions: {
      'en': '<p>Use <code>Object.assign()</code> to copy properties from one or more source objects to a target object. <code>Object.assign(target, ...sources)</code> returns the target object. Use an empty object <code>{}</code> as the first argument to create a new object.</p><p>Merge {a: 1} and {b: 2} into a new object: {a: 1, b: 2}</p>',
    },
    input: { a: 1 },
    expected: { a: 1, b: 2 },
    before: 'const obj = arr;\n    const source = {b: 2};\n    const result: {a: number, b: number} = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign',
    mdnName: 'Object.assign()',
    solution: 'Object.assign({}, obj, source)'
  },
  {
    name: 'type checking',
    instructions: {
      'en': '<p>Use <code>typeof</code> to check the type of a value, or <code>Array.isArray()</code> for arrays, or <code>instanceof</code> for objects. Filter an array to get only strings.</p><p>From [1, "hello", true, "world", 42], get only strings: ["hello", "world"]</p>',
    },
    input: [1, "hello", true, "world", 42],
    expected: ["hello", "world"],
    before: 'const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof',
    mdnName: 'typeof',
    solution: 'arr.filter(x => typeof x === "string")'
  },
  {
    name: 'closures',
    instructions: {
      'en': '<p>Create a closure: a function that returns another function. The inner function has access to variables in the outer function\'s scope even after the outer function returns.</p><p>Create a function that takes a multiplier and returns a function that multiplies a number by that multiplier. Then call it with multiplier=3 and number=4: 12</p>',
    },
    input: { multiplier: 3, number: 4 },
    expected: 12,
    before: 'const {multiplier, number} = arr;\n    const createMultiplier = (mult: number) => (n: number) => n * mult;\n    const multiply = createMultiplier(multiplier);\n    const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures',
    mdnName: 'Closures',
    solution: 'multiply(number)'
  },
  {
    name: 'higher order functions',
    instructions: {
      'en': '<p>Create a higher-order function that takes a function and applies it to each element. This is like creating your own <code>map</code> function.</p><p>Create a function that doubles each number in [1, 2, 3, 4]: [2, 4, 6, 8]</p>',
    },
    input: [1, 2, 3, 4],
    expected: [2, 4, 6, 8],
    before: 'const myMap = (arr: number[], fn: (x: number) => number) => arr.map(fn);\n    const result: number[] = myMap(',
    after: ', x => x * 2);',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function',
    mdnName: 'First-class Function',
    solution: 'arr'
  },
  {
    name: 'recursion basics',
    instructions: {
      'en': '<p>Use recursion to solve problems. A recursive function calls itself with a smaller input until it reaches a base case. Calculate the factorial of a number: n! = n * (n-1) * ... * 1</p><p>Calculate factorial of 5: 120</p>',
    },
    input: 5,
    expected: 120,
    before: 'const n = arr;\n    const factorial = (n: number): number => n <= 1 ? 1 : n * factorial(n - 1);\n    const result: number = factorial(',
    after: ');',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Glossary/Recursion',
    mdnName: 'Recursion',
    solution: 'n'
  },
  {
    name: 'date manipulation',
    instructions: {
      'en': '<p>Work with <code>Date</code> objects. Use methods like <code>getFullYear()</code>, <code>getMonth()</code>, <code>getDate()</code>, <code>getTime()</code>, etc. Months are 0-indexed (0 = January).</p><p>Get the year from a date string "2024-03-15": 2024</p>',
    },
    input: "2024-03-15",
    expected: 2024,
    before: 'const dateStr = arr;\n    const date = new Date(dateStr);\n    const result: number = date.',
    after: '();',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
    mdnName: 'Date',
    solution: 'getFullYear'
  },
  {
    name: 'regex basics',
    instructions: {
      'en': '<p>Use regular expressions with <code>match()</code>, <code>test()</code>, or <code>replace()</code>. Create regex with <code>/pattern/</code> or <code>new RegExp()</code>.</p><p>Extract all digits from "abc123def456": ["123", "456"]</p>',
    },
    input: "abc123def456",
    expected: ["123", "456"],
    before: 'const str: string = arr;\n    const result: string[] | null = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp',
    mdnName: 'RegExp',
    solution: 'str.match(/\\d+/g)'
  },
  {
    name: 'nested object access',
    instructions: {
      'en': '<p>Access nested object properties and transform them. Combine object methods with array methods to process complex data structures.</p><p>From [{user: {name: "Alice", scores: [10, 20]}}, {user: {name: "Bob", scores: [15, 25]}}], get all names: ["Alice", "Bob"]</p>',
    },
    input: [{ user: { name: "Alice", scores: [10, 20] } }, { user: { name: "Bob", scores: [15, 25] } }],
    expected: ["Alice", "Bob"],
    before: 'const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects',
    mdnName: 'Working with Objects',
    solution: 'arr.map(x => x.user.name)'
  },
  {
    name: 'computed properties',
    instructions: {
      'en': '<p>Use computed property names in objects with square brackets <code>[key]</code>. This allows you to use variables or expressions as property names.</p><p>Create an object with a dynamic key: {dynamicKey: "value"}</p>',
    },
    input: "dynamicKey",
    expected: { dynamicKey: "value" },
    before: 'const key = arr;\n    const result: {[key: string]: string} = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer',
    mdnName: 'Object initializer',
    solution: '{[key]: "value"}'
  },
  {
    name: 'array methods with objects',
    instructions: {
      'en': '<p>Combine array methods with Object methods. Use <code>Object.entries()</code> to convert an object to an array, process it, then convert back with <code>Object.fromEntries()</code>.</p><p>Double all values in {a: 1, b: 2, c: 3}: {a: 2, b: 4, c: 6}</p>',
    },
    input: { a: 1, b: 2, c: 3 },
    expected: { a: 2, b: 4, c: 6 },
    before: 'const obj = arr;\n    const result: {a: number, b: number, c: number} = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries',
    mdnName: 'Object.entries()',
    solution: 'Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v * 2]))'
  },
  {
    name: 'string manipulation advanced',
    instructions: {
      'en': '<p>Combine multiple string methods. Use <code>split()</code>, <code>map()</code>, <code>join()</code>, and other string methods together to transform text.</p><p>Capitalize the first letter of each word in "hello world": "Hello World"</p>',
    },
    input: "hello world",
    expected: "Hello World",
    before: 'const str: string = arr;\n    const result: string = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split',
    mdnName: 'String.prototype.split()',
    solution: 'str.split(" ").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")'
  },
  {
    name: 'filter and transform objects',
    instructions: {
      'en': '<p>Filter an array of objects and transform the results. Combine <code>filter()</code> and <code>map()</code> to process complex data.</p><p>From [{name: "Prancer", age: 150}, {name: "Vixen", age: 140}, {name: "Baby Reindeer", age: 1}], get names of reindeer 100 or older: ["Prancer", "Vixen"]</p>',
    },
    input: [{ name: "Prancer", age: 150 }, { name: "Vixen", age: 140 }, { name: "Baby Reindeer", age: 1 }],
    expected: ["Prancer", "Vixen"],
    before: 'const result: string[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    mdnName: 'Array.prototype.filter()',
    solution: 'arr.filter(r => r.age >= 100).map(r => r.name)'
  },
  {
    name: 'reduce with objects',
    instructions: {
      'en': '<p>Use <code>reduce()</code> to transform an array into an object. This is useful for creating lookup tables or grouping data.</p><p>From [["a", 1], ["b", 2], ["c", 3]], create an object: {a: 1, b: 2, c: 3}</p>',
    },
    input: [["a", 1], ["b", 2], ["c", 3]],
    expected: { a: 1, b: 2, c: 3 },
    before: 'const result: Record<string, number> = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((acc, [k, v]) => ({...acc, [k]: v}), {})'
  },
  {
    name: 'frequency map',
    instructions: {
      'en': '<p>Use <code>reduce</code> to create a frequency map (count occurrences of each item). Start with an empty object <code>{}</code>.</p><p>Count occurrences of letters in ["a", "b", "a", "c", "b", "a"]: {a: 3, b: 2, c: 1}</p>',
    },
    input: ["a", "b", "a", "c", "b", "a"],
    expected: { a: 3, b: 2, c: 1 },
    before: 'const result: Record<string, number> = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((acc, char) => ({...acc, [char]: (acc[char] || 0) + 1}), {})'
  },
  {
    name: 'group by',
    instructions: {
      'en': '<p>Use <code>reduce</code> to group objects by a property. Initialize with an empty object.</p><p>Group by "type": {A: [{id: 1, type: "A"}, {id: 3, type: "A"}], B: [{id: 2, type: "B"}]}</p>',
    },
    input: [{ id: 1, type: 'A' }, { id: 2, type: 'B' }, { id: 3, type: 'A' }],
    expected: { A: [{ id: 1, type: 'A' }, { id: 3, type: 'A' }], B: [{ id: 2, type: 'B' }] },
    before: 'const result: Record<string, {id: number, type: string}[]> = ',
    after: ';',
    codeLines: 6,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce((acc, item) => ({...acc, [item.type]: [...(acc[item.type] || []), item]}), {})'
  },
  {
    name: 'intersection',
    instructions: {
      'en': '<p>Find the intersection of two arrays (elements present in both). Use <code>filter</code> and <code>includes</code>.</p><p>Find common numbers between [1, 2, 3, 4, 5] and [3, 4, 5, 6, 7]: [3, 4, 5]</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [3, 4, 5],
    before: 'const arr2 = [3, 4, 5, 6, 7];\n    const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    mdnName: 'Array.prototype.filter()',
    solution: 'arr.filter(x => arr2.includes(x))'
  },
  {
    name: 'difference',
    instructions: {
      'en': '<p>Find the difference between two arrays (elements in the first but NOT in the second). Use <code>filter</code> and <code>!includes</code>.</p><p>Find numbers in [1, 2, 3, 4, 5] that are not in [3, 4, 5, 6, 7]: [1, 2]</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [1, 2],
    before: 'const arr2 = [3, 4, 5, 6, 7];\n    const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter',
    mdnName: 'Array.prototype.filter()',
    solution: 'arr.filter(x => !arr2.includes(x))'
  },
  {
    name: 'unique objects',
    instructions: {
      'en': '<p>Remove duplicate objects based on a property (e.g., "id"). You can use a <code>Map</code> or <code>reduce</code>/<code>filter</code> with an auxiliary Set.</p><p>Get unique objects by ID: [{id: 1, val: "a"}, {id: 2, val: "b"}]</p>',
    },
    input: [{ id: 1, val: 'a' }, { id: 2, val: 'b' }, { id: 1, val: 'c' }],
    expected: [{ id: 1, val: 'a' }, { id: 2, val: 'b' }],
    before: 'const result: {id: number, val: string}[] = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set',
    mdnName: 'Set',
    solution: '[...new Map(arr.map(item => [item.id, item])).values()]'
  },
  {
    name: 'zip',
    instructions: {
      'en': '<p>Combine two arrays into an array of pairs (tuples). Use <code>map</code> on one array and access the other by index.</p><p>Zip ["a", "b", "c"] with [1, 2, 3]: [["a", 1], ["b", 2], ["c", 3]]</p>',
    },
    input: ["a", "b", "c"],
    expected: [["a", 1], ["b", 2], ["c", 3]],
    before: 'const arr2 = [1, 2, 3];\n    const result: [string, number][] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map',
    mdnName: 'Array.prototype.map()',
    solution: 'arr.map((k, i) => [k, arr2[i]])'
  },
  {
    name: 'partition',
    instructions: {
      'en': '<p>Split an array into two groups based on a condition. Return an array containing two arrays: [pass, fail].</p><p>Partition [1, 2, 3, 4, 5, 6] into [odds, evens]: [[1, 3, 5], [2, 4, 6]]</p>',
    },
    input: [1, 2, 3, 4, 5, 6],
    expected: [[1, 3, 5], [2, 4, 6]],
    before: 'const result: number[][] = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.reduce(([pass, fail], x) => x % 2 !== 0 ? [[...pass, x], fail] : [pass, [...fail, x]], [[], []])'
  },
  {
    name: 'flatten deep',
    instructions: {
      'en': '<p>Flatten a deeply nested array. Use <code>flat(Infinity)</code> or recursion.</p><p>Flatten [1, [2, [3, [4]]]]: [1, 2, 3, 4]</p>',
    },
    input: [1, [2, [3, [4]]]],
    expected: [1, 2, 3, 4],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat',
    mdnName: 'Array.prototype.flat()',
    solution: 'arr.flat(Infinity)'
  },
  {
    name: 'most frequent',
    instructions: {
      'en': '<p>Find the most frequent element in an array. Create a frequency map first, then find the key with the highest count.</p><p>Find the most frequent number in [1, 2, 3, 2, 2, 1, 4]: 2</p>',
    },
    input: [1, 2, 3, 2, 2, 1, 4],
    expected: 2,
    before: 'const result: number = ',
    after: ';',
    codeLines: 6,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'parseInt(Object.entries(arr.reduce((acc, x) => ({...acc, [x]: (acc[x] || 0) + 1}), {})).reduce((a, b) => a[1] > b[1] ? a : b)[0])'
  },
  {
    name: 'valid anagram',
    instructions: {
      'en': '<p>Check if two strings are anagrams (contain same characters in same quantities). Sort both strings and compare.</p><p>Is "listen" an anagram of "silent"? true</p>',
    },
    input: "listen",
    expected: true,
    before: 'const str2 = "silent";\n    const result: boolean = ',
    after: ';',
    codeLines: 4,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort',
    mdnName: 'Array.prototype.sort()',
    solution: 'arr.split("").sort().join("") === str2.split("").sort().join("")'
  },
  {
    name: 'chunk',
    instructions: {
      'en': '<p>Split an array into chunks of a specific size. Use <code>reduce</code> or a loop with <code>slice</code>.</p><p>Chunk [1, 2, 3, 4, 5] into size 2: [[1, 2], [3, 4], [5]]</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [[1, 2], [3, 4], [5]],
    before: 'const size = 2;\n    const result: number[][] = ',
    after: ';',
    codeLines: 6,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice',
    mdnName: 'Array.prototype.slice()',
    solution: 'arr.reduce((acc, _, i) => i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc, [])'
  },
  {
    name: 'merge sorted',
    instructions: {
      'en': '<p>Merge two sorted arrays into a single sorted array. You can use <code>concat</code> and <code>sort</code>, or a more efficient linear merge.</p><p>Merge [1, 3, 5] and [2, 4, 6]: [1, 2, 3, 4, 5, 6]</p>',
    },
    input: [1, 3, 5],
    expected: [1, 2, 3, 4, 5, 6],
    before: 'const arr2 = [2, 4, 6];\n    const result: number[] = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat',
    mdnName: 'Array.prototype.concat()',
    solution: 'arr.concat(arr2).sort((a, b) => a - b)'
  },
  {
    name: 'Pick',
    instructions: {
      'en': '<p>TypeScript\'s <code>Pick&lt;T, K&gt;</code> creates a type by picking a set of properties <code>K</code> from <code>T</code>. In runtime JS, we can implement a <code>pick</code> function.</p><p>Create a new object with only the "a" and "c" properties from {a: 1, b: 2, c: 3}.</p>',
    },
    input: { a: 1, b: 2, c: 3 },
    expected: { a: 1, c: 3 },
    before: 'const keys = ["a", "c"];\n    const result: {a: number, c: number} = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys',
    mdnName: 'Pick<Type, Keys>',
    solution: '(({a, c}) => ({a, c}))(arr)'
  },
  {
    name: 'Omit',
    instructions: {
      'en': '<p>TypeScript\'s <code>Omit&lt;T, K&gt;</code> creates a type by removing properties <code>K</code> from <code>T</code>. In JS, we can implement an <code>omit</code> function.</p><p>Create a new object without the "b" property from {a: 1, b: 2, c: 3}.</p>',
    },
    input: { a: 1, b: 2, c: 3 },
    expected: { a: 1, c: 3 },
    before: 'const keyToOmit = "b";\n    const result: {a: number, c: number} = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#omittype-keys',
    mdnName: 'Omit<Type, Keys>',
    solution: '(({b, ...rest}) => rest)(arr)'
  },
  {
    name: 'Partial',
    instructions: {
      'en': '<p>TypeScript\'s <code>Partial&lt;T&gt;</code> sets all properties of <code>T</code> to optional. In JS, this is often used when updating an object with a subset of properties.</p><p>Update {a: 1, b: 2} with {b: 3} using object spread syntax.</p>',
    },
    input: { a: 1, b: 2 },
    expected: { a: 1, b: 3 },
    before: 'const update = {b: 3};\n    const result: {a: number, b: number} = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#partialtype',
    mdnName: 'Partial<Type>',
    solution: '{...arr, ...update}'
  },
  {
    name: 'Readonly',
    instructions: {
      'en': '<p>TypeScript\'s <code>Readonly&lt;T&gt;</code> marks all properties as readonly. In JS, <code>Object.freeze()</code> prevents modification of existing properties.</p><p>Freeze the object {a: 1} so it cannot be changed.</p>',
    },
    input: { a: 1 },
    expected: { a: 1 },
    before: 'const result: Readonly<{a: number}> = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype',
    mdnName: 'Readonly<Type>',
    solution: 'Object.freeze(arr)'
  },
  {
    name: 'Record',
    instructions: {
      'en': '<p>TypeScript\'s <code>Record&lt;K, T&gt;</code> constructs an object type with keys <code>K</code> and values <code>T</code>. In JS, we can build an object from a list of keys.</p><p>Create an object where keys ["a", "b"] map to value 0: {a: 0, b: 0}</p>',
    },
    input: ["a", "b"],
    expected: { a: 0, b: 0 },
    before: 'const value = 0;\n    const result: Record<string, number> = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type',
    mdnName: 'Record<Keys, Type>',
    solution: 'arr.reduce((acc, key) => ({...acc, [key]: value}), {})'
  },
  {
    name: 'Tuple',
    instructions: {
      'en': '<p>TypeScript <code>Tuple</code> types express an array with a fixed number of elements whose types are known. In JS, we can check length and types.</p><p>Check if [1, "a"] is a valid [number, string] tuple (length 2, first is number, second is string).</p>',
    },
    input: [1, "a"],
    expected: true,
    before: 'const result: boolean = ',
    after: ';',
    codeLines: 4,
    mdn: 'https://www.typescriptlang.org/docs/handbook/2/objects.html#tuple-types',
    mdnName: 'Tuple Types',
    solution: 'const result: boolean = (arr.length === 2 && typeof arr[0] === "number" && typeof arr[1] === "string");'
  },
  {
    name: 'findIndex',
    instructions: {
      'en': '<p>Use <code>findIndex</code> to return the index of the first element that satisfies a condition. Returns -1 if no element matches.</p><p>Find the index of the first number greater than 10 in [1, 5, 10, 15].</p>',
    },
    input: [1, 5, 10, 15],
    expected: 3,
    before: 'const result: number = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex',
    mdnName: 'Array.prototype.findIndex()',
    solution: 'arr.findIndex(x => x > 10)'
  },
  {
    name: 'fill',
    instructions: {
      'en': '<p>Use <code>fill</code> to change all elements in an array to a static value.</p><p>Fill the array [1, 2, 3] with 0s.</p>',
    },
    input: [1, 2, 3],
    expected: [0, 0, 0],
    before: 'const result: number[] = ',
    after: ';',
    codeLines: 3,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill',
    mdnName: 'Array.prototype.fill()',
    solution: 'arr.fill(0)'
  },
  {
    name: 'recursive step 1',
    instructions: {
      'en': '<p>We are going to learn how to traverse complex data. First, let\'s access a nested property using a path array.</p><p>Input is <code>{a: {b: {c: 1}}}</code> and path is <code>["a", "b", "c"]</code>.</p><p>Write code to access <code>data[path[0]][path[1]]...</code> dynamically. You can use <code>reduce</code>.</p>',
    },
    input: { data: { a: { b: { c: 1 } } }, path: ['a', 'b', 'c'] },
    expected: 1,
    before: 'const { data, path } = arr;\n    const result = ',
    after: ';',
    codeLines: 5,
    mdn: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce',
    mdnName: 'Array.prototype.reduce()',
    solution: 'arr.path.reduce((acc, key) => acc[key], arr.data)'
  },
  {
    name: 'recursive step 2',
    instructions: {
      'en': '<p>Now, let\'s do the same thing using <strong>recursion</strong>.</p><p>Write a function <code>traverse(currentData, index)</code>. If <code>index === path.length</code>, return <code>currentData</code>. Else return <code>traverse(currentData[path[index]], index + 1)</code>.</p><p>Input: <code>{val: 100}</code> path <code>["val"]</code>.</p>',
    },
    input: { data: { val: 100 }, path: ['val'] },
    expected: 100,
    before: 'const { data, path } = arr;\n    const traverse = (currentData: any, index: number): any => {\n',
    after: '\n    };\n    const result = traverse(data, 0);',
    codeLines: 8,
    mdn: '',
    mdnName: 'Recursive Traversal Step 2',
    solution: '    if (index === path.length) return currentData;\n      return traverse(currentData[path[index]], index + 1);'
  },
  {
    name: 'recursive step 3',
    instructions: {
      'en': '<p>What if the data structure contains an array? We need to "branch" out and traverse into <strong>every</strong> item in the array.</p><p>Input: <code>[{id: 1}, {id: 2}]</code> (array of objects), key to access: <code>"id"</code>.</p><p>Use <code>map</code> to access the key on every item.</p>',
    },
    input: [{ id: 1 }, { id: 2 }],
    expected: [1, 2],
    before: 'const key = "id";\n    const result = ',
    after: ';',
    codeLines: 5,
    mdn: '',
    mdnName: 'Recursive Traversal Step 3',
    solution: 'arr.map(item => item[key])'
  },
  {
    name: 'recursive step 4',
    instructions: {
      'en': '<p>Let\'s combine them. We have an object that contains an array. <code>{ items: [{val: 10}, {val: 20}] }</code>. Path: <code>["items", "val"]</code>.</p><p>1. Access "items" -> gets the array.</p><p>2. Map over the array -> gets values.</p>',
    },
    input: { items: [{ val: 10 }, { val: 20 }] },
    expected: [10, 20],
    before: 'const path = ["items", "val"];\n    // 1. Get the array "items"\n    const array = arr[path[0]];\n    // 2. Map to get "val"\n    const result = ',
    after: ';',
    codeLines: 5,
    mdn: '',
    mdnName: 'Recursive Traversal Step 4',
    solution: 'arr[path[0]].map(item => item[path[1]])'
  },
  {
    name: 'interview challenge',
    instructions: {
      'en': '<p><strong>Final Challenge!</strong> Help Santa tally all the presents delivered across all routes.</p><p>Implement the <code>traverse</code> function to handle both objects (stops) and arrays (routes/manifests). Collect all final values (presents) at the end of the path.</p><p>Path: <code>["santa", "manifest", "routes", "stops", "presents"]</code></p>',
    },
    input: {
      santa: {
        id: "CLAUS-001",
        account_name: "North Pole Operations",
        main_address: "1 Candy Cane Lane",
        main_zip_code: "99705-0000",
        main_city: "North Pole",
        manifest: {
          nb_id: 6,
          id: 860,
          manifest_number: "XMAS-2024",
          effective_date: "2024-12-24",
          expiration_date: "2024-12-25",
          routes: [
            {
              manifest_id: 860,
              id: 236,
              route_number: "1",
              name: "Reindeer Run",
              house: "123 Jingle Bell Rd",
              stops: [
                {
                  manifest_route_id: 1806,
                  route_stop_id: 531,
                  route_id: 236,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "123 Jingle Bell Rd",
                  cookieCount: 3000000,
                  id: 860,
                  stop_id: "532",
                  presents: 1754979,
                  chimney_type: "Brick",
                },
                {
                  manifest_route_id: 1806,
                  route_stop_id: 532,
                  route_id: 236,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "123 Jingle Bell Rd",
                  cookieCount: 15309139,
                  id: 860,
                  stop_id: "531",
                  presents: 1298921,
                  chimney_type: "Stone",
                },
                {
                  manifest_route_id: 1806,
                  route_stop_id: 533,
                  route_id: 236,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "123 Jingle Bell Rd",
                  cookieCount: 20000,
                  id: 860,
                  stop_id: "533",
                  presents: 1442051,
                  chimney_type: "Wood",
                },
              ],
            },
            {
              manifest_id: 860,
              id: 237,
              route_number: "2",
              name: "Sleigh Ride Blvd",
              house: "5410 Mistletoe Ave",
              stops: [
                {
                  manifest_route_id: 1807,
                  route_stop_id: 534,
                  route_id: 237,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "5410 Mistletoe Ave",
                  cookieCount: 4220790,
                  id: 860,
                  stop_id: "534",
                  presents: 1183358,
                  chimney_type: "Brick",
                },
                {
                  manifest_route_id: 1807,
                  route_stop_id: 535,
                  route_id: 237,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "5410 Mistletoe Ave",
                  cookieCount: 2276332,
                  id: 860,
                  stop_id: "536",
                  presents: 1212126,
                  chimney_type: "Stone",
                },
                {
                  manifest_route_id: 1807,
                  route_stop_id: 536,
                  route_id: 237,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "5410 Mistletoe Ave",
                  cookieCount: 7103834,
                  id: 860,
                  stop_id: "535",
                  presents: 1958428,
                  chimney_type: "Wood",
                },
              ],
            },
            {
              manifest_id: 860,
              id: 238,
              route_number: "3",
              name: "Snowman Lane",
              house: "5410 Frosty Way",
              stops: [
                {
                  manifest_route_id: 1808,
                  route_stop_id: 537,
                  route_id: 238,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "5410 Frosty Way",
                  cookieCount: 6443604,
                  id: 860,
                  stop_id: "537",
                  presents: 1997468,
                  chimney_type: "Brick",
                },
                {
                  manifest_route_id: 1808,
                  route_stop_id: 538,
                  route_id: 238,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "5410 Frosty Way",
                  cookieCount: 7045627,
                  id: 860,
                  stop_id: "540",
                  presents: 2029933,
                  chimney_type: "Stone",
                },
                {
                  manifest_route_id: 1808,
                  route_stop_id: 539,
                  route_id: 238,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "5410 Frosty Way",
                  cookieCount: 3821346,
                  id: 860,
                  stop_id: "539",
                  presents: 1983871,
                  chimney_type: "Wood",
                },
                {
                  manifest_route_id: 1808,
                  route_stop_id: 540,
                  route_id: 238,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "5410 Frosty Way",
                  cookieCount: 8557187,
                  id: 860,
                  stop_id: "538",
                  presents: 1910437,
                  chimney_type: "Brick",
                },
              ],
            },
            {
              manifest_id: 860,
              id: 239,
              route_number: "4",
              name: "Elf Village",
              house: "912 Workshop St",
              stops: [
                {
                  manifest_route_id: 1809,
                  route_stop_id: 541,
                  route_id: 239,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "912 Workshop St",
                  cookieCount: 3255325,
                  id: 860,
                  stop_id: "545",
                  presents: 2423784,
                  chimney_type: "Stone",
                },
                {
                  manifest_route_id: 1809,
                  route_stop_id: 542,
                  route_id: 239,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "912 Workshop St",
                  cookieCount: 7082818,
                  id: 860,
                  stop_id: "542",
                  presents: 1843740,
                  chimney_type: "Wood",
                },
                {
                  manifest_route_id: 1809,
                  route_stop_id: 543,
                  route_id: 239,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "912 Workshop St",
                  cookieCount: 8950933,
                  id: 860,
                  stop_id: "544",
                  presents: 2197907,
                  chimney_type: "Brick",
                },
                {
                  manifest_route_id: 1809,
                  route_stop_id: 544,
                  route_id: 239,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "912 Workshop St",
                  cookieCount: 1840616,
                  id: 860,
                  stop_id: "541",
                  presents: 2270340,
                  chimney_type: "Stone",
                },
                {
                  manifest_route_id: 1809,
                  route_stop_id: 545,
                  route_id: 239,
                  date_added: "2024-12-24T23:55:59.342Z",
                  house: "912 Workshop St",
                  cookieCount: 5867473,
                  id: 860,
                  stop_id: "543",
                  presents: 1259916,
                  chimney_type: "Wood",
                },
              ],
            },
          ],
        },
      },
    },
    expected: [1754979, 1298921, 1442051, 1183358, 1212126, 1958428, 1997468, 2029933, 1983871, 1910437, 2423784, 1843740, 2197907, 2270340, 1259916],
    before: 'const path = ["santa", "manifest", "routes", "stops", "presents"];\n    const traverse = (data: any, index: number): any[] => {\n      if (index === path.length) return [data];\n      const key = path[index];\n      if (Array.isArray(data)) {\n        return data.flatMap(item => traverse(item, index)); \n      }\n      // Your code here for object traversal\n      return ',
    after: '\n    };\n    const result = traverse(arr, 0);',
    codeLines: 10,
    mdn: '',
    mdnName: 'Recursive Traversal Final',
    solution: '(data && data[key]) ? traverse(data[key], index + 1) : []'
  }
];

var levelWin = {
  name: 'win',
  instructions: {
    'en': '<p>Congratulations! You\'ve completed all the TypeScript (TS) Practice challenges! 🎉</p><p>You\'ve learned how to use <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>find</code>, <code>some</code>, <code>every</code>, <code>includes</code>, <code>sort</code>, <code>reverse</code>, <code>slice</code>, <code>concat</code>, <code>join</code>, <code>indexOf</code>, <code>flat</code>, <code>flatMap</code>, <code>Pick</code>, <code>Omit</code>, <code>Partial</code>, <code>Readonly</code>, <code>Record</code>, <code>Tuple</code>, <code>findIndex</code>, and <code>fill</code> to solve common coding problems.</p><p>Keep practicing to master these essential array methods!</p>',
  },
  before: '',
  after: ''
};
