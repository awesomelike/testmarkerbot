import { ASK_ANSWER, ASK_ANSWER_KEY } from '../state/types';
import models from '../../models';
import sendIsPublic from '../messages/isPublic';
import { individualResult } from '../messages/result';
import checkAnswer, { parseAnswer } from '../utils/answer';
import testMessage from '../messages/test';
import testKeyboard from '../keyboards/test';

export default async (ctx) => {
  const { text } = ctx.message;
  switch (ctx.session.state) {
    case ASK_ANSWER_KEY:
      ctx.session.test.answerKey = text.toUpperCase();
      sendIsPublic(ctx);
      break;
    case ASK_ANSWER:
      try {
        if (parseAnswer(text) === {}) return ctx.reply('Noto\'g\'ri format kiritildi!');
        const { testId, answer } = parseAnswer(text);
        const test = await models.Test.findByPk(testId);

        if (!test) return ctx.reply('Bunday test mavjud emas! ❌');
        if (!test.status) return ctx.reply('Bu testga javob yuborish muddati tugagan! ⏲');
        if ((await test.getResponses({ where: { fromId: ctx.chat.id, testId } })).length) return ctx.replyWithMarkdown('Bitta testga faqat *bir marta* javob yuborish mumkin! ❌');
        if (test.answerKey.length !== answer.length) return ctx.reply('Javoblar soni savollar soniga teng emas');

        const { correctAnswers, wrongAnswers } = checkAnswer(test.answerKey, answer);

        await models.Response.create({
          testId: test.id,
          fromId: ctx.chat.id,
          fromName: ctx.chat.first_name,
          answer,
          score: correctAnswers,
        });

        ctx.replyWithMarkdown(
          individualResult(test.id, ctx.chat.first_name, correctAnswers, wrongAnswers),
        );
        const responsesCount = await test.countResponses();
        ctx.telegram.editMessageText(
          test.userId,
          test.messageId,
          undefined,
          testMessage(
            test.id,
            test.answerKey.length,
            test.createdAt,
            responsesCount,
          ), {
            ...testKeyboard(test.id),
            parse_mode: 'Markdown',
          },
        );
      } catch (error) {
        console.log(error);
      }
      break;
    default:
      break;
  }
};
