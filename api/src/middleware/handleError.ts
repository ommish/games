import { boomify } from '@hapi/boom';
import { getLogger } from '../util/logger';

const log = getLogger('app.handleError');

export default (err, req, res, next) => {
  log.error('Handling error: %s', JSON.stringify(err.stack));
  if (!err.isBoom) {
    boomify(err);
  }
  res.status(err.output.statusCode).send(err.message);
};
