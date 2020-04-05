import yangitest from '../messages/yangitest';
import { ASK_ANSWER_KEY } from '../state/types';

export default (ctx) => {
  ctx.session.test = {};
  ctx.session.test.userId = ctx.chat.id;
  ctx.session.state = ASK_ANSWER_KEY;
  ctx.reply(yangitest);
};
