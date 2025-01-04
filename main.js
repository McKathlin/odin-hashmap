import HashMap from "./hashmap.js";
import HashSet from "./hashset.js";

let test = new HashMap();

// Populate
test.set('apple', 'red');
test.set('banana', 'yellow');
test.set('carrot', 'orange');
test.set('dog', 'brown');
test.set('elephant', 'gray');
test.set('frog', 'green');
test.set('grape', 'purple');
test.set('hat', 'black');
test.set('ice cream', 'white');
test.set('jacket', 'blue');
test.set('kite', 'pink');
test.set('lion', 'golden');

// Change values of existing keys
test.set('apple', 'green');
test.set('jacket', 'purple');
test.set('hat', 'white');

// One more key
test.set('moon', 'silver');

// Change values of existing keys
test.set('dog', 'black');
test.set('grape', 'red');
test.set('kite', 'yellow');

console.log(test);

// Test has
console.log(test.has('jacket'));
console.log(test.has('toad'));

// Test get
console.log(test.get('jacket'));
console.log(test.get('hat'));

// Test remove
console.log(test.remove('cake'));
console.log(test.remove('ice cream'));

// Test length
console.log(test.length());

// Test keys, values, entries, forEach
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
let numGreenThings = 0;
test.forEach((key, value) => {
  if (value == 'green') {
    numGreenThings += 1;
  }
});
console.log(`This HashMap has ${numGreenThings} green thing(s).`);

// Test map function
console.log(test.map((key, value) => `The ${key} is ${value}.`));

// Test clear
test.clear();
console.log(test.length());
test.set('dragon', 'green');
test.set('unicorn', 'silver');
console.log(test.length());

// Test keys, values, entries, forEach
console.log(test.keys());
console.log(test.values());
console.log(test.entries());
test.forEach((key, value) => {
  console.log(`The ${key} is ${value}.`);
})

// Test Hashset
let mySet = new HashSet();
mySet.add('foo');
mySet.add('bar');
mySet.add('baz');
mySet.add('bar');
console.log(mySet.has('foo'));
console.log(mySet.has('bin'));
console.log(mySet.entries());
console.log(mySet.length());