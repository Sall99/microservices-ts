import express from 'express'

const router = express.Router()

router.post('/api/users/signout', (req, res, next) => {
   req.session = null
   res.send({})
})

export { router as signOut }