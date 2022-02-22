const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.json({ message: "Hello! I'm deployed via Terraform AWS Code Pipeline" });
});

app.listen(port, () => {
  console.log(`ExpressJS application listening on port ${port}`);
});

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    port : 5432,
    user : process.env.DB_USERNAME,
    password : process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    searchPath: ['public']
  },
});

knex.select().table('task').then(tasks => {
  console.log(tasks);
}).catch(err => {
  console.log(err);
});
