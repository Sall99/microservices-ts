import express from 'express'
import 'express-async-errors'
import { currentUser } from './routes/current-user'
import { NotFoundErrors } from './routes/errors/notFound'
import { errorHandler } from './routes/middlewares/error-handler'
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
const Port = 3000

app.listen(Port, () => {
   console.log(`APP IS RUNNING ON PORT ${3000}...`);

})