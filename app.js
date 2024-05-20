var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('db/sqlite.db', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the SQlite database.');
});

//測試能否取得所有資料
app.get('/api/quotes', (req, res) => {
    db.all('SELECT * FROM BigMacData ', (err, rows) => {
        if (err) {
            console.error(err.message);
        }
        res.json(rows);
    });
});

// 撰寫 get/api 路由，使用 SQLite 查詢某 date 的所有資料
app.get('/api', (req, res) => {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;
    const sql = 'SELECT * FROM BigMacData WHERE data_date BETWEEN ? AND ?';
    db.all(sql, [startDate, endDate], (err, rows) => {
        if (err) {
            console.error(err.message);
            return res.status(500).send('Internal Server Error');
        }
        res.json(rows);
    });
});
