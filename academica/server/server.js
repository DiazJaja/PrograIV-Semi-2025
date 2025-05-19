const express = require('express'),
    app = express(),
    port = 3000,
    {MongoClient} = require('mongodb'),
    url = 'mongodb://localhost:27017',
    client = new MongoClient(url),
    dbName = 'db_amigos';

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.post('/api/amigos', async (req, res) => {
    let amigo = req.body, 
        db = await conectarMongoDb(),
        collection = db.collection('amigos');
    collection.insertOne(amigo);
    res.send({msg:'ok'});
});
app.get('/api/amigos', async (req, res) => {
    let db = await conectarMongoDb(),
        collection = db.collection('amigos');
    let amigos = await collection.find().toArray();
    res.send(amigos);
});
app.listen(port, () => {
    console.log('Servidor corriendo en el puerto ' + port);
});
async function conectarMongoDb(){
    await client.connect();
    return client.db(dbName);
}