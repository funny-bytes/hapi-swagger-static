const util = require('util');
const md2html = util.promisify(require('brucedown'));

/* eslint-disable no-param-reassign */

module.exports = async (api) => {
  if (api.swagger !== '2.0') {
    throw new Error(`unsupported swagger version: ${api.swagger}`);
  }
  if (api.info.description) {
    api.info.description = await md2html(api.info.description);
  }
  return api;
};
