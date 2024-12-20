import { NotAuthorizedError, NotFoundErrors, requestValidation, requireAuth } from '@ticketingsg/common'
import express, { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import { TicketUpdatedPublisher } from '../events/publisher/ticket-update-publisher'
import { Tickets } from '../models/tickets'
import { natsWrapper } from '../nats-wrapper'

const router = express.Router()

router.put('/api/tickets/:id', requireAuth, [
   body('title').not().isEmpty().withMessage('title is required'),
   body("price").isFloat({ gt: 0 }).withMessage('price must greater than 0')
], requestValidation, async (req: Request, res: Response, next: NextFunction) => {
   const ticket = await Tickets.findById(req.params.id)
   if (!ticket) {
      throw new NotFoundErrors()
   }
   if (ticket.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError()
   }
   ticket.set({
      title: req.body.title,
      price: req.body.price
   })
   await ticket.save()
   await new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId
   })
   res.send(ticket)
})
export { router as updateRouter }