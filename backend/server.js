const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config()

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

const dbName = 'NEXLOCK';
const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(cors()); 

client.connect();


//get all the password
app.get('/', async (req, res) => {
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
})

//save a password
app.post('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const insertResult = await collection.insertOne(password);
    res.json({ message: 'Password saved successfully', id: insertResult.insertedId });
})

//update a password
app.put('/', async (req, res) => {
    const { id, ...updateData } = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const updateResult = await collection.updateOne(
        { id: id },
        { $set: updateData }
    );
    res.json({ message: 'Password updated successfully', modifiedCount: updateResult.modifiedCount });
})

//delete a password
app.delete('/', async (req, res) => {
    const password = req.body;
    const db = client.db(dbName);
    const collection = db.collection('passwords');
    const deleteResult = await collection.deleteOne(password);
    res.json({ message: 'Password deleted successfully', id: deleteResult.deletedCount });
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})