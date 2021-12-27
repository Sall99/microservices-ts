import express, { NextFunction, Request, Response } from 'express'
import { Tickets } from '../models/tickets'

const router = express.Router()

router.get('/api/tickets', async (req: Request, res: Response, next: NextFunction) => {
   const tickets = await Tickets.find({})
   res.status(200).send(tickets)
})
export { router as indexRouter }