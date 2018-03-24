require('newrelic');
const express = require('express');
var redis = require("redis");
const bodyParser = require('body-parser');
const db = require('../database/models/mongoquerytest.js');
const path = require('path');
const cors = require('cors');

let app = express();
client = redis.createClient(6379);
let port = 3004;
const filePath = path.join(__dirname, '../client/dist');

const cache = (request, response, next) => {
  const id = request.params.id;
  client.get(id, (err, data) => {
    if (error) {
      throw error;
    }
    if (data !== null) {
      const result = JSON.parse(data);
      response.send(result);
    } else {
      next();
    }
  })
}

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(filePath));
app.use('/reviews/:id', express.static(filePath));


app.get('/reviews/:id/reviews', (req, res) => {
  const { id } = req.params;
  db
    .query(id)
    .then(results => {
      client.setex(id, 5000, JSON.stringify(results));
      res.status(202).send(results);
    })
    .catch(e => console.log(`failed to retrieve from mongo ==> ${e}`));
});

// app.get('/reviews', (req, res) => {
//   db
//     .findAllReviews()
//     .then(results => {
//       res.status(202).send(results);
//     })
//     .catch(e => console.log(`failed to retrieve from mongo ==> ${e}`));
// });

app.listen(port, () => console.log(`listening on port ${port}`));
