import express from 'express'
import authMiddleware from 'middlewares/auth'
import * as controller from './controller'

const router = express.Router()

// routes
router.post('/save', authMiddleware, controller.saveContact)

export default app => {
    app.use('/contact', router)
}
