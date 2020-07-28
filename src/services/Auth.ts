import Jwt from 'jsonwebtoken'
import { promisify } from 'util'
import { NextFunction, Response, Request } from 'express'
import { User } from '@prisma/client'
import bcrypt from 'bcrypt'
import { SECRET } from '../configs/variables'
import { ErrorHandle } from './Error'

export const checkAuthorization = async( req: Request, res: Response, next:NextFunction) => {
        try {
            const authorization = req.headers.authorization

            if (!authorization) throw new ErrorHandle({
                status: 'error',
                statusCode: 401,
                messages: 'Authorization is requered!'
            })

            const [, token] = authorization.split(' ')
            const decoded: any = await promisify(Jwt.verify)(token, SECRET)

            req.headers.id = decoded.id

            next()
        } catch(error) {
            next(error)
        }
}

export const generateToken = (user: User) => {
    return Jwt.sign({ id: user.id }, SECRET)
}

export const checkPassword =  (password: string, user: User) => {
    return bcrypt.compare(password, user.password)
}