import { CustomError } from './custom-error'
export class NotFoundErrors extends CustomError {
   statusCode = 404
   constructor() {
      super('route not found')
      Object.setPrototypeOf(this, NotFoundErrors.prototype)
   }
   serializeErrors() {
      return [{ message: "Route not found" }]
   }
}