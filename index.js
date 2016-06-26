function parseArgv(args, helpObj) {
  var argObj = {};
  helpObj = helpObj || {};

  var i = 0;

  while (i < args.length) {
    var arg = args[i]
    var nextArg = args[i+1]
    if (areOpts(args[i])) {
      opts = args[i].split("").slice(1)
      opts.forEach(function(opt){
        argObj[opt] = true
      })
    } else if (isOptWithCount(arg)) {
      argObj[arg.charAt(1)] = Number(arg.slice(2));
    } else if (isOpt(arg)) {
      if (!Number.isNaN(Number(nextArg))) {
        argObj[arg.charAt(1)] = Number(nextArg);
        i++
      } else if (nextArg && !isOptionOrFlag(nextArg)){
        argObj[arg.charAt(1)] = nextArg;
        i++
      } else {
        argObj[arg.charAt(1)] = true;
      }
    } else if (isFlag(args[i])) {
      var flagKey = arg.split("=")[0].substr(2);
      var flagVal = arg.split("=")[1];
      argObj[flagKey] = flagVal;
    } else {
      if (!argObj["_"]) argObj["_"] = [];
      argObj["_"].push(arg)
    }
    i++;
  }


  function printHelp(){
    var optionsString = '';
    helpObj.options.forEach(function(option){
      optionsString += `-${option.alias}, --${option.flag}  ${option.description}\n`
    })
    var examplesString = '';
    helpObj.examples.forEach(function(example){
      examplesString += `${example.usage}\n${example.output}\n`;
    })
    var str = `
Usage
${helpObj.usage}

Options
${optionsString}

Examples
${examplesString}
`
    process.stdout.write(str)
  }

  if ((Object.keys(argObj).indexOf('help') !== -1) || (Object.keys(argObj).indexOf('h') !== -1)){
    printHelp();
    process.exit();
  }

  var possibleOptions = []
  helpObj.options.forEach(function(option) {
    possibleOptions.push(option.flag)
    possibleOptions.push(option.alias)
  });
  Object.keys(argObj).forEach(function(key){
    if (possibleOptions.indexOf(key) === -1) {
      if (key !== '_') {
        console.log(`'${key}' is not a valid an option`)
        process.exit()
      }
    }
  })
  return argObj;
}


function isOptionOrFlag(str) {
  return isOptWithCount(str) || areOpts(str) || isOpt(str) || isFlag(str)
}

function isOptWithCount(str) {
  if (!str) return false;
  return str[0] === "-" && str[1] !== "-" && str[1] && str[2] && !Number.isNaN(Number(str[2]));
}

function areOpts(str) {
  if (!str) return false;
  return str[0] === "-" && str[1] !== "-" && str[1] && str[2] && Number.isNaN(Number(str[2]));
}

function isOpt(str) {
  if (!str) return false;
  return str[0] === "-" && str[1] !== "-" && !str[2];
}


function isFlag(str) {
  if (!str) return false;
  return str[0] === "-" && str[1] === "-"
}

module.exports = parseArgv;
