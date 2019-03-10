'use strict';
var require = {
  paths: {
    jquery: '../lib/jquery',
    module1: '../base/base_module1',
    underscore: "../lib/underscore",
    math: '../base/base_math',
    modernizr: '../lib/modernizr'
  },
  shim:{
    'modernizr': {
      exports: 'Modernizr'
    }
  }
};



if (typeof module === "object" && typeof module.exports === 'object') {
  module.exports = require;
}