import id from './id';

const idRegex = new RegExp(/\/[1-9]([0-9]{1,})?/i);

export default (bot) => {
  bot.hears(idRegex, (ctx) => id(ctx));
};
