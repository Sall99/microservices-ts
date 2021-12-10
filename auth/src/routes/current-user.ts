import express, { NextFunction, Request, Response } from 'express'
import { currentUser } from '@ticketingsg/common'

const router = express.Router()
router.get('/api/users/currentuser',
   currentUser,
   (req: Request, res: Response, next: NextFunction) => {
      res.send({ currentUser: req.currentUser || null })
   })

export { router as currentUser }