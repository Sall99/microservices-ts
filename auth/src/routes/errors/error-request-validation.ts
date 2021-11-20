import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class ErrorRequestValidation extends CustomError {
   statusCode = 400
   constructor(public errors: ValidationError[]) {
      super("Invalid Request parameters")
      // ONLY BECAUSE OF WE ARE EXTENDING A BUILT IN CLASS
      Object.setPrototypeOf(this, ErrorRequestValidation.prototype)
   }
   serializeErrors() {
      return this.errors.map(error => (
         { message: error.msg, field: error.param }
      ))
   }
}
