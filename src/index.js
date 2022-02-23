const express = require('express');
const app = express();
const port = 3000;

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


app.get('/', (req, res) => {
  res.json({ message: "Hello! I'm deployed via Terraform AWS Code Pipeline" });
});

app.get('/create-table', (req, res) => {
  knex.schema.hasTable('task').then(function (exists) {
    if (!exists) {
      knex.schema.createTable('task', function (table) {
        table.increments('id').primary();
        table.string('title');
        table.timestamps();
      }).then(result => {
        res.json({ message: 'Table created!' });
      }).catch(err => {
        console.log(err.message);
      })
    } else {
      res.json({ message: 'Table already exists!' });
    }
  });
});

app.get('/tasks/insert', async (req, res) => {
  const task = await knex('task').insert({ title: 'Slaughterhouse Five' });
  res.json({ task });
});

app.get('/tasks', async (req, res) => {
  const tasks = await knex.select().table('task');
  res.json({ tasks });
});

app.listen(port, () => {
  console.log(`ExpressJS application listening on port ${port}`);
});



