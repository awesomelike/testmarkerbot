import Telegraf from 'telegraf';
import session from 'telegraf/session';
import commands from './commands';
import listeners from './listeners';
import hears from './hears';

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
hears(bot);
commands(bot);
listeners(bot);

bot.launch()
  .then(() => console.log('Bot started'));
