import { Response, Request } from 'express'
import { generateJwtToken, validatePassword } from 'helpers/encryption';
import mysqlHelpers from 'helpers/mysql';
import postgresHelpers from 'helpers/postgres';

async function authenticate(req: Request, res: Response) {
    try {
        const { username, password } = req.body

        let result, data

        if (username === 'Macapá') {
            result = await mysqlHelpers.query(
                'SELECT id, password FROM `users` WHERE `username` = ?',
                [username],
            )
        } else {
            let res = await (await postgresHelpers.connection).query({
                text: 'SELECT id, password FROM users WHERE username = $1',
                values: [username]
            })
            result = res.rows
        }

        const user = result[0]

        if (user) {
            const isValidPassword = await validatePassword(password, user.password)

            const token = generateJwtToken({
                id: user.id,
                database: username === 'Macapá' ? 'mysql' : 'postgres'
            })

            if (isValidPassword) data = { user: { username, token } }
            else data = { error: 'invalid_password' }

        } else {
            data = { error: 'user_not_found' }
        }

        res.send(data)

    } catch (error) {
        res.send({ error: error.message })
    }
}

export {
    authenticate,
}
