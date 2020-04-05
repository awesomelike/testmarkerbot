import message from './message';
import callbackQuery from './callbackQuery';

export default (bot) => {
  bot.on('message', (ctx) => message(ctx));
  bot.on('callback_query', (ctx) => callbackQuery(ctx));
};
