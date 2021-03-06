const faker = require('faker');
const fs = require('fs');
const db = require('../index.js');
const MongoClient = require('mongodb').MongoClient;


const generateNames = () => {
  let names = [];
  for (let i = 0; i < 56; i++) {
    names.push(`${faker.name.findName()}`);
  }
  return names;
}

const generateDates = () => {
  let dates = [];
  for (let i = 0; i < 56; i++) {
    dates.push(`${faker.date.month()} ${Math.floor(
      Math.random() * (2017 - 2013 + 1)
    ) + 2013}`);
  }
  return dates;
}

const generateImages = () => {
  let images = [];
  for (let i = 0; i < 56; i++) {
   images.push(faker.image.avatar()); 
  }
  return images;
}

const generateMessages = () => {
  let messages = [];
  for (let i = 0; i < 56; i++) {
    let message = `${faker.hacker.phrase()} ${faker.hacker.phrase()} ${faker.hacker.phrase()} ${faker.hacker.phrase()}`;
    messages.push(message);
  }
  return messages;
}

const createAndWriteToFile = () => {
  let data = generateReviews();
  let filename = 'mocked_data3.js';

  fs.writeFile(filename, JSON.stringify(data), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('file saved!');
  });
};

  async function milReviews() {
    const clientConnect = await MongoClient.connect('mongodb://localhost/27017');
    const mdb = clientConnect.db('reviews');
    const collection = mdb.collection('guests');
    var guests = [];
    for (var i = 0; i <= 10000000; i++) {
      if (i !== 0 && i % 100000 === 0) {
        await collection.insertMany(guests);
        console.log(`100000! count ${i/100000}`); 
        guests = [];     
      }
      let product = {
        product_id: i,
        reviews: {
          guest_name: faker.name.findName(),
          communication: faker.random.number({ min: 0, max: 5 }),
          cleaniness: faker.random.number({ min: 0, max: 5 }),
          location: faker.random.number({ min: 0, max: 5 }),
          checkin: faker.random.number({ min: 0, max: 5 }),
          accuracy: faker.random.number({ min: 0, max: 5 }),
          message: faker.hacker.phrase(),
          date: faker.date.month(),
          image: faker.image.avatar(),
          value: faker.random.number({ min: 0, max: 5 })
        }
      }
      guests.push(product);
    }
    await collection.createIndex({product_id:1});
    clientConnect.close();
  }

  milReviews();

  