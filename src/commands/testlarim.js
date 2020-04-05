import moment from 'moment';
import models from '../../models';

export default async (ctx) => {
  const tests = await models.Test.findAll({ where: { userId: ctx.chat.id, status: 0 } });
  let message = '*TESTLAR TARIXI*\n';
  tests.forEach((test, i) => {
    message += `*${i + 1}*. Kod: /${test.id}. Sana: ${moment(test.createdAt).format('DD/MM/YYYY HH:mm')}\n`;
  });
  ctx.replyWithMarkdown(message);
};
