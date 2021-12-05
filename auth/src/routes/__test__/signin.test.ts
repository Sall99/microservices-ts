import request from 'supertest'
import { app } from '../../app'

it('Fails when a none existing email is supplied', async () => {
   return request(app)
      .post('/api/users/signin')
      .send({ email: "test@test.com", password: "password" })
      .expect(400)
})

it('Fails when a incorrect password is supplied', async () => {
   await request(app)
      .post('/api/users/signup')
      .send({ email: "test@test.com", password: "password" })
      .expect(201)
   await request(app)
      .post('/api/users/signin')
      .send({ email: "test@test.com", password: "hegfiuhieh" })
      .expect(400)
})
it('sets a cookie after a succesfull signin ', async () => {
   await request(app)
      .post('/api/users/signup')
      .send({ email: "test@test.com", password: "password" })
      .expect(201)
   const response = await request(app)
      .post('/api/users/signin')
      .send({ email: "test@test.com", password: "password" })
      .expect(201)

   expect(response.get('Set-Cookie')).toBeDefined()
})