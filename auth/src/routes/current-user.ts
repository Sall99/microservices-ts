import express, { NextFunction, Request, Response } from 'express'
import { currentUser } from '../middlewares/current-user'
import { requireAuth } from '../middlewares/requireAuth'

const router = express.Router()
router.get('/api/users/currentuser',
   currentUser, requireAuth,
   (req: Request, res: Response, next: NextFunction) => {
      res.send({ currentUser: req.currentUser || null })
   })

export { router as currentUser }