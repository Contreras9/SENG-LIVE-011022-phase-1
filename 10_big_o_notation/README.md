# Big O & Asymptotic Notation

## Learning Goals

- Understand asymptotic notation and its varied applications for calculating program runtime

- Big-Θ (Theta) Notation
  - Used to describe an algorithm with a predictable runtime (always performs the same number of operations given an input of size N)
- Big Ω (Omega) Notation
  - Used to describe the best case runtime for an algorithm that will perform differently depending on the input given.
- Big-O Notation
  - Used to describe the worst case runtime for an algorithm that will perform differently depending on the input given.

<details>
  <summary>
    When is this used?
  </summary>
  <hr/>

  - Big O notation will sometimes be discussed in technical interviews. Depending on the role and the company.
  - It is used to describe the efficiency of an algorithm. This is most relevant when dealing with large data sets where differences in efficiency can make a significant difference in terms of the time and space (memory) consumed by the algorithm when it runs.
  - When writing code for a web application, the most relevant application of Big O notation will be applied when crafting SQL queries on the database. We generally won't be working with extremely large datasets with JS in the browser, but interacting with large databases is much more common. Understanding the time (and space!) cost of the SQL queries you write can be important depending on the role you take as a developer.

  <hr/>

</details>
<br/>



<details>
  <summary>
    What do I need to know for now?
  </summary>
  <hr/>

  - We can use Big O notation to discuss Time and Space Complexity.
    - Time Complexity describes how many operations the computer will have to perform to run our code (as a function of input size)
    - Space Complexity describes how much memory the computer will have to use to run our code (as a function of input size)

  <hr/>

</details>
<br/>



<details>
  <summary>
    What does N represent?
  </summary>
  <hr/>

  - N is a variable representing the size of the input.

  <hr/>

</details>
<br/>


<details>
  <summary>
    What does Asymptotic mean?
  </summary>
  <hr/>

