import request from "supertest";
import { app } from "../../app";
import mongoose from 'mongoose'


it('returns 404 if the provided id does not exist', async () => {
   const id = new mongoose.Types.ObjectId().toHexString()
   await request(app)
      .put(`/api/tickets/${id}`)
      .set('Cookie', global.signin())
      .send({ title: 'hhjhgt', price: 20 })
      .expect(404)
})
it('returns 401 if the user is not authenticated', async () => {
   const id = new mongoose.Types.ObjectId().toHexString()
   await request(app)
      .put(`/api/tickets/${id}`)
      .send({ title: 'hhjhgt', price: 20 })
      .expect(401)
})
it('returns 401 if the user does not own the tickets', async () => {
   const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', global.signin())
      .send({ title: 'hhjhgt', price: 20 })
      .expect(201)
   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', global.signin())
      .send({ title: 'thbcbde', price: 20 })
      .expect(401)
})
it('returns 400 if the user provide invalid title and price', async () => {
   const cookie = global.signin()
   const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', cookie)
      .send({ title: 'hhjhgt', price: 20 })

   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({ title: '', price: 20 })
      .expect(400)
   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({ title: 'rfrfr', price: -20 })
      .expect(400)


})
it('update ticket on valid  title and price', async () => {
   const cookie = global.signin()
   const response = await request(app)
      .post(`/api/tickets`)
      .set('Cookie', cookie)
      .send({ title: 'hhjhgt', price: 20 })
   await request(app)
      .put(`/api/tickets/${response.body.id}`)
      .set('Cookie', cookie)
      .send({ title: 'rfrfr', price: 20 })
      .expect(200)
   const ticketResponse = await request(app)
      .get(`/api/tickets/${response.body.id}`)
      .send()
   expect(ticketResponse.body.title).toEqual('rfrfr')
   expect(ticketResponse.body.price).toEqual(20)
})