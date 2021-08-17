import express from 'express'
import * as controller from './controller'

const router = express.Router()

// routes
router.post('/authenticate', controller.authenticate)

export default app => {
    app.use('/auth', router)
}
