import moment from 'moment';
import PdfPrinter from 'pdfmake';
import fs from 'fs';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};

const printer = new PdfPrinter(fonts);
const formatTime = (time) => moment(time).format('DD/MM/YYYY HH:mm');

export default (id, createdAt, finishedAt, responses) => {
  const docDefinition = {
    pageSize: 'A4',
    content: [
      { text: 'Test hisoboti', style: 'header' },
      { text: `Test kodi: ${id}`, style: 'subheader' },
      { text: `Boshlangan vaqt: ${formatTime(createdAt)}. Tugagan vaqt: ${formatTime(finishedAt)}`, style: 'subheader' },
      {
        style: 'tableExample',
        table: {
          body: [
            [
              { text: 'Reyting', style: 'tableHeader' },
              { text: 'F.I.Sh.', style: 'tableHeader' },
              { text: 'Ball', style: 'tableHeader' },
              { text: 'Vaqt', style: 'tableHeader' },
              { text: 'Javoblar', style: 'tableHeader' },
            ],
            // [{ text: '1', alignment: 'center' }, 'Another one here', 'OK?', '13845792457254'],
            // [...responses.map(({ fromName, score, createdAt }, i) => [
            //   { text: i + 1, alignment: 'center' },
            //   fromName,
            //   score,
            //   formatTime(createdAt)])],
          ],
        },
      },

    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 5],
        alignment: 'center',
      },
      subheader: {
        fontSize: 12,
        bold: false,
        margin: [0, 0, 0, 5],
        alignment: 'center',
      },
      tableExample: {
        margin: [0, 15, 0, 15],
      },
      tableHeader: {
        bold: true,
        fontSize: 13,
        color: 'black',
        alignment: 'center',
      },
    },
    defaultStyle: {
      font: 'Roboto',
    },
  };
  responses.forEach(({
    fromName, score, createdAt, answer,
  }, i) => {
    let sentAnswer = [];
    for (let j = 0; j < answer.length; j += 1) {
      sentAnswer += `${j + 1}.${answer[j].toUpperCase()} `;
    }
    docDefinition.content[3].table.body.push([
      { text: i + 1, alignment: 'center' },
      fromName,
      score,
      formatTime(createdAt),
      sentAnswer,
    ]);
  });
  const pdf = printer.createPdfKitDocument(docDefinition);
  const fileName = `Hisobot_${id}.pdf`;
  pdf.pipe(fs.createWriteStream(fileName));
  pdf.end();
  return fileName;
};
