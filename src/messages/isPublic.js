import { Markup } from 'telegraf';
import { IS_PUBLIC } from '../state/types';

export default (ctx) => {
  ctx.reply('Test yakunlangandan so\'ng, test kaliti e\'lon qilinishini xohlaysizmi?', {
    reply_markup: Markup.inlineKeyboard([
      {
        text: 'Ha 👍🏻',
        callback_data: JSON.stringify({
          action: IS_PUBLIC,
          value: true,
        }),
      },
      {
        text: 'Yo\'q 👎🏻',
        callback_data: JSON.stringify({
          action: IS_PUBLIC,
          value: false,
        }),
      },
    ]),
  });
};
