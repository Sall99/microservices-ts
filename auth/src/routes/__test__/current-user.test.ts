import request from 'supertest'
import { app } from '../../app'

it('response with details about sign in user ', async () => {
   const cookie = await global.signin()
   const response = await request(app)
      .get('/api/users/currentuser')
      .set('Cookie', cookie)
      .send()
      .expect(200)
   expect(response.body.currentUser.email).toEqual("test@test.com")
})

it('response with null when user is not authentiated', async () => {
   const response = await request(app)
      .get('/api/users/currentuser')
      .send()
      .expect(200)
   expect(response.body.currentUser.email).toEqual(null)
})