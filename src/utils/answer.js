const parseAnswer = (text) => {
  const regex = new RegExp(/^\d{1,}@[a-eA-E]{1,}$/);
  if (!regex.test(text)) return {};
  const [testId, answer] = text.split('@');
  return {
    testId: parseInt(testId, 10),
    answer,
  };
};

const checkAnswer = (correctAnswer, answer) => {
  const questionCount = correctAnswer.length;
  let correctAnswers = 0;
  for (let i = 0; i < questionCount; i += 1) {
    if (correctAnswer[i] === answer[i].toUpperCase()) {
      correctAnswers += 1;
    }
  }
  return {
    correctAnswers,
    wrongAnswers: questionCount - correctAnswers,
  };
};

export { checkAnswer as default, parseAnswer };
