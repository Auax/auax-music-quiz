/**
 * Provide default values for the Winston logger
 */

const logger = require('winston');

logger.addColors({
    debug: 'green',
    info: 'cyan',
    silly: 'magenta',
    warn: 'yellow',
    error: 'red'
});

// Change console options
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console({format: logger.format.cli(), level: 'debug', colorize: true}));

module.exports = logger;

