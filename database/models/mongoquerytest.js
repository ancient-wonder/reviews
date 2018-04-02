const MongoClient = require('mongodb').MongoClient;

let collection;
let time;

let query = async (num)  => {
var client = await MongoClient.connect('mongodb://localhost/27017');

    const db = client.db('reviews');
    collection = db.collection('guests');
    time = new Date().getTime();
    var find = await collection.find({product_id:parseInt(num)}).toArray();
    end = new Date().getTime();
    // console.log(`${time - end} ms`);
    // console.log(find);
    client.close();
    return find;
}

module.exports.query = query;





