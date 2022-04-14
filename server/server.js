const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 8080

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//connect database
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'thwntnMusic'
})

conn.connect((err) => {
    if (err) throw err; else {
        console.log('Connected');
    }
})

//lắng nghe kết nối từ client
app.get('/popular', function(req, res){
    conn.query('SELECT * FROM (SELECT music.musicID, music.musicName, music.musicFile, music.imageID, music.musicSingerName FROM popular INNER JOIN music ON popular.musicID = music.musicID) as info INNER JOIN image ON info.imageID = image.imageID', function(err, result, field) {
        res.send(result)
    })
})


//khởi động server
app.listen(port, function(){console.log("Your app running on port " + port);})