import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export default (req: Request, res: Response, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader)
        return res.send({ token_error: 'No token provided' })

    const parts = authHeader.split(' ')

    if (!(parts.length === 2))
        return res.send({ token_error: 'Token error' })

    const [scheme, token] = parts

    if (!/^Bearer$/i.test(scheme))
        return res.send({ token_error: 'Token malformatted' })

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded: any) => {
        if (err) { return res.send({ token_error: err }) }

        req.userId = decoded.id
        req.database = decoded.database

        return next()
    })
}
