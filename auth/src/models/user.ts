import mongoose from 'mongoose'
import { Password } from '../services/password'


// AN INERFACE THAT DESCRIBE REQUIRED PROPRETIES TO BUILD A USER
interface UserAttrs {
   email: string,
   password: string
}
// INTERFACE THAT DESCRIBE PROPRETIES USER  MODEL HAS
interface UserModel extends mongoose.Model<UserDoc> {
   build(attrs: UserAttrs): UserDoc
}
// INTERFACE THAT DESCRIBE PROPRETIES THAT USER DOCUMENT HAS

interface UserDoc extends mongoose.Document {
   email: string,
   password: string
}
const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   }
})
userSchema.pre('save', async function (done) {
   if (this.isModified('password')) {
      const hashed = await Password.toHash(this.get('password'))
      this.set('password', hashed)
   }
   done()
})
userSchema.statics.build = (atrrs: UserAttrs) => {
   return new User(atrrs)
}
const User = mongoose.model<UserDoc, UserModel>('User', userSchema)

export { User }