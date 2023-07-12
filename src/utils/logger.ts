import pino from 'pino';
import config from 'config';

const level = config.get<string>('logLevel');

const log = pino({
    transport: {
        target: 'pino-pretty',
    },
    level,
    base: {
        pid: false,
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"`,
});

export default log;
