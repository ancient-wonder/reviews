const MongoClient = require('mongodb').MongoClient;

let collection;
let time;

MongoClient.connect('mongodb://localhost/').then(async(client) => {
    const db = client.db('reviews');
    collection = db.collection('guests');
    time = new Date().getTime();
    var find = await collection.find({product_id:10}).toArray();
    end = new Date().getTime();
    console.log(find);
    console.log(`${time - end} ms`);
}) 





