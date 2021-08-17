import postgresPool from "@database/postgres";
import { encryptPassword } from "./encryption";

/**
 * Create default tables and add some default data
 */
async function initDatabase() {
    let connection = await postgresPool.connect()

    await connection.query(`
        CREATE TABLE IF NOT EXISTS contacts(
            id serial PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            celular VARCHAR(13) NOT NULL
        )`,
        err => console.log(err)
    )

    await connection.query(`
        CREATE TABLE IF NOT EXISTS users(
            id serial PRIMARY KEY,
            username VARCHAR(200) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL
            );`,
        async err => {
            if (err) return console.log(err)

            const hash = await encryptPassword('admin')
            await connection.query(`
                INSERT INTO users (username, password)
                SELECT * FROM (SELECT 'VareJão' AS username, '${hash}' AS password) AS temp
                WHERE NOT EXISTS (
                    SELECT username FROM users WHERE username = 'VareJão'
                ) LIMIT 1;`,
                err => console.log(err)
            )
        }
    )
}

const postgresHelpers = {
    initDatabase,
    connection: postgresPool.connect()
}

export default postgresHelpers