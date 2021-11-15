import express from 'express'

const app = express()
app.use(express.json())

const Port = 3000

app.listen(Port, () => {
   console.log(`APP IS RUNNING ON PORT ${3000}`);

})