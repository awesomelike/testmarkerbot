import moment from 'moment';

export default (testId, questionCount, createdTime, responseCount) => `
*Test boshlandi!* 🏁

*Test kodi:* ${testId}
*Savollar soni:* ${questionCount}
*Vaqt:* ${moment(createdTime).format('DD/MM/YYYY HH:mm')}
*Qabul qilingan javoblar soni:* ${responseCount}
`;
