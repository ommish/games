export default {
  reloadSecs: 300,
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'colored',
      },
    },
  },
  categories: {
    default: {
      appenders: ['out'],
      level: process.env.LOG_LEVEL,
    },
    app: {
      appenders: ['out'],
      level: process.env.LOG_LEVEL,
    },
    request: {
      appenders: ['out'],
      level: process.env.LOG_LEVEL,
    },
    controller: {
      appenders: ['out'],
      level: process.env.LOG_LEVEL,
    },
    service: {
      appenders: ['out'],
      level: process.env.LOG_LEVEL,
    },
  },
};
