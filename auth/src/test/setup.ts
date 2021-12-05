import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'
import request from 'supertest'

declare global {
   function signin(): Promise<string[]>;
}
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
   const collections = await mongoose.connection.db.collections()
   for (let collection of collections) {
      await collection.deleteMany({})
   }
})

afterAll(async () => {
   await mongod.stop()
})

global.signin = async () => {
   const email = "test@test.com"
   const password = "password"
   const response = await request(app)
      .post('/api/users/signup')
      .send({ email, password })
      .expect(201)
   const cookie = response.get('Set-Cookie')
   return cookie
}