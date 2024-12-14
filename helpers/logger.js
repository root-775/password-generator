import { createLogger, format, transports } from 'winston';

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json()
    ),
    // defaultMeta: { service: 'your-service-name' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`.
        // - Write all logs error (and below) to `error.log`.
        //
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ]
});

//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.combine(
            format.colorize(),
            format.simple()
        )
    }));
}

// ***************
// Allows for JSON logging
// ***************

// logger.log({
//     level: 'info',
//     message: 'Pass an object and this works',
//     additional: 'properties',
//     are: 'passed along'
// });

// logger.info({
//     message: 'Use a helper method if you want',
//     additional: 'properties',
//     are: 'passed along'
// });

// // ***************
// // Allows for parameter-based logging
// // ***************

// logger.log('info', 'Pass a message and this works', {
//     additional: 'properties',
//     are: 'passed along'
// });

// logger.info('Use a helper method if you want', {
//     additional: 'properties',
//     are: 'passed along'
// });




export default logger;