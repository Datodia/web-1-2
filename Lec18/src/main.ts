import express, {Request, Response} from 'express'
const app = express()

app.get('/', (req: Request, res: Response) => {
    res.send('hello from TS change')
})

app.listen(3000, () => {
    console.log('running on http://localhost:3000')
})