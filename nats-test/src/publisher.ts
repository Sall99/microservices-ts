import nats from 'node-nats-streaming'

console.clear()
const stan = nats.connect('ticketing', 'abc', {
   url: 'http://localhost:4222'
})

stan.on('connect', () => {
   console.log('Publisher connected to Nats',);
   const data = JSON.stringify({
      id: 'defrfr',
      price: 10,
      title: 'kfhrjrfhr'
   })

   stan.publish('ticket:created', data, () => {
      console.log('Event pusblished');

   })
})