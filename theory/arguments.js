//* process.argv is an array
//? if no arguments are passed to node,
//? then the array will only have 2 elements:
//* 1. The path of the node environment
//?   e.g. '/usr/local/bin/node'
//* 2. The path of the file that is currently running
//?   e.g. '/home/sharif/node-cli-course/theory/arguments.js
// console.log(process.argv);

//* Output when running 'node arguments.js':
// [
//   '/usr/local/bin/node',
//   '/home/sharif/node-cli-course/theory/arguments.js'
// ]

//* Output when running 'node arguments.js --flag input':
// [
//   '/usr/local/bin/node',
//   '/home/sharif/node-cli-course/theory/arguments.js',
//   '--flag',
//   'input'
// ]

//* Since we don't necessarily care about
//*   the first two elements of the array,
//? We can slice the array to only get the flags and input
const args = process.argv.slice(2);
