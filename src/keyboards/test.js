export default (testId) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Testni yakunlash',
          callback_data: JSON.stringify({
            action: 'finish',
            id: testId,
          }),
        },
      ],
    ],
  },
});
