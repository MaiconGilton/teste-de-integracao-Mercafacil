import { Pool } from 'pg';
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const postgresPool = new Pool({
    user: process.env.DB_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PWD,
    port: parseInt(process.env.POSTGRES_PORT)
})

export default postgresPool