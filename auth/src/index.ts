import mongoose from "mongoose"
import { app } from "./app"

// MONGODB AND SERVER START FUNCTION
const Port = 3000
const start = async () => {

   // THROWING ERROR IF ENVIRRONMENT VARIABLES IS NOT DEFINED
   if (!process.env.JWT_KEY) {
      throw new Error('Environement variable must be defined')
   }
   try {
      await mongoose.connect('mongodb://auth-mongo-srv:27017/auth')
      const conn = mongoose.connection.host
      console.log(`MongoDb is running on ${conn}`)

   } catch (error) {
      console.log("Db err", error)

   }
   app.listen(Port, () => {
      console.log(`APP IS RUNNING ON PORT ${3000}...`)

   })
}
start()