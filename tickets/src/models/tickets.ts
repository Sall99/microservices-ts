import mongoose from 'mongoose'

interface TicketsAttrs {
   title: string,
   price: number,
   userId: string
}
interface TicketsDoc extends mongoose.Document {
   title: string,
   price: number,
   userId: string
}
interface ticketsModel extends mongoose.Model<TicketsDoc> {
   build(attrs: TicketsAttrs): TicketsDoc
}
const ticketsSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   userId: {
      type: String,
      required: true
   }
}, {
   toJSON: {
      transform(doc, ret) {
         ret.id = ret._id
         delete ret._id
      }
   }
})
ticketsSchema.statics.build = (atrrs: TicketsAttrs) => {
   return new Tickets(atrrs)
}
const Tickets = mongoose.model<TicketsDoc, ticketsModel>('Tickets', ticketsSchema)
export { Tickets }