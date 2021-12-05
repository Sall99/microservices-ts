import request from 'supertest'
import { app } from '../../app'

it('return a 201 on succesfful signup', async () => {
   return request(app)
      .post('/api/users/signup')
      .send({ email: "test@test.com", password: "password" })
      .expect(201)
})

it('return a 400 with a invalid email', async () => {
   return request(app)
      .post('/api/users/signup')
      .send({ email: "test@test", password: "password" })
      .expect(400)
})
it('return a 400 with a invalid password', async () => {
   return request(app)
      .post('/api/users/signup')
      .send({ email: "test@test", password: "pa" })
      .expect(400)
})

it('return a 400 with a missing email and password', async () => {
   await request(app)
      .post('/api/users/signup')
      .send({ email: "test@test.com" })
      .expect(400)
   await request(app)
      .post('/api/users/signup')
      .send({ password: "password" })
      .expect(400)
})

it('disalows dupllicate emails and password', async () => {
   await request(app)
      .post('/api/users/signup')
      .send({ email: "test@test.com", password: "password" })
      .expect(201)
   await request(app)
      .post('/api/users/signup')
      .send({ email: "test@test.com", password: "password" })
      .expect(400)
})

it('sets a cookie after a succesfull signup', async () => {
   const response = await request(app)
      .post('/api/users/signup')
      .send({ email: "test@test.com", password: "password" })
      .expect(201)

   expect(response.get('Set-Cookie')).toBeDefined()
})