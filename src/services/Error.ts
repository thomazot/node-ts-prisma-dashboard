
import { Err } from '../typings';
import { Response } from 'express';

export const handleError = (err: Err, res: Response) => {
    if(!err.statusCode)
        return res.status(500).json({
            status: 'error',
            statusCode: 500,
            message: 'Server error!'
        })
    
    res.status(err.statusCode).json(
        {
            status: err.status,
            statusCode: err.statusCode,
            message: err.messages
        }
    )
}

export class ErrorHandle extends Error {
    private status: string
    private statusCode: 400 | 401 | 404 | 500
    private messages: string 

    constructor({ status, statusCode, messages }:Err) {
        super()
        this.status = status
        this.statusCode = statusCode 
        this.messages = messages
    }
}