import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { body } from 'express-validator'
import { BadRequestError, requestValidation } from '@ticketingsg/common'
import { User } from '../models/user'


const router = express.Router()

router.post('/api/users/signup',
   [
      body('email').isEmail().withMessage("Email must be valid"),
      body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20")
   ], requestValidation, async (req: Request, res: Response) => {

      const { email, password } = req.body
      // CHECKING IF USER EXIST
      const existingUser = await User.findOne({ email })
      if (existingUser) {
         throw new BadRequestError('Email in use');
      }
      // IF USER NOT EXIST THEN CREATE A USER
      const user = User.build({ email, password })
      // GENERATE A TOKEN
      const userJwt = jwt.sign({
         id: user._id,
         email: user.email
      }, process.env.JWT_KEY!)
      // STORE THE TOKEN IN SESSION-COOKIE
      req.session = { jwt: userJwt }
      await user.save()
      res.status(201).send(user)
   })

export { router as signUp }