import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjetcts } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent>{
   subject: Subjetcts.TicketCreated = Subjetcts.TicketCreated;
   queueGroupName = 'payments-service';

   onMessage(data: TicketCreatedEvent['data'], msg: Message) {
      console.log('Event data!', data);
      msg.ack();
   }
}
