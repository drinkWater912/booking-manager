'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/types/reservation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Typography, Modal, Paper } from '@mui/material';
import { EventClickArg } from '@fullcalendar/core';

export default function CalendarPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedReservation, setSelectedReservation] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchReservations = async () => {
      const querySnapshot = await getDocs(collection(db, 'reservations'));
      const reservationsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Reservation[];
      setReservations(reservationsData);
    };

    fetchReservations();
  }, []);

  const events = reservations.map(reservation => ({
    id: reservation.id,
    title: `${reservation.customerName} - Table ${reservation.tableNumber}`,
    start: `${reservation.date}T${reservation.time}`,
    extendedProps: reservation
  }));

  const handleEventClick = (info: EventClickArg) => {
    setSelectedReservation(info.event.extendedProps as Reservation);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Booking Calendar
      </Typography>

      <Paper sx={{ p: 2, backgroundColor: '#fff' }}>
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
          }}
          events={events}
          eventClick={handleEventClick}
          height="70vh"
          slotMinTime="06:00:00"
          slotMaxTime="23:00:00"
          allDaySlot={false}
          slotDuration="01:00:00"
          dayHeaderFormat={{ weekday: 'short', month: 'numeric', day: 'numeric', omitCommas: true }}
          eventBackgroundColor="#1976d2"
          eventBorderColor="#1565c0"
          nowIndicator={true}
          scrollTime={new Date().getHours() + ':00:00'}
          stickyHeaderDates={true}
        />
      </Paper>

      <Modal
        open={!!selectedReservation}
        onClose={() => setSelectedReservation(null)}
        aria-labelledby="reservation-details"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 1
        }}>
          {selectedReservation && (
            <>
              <Typography variant="h6" component="h2" gutterBottom>
                Reservation Details
              </Typography>
              <Typography><strong>Customer:</strong> {selectedReservation.customerName}</Typography>
              <Typography><strong>Phone:</strong> {selectedReservation.phone}</Typography>
              {selectedReservation.email && (
                <Typography><strong>Email:</strong> {selectedReservation.email}</Typography>
              )}
              <Typography><strong>Date:</strong> {selectedReservation.date}</Typography>
              <Typography><strong>Time:</strong> {selectedReservation.time}</Typography>
              <Typography><strong>Guests:</strong> {selectedReservation.numberOfGuests}</Typography>
              <Typography><strong>Table:</strong> {selectedReservation.tableNumber}</Typography>
              {selectedReservation.notes && (
                <Typography><strong>Notes:</strong> {selectedReservation.notes}</Typography>
              )}
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
}
