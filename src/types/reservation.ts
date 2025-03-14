export interface Reservation {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  date: string;
  time: string;
  numberOfGuests: number;
  tableNumber: number;
  notes?: string;
  createdAt: string;
}
