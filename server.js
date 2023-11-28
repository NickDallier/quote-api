const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT);

const quotesRouter = express.Router();
app.use('/api/quotes', quotesRouter);

quotesRouter.get('/random', (req, res, next) => {
  const randomElement = getRandomElement(quotes);
  res.send({ quote: randomElement });
});

quotesRouter.get('/', (req, res, next) => {
  const quoteName = req.query.person;
  if (quoteName) {
    const quotesByName = quotes.filter((quote) => quote.person === quoteName);
    res.send({ quotes: quotesByName})
  } else {
    res.send({quotes});
  }
});

quotesRouter.post('/', (req, res, next) => {
  const quote = req.query.quote;
  const person = req.query.person;

  if (quote && person) {
    const newQuote = { quote, person };
    quotes.push(newQuote);
    res.send({ quote: newQuote });
  } else {
    res.status(400).send();
  }
});