import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', (req, res, next) => {
   res.send('current user')
})

export { router as currentUser }