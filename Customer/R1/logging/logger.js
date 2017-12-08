/*
This library helps in formatting the error messages based on severity
*/
var logIdPattern = /^REQ(.*)/;
var logconfig = require('./logconfig');

var logger = {
  log: function(message, options) {
    if(config.loggingOptions.logLevel === 'debug'){
      logconfig.log('debug', message, options);
    }
  },
  debug: function(message, options) {
    if(config.loggingOptions.logLevel === 'debug'){
      logconfig.log('debug', message, options);
    }
  },
  info: function(message, options) {
    if(config.loggingOptions.logLevel === 'info' || config.loggingOptions.logLevel === 'debug'){
      logconfig.log('info', message, options);
    }
  },
  warn: function(message, options) {
    if(config.loggingOptions.logLevel === 'warn' || config.loggingOptions.logLevel === 'info' || config.loggingOptions.logLevel === 'debug'){
      logconfig.log('warn', message, options);
    }
  },
  error: function(message, options) {
    logconfig.log('error', message, options);
  }
};

module.exports = logger;
