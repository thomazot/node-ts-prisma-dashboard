import { types } from "util";


export interface Err {
    status: 'error' | 'warning' | 'success'
    statusCode: 400 | 401 | 404 | 500
    messages: string
}