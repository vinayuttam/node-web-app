const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({ message: 'Hello!' });
});

app.listen(port, () => {
  console.log(`ExpressJS application listening on port ${port}`);
});
