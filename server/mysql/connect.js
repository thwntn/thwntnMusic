const mysql = require('mysql')
const { createConnection } = require('net')

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'thwntnMusic'
})

conn.connect(function(err) {
    if(err) console.log('error');
    else console.log('Connect!');
})

let data = {}

const getMusic = new Promise(function(resolve) {
    resolve(conn.query('SELECT * FROM music', (err, result, field)  => {
        if(err) throw err; else {
            data = result;
            console.log(typeof result);
        }
    }))
})

getMusic.then((data))