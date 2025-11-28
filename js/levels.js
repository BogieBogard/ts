var levels = [
  {
    name: 'map 1',
    instructions: {
      'en': '<p>Welcome to TypeScript (TS) Practice! Use the <code>map</code> method to transform each element in the array. The <code>map</code> method creates a new array by calling a function on every element.</p><p>For example, to double each number: <code>arr.map(x => x * 2)</code></p><p>Transform the array [1, 2, 3] to [2, 4, 6] by doubling each number.</p>',
    },
    input: [1, 2, 3],
    expected: [2, 4, 6],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'map 2',
    instructions: {
      'en': '<p>Use <code>map</code> to convert an array of numbers to strings. The <code>map</code> method can transform elements to any type.</p><p>Convert [1, 2, 3] to ["1", "2", "3"].</p>',
    },
    input: [1, 2, 3],
    expected: ["1", "2", "3"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'filter 1',
    instructions: {
      'en': '<p>Use the <code>filter</code> method to create a new array with elements that pass a test. The <code>filter</code> method returns only elements where the callback returns true.</p><p>For example: <code>arr.filter(x => x > 2)</code> returns elements greater than 2.</p><p>Filter [1, 2, 3, 4, 5] to get only numbers greater than 3: [4, 5]</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [4, 5],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'filter 2',
    instructions: {
      'en': '<p>Use <code>filter</code> to get only even numbers. Remember: a number is even if <code>n % 2 === 0</code>.</p><p>Filter [1, 2, 3, 4, 5, 6] to get [2, 4, 6].</p>',
    },
    input: [1, 2, 3, 4, 5, 6],
    expected: [2, 4, 6],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'reduce 1',
    instructions: {
      'en': '<p>Use the <code>reduce</code> method to accumulate values. <code>reduce</code> takes a callback and an initial value, then applies the callback to each element.</p><p>For example: <code>arr.reduce((sum, x) => sum + x, 0)</code> sums all numbers.</p><p>Sum the array [1, 2, 3, 4] to get 10.</p>',
    },
    input: [1, 2, 3, 4],
    expected: 10,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'find 1',
    instructions: {
      'en': '<p>Use the <code>find</code> method to get the first element that matches a condition. <code>find</code> returns the first element where the callback returns true, or undefined if none match.</p><p>For example: <code>arr.find(x => x > 3)</code> finds the first number greater than 3.</p><p>Find the first number greater than 2 in [1, 2, 3, 4, 5].</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: 3,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'some 1',
    instructions: {
      'en': '<p>Use the <code>some</code> method to check if at least one element passes a test. <code>some</code> returns true if any element satisfies the condition, false otherwise.</p><p>For example: <code>arr.some(x => x > 3)</code> checks if any number is greater than 3.</p><p>Check if [1, 2, 3, 4, 5] contains any number greater than 4.</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: true,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'every 1',
    instructions: {
      'en': '<p>Use the <code>every</code> method to check if all elements pass a test. <code>every</code> returns true only if every element satisfies the condition.</p><p>For example: <code>arr.every(x => x > 0)</code> checks if all numbers are positive.</p><p>Check if all numbers in [2, 4, 6, 8] are even.</p>',
    },
    input: [2, 4, 6, 8],
    expected: true,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'includes 1',
    instructions: {
      'en': '<p>Use the <code>includes</code> method to check if an array contains a specific value. <code>includes</code> returns true if the value is found, false otherwise.</p><p>For example: <code>arr.includes(3)</code> checks if 3 is in the array.</p><p>Check if [1, 2, 3, 4, 5] includes the number 3.</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: true,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'map and filter',
    instructions: {
      'en': '<p>Chain array methods together! First use <code>map</code> to double each number, then use <code>filter</code> to keep only numbers greater than 5.</p><p>Transform [1, 2, 3, 4, 5] by doubling each number, then filter to get numbers > 5: [6, 8, 10]</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [6, 8, 10],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'reduce advanced',
    instructions: {
      'en': '<p>Use <code>reduce</code> to find the maximum value in an array. Start with the first element and compare each element to find the maximum.</p><p>Find the maximum in [3, 7, 2, 9, 1] which is 9.</p>',
    },
    input: [3, 7, 2, 9, 1],
    expected: 9,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'map with objects',
    instructions: {
      'en': '<p>Use <code>map</code> to transform an array of objects. Extract a property from each object.</p><p>From [{name: "Alice", age: 25}, {name: "Bob", age: 30}], extract the ages: [25, 30]</p>',
    },
    input: [{name: "Alice", age: 25}, {name: "Bob", age: 30}],
    expected: [25, 30],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'filter with objects',
    instructions: {
      'en': '<p>Use <code>filter</code> to filter an array of objects based on a property value.</p><p>From [{name: "Alice", age: 25}, {name: "Bob", age: 30}, {name: "Charlie", age: 20}], get only people with age >= 25: [{name: "Alice", age: 25}, {name: "Bob", age: 30}]</p>',
    },
    input: [{name: "Alice", age: 25}, {name: "Bob", age: 30}, {name: "Charlie", age: 20}],
    expected: [{name: "Alice", age: 25}, {name: "Bob", age: 30}],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'sort 1',
    instructions: {
      'en': '<p>Use the <code>sort</code> method to sort an array. By default, <code>sort</code> converts elements to strings and sorts alphabetically. For numbers, provide a comparison function.</p><p>Example: <code>arr.sort((a, b) => a - b)</code> sorts numbers in ascending order.</p><p>Sort [3, 1, 4, 2, 5] in ascending order: [1, 2, 3, 4, 5]</p>',
    },
    input: [3, 1, 4, 2, 5],
    expected: [1, 2, 3, 4, 5],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'sort 2',
    instructions: {
      'en': '<p>Use <code>sort</code> with a comparison function to sort in descending order. Return <code>b - a</code> to sort numbers from highest to lowest.</p><p>Sort [3, 1, 4, 2, 5] in descending order: [5, 4, 3, 2, 1]</p>',
    },
    input: [3, 1, 4, 2, 5],
    expected: [5, 4, 3, 2, 1],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'reverse',
    instructions: {
      'en': '<p>Use the <code>reverse</code> method to reverse the order of elements in an array. <code>reverse</code> modifies the original array and returns it.</p><p>Example: <code>arr.reverse()</code> reverses the array.</p><p>Reverse [1, 2, 3, 4, 5] to get [5, 4, 3, 2, 1].</p>',
    },
    input: [1, 2, 3, 4, 5],
    expected: [5, 4, 3, 2, 1],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'slice 1',
    instructions: {
      'en': '<p>Use the <code>slice</code> method to extract a portion of an array. <code>slice(start, end)</code> returns elements from index <code>start</code> up to (but not including) <code>end</code>.</p><p>Example: <code>arr.slice(1, 3)</code> gets elements at indices 1 and 2.</p><p>Extract elements from index 1 to 3 (exclusive) from [10, 20, 30, 40, 50]: [20, 30]</p>',
    },
    input: [10, 20, 30, 40, 50],
    expected: [20, 30],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'slice 2',
    instructions: {
      'en': '<p>Use <code>slice</code> with one argument to get all elements from that index to the end. <code>arr.slice(2)</code> gets all elements starting from index 2.</p><p>Get all elements from index 2 onwards from [10, 20, 30, 40, 50]: [30, 40, 50]</p>',
    },
    input: [10, 20, 30, 40, 50],
    expected: [30, 40, 50],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'concat',
    instructions: {
      'en': '<p>Use the <code>concat</code> method to combine arrays. <code>concat</code> creates a new array by merging the original array with other arrays or values.</p><p>Example: <code>arr.concat([4, 5])</code> combines arrays.</p><p>Combine [1, 2, 3] with [4, 5, 6] to get [1, 2, 3, 4, 5, 6].</p>',
    },
    input: [1, 2, 3],
    expected: [1, 2, 3, 4, 5, 6],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'join',
    instructions: {
      'en': '<p>Use the <code>join</code> method to convert an array to a string. <code>join(separator)</code> concatenates all elements with the separator between them.</p><p>Example: <code>arr.join("-")</code> joins with dashes.</p><p>Join ["a", "b", "c"] with commas to get "a,b,c".</p>',
    },
    input: ["a", "b", "c"],
    expected: "a,b,c",
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'indexOf',
    instructions: {
      'en': '<p>Use the <code>indexOf</code> method to find the index of the first occurrence of a value. Returns -1 if the value is not found.</p><p>Example: <code>arr.indexOf(3)</code> finds the index of 3.</p><p>Find the index of 30 in [10, 20, 30, 40, 30].</p>',
    },
    input: [10, 20, 30, 40, 30],
    expected: 2,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'flat',
    instructions: {
      'en': '<p>Use the <code>flat</code> method to flatten nested arrays. <code>flat(depth)</code> flattens arrays up to the specified depth (default is 1).</p><p>Example: <code>arr.flat()</code> flattens one level deep.</p><p>Flatten [[1, 2], [3, 4], [5]] to get [1, 2, 3, 4, 5].</p>',
    },
    input: [[1, 2], [3, 4], [5]],
    expected: [1, 2, 3, 4, 5],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'map 3',
    instructions: {
      'en': '<p>Use <code>map</code> with strings to transform each element. You can manipulate string properties or methods.</p><p>Transform ["hello", "world"] to uppercase: ["HELLO", "WORLD"].</p>',
    },
    input: ["hello", "world"],
    expected: ["HELLO", "WORLD"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'filter 3',
    instructions: {
      'en': '<p>Use <code>filter</code> with multiple conditions. Combine conditions using logical operators like <code>&&</code> (and) or <code>||</code> (or).</p><p>Filter [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] to get numbers greater than 3 AND less than 8: [4, 5, 6, 7]</p>',
    },
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    expected: [4, 5, 6, 7],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'reduce 2',
    instructions: {
      'en': '<p>Use <code>reduce</code> to count elements. Accumulate a count based on a condition.</p><p>Count how many numbers in [1, 2, 3, 4, 5, 6, 7, 8] are even: 4</p>',
    },
    input: [1, 2, 3, 4, 5, 6, 7, 8],
    expected: 4,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'reduce 3',
    instructions: {
      'en': '<p>Use <code>reduce</code> to group elements. Create an object that groups elements by a property or condition.</p><p>From [{type: "fruit", name: "apple"}, {type: "vegetable", name: "carrot"}, {type: "fruit", name: "banana"}], count items by type: {fruit: 2, vegetable: 1}</p>',
    },
    input: [{type: "fruit", name: "apple"}, {type: "vegetable", name: "carrot"}, {type: "fruit", name: "banana"}],
    expected: {fruit: 2, vegetable: 1},
    before: 'const result = ',
    after: ';',
    codeLines: 5
  },
  {
    name: 'find 2',
    instructions: {
      'en': '<p>Use <code>find</code> with objects to find the first object that matches a condition.</p><p>From [{name: "Alice", age: 25}, {name: "Bob", age: 30}, {name: "Charlie", age: 20}], find the first person with age > 25: {name: "Bob", age: 30}</p>',
    },
    input: [{name: "Alice", age: 25}, {name: "Bob", age: 30}, {name: "Charlie", age: 20}],
    expected: {name: "Bob", age: 30},
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'map filter reduce',
    instructions: {
      'en': '<p>Chain multiple methods together! Use <code>map</code> to transform, <code>filter</code> to select, and <code>reduce</code> to aggregate.</p><p>From [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], double each number, filter to keep only numbers > 10, then sum them: 90</p>',
    },
    input: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    expected: 90,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'flatMap',
    instructions: {
      'en': '<p>Use <code>flatMap</code> to map and flatten in one step. <code>flatMap</code> is equivalent to <code>map</code> followed by <code>flat(1)</code>.</p><p>From [1, 2, 3], create arrays [x, x*2] for each number and flatten: [1, 2, 2, 4, 3, 6]</p>',
    },
    input: [1, 2, 3],
    expected: [1, 2, 2, 4, 3, 6],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'map with nested',
    instructions: {
      'en': '<p>Use <code>map</code> to transform nested arrays. You can access nested elements and transform them.</p><p>From [[1, 2], [3, 4], [5, 6]], get the first element of each sub-array: [1, 3, 5]</p>',
    },
    input: [[1, 2], [3, 4], [5, 6]],
    expected: [1, 3, 5],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'real world 1',
    instructions: {
      'en': '<p>Real-world scenario: Process product data. From products with prices, calculate the total cost of items that cost more than $10.</p><p>From [{name: "apple", price: 5}, {name: "laptop", price: 800}, {name: "book", price: 15}], sum prices of items > $10: 815</p>',
    },
    input: [{name: "apple", price: 5}, {name: "laptop", price: 800}, {name: "book", price: 15}],
    expected: 815,
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'real world 2',
    instructions: {
      'en': '<p>Real-world scenario: Format user data. Extract and format names from user objects.</p><p>From [{firstName: "John", lastName: "Doe"}, {firstName: "Jane", lastName: "Smith"}], create full names: ["John Doe", "Jane Smith"]</p>',
    },
    input: [{firstName: "John", lastName: "Doe"}, {firstName: "Jane", lastName: "Smith"}],
    expected: ["John Doe", "Jane Smith"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'object keys',
    instructions: {
      'en': '<p>Use <code>Object.keys()</code> to get all property names from an object. This returns an array of the object\'s own enumerable property names.</p><p>Get all keys from {name: "Alice", age: 25, city: "NYC"}: ["name", "age", "city"]</p>',
    },
    input: {name: "Alice", age: 25, city: "NYC"},
    expected: ["name", "age", "city"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'object values',
    instructions: {
      'en': '<p>Use <code>Object.values()</code> to get all property values from an object. This returns an array of the object\'s own enumerable property values.</p><p>Get all values from {name: "Alice", age: 25, city: "NYC"}: ["Alice", 25, "NYC"]</p>',
    },
    input: {name: "Alice", age: 25, city: "NYC"},
    expected: ["Alice", 25, "NYC"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'object entries',
    instructions: {
      'en': '<p>Use <code>Object.entries()</code> to get key-value pairs from an object. This returns an array of [key, value] pairs.</p><p>Get entries from {a: 1, b: 2, c: 3}: [["a", 1], ["b", 2], ["c", 3]]</p>',
    },
    input: {a: 1, b: 2, c: 3},
    expected: [["a", 1], ["b", 2], ["c", 3]],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'destructuring arrays',
    instructions: {
      'en': '<p>Use array destructuring to extract values. The syntax <code>const [first, second] = arr</code> assigns the first element to <code>first</code> and second to <code>second</code>.</p><p>Extract the first two elements from [10, 20, 30] and return them as an array: [10, 20]</p>',
    },
    input: [10, 20, 30],
    expected: [10, 20],
    before: 'const [first, second] = ',
    after: ';\nconst result = [first, second];',
    codeLines: 4
  },
  {
    name: 'destructuring objects',
    instructions: {
      'en': '<p>Use object destructuring to extract properties. The syntax <code>const {name, age} = obj</code> extracts the <code>name</code> and <code>age</code> properties.</p><p>Extract name and age from {name: "Bob", age: 30, city: "LA"} and return them as an array: ["Bob", 30]</p>',
    },
    input: {name: "Bob", age: 30, city: "LA"},
    expected: ["Bob", 30],
    before: 'const {name, age} = ',
    after: ';\nconst result = [name, age];',
    codeLines: 4
  },
  {
    name: 'spread operator',
    instructions: {
      'en': '<p>Use the spread operator <code>...</code> to expand arrays or objects. <code>[...arr1, ...arr2]</code> combines arrays, and <code>{...obj1, ...obj2}</code> merges objects.</p><p>Combine [1, 2, 3] and [4, 5] using spread: [1, 2, 3, 4, 5]</p>',
    },
    input: [1, 2, 3],
    expected: [1, 2, 3, 4, 5],
    before: 'const arr2 = [4, 5];\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'spread objects',
    instructions: {
      'en': '<p>Use spread operator to merge objects. Later properties override earlier ones. <code>{...obj1, ...obj2}</code> creates a new object with properties from both.</p><p>Merge {a: 1, b: 2} and {b: 3, c: 4}: {a: 1, b: 3, c: 4}</p>',
    },
    input: {a: 1, b: 2},
    expected: {a: 1, b: 3, c: 4},
    before: 'const obj = arr;\nconst obj2 = {b: 3, c: 4};\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'string methods',
    instructions: {
      'en': '<p>Use string methods like <code>split()</code>, <code>replace()</code>, <code>toUpperCase()</code>, <code>toLowerCase()</code>, <code>trim()</code>, etc.</p><p>Convert "hello world" to uppercase and split by space: ["HELLO", "WORLD"]</p>',
    },
    input: "hello world",
    expected: ["HELLO", "WORLD"],
    before: 'const str = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'string replace',
    instructions: {
      'en': '<p>Use <code>replace()</code> or <code>replaceAll()</code> to replace text in strings. <code>replace()</code> replaces the first match, <code>replaceAll()</code> replaces all matches.</p><p>Replace all spaces with dashes in "hello world test": "hello-world-test"</p>',
    },
    input: "hello world test",
    expected: "hello-world-test",
    before: 'const str = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'sets',
    instructions: {
      'en': '<p>Use <code>Set</code> to store unique values. Convert an array to a Set to remove duplicates, then convert back to an array using <code>Array.from()</code> or spread operator.</p><p>Remove duplicates from [1, 2, 2, 3, 3, 3, 4]: [1, 2, 3, 4]</p>',
    },
    input: [1, 2, 2, 3, 3, 3, 4],
    expected: [1, 2, 3, 4],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'maps',
    instructions: {
      'en': '<p>Use <code>Map</code> to store key-value pairs. Create with <code>new Map()</code>, set values with <code>map.set(key, value)</code>, and convert to array with <code>Array.from(map)</code> or <code>[...map]</code>.</p><p>Create a Map from [["a", 1], ["b", 2]] and get all entries as an array: [["a", 1], ["b", 2]]</p>',
    },
    input: [["a", 1], ["b", 2]],
    expected: [["a", 1], ["b", 2]],
    before: 'const map = new Map(arr);\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'optional chaining',
    instructions: {
      'en': '<p>Use optional chaining <code>?.</code> to safely access nested properties. If any part is null/undefined, it returns undefined instead of throwing an error.</p><p>Access <code>user.address.city</code> where user might be null. Return the city or "unknown": "NYC"</p>',
    },
    input: {user: {address: {city: "NYC"}}},
    expected: "NYC",
    before: 'const data = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'nullish coalescing',
    instructions: {
      'en': '<p>Use nullish coalescing operator <code>??</code> to provide default values. It returns the right side only if the left side is <code>null</code> or <code>undefined</code> (not other falsy values).</p><p>Use <code>??</code> to return the value or "default" if null/undefined: "hello"</p>',
    },
    input: "hello",
    expected: "hello",
    before: 'const value = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'template literals',
    instructions: {
      'en': '<p>Use template literals (backticks) to create strings with embedded expressions. Use <code>${expression}</code> to interpolate values.</p><p>Create a greeting: "Hello, Alice! You are 25 years old." from name="Alice" and age=25</p>',
    },
    input: {name: "Alice", age: 25},
    expected: "Hello, Alice! You are 25 years old.",
    before: 'const {name, age} = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'object from entries',
    instructions: {
      'en': '<p>Use <code>Object.fromEntries()</code> to convert an array of [key, value] pairs into an object. This is the inverse of <code>Object.entries()</code>.</p><p>Convert [["name", "Alice"], ["age", 25]] to {name: "Alice", age: 25}</p>',
    },
    input: [["name", "Alice"], ["age", 25]],
    expected: {name: "Alice", age: 25},
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'object assign',
    instructions: {
      'en': '<p>Use <code>Object.assign()</code> to copy properties from one or more source objects to a target object. <code>Object.assign(target, ...sources)</code> returns the target object. Use an empty object <code>{}</code> as the first argument to create a new object.</p><p>Merge {a: 1} and {b: 2} into a new object: {a: 1, b: 2}</p>',
    },
    input: {a: 1},
    expected: {a: 1, b: 2},
    before: 'const obj = arr;\nconst source = {b: 2};\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'type checking',
    instructions: {
      'en': '<p>Use <code>typeof</code> to check the type of a value, or <code>Array.isArray()</code> for arrays, or <code>instanceof</code> for objects. Filter an array to get only strings.</p><p>From [1, "hello", true, "world", 42], get only strings: ["hello", "world"]</p>',
    },
    input: [1, "hello", true, "world", 42],
    expected: ["hello", "world"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'closures',
    instructions: {
      'en': '<p>Create a closure: a function that returns another function. The inner function has access to variables in the outer function\'s scope even after the outer function returns.</p><p>Create a function that takes a multiplier and returns a function that multiplies a number by that multiplier. Then call it with multiplier=3 and number=4: 12</p>',
    },
    input: {multiplier: 3, number: 4},
    expected: 12,
    before: 'const {multiplier, number} = arr;\nconst createMultiplier = (mult) => (n) => n * mult;\nconst multiply = createMultiplier(multiplier);\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'higher order functions',
    instructions: {
      'en': '<p>Create a higher-order function that takes a function and applies it to each element. This is like creating your own <code>map</code> function.</p><p>Create a function that doubles each number in [1, 2, 3, 4]: [2, 4, 6, 8]</p>',
    },
    input: [1, 2, 3, 4],
    expected: [2, 4, 6, 8],
    before: 'const myMap = (arr, fn) => arr.map(fn);\nconst result = myMap(',
    after: ', x => x * 2);',
    codeLines: 3
  },
  {
    name: 'recursion basics',
    instructions: {
      'en': '<p>Use recursion to solve problems. A recursive function calls itself with a smaller input until it reaches a base case. Calculate the factorial of a number: n! = n * (n-1) * ... * 1</p><p>Calculate factorial of 5: 120</p>',
    },
    input: 5,
    expected: 120,
    before: 'const n = arr;\nconst factorial = (n) => n <= 1 ? 1 : n * factorial(n - 1);\nconst result = factorial(',
    after: ');',
    codeLines: 3
  },
  {
    name: 'date manipulation',
    instructions: {
      'en': '<p>Work with <code>Date</code> objects. Use methods like <code>getFullYear()</code>, <code>getMonth()</code>, <code>getDate()</code>, <code>getTime()</code>, etc. Months are 0-indexed (0 = January).</p><p>Get the year from a date string "2024-03-15": 2024</p>',
    },
    input: "2024-03-15",
    expected: 2024,
    before: 'const dateStr = arr;\nconst date = new Date(dateStr);\nconst result = date.',
    after: '();',
    codeLines: 3
  },
  {
    name: 'regex basics',
    instructions: {
      'en': '<p>Use regular expressions with <code>match()</code>, <code>test()</code>, or <code>replace()</code>. Create regex with <code>/pattern/</code> or <code>new RegExp()</code>.</p><p>Extract all digits from "abc123def456": ["123", "456"]</p>',
    },
    input: "abc123def456",
    expected: ["123", "456"],
    before: 'const str = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'nested object access',
    instructions: {
      'en': '<p>Access nested object properties and transform them. Combine object methods with array methods to process complex data structures.</p><p>From [{user: {name: "Alice", scores: [10, 20]}}, {user: {name: "Bob", scores: [15, 25]}}], get all names: ["Alice", "Bob"]</p>',
    },
    input: [{user: {name: "Alice", scores: [10, 20]}}, {user: {name: "Bob", scores: [15, 25]}}],
    expected: ["Alice", "Bob"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'computed properties',
    instructions: {
      'en': '<p>Use computed property names in objects with square brackets <code>[key]</code>. This allows you to use variables or expressions as property names.</p><p>Create an object with a dynamic key: {dynamicKey: "value"}</p>',
    },
    input: "dynamicKey",
    expected: {dynamicKey: "value"},
    before: 'const key = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'array methods with objects',
    instructions: {
      'en': '<p>Combine array methods with Object methods. Use <code>Object.entries()</code> to convert an object to an array, process it, then convert back with <code>Object.fromEntries()</code>.</p><p>Double all values in {a: 1, b: 2, c: 3}: {a: 2, b: 4, c: 6}</p>',
    },
    input: {a: 1, b: 2, c: 3},
    expected: {a: 2, b: 4, c: 6},
    before: 'const obj = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'string manipulation advanced',
    instructions: {
      'en': '<p>Combine multiple string methods. Use <code>split()</code>, <code>map()</code>, <code>join()</code>, and other string methods together to transform text.</p><p>Capitalize the first letter of each word in "hello world": "Hello World"</p>',
    },
    input: "hello world",
    expected: "Hello World",
    before: 'const str = arr;\nconst result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'filter and transform objects',
    instructions: {
      'en': '<p>Filter an array of objects and transform the results. Combine <code>filter()</code> and <code>map()</code> to process complex data.</p><p>From [{name: "Alice", age: 25}, {name: "Bob", age: 17}, {name: "Charlie", age: 30}], get names of people 18 or older: ["Alice", "Charlie"]</p>',
    },
    input: [{name: "Alice", age: 25}, {name: "Bob", age: 17}, {name: "Charlie", age: 30}],
    expected: ["Alice", "Charlie"],
    before: 'const result = ',
    after: ';',
    codeLines: 3
  },
  {
    name: 'reduce with objects',
    instructions: {
      'en': '<p>Use <code>reduce()</code> to transform an array into an object. This is useful for creating lookup tables or grouping data.</p><p>From [["a", 1], ["b", 2], ["c", 3]], create an object: {a: 1, b: 2, c: 3}</p>',
    },
    input: [["a", 1], ["b", 2], ["c", 3]],
    expected: {a: 1, b: 2, c: 3},
    before: 'const result = ',
    after: ';',
    codeLines: 3
  }
];

var levelWin = {
  name: 'win',
  instructions: {
    'en': '<p>Congratulations! You\'ve completed all the TypeScript (TS) Practice challenges! 🎉</p><p>You\'ve learned how to use <code>map</code>, <code>filter</code>, <code>reduce</code>, <code>find</code>, <code>some</code>, <code>every</code>, <code>includes</code>, <code>sort</code>, <code>reverse</code>, <code>slice</code>, <code>concat</code>, <code>join</code>, <code>indexOf</code>, <code>flat</code>, and <code>flatMap</code> to solve common coding problems.</p><p>Keep practicing to master these essential array methods!</p>',
  }
};
