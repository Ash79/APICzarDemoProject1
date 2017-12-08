var config = {
            serverPort: process.env.PORT || 2002,
    swaggerRouterOptions: {
        swaggerUi: __dirname + '/../' + '/swagger.json',
        controllers: __dirname + '/../' + './controllers/v1',
        useStubs: process.env.NODE_ENV === 'development' ? true : false // Conditionally turn on stubs (mock mode)
    }
    ,    loggingOptions: {
        logLevel: process.env.LOG_LEVEL || 'debug',
        logTransports: ['console', 'file', 'elasticSearch'],
        logDir: process.env.LOG_LOCATION || './logs/',
        elasticSearchOptions: {
            level: process.env.LOG_LEVEL || 'debug',
            clientOpts: {
                host: process.env.ES_HOST || 'http://localhost:9200'
            }
        }
    }
    };
module.exports = config;