module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	"use strict";

	function parseArgv(args, helpObj) {
	  var argObj = {};
	  helpObj = helpObj || {};

	  var i = 0;

	  while (i < args.length) {
	    var arg = args[i];
	    var nextArg = args[i + 1];
	    if (areOpts(args[i])) {
	      opts = args[i].split("").slice(1);
	      opts.forEach(function (opt) {
	        argObj[opt] = true;
	      });
	    } else if (isOptWithCount(arg)) {
	      argObj[arg.charAt(1)] = Number(arg.slice(2));
	    } else if (isOpt(arg)) {
	      if (!Number.isNaN(Number(nextArg))) {
	        argObj[arg.charAt(1)] = Number(nextArg);
	        i++;
	      } else if (nextArg && !isOptionOrFlag(nextArg)) {
	        argObj[arg.charAt(1)] = nextArg;
	        i++;
	      } else {
	        argObj[arg.charAt(1)] = true;
	      }
	    } else if (isFlag(args[i])) {
	      var flagKey = arg.split("=")[0].substr(2);
	      var flagVal = arg.split("=")[1];
	      argObj[flagKey] = flagVal;
	    } else {
	      if (!argObj["_"]) argObj["_"] = [];
	      argObj["_"].push(arg);
	    }
	    i++;
	  }

	  argObj.help = function () {
	    var optionsString = '';
	    helpObj.options.forEach(function (option) {
	      optionsString += "-" + option.alias + ", --" + option.flag + "  " + option.description + "\n";
	    });
	    var examplesString = '';
	    helpObj.examples.forEach(function (example) {
	      examplesString += example.usage + "\n" + example.output + "\n";
	    });
	    var str = "\nUsage\n" + helpObj.usage + "\n\nOptions\n" + optionsString + "\n\nExamples\n" + examplesString + "\n";
	    process.stdout.write(str);
	  };

	  if (argObj['help']) {
	    argObj.help();
	    process.exit();
	  }

	  var possibleOptions = [];
	  helpObj.options.forEach(function (option) {
	    possibleOptions.push(option.flag);
	    possibleOptions.push(option.alias);
	  });
	  Object.keys(argObj).forEach(function (key) {
	    if (possibleOptions.indexOf(key) === -1) {
	      if (key !== '_') {
	        console.log("'" + key + "' is not a valid an option");
	        process.exit();
	      }
	    }
	  });
	  return argObj;
	}

	function isOptionOrFlag(str) {
	  return isOptWithCount(str) || areOpts(str) || isOpt(str) || isFlag(str);
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
	  return str[0] === "-" && str[1] === "-";
	}

	module.exports = parseArgv;

/***/ }
/******/ ]);