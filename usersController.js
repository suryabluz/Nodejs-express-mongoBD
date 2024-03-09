const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const dbUrl =
  'mongodb+srv://suryabluz007:PassMongoAtlas@clustersurya.eep3ssy.mongodb.net/?retryWrites=true&w=majority&appName=clusterSurya';

var db;
var collection;
MongoClient.connect(dbUrl).then((client) => {
  db = client.db('userdb');
  collection = db.collection(collectionName);
  console.log('DB connected');
});
const collectionName = 'userlist';
router.get('/', (request, response) => {
  response.send('GET Request Called');
});
router.get('/users', (request, response) => {
  collection
    .find({})
    .toArray()
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});
router.get('/users/:id', (request, response) => {
  collection
    .findOne({ _id: new mongodb.ObjectId(request.params.id) })
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

router.post('/users', (request, response) => {
  collection
    .insertOne(request.body)
    .then((res) => {
      response.send(res);
    })
    .catch((error) => {
      response.send(error);
    });
});

router.put('/users/:id', (request, response) => {
  collection
    .updateOne(
      { _id: new mongodb.ObjectId(request.params.id) },
      {
        $set: {
          name: request.body.name,
          dob: request.body.dob,
          email: request.body.email,
          phone: request.body.phone,
          gender: request.body.gender,
        },
      }
    )
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});

router.delete('/users/:id', (request, response) => {
  collection
    .deleteOne({ _id: new mongodb.ObjectId(request.params.id) })
    .then((res) => {
      response.send(res);
    })
    .catch((err) => {
      response.send(err);
    });
});
module.exports = router;
