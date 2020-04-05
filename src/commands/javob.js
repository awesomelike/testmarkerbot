import { ASK_ANSWER } from '../state/types';
import askAnswer from '../messages/askAnswer';

export default (ctx) => {
  ctx.session.state = ASK_ANSWER;
  ctx.replyWithMarkdown(askAnswer);
};
