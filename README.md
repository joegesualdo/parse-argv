## parseArgv
> Parse and structure command line argument options.

## Install
```
$ npm install --save parse-argv
```

## Usage
```
$ node examples/example.js -a -b22 -xyz --greetings=hello --name=bob -z meow -v boom -s
```

```javascript
var parseArgv = require("parse-argv");

parseArgv(process.argv.slice(2))
/*
{ a: true,
  b: 22,
  x: true,
  y: true,
  z: 'meow',
  greetings: 'hello',
  name: 'bob',
  v: 'boom',
  s: true }
*/
```
