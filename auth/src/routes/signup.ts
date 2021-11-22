import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { BadRequestError } from '../errors/badRequest-error'
import { ErrorRequestValidation } from '../errors/error-request-validation'
import { User } from '../models/user'

const router = express.Router()

router.post('/api/users/signup', [
   body('email').isEmail().withMessage("Email must be valid"),
   body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20")
], async (req: Request, res: Response) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      throw new ErrorRequestValidation(errors.array())
   }
   const { email, password } = req.body

   // CHECKING IF USER EXIST
   const existingUser = await User.findOne({ email })
   if (existingUser) {
      throw new BadRequestError('Email in use');

   }

   // IF USER NOT EXIST THEN CREATE A USER
   const user = User.build({ email, password })
   await user.save()
   res.status(201).send(user)
})

export { router as signUp }