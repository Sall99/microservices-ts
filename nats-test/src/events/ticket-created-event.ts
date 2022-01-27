import { Subjetcts } from "./subjects";

export interface TicketCreatedEvent {
   subject: Subjetcts.TicketCreated,
   data: {
      id: string,
      title: string,
      price: number
   }
}