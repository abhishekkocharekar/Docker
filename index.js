const express = require('express');
const app = express();
const path = require('path');
const mongoCollections = require('./config/mongoCollections');
const users = mongoCollections.users;
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.use('/get-profile', async (req, res) => {
    let response = {}
    let query = { userid: 1 }
    userCollection = await users();
    response = await userCollection.findOne(query)
    res.send(response ? response : {});
});

app.use('/update-profile', async (req, res) => {
    let user = req.body
    let query = { userid: 1 }
    user['userid'] = 1
    let newValues = { $set: user }
    userCollection = await users();
    response = await userCollection.updateOne(query, newValues, {upsert: true})
    res.send(user);
});

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});