import start from './start';
import yangitest from './yangitest';
import javob from './javob';

export default (bot) => {
  bot.command('start', start);
  bot.command('yangitest', yangitest);
  bot.command('javob', javob);
};
