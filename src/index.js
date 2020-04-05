import Telegraf from 'telegraf';
import session from 'telegraf/session';
import commands from './commands';
import listeners from './listeners';

require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.use(session());
commands(bot);
listeners(bot);

bot.launch()
  .then(() => console.log('Bot started'));
