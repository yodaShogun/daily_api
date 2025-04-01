const sql = require("mysql2/promise")
const dotenv = require("dotenv")

dotenv.config()

const sqlConnection = sql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.KEY,
    database:process.env.DATA,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
})

module.exports = sqlConnection