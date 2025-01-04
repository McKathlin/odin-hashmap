import HashMap from "./hashmap.js";

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

console.log(test);