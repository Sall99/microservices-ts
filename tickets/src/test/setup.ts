import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

declare global {
   function signin(): string[];
}
jest.mock('../nats-wrapper')
let mongod: any
// HOOK THAT RUN BEFORE ALL TEST
beforeAll(async () => {
   process.env.JWT_KEY = "this is the key"
   mongod = await MongoMemoryServer.create()
   const mongoUri = mongod.getUri()
   await mongoose.connect(mongoUri)

})
// HOOK THAT RUN BEFORE  EACH TEST
beforeEach(async () => {
   jest.clearAllMocks()
   const collections = await mongoose.connection.db.collections()
   for (let collection of collections) {
      await collection.deleteMany({})
   }
})

afterAll(async () => {
   await mongod.stop()
})

global.signin = () => {

   const payload = {
      id: new mongoose.Types.ObjectId().toHexString(),
      email: "test@test.com"
   }
   const token = jwt.sign(payload, process.env.JWT_KEY!)
   const session = { jwt: token }
   const sessionJSON = JSON.stringify(session)
   const base64 = Buffer.from(sessionJSON).toString('base64')
   return [`express:sess=${base64}`]
}



