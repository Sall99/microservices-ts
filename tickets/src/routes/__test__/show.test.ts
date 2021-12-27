import request from "supertest";
import { app } from "../../app";
import mongoose from 'mongoose'

it('return 404 when a ticket is not found', async () => {
   const id = new mongoose.Types.ObjectId().toHexString()
   await request(app)
      .get(`/api/tickets/${id}`)
      .send()
      .expect(404)

})
it('return ticket when a its found', async () => {
   const title = 'hjhjfjr'
   const price = 10
   const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title, price })
      .expect(201)

   const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
      .expect(200)
   expect(ticketResponse.body.title).toEqual(title)
   expect(ticketResponse.body.price).toEqual(price)
})