import { requestValidation, requireAuth } from '@ticketingsg/common'
import express, { Request, Response, NextFunction } from 'express'
import { body } from 'express-validator'
import { Tickets } from '../models/tickets'

const router = express.Router()

router.post('/api/tickets', requireAuth, [
   body('title').not().isEmpty().withMessage('Title is required'),
   body('price').isFloat({ gt: 0 }).withMessage('Price is required')
], requestValidation, async (req: Request, res: Response, next: NextFunction) => {
   const { title, price } = req.body
   const ticket = Tickets.build({
      title,
      price,
      userId: req.currentUser!.id
   })
   await ticket.save()
   res.status(201).send(ticket)
})

export { router as createTickets }