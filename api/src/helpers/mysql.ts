import mysqlPool from "@database/mysql";
import {
    ResultSetHeader,
    RowDataPacket
} from "mysql2/promise"
import { encryptPassword } from "./encryption";

let connection = mysqlPool.promise()

/**
 * Create default tables and add some default data 
 */
async function initDatabase() {
    await mysqlPool.execute(`
        CREATE TABLE IF NOT EXISTS contacts(
            id serial PRIMARY KEY,
            nome VARCHAR(200) NOT NULL,
            celular VARCHAR(20) NOT NULL
        )`,
        err => console.log(err)
    )

    await mysqlPool.execute(`
        CREATE TABLE IF NOT EXISTS users(
            id serial PRIMARY KEY,
            username VARCHAR(200) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
            );`,
        async err => {
            if (err) return console.log(err)

            const hash = await encryptPassword('admin')
            await mysqlPool.execute(`
                INSERT INTO users (username, password)
                SELECT * FROM (SELECT 'Macapá' AS username, '${hash}' AS password) AS temp
                WHERE NOT EXISTS (
                    SELECT username FROM users WHERE username = 'Macapá'
                ) LIMIT 1;`,
                err => console.log(err)
            )
        }
    )
}

/**
 * Escape key with MYSQL quotes
 * @param key
 * @returns
 */
function escapeKey(key: string) {
    return '`' + key + '`'
}

/**
 * Execute MySQL command
 * @param sql
 * @param params
 * @returns
 */
export async function execute(sql: string, params: any[]) {
    const result = await connection.execute(sql, params)
    return result
}

/**
 * Execute MySQL query
 * @param sql
 * @param params
 * @returns
 */
export async function query(sql: string, params: any[]) {
    const [rows] = await execute(sql, params)
    return rows as RowDataPacket[]
}

/**
 * Insert registry on MySQL table
 * @param table
 * @param data
 */
export async function insert(table: string, data: any) {
    const keys = Object.keys(data).map(escapeKey)
    const spaces = Array(keys.length).fill('?')
    const values = Object.values(data)

    const [result] = await execute(
        `INSERT INTO ${table} (${keys.join(', ')})
         VALUES (${spaces.join(', ')})`,
        values
    )

    return result as ResultSetHeader
}

const mysqlHelpers = {
    initDatabase,
    execute,
    query,
    insert
}

export default mysqlHelpers