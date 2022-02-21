import { Publisher, Subjetcts, TicketUpdatedEvent } from '@ticketingsg/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
   subject: Subjetcts.TicketUpdated = Subjetcts.TicketUpdated
}