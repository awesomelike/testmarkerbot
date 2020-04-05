import { FINISH_TEST } from '../state/types';

export default (testId) => ({
  reply_markup: {
    inline_keyboard: [
      [
        {
          text: 'Testni yakunlash',
          callback_data: JSON.stringify({
            action: FINISH_TEST,
            id: testId,
          }),
        },
      ],
    ],
  },
});
