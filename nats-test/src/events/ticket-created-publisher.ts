import { Publisher } from "./base-publisher";
import { Subjetcts } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   subject: Subjetcts.TicketCreated = Subjetcts.TicketCreated;
}