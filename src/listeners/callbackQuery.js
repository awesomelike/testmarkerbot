import fs from 'fs';
import models from '../../models';
import { IS_PUBLIC, FINISH_TEST } from '../state/types';
import testMessage from '../messages/test';
import totalResults from '../messages/result';
import testKeyboard from '../keyboards/test';
import getPdf from '../utils/pdf';

export default async (ctx) => {
  const data = JSON.parse(ctx.callbackQuery.data);
  switch (data.action) {
    case IS_PUBLIC: {
      ctx.session.test.isPublic = data.value;
      await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);

      const test = await models.Test.create({
        ...ctx.session.test,
        status: 1,
      });
      const { message_id } = await ctx.replyWithMarkdown(
        testMessage(test.id, test.answerKey.length, test.createdAt, 0), testKeyboard(test.id),
      );
      test.update({ messageId: message_id });
      break;
    }
    case FINISH_TEST: {
      const testId = parseInt(data.id, 10);
      const test = await models.Test.findByPk(testId, {
        include: [
          {
            model: models.Response,
            as: 'responses',
          },
        ],
      });
      await test.update({ status: 0, finishedAt: (new Date()).getTime() });
      try {
        await ctx.telegram.deleteMessage(ctx.chat.id, ctx.callbackQuery.message.message_id);
      } catch (error) {
        return ctx.replyWithMarkdown('Test muddati *48 soatdan* o\'tib ketgan!');
      }
      const sortedResponses = test.responses.sort((a, b) => (a.score < b.score ? 1 : -1));
      const totalResultsMessage = totalResults(
        test.id,
        test.createdAt,
        test.finishedAt,
        sortedResponses,
        test.isPublic,
        test.answerKey,
      );
      const tasks = [
        ctx.replyWithMarkdown(totalResultsMessage),
      ];
      test.responses.forEach((response) => {
        if (response.fromId !== ctx.chat.id) {
          tasks.push(
            ctx.telegram.sendMessage(response.fromId, totalResultsMessage, { parse_mode: 'Markdown' }),
          );
        }
      });
      const pdf = getPdf(test.id, test.createdAt, test.finishedAt, sortedResponses);
      await ctx.replyWithDocument({ source: fs.createReadStream(pdf), filename: pdf }, { caption: 'Test hisoboti PDF formatda' });
      fs.unlinkSync(pdf);
      Promise.all(tasks)
        .then(() => console.log('Successfully sent to all!'))
        .catch((error) => console.error(error));
      break;
    }
    default:
      break;
  }
};
