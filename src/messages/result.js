import moment from 'moment';
import escaper from '../utils/escaper';

const individualResult = (testId, name, correctAnswers, wrongAnswers) => `
*F.I.Sh:* ${escaper(name)}
*Test kodi:* ${testId}
*To'g'ri javoblar soni:* ${correctAnswers} ✅
*Noto'g'ri javoblar soni:* ${wrongAnswers} ❌
*Vaqt:* ${moment().format('DD/MM/YYYY HH:mm')}
`;
const totalResults = (testId, createdAt, finishedAt, responses, isPublic, answerKey) => {
  let message = `
*Natijalar e'lon qilindi!* 📢

*Test kodi:* ${testId}
*Boshlangan vaqt:* ${moment(createdAt).format('DD/MM/YYYY HH:mm')}
*Tugagan vaqt:* ${moment(finishedAt).format('DD/MM/YYYY HH:mm')}
*Reyting:*  
`;
  responses.forEach((response, i) => {
    message += `${i + 1}. ${escaper(response.fromName)} ${response.score} ✅\n`;
  });
  if (isPublic) {
    message += '\nTo\'g\'ri javoblar: \n';
    for (let i = 0; i < answerKey.length; i += 1) {
      message += `*${i + 1}.*${answerKey[i]} `;
    }
    message += '\n';
  }
  message += '\nSiz ham @thetestmarkerbot ga testingizni joylashtiring!';
  return message;
};
const history = (testId, createdAt, finishedAt, responses, answerKey) => {
  let message = `
*Test kodi:* ${testId}
*Boshlangan vaqt:* ${moment(createdAt).format('DD/MM/YYYY HH:mm')}
*Tugagan vaqt:* ${moment(finishedAt).format('DD/MM/YYYY HH:mm')}
*Reyting:*  
`;
  responses.forEach((response, i) => {
    message += `${i + 1}. ${escaper(response.fromName)} ${response.score} ✅\n`;
  });
  message += '\n';
  message += 'To\'g\'ri javoblar: \n';
  for (let i = 0; i < answerKey.length; i += 1) {
    message += `*${i + 1}.*${answerKey[i]} `;
  }
  return message;
};
export { totalResults as default, individualResult, history };
