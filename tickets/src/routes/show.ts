import { NotFoundErrors } from "@ticketingsg/common"
import express, { Request, Response, NextFunction } from "express"
import { Tickets } from "../models/tickets"
const router = express.Router()

router.get('/api/tickets/:id', async (req: Request, res: Response, next: NextFunction) => {

   const ticket = await Tickets.findById(req.params.id)
   if (!ticket) {
      throw new NotFoundErrors()
   }
   res.send(ticket)
})

export { router as showTicketsRoute }