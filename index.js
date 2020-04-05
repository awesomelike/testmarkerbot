import express from 'express';
import './src/index';

const app = express();

app.all('/', (req, res) => {
  res.sendStatus(200);
});

app.listen(process.env.PORT || 3000, () => console.log('Web server has started'));
