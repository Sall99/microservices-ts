import { CustomError } from "./custom-error"

export class ErrorDataBaseConnection extends CustomError {
   statusCode = 500
   reason = "Eror conecting to the database"
   constructor() {
      super("Eror conecting to the database")
      Object.setPrototypeOf(this, ErrorDataBaseConnection.prototype)
   }
   serializeErrors() {
      return [{
         message: this.reason
      }]
   }
}