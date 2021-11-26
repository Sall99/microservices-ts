import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorRequestValidation } from "../errors/error-request-validation";

export const requestValidation = (req: Request, res: Response, next: NextFunction) => {

   const errors = validationResult(req)
   if (!errors.isEmpty()) {
      throw new ErrorRequestValidation(errors.array())
   }
   next()
}