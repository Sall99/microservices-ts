import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { currentUser } from './routes/current-user'
import { NotFoundErrors, errorHandler } from '@ticketingsg/common'

import { signIn } from './routes/signin'
import { signOut } from './routes/signout'
import { signUp } from './routes/signup'

export const app = express()
app.use(express.json())
app.set('trust proxy', true)

// COOKIE-SESSION
app.use(cookieSession({
   signed: false,
   secure: process.env.NODE_ENV !== "test"
}))
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