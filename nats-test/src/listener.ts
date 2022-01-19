import { randomBytes } from 'crypto';
import nats, { Message } from 'node-nats-streaming'

console.clear()
const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
   url: 'http://localhost:4222'
})

stan.on('connect', () => {
   console.log('Listener connected to Nats');
   stan.on('close', () => {
      console.log(`NATS CONNECTION CLOSED`);
      process.exit()

   })
   const options = stan.subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setDurableName('accounting-service')
   const data = JSON.stringify({
      id: 'defrfr',
      price: 10,
      title: 'kfhrjrfhr'
   })

   stan.publish('ticket:created', data, () => {
      const subscription = stan.subscribe('ticket:created', 'queue-group-name', options)
      subscription.on('message', (msg: Message) => {
         const data = msg.getData()
         if (typeof data === 'string') {
            console.log(`Received events #${msg.getSequence()} with data of ${data}`);
         }
         msg.ack()
      })

   })
})
process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())