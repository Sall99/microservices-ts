import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res, next) => {
   res.send('signout')
})

export { router as signOut }