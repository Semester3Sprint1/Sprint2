// found a better way to do this keep for reference or we can delete

function asyncMiddleware(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
}

module.exports = asyncMiddleware;
