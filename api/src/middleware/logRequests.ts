import log4js from '../util/logger';

export default () =>
  log4js.connectLogger(log4js.getLogger('request'), {
    level: 'info',
    format: (req, res, format) =>
      format(`:remote-addr :method :url`),
  });
