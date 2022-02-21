import request from 'supertest'
import { app } from '../../app'
import { Tickets } from '../../models/tickets'
import { natsWrapper } from '../../nats-wrapper'


it('has a route handler listening to /api/tickets for post request', async () => {
   const response = await request(app)
      .post('/api/tickets')
      .send({})
   expect(response.status).not.toEqual(404)
})
it('can only be accessed  if the user is signed', async () => {
   await request(app)
      .post('/api/tickets')
      .send({})
      .expect(401)

})
it('return not 401 if user is not signed in', async () => {
   const response = await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({})
   expect(response.status).not.toEqual(401)

})
it('it returns an error if a invallid title is provided ', async () => {
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: '', price: 10 })
      .expect(400)
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ price: 10 })
      .expect(400)
})
it('it returns an error if a invallid price is provided ', async () => {
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'ghgghjghjg', price: -10 })
      .expect(400)
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'hhuihrfuhrf' })
      .expect(400)
})
it('creates a  tickets with valid inputs', async () => {
   let tickets = await Tickets.find({})
   expect(tickets.length).toEqual(0)
   const title = 'hhuihrfuhrf'
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title, price: 200 })
      .expect(201)
   tickets = await Tickets.find({})

   expect(tickets.length).toEqual(1)
   expect(tickets[0].title).toEqual(title)
   expect(tickets[0].price).toEqual(200)
})
it('publish a events', async () => {
   const title = 'hhuihrfuhrf'
   await request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title, price: 200 })
      .expect(201)
   expect(natsWrapper.client.publish).toHaveBeenCalled()

})