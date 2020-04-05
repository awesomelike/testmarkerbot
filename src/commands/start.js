import startMessage from '../messages/start';

export default (ctx) => {
  ctx.session = {};
  ctx.session.state = {};
  ctx.session.name = ctx.message.from.first_name;
  ctx.replyWithMarkdown(startMessage());
};
