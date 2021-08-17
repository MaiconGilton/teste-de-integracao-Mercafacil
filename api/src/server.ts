import express from 'express'
import cors from 'cors'
import loadModules from './modules'
import dotenv from 'dotenv'
import mysqlHelpers from 'helpers/mysql'
import postgresHelpers from 'helpers/postgres'

dotenv.config({ path: '.env' })

const app = express()
const port = 3600

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send('Mercafácil API!')
})

mysqlHelpers.initDatabase()
postgresHelpers.initDatabase()

loadModules(app)

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})