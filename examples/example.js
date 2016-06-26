var parseArgv = require("./../dist/index.js");

// console.log(parseArgv(process.argv.slice(2)))
var argv = parseArgv(process.argv.slice(2), {
  usage: '$ foo <input>',
  options: [
    {
      flag: 'rainbow',
      alias: 'r',
      description: 'Include a rainbow'
    },
    {
      flag: 'meow',
      alias: 'm',
      description: 'Include a Cat'
    }
  ],
  examples: [
    {
      usage: '$ foo unicorns --rainbow',
      output: '🌈 unicorns 🌈'
    }
  ]
})
