// eslint-disable no-useless-escape
export default (string) => string
  .replace(/[\*]/g, '\\*')
  .replace(/[_]/g, '\\_')
  .replace(/[\[]/g, '\\[')
  .replace(/[`]/g, '\\`');
