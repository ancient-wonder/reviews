const pgp = require('pg-promise')();
const faker = require('faker');

const db = pgp({
    database: 'postgres',
    port: 5432,
});

function generateData() {
    const data = [];
    for (var i = 0; i < 50000; i++) {
      const user = {};
      user.guest_name = faker.name.findName();
      user.communication = faker.random.number({ min: 0, max: 5 });
      user.cleaniness = faker.random.number({ min: 0, max: 5 });
      user.location = faker.random.number({ min: 0, max: 5 });
      user.checkin = faker.random.number({ min: 0, max: 5 });
      user.accuracy = faker.random.number({ min: 0, max: 5 }); 
      user.message = faker.hacker.phrase();
      user.date = faker.date.month();
      user.image = faker.image.avatar();
      user.value = faker.random.number({ min: 0, max: 5 });
      data.push(user);
    }
    return data;
}

const insertData = async function (collection, count) {
let data = new Date();
let hour = data.getHours();
let minute = data.getMinutes();
let second = data.getSeconds();

//pg helper for to set column order to your data before you insert
const cs = new pgp.helpers.ColumnSet(
  ['guest_name', 'communication', 'cleaniness', 'location', 'checkin', 'accuracy', 'message', 'date', 'image', 'value'],
  {table: 'list'},
  );  

await db.none(pgp.helpers.insert(collection, cs))
  .then(() => {
      console.log('data intserted!' + count);
  })
  .catch((err) => {
      console.log(err); 
  })
}

const createTable = () => {
    db.none('CREATE TABLE list(' + 
    'id SERIAL PRIMARY KEY,' +
    'guest_name TEXT,' +
    'communication DOUBLE PRECISION,' + 
    'cleaniness DOUBLE PRECISION,' +
    'location DOUBLE PRECISION,' + 
    'checkin DOUBLE PRECISION,' +
    'accuracy DOUBLE PRECISION,' +
    'message TEXT,' +
    'date TEXT,' +
    'image TEXT,' +
    'value DOUBLE PRECISION);')
    .then(async () => {
        console.log('table created');
        for(let i = 0; i <= 20; i++) {
            await insertData(generateData(), i);
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

createTable();



