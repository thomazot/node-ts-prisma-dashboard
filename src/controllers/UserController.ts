import { Request, Response, NextFunction } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const index = async(req: Request, res: Response, next: NextFunction) => {
    const users = await prisma.user.findMany()
    res.json(users)
}
    
export const create = async(req: Request, res: Response, next: NextFunction) => {

    const user = await prisma.user.create({
        data: {
            ...req.body,
            password: await bcrypt.hash(req.body.password, 10)
        }
    })

    res.json(user)
}