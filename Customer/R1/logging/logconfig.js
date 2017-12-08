/*
This file contains the configuration for all the transports this application handles via winston

For this application we are handling info, debug, error and system errors too
*/
var winston = require('winston');
var Elasticsearch = require('winston-elasticsearch');
var fs = require( 'fs' );
var logDir = config.loggingOptions.logDir;
var whiteSpcRegEx = /\s/gmi;

//creates logs folder if not exists
if ( !fs.existsSync( logDir ) ) {
    // Create the directory if it does not exist
    fs.mkdirSync( logDir );
}

//sudo yum install java-1.8.0 sudo yum remove java-1.7.0-openjdk
//bin/logstash -f logstash-simple.conf


var transports = [];
config.loggingOptions.logTransports.forEach(function(logTransport){
  if(logTransport === 'console'){
    transports.push(new winston.transports.Console({
        level:            config.loggingOptions.logLevel,
        handleExceptions: true,
        json:             false,
        timestamp:        true,
        colorize:         true
    }));
  }
  if(logTransport === 'file'){
    transports.push(new winston.transports.File({
        level: config.loggingOptions.logLevel,
        filename: logDir+'app.log',
        name: 'file.'+config.loggingOptions.logLevel,
        json: true,
        maxsize: 5242880, //5MB
        maxFiles: 5,
        colorize: false
    }));
  }
  if(logTransport === 'elasticSearch'){
    transports.push(new Elasticsearch(config.loggingOptions.elasticSearchOptions))
  }
});


var logconfig = new winston.Logger({
    transports: transports,
    exitOnError: false
});

logconfig.stream = {
    write: function(message, encoding){
      // If the response is an error log it as such
      if (parseInt(message.split(whiteSpcRegEx)[3]) < 400) {
        logger.silly(message);
      } else {
        logger.error(message);
      }
    }
};


module.exports = logconfig;
