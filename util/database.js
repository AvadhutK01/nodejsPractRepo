const mysql = require('mysql2');

const pool = mysql.createPool({
    host: "localost",
    user: 'root',
    database: 'node-db',
    password: "root123"
});

module.exports = pool.promise();