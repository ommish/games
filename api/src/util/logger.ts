import log4js from 'log4js';
import logConfig from '../log4js.config';

log4js.configure(logConfig);

export const getLogger = (category) => log4js.getLogger(category);

export default log4js;
