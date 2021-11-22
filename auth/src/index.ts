import express from 'express'
import 'express-async-errors'
import mongoose from "mongoose"

import { currentUser } from './routes/current-user'
import { NotFoundErrors } from './errors/notFound'
import { errorHandler } from './middlewares/error-handler'
import { signIn } from './routes/signin'
import { signOut } from './routes/signout'
import { signUp } from './routes/signup'

const app = express()
app.use(express.json())

// ROUTES
app.use(currentUser)
app.use(signIn)
app.use(signUp)
app.use(signOut)
//TROWING ERROR ON NONE EXISTING ROUTE
app.all("*", async () => {
   throw new NotFoundErrors()
})

// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)

// MONGODB AND SERVER START FUNCTION
const Port = 3000
const start = async () => {
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