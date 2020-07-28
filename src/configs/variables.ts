import Dotenv from 'dotenv'

Dotenv.config({
    path: process.env.NODE_ENV === 'test' ? ".env.testing" : '.env'
})

export const SECRET = process.env.SECRET || '30293902390209390'
export const ENV = process.env.NODE_EN || 'development'