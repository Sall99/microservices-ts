import { Publisher, Subjetcts, TicketCreatedEvent } from '@ticketingsg/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
   subject: Subjetcts.TicketCreated = Subjetcts.TicketCreated

}