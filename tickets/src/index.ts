import mongoose from 'mongoose'
import { app } from "./app"
import { natsWrapper } from './nats-wrapper'

// MONGODB AND SERVER START FUNCTION
const Port = 3000
const start = async () => {

   // THROWING ERROR IF ENVIRRONMENT VARIABLES IS NOT DEFINED
   if (!process.env.JWT_KEY) {
      throw new Error('Environement variable must be defined')
   }
   if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be defined')
   }
   try {
      // THROWING ERROR IF ENVIRRONMENT VARIABLES IS NOT DEFINED
      if (!process.env.NATS_CLIENT_ID) {
         throw new Error('NATS_CLIENT_ID  must be defined')
      }
      if (!process.env.tickets) {
         throw new Error('tickets  must be defined')
      }
      if (!process.env.NATS_CLUSTER_ID) {
         throw new Error('NATS_CLUSTER_ID  must be defined')
      }
      await natsWrapper.connect(process.env.NATS_CLUSTER_ID, process.env.NATS_CLIENT_ID, process.env.tickets)
      natsWrapper.client.on('close', () => {
         console.log('NATS connection closed!');
         process.exit();
      });
      process.on('SIGINT', () => natsWrapper.client.close());
      process.on('SIGTERM', () => natsWrapper.client.close());
      await mongoose.connect(process.env.MONGO_URI)
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