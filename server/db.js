const Pool = require("pg").Pool;

const pool = new Pool({
    host: "localhost",
    user: "postgres",
    password: "qwerty",
    port: 5432,
    database: "jwttutorial"
});

module.exports = pool;