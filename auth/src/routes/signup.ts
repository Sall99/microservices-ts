import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { ErrorDataBaseConnection } from './errors/dataBase-connection-error'
import { ErrorRequestValidation } from './errors/error-request-validation'

const router = express.Router()

router.post('/api/users/signup', [
   body('email').isEmail().withMessage("Email must be valid"),
   body('password').trim().isLength({ min: 4, max: 20 }).withMessage("Password must be between 4 and 20")
], (req: Request, res: Response) => {
   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      throw new ErrorRequestValidation(errors.array())
   }
   const { email, password } = req.body
   console.log("creating a user...");
   throw new ErrorDataBaseConnection()

   res.send({})

})

export { router as signUp }