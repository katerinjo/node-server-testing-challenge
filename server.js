const express = require('express');
const server = express();
const db = require('./data/consData');

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ hello: "world", recieved: req.body });
});

server.post('/consonants', (req, res) => {
  const { place, manner, voiced } = req.body;
  const validCons = {
    place: place || 'alveolar',
    manner: manner || 'stop',
    voiced: voiced == undefined ? false : voiced
  };
  db.createCons(validCons)
    .then(dbRes => {
      res.status(201).send(dbRes);
    })
    .catch(err => {
      res.status(500).send();
    });
});

server.get('/consonants', (req, res) => {
  db.all()
    .then(consonants => {
      res.status(200).json({ consonants });
    })
    .catch(err => {
      res.status(500).send();
    });
});

module.exports = server;
