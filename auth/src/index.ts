import express from 'express'

const app = express()
app.use(express.json())

// ROUTES
app.get('/api/users/currentuser', (req, res, next) => {
   res.send("hi there  im the currentuser")
})

const Port = 3000

app.listen(Port, () => {
   console.log(`APP IS RUNNING ON PORT ${3000}...`);

})