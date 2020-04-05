import models from '../../models';
import { history } from '../messages/result';

export default async (ctx) => {
  const testId = parseInt(ctx.message.text.substr(1), 10);
  const test = await models.Test.findOne({
    where: {
      id: testId,
      userId: ctx.chat.id,
    },
    include: [
      {
        model: models.Response,
        as: 'responses',
      },
    ],
  });
  if (!test) return ctx.replyWithMarkdown('Sizda bunday test *mavjud emas!*');
  ctx.replyWithMarkdown(
    history(test.id, test.createdAt, test.finishedAt, test.responses, test.answerKey),
  );
};
