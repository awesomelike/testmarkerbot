import moment from 'moment';

const individualResult = (testId, name, correctAnswers, wrongAnswers) => `
*F.I.Sh:* ${name}
*Test kodi:* ${testId}
*To'g'ri javoblar soni:* ${correctAnswers} ✅
*Noto'g'ri javoblar soni:* ${wrongAnswers} ❌
*Vaqt:* ${moment().format('DD/MM/YYYY HH:mm')}
`;
const totalResults = '';
export { totalResults as default, individualResult };
