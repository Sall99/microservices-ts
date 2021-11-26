import express, { NextFunction, Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/badRequest-error'
import { requestValidation } from '../middlewares/requestValidation'
import { User } from '../models/user'
import { Password } from '../services/password'

const router = express.Router()

router.post('/api/users/signin',
   [
      body('email').isEmail().withMessage('Email must me valid'),
      body('password').trim().notEmpty().withMessage('You must supply a password')
   ], requestValidation,
   async (req: Request, res: Response, next: NextFunction) => {
      const { email, password } = req.body
      // CHECKING IF USER EXIST
      const existingUser = await User.findOne({ email })
      // IF NOT THROW A ERROR
      if (!existingUser) {
         throw new BadRequestError('Invalid credentials')
      }
      // CHECKING IF PASSWORD MATCH
      const matchedPassword = await Password.compare(existingUser.password, password)
      // IF NOT THROW A ERROR
      if (!matchedPassword) {
         throw new BadRequestError('Invalid credentials')
      }
      // GENERATE A TOKEN
      const userJwt = jwt.sign({
         id: existingUser._id,
         email: existingUser.email
      }, process.env.JWT_KEY!)
      // STORE THE TOKEN IN SESSION-COOKIE
      req.session = { jwt: userJwt }
      res.status(201).send(existingUser)
   })

export { router as signIn }