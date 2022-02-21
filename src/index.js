const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.json({ message: "Hello! I'm deployed via Terraform AWS Code Pipeline" });
});

app.listen(port, () => {
  console.log(`ExpressJS application listening on port ${port}`);
});
