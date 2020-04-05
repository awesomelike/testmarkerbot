import start from './start';
import yangitest from './yangitest';
import javob from './javob';
import testlarim from './testlarim';

export default (bot) => {
  bot.command('start', start);
  bot.command('yangitest', yangitest);
  bot.command('javob', javob);
  bot.command('testlarim', testlarim);
};