- Asymptotic is an adjective form of the word asymptote
- An asymptote is a straight line associated with a curve such that as a point moves along an infinite branch of the curve the distance from the point to the line approaches zero and the slope of the curve at the point approaches the slope of the line
![Asymptote illustration](https://res.cloudinary.com/dnocv6uwb/image/upload/v1641363919/asymptot_uy4yyx.gif)
  <hr/>

</details>
<br/>

<details>
  <summary>
    Why do we ignore multiples (N vs 2N, 3N, 4N, etc.) when discussing Big O notation?
  </summary>
  <hr/>

  Asymptotic notation describes how our function will perform as our input size increases without bound. When we're dealing with extremely large input sizes, the difference between a multiple and a change in order of magnitude is extreme. To illustrate the difference, let's run this code in the console:
    
```js
function complexityDemo() {
  let arr = [];
  let results = [];
  for(let i = 1 ; i < 100 ; i++){
      arr.push(i);
      results.push({
          arraySize: i,
          logN: Math.log2(i),
          linear: i,
          nLogN: i * Math.log2(i),
          "n^2": i*i,
          "2^n": 2**i
      })
  }
  console.table(results);
}
complexityDemo()
```

Visually, we can see the difference on a graph as well:
                         
  <hr/>

    

</details>
<br/>

![Graph of different time complexities](https://res.cloudinary.com/dnocv6uwb/image/upload/v1641404013/1_leuidehqYrPSmoBRRjG8zA_fw7dc4.png)

## Examples of Algorithms at different levels of complexity

| Complexity | Description | Example |
|---|---|---|
| O(1) Pronounced Big O of 1 | Constant Time (Any function that doesn't require iteration through a collection) | Determining if a number is odd or even |
| O(log N) Pronounced Big O of log N | Logarithmic time. Any algorithm that repeatedly splits a collection in half. |  Finding a word in the dictionary (using a binary search). This splits a sorted collection of words in half repeatedly until it finds the right word.|
| O(N) Pronounced Big O of N | Linear time. Any algorithm that may iterate through the entire collection of N elements. | Calculating the total price of all elements in a shopping cart. |
| O(N log N) Pronounced Big O of N log N | Linearithmic time. An algorithm that implements a combination of linear (iteration) and logarithmic (dividing the collection in half) patterns. | The most efficient sorting algorithms have a time complexity of O(N log N) |
| O(N^2) Pronounced Big O of N squared | Quadratic time. Any algorithm that performs nested iteration. | Bubble Sort |
| O(2^n) Pronounced Big O of 2 to the N | Exponential or Polynomial time. Frequently found in recursive algorithms where the number of recursions doubles every time the size increases by 1.  | A [recursive algorithm for calculating Fibonacci sequence](https://medium.com/analytics-vidhya/big-o-notation-time-complexity-in-javascript-f97f356de2c4#85db).  |
| O(infinity) Pronounced Big O of infinity | An algorithm that involves a conditional completion. While technically very unlikely, it is possible that the algorithm could proceed forever without completion. | tossing a coin until it lands on heads |
 

## What are the time complexities of built in JS methods?

| Method | Complexity | Explanation |
|---|---|---|
| `push()` | O(1) | The length or size of the array doesn't affect the number of operations that push has to complete |
| `pop()` | O(1) | The length or size of the array doesn't affect the number of operations that push has to complete. |
| `shift()` | O(N) | As the size of the array grows, the number of elements that we have to shift over by one index also grows (in a linear manner). |
| `unshift()` | O(N) | As the size of the array grows, the number of elements that we have to shift over by one index also grows (in a linear manner). |
| `splice()` | O(N) | After we add/remove elements we need to reindex all elements after the splice point. |
| `sort()` | Time: O(NlogN) probably Space: O(1) if sorting in place, O(N) if sorting a copy | Combination of divide and conquer (splitting the array in half - logN) and iteration (N) |
| `concat()` | Time: O(N + M) Space: O(N + M) | Concat requires creating a new array of N+M space and we need to index all elements in original arrays taking N+M time.|
| `slice()` | Time: O(N) Space: O(N) | worst case, we're creating a new array (N space) with all contents of original that we need to index (N time) |
| `indexOf()` |  Time: O(N) Space: O(1) | worst case, the element is last in the array or not in the array at all (N time), we don't need a copy of the array and we just return a single number (1 space) |
| `forEach()` | Time: O(N) Space: O(1)| We just iterate (N time), don't return a new array (1 space) |
| `map()` | Time: O(N) Space: O(N) | We iterate (N time) and return a new array of size: N (N space)|
| `filter()` | Time: O(N) Space: O(N) Ω(1) | We iterate (N time) and return a worst case of all N elements (N space) and best case no elements or a single element Ω(1) |
| `reduce()` | Time: O(N) Space: ? | If reducing to a number, space complexity would be: O(1), If we're reducing to an object, what would the worst case space complexity be? O(N) |
| `some()` | Time: O(N) |  |
| `every()` | Time: O(N) |  |



# Nested Loop Time Complexity

```js
function partialNestedLoop(arr) {
    let operations = 0;
    for(let i = 0 ; i < arr.length ; i++) {
        for(let j = i; j < arr.length ; j++) {
            operations++;
        }
    }
    return operations
}
let arr = [];
let results = [];
for(let i = 1 ; i < 100 ; i++){
    arr.push(i);
    results.push({
        arraySize: i,
        operations: partialNestedLoop(arr),
        sizeSquared: i*i,
        nLogN: i * Math.log2(i),
        fractionOfNSquared: partialNestedLoop(arr)/(i*i)
    })
}
console.table(results);

```

## Checking for Duplicates

Say we have an array input and we want to check to see if the same value appears more than once inside of the array. We could take the following approach:
```js
let arr = [1,2,3,4,5,6,7,7];

function checkForDuplicates(arr) {
	let operations = 0;
	for(let i = 0 ; i < arr.length - 1 ; i++) {
		let current = arr[i];
		for(let j = i + 1; j < arr.length ; j++) {
			operations++;
			if(current === arr[j]) {
				console.log(operations);
				return true;
			}
		}
	}
	console.log(operations);
	return false;
}

checkForDuplicates(arr);
arr.pop();
checkForDuplicates(arr);
arr.push(8);
checkForDuplicates(arr);
```

What is the time complexity of this solution?
O(N^2)
What is the space complexity of this solution?
O(1)

How could we get better (less) time complexity here at the cost of worse (more) space complexity?

- Sort the array first, then check (by iterating) if the element in the array is the same as the one after it. O(N log N)
- if we create an object to store the numbers we've seen so far (if you needed to, you could also track how many times you've seen them-for example if we needed to return the number that occurs most often in the array) our algorithm can we have O(N) time complexity and O(N) space complexity. 
  - O(N) time complexity because we can do a single iteration, storing seen values as keys in an object (which has a O(1) lookup time complexity using `[]` notation)
  - O(N) space complexity because we're storing the seen values in an object based on how many values are stored in the array. Worst case scenario, there are no duplicates in the array of N size and we add N key value pairs to our object.

```js
function checkForDuplicates(arr) {
	let operations = 0;
  let seen = {};
	for(let i = 0 ; i < arr.length ; i++) {
		let current = arr[i];
    operations++;
    if(seen[current]) {
      console.log(operations);
      return true;
    }
    seen[current] = true;
	}

	console.log(operations);
	return false;
}

checkForDuplicates(arr);
arr.pop();
checkForDuplicates(arr);
arr.push(8);
checkForDuplicates(arr);
```


## Resources

- [Different examples of Fibonacci Sequence](https://medium.com/developers-writing/fibonacci-sequence-algorithm-in-javascript-b253dc7e320e)
- [Joseph Trettevik's Series on Big O notation with examples](https://dev.to/lofiandcode/series/6012)
- [Big O notation and SQL](https://www.kdnuggets.com/2017/08/write-better-sql-queries-definitive-guide-part-2.html/2)
- [Big O Notation - Time complexity in JS](https://medium.com/analytics-vidhya/big-o-notation-time-complexity-in-javascript-f97f356de2c4)
- [Time Complexity of Built in JS Array methods](https://dev.to/lukocastillo/time-complexity-big-0-for-javascript-array-methods-and-examples-mlg)