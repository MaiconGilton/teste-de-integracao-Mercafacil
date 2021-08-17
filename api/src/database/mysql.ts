import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

// create the connection pool to database
const mysqlPool = mysql.createPool({
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default mysqlPool