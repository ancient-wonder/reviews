const pgp = require('pg-promise')();

const db = pgp({
    database: 'postgres',
    port: 5432,
})

let time;
let end; 

let query = () => {
    time = new Date().getTime();
    db.any('SELECT * FROM list WHERE id = 9999599')
    .then((data) => {
        end = new Date().getTime();
        console.log(data);
        console.log(`${time - end} ms`);
    })
    .then(() => {
        pgp.end();
    })
    .catch((err) => {
        console.log(err);
    })
}



query();