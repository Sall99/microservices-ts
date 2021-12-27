import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'
import { NotFoundErrors, errorHandler, currentUser } from '@ticketingsg/common'
import { createTickets } from './routes/new'
import { showTicketsRoute } from './routes/show'
import { indexRouter } from './routes'
import { updateRouter } from './routes/update'


export const app = express()
app.use(express.json())
app.set('trust proxy', true)

// COOKIE-SESSION
app.use(cookieSession({
   signed: false,
   secure: process.env.NODE_ENV !== "test"
}))
app.use(currentUser)
// ROUTES
app.use(createTickets)
app.use(showTicketsRoute)
app.use(indexRouter)
app.use(updateRouter)
//TROWING ERROR ON NONE EXISTING ROUTE
app.all("*", async () => {
   throw new NotFoundErrors()
})
// ERROR HANDLER MIDDLEWARE
app.use(errorHandler)