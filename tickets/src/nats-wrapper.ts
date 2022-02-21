import nats, { Stan } from 'node-nats-streaming'

class NatsWrapper {
   private _client?: Stan

   get client() {
      if (!this._client) {
         throw new Error('Can not access Nats streaming service before connecting')
      }
      return this._client
   }
   connect(clusterId: string, clientId: string, url: string) {

      this._client = nats.connect(clusterId, clientId, { url })

      return new Promise<void>((resolve, reject) => {
         this._client?.on('connect', () => {
            console.log(`connected to nats streaming service`);
            resolve()
         })
         this._client?.on('error', (err) => {
            console.log(`errror connected to nats streaming service`);
            reject(err)
         })
      })

   }

}
export const natsWrapper = new NatsWrapper()