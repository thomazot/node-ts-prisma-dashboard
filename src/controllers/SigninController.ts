
import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import { checkPassword, generateToken } from '../services/Auth';
import { ErrorHandle } from '../services/Error';

const prisma = new PrismaClient()

export default {
    async create (req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body

            if(!email && !password)
                throw new ErrorHandle({ status: 'error', statusCode: 404, messages: 'E-mail and Passoword required' })

            const user = await prisma.user.findMany({
                where: {
                    email
                }
            })

            if(!user.length)
                throw new ErrorHandle({
                    status: 'error',
                    statusCode: 400,
                    messages: 'E-mail is invalided!'
                })

            if(!await checkPassword(password, user[0]))
                throw new ErrorHandle({
                    status: 'error',
                    statusCode: 400,
                    messages: 'Password is invalided!'
                })

            res.json({
                ...user,
                token: generateToken(user[0])
            })

        } catch(error) {
            next(error)
        }

    }
}