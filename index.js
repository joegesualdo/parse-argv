function parseArgv(args) {
  var argObj = {};

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
