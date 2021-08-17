import { Response, Request } from 'express'
import mysqlHelpers from 'helpers/mysql';
import postgresHelpers from 'helpers/postgres';

async function saveContact(req: Request, res: Response) {
    try {
        const { username, cellphone } = req.body

        const database = req.database
        let contact

        if (database === 'mysql') {
            contact = await mysqlHelpers.query(
                'SELECT nome FROM `contacts` WHERE `nome` = ?',
                [username]
            )

            let existingContact = contact[0]

            if (existingContact)
                return res.send({ error: 'Usuário com esse nome já existe' })

            await mysqlHelpers.insert('contacts', {
                nome: String(username).toUpperCase(),
                celular: cellphone
            })

        } else {
            contact = await (await postgresHelpers.connection).query(
                'SELECT nome FROM contacts WHERE nome = $1',
                [username]
            )

            let existingContact = contact[0]

            if (existingContact)
                return res.send({ error: 'Usuário com esse nome já existe' })

            await (await postgresHelpers.connection).query(
                'INSERT INTO contacts(nome, celular) VALUES($1, $2)',
                [username, cellphone.replace(/\D/g, '')]
            )
        }

        res.send({})

    } catch (error) {
        res.send({ error: error.message })
    }
}

export {
    saveContact
}
