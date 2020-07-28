import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import Routes from './routes'
import { handleError } from './services/Error';
import { Err } from './typings';

const app = express()

app.use(cors())
app.use(express.json())
app.use(Routes)
app.use((err: Err, req: Request, res: Response, next: NextFunction) => {
    handleError(err, res)
})

app.listen('3000', () => console.log(`Host listen localhost:3000`))