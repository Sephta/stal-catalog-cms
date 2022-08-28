const express = require('express');
const app = express();
const PORT = 5000;
var foo = process.env.MONGO_URI
// Middlware allowing express to parse JSON provided in the request body
app.use( express.json() );

app.listen(
  PORT,
  (props) => console.log(`App alive on http://localhost:${PORT}`), // Callback
);

app.get('/', (req, res) => {
  // res.status(200).send({
  //   message: `SUCCESS! also, Hello World :)`,
  // });
  res.status(200).send(`
    <h1>Express RESTAPI Root...</h1>
  `);
});

app.get(`/home`, (req, res) => {
  
  res.status(200).send({
    ping: `pong`,
  });
});

app.post(`/home/:id`, (req, res) => {
  const { id } = req.params;
  const { ping } = req.body;

  if (!ping) res.status(418).send({
    message: 'ERROR [status:418] - need ping',
  })

  res.status(200).send({
    message: `SUCCESS [status:200] Sent ping: ${ping}`,
    id: `${id}`
  })
});
