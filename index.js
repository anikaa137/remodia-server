const express = require('express')
const app = express()
const cors = require("cors");
// const bodyParser = require("body-parser")
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()
const port = process.env.PORT || 5000;
// console.log(process.env.DB_USER,process.env.DB_PASS,process.env.DB_NAME)

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Remodia!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mivuu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
// console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log("any err ??",err)
  const serviceCollection = client.db("remodia").collection("service");
   console.log("database connected successfully")

   app.post('/addService', (req, res) => {
    const newService = req.body;
    console.log('add new ser', newService)
    serviceCollection.insertOne(newService)
      .then(result => {
        console.log('inserted conunt', result.insertedCount)
        res.send(result.insertedCount > 0)
      })
  })

  app.get('/service', (req, res) => {
    serviceCollection.find({})
    .toArray((err, items) => {
      res.send(items)
    })
  })





































});









































app.listen(port)