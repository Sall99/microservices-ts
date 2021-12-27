import request from 'supertest'
import { app } from '../../app'

const createTicket = () => {
   return request(app)
      .post('/api/tickets')
      .set('Cookie', global.signin())
      .send({ title: 'title', price: 20 })

}
it('fetch a list of tickets', async () => {
   await createTicket()
   await createTicket()
   await createTicket()

   const response = await request(app)
      .get('/api/tickets')
      .send()
   expect(response.body.length).toEqual(3);

})