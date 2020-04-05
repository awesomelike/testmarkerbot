
import models from '../../models';
import { IS_PUBLIC } from '../state/types';
import testMessage from '../messages/test';
import testKeyboard from '../keyboards/test';

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
    default:
      break;
  }
};
