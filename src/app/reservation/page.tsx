'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Reservation } from '@/types/reservation';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';

export default function ReservationPage() {
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Omit<Reservation, 'id' | 'createdAt'>>();

  const checkTableAvailability = async (date: string, time: string, tableNumber: number) => {
    const reservationsRef = collection(db, 'reservations');
    const q = query(
      reservationsRef,
      where('date', '==', date),
      where('time', '==', time),
      where('tableNumber', '==', tableNumber)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  };

  const onSubmit = async (data: Omit<Reservation, 'id' | 'createdAt'>) => {
    try {
      setSubmitError('');
      const isTableAvailable = await checkTableAvailability(data.date, data.time, data.tableNumber);
      
      if (!isTableAvailable) {
        setSubmitError('This table is already booked for the selected time. Please choose another table or time.');
        return;
      }

      await addDoc(collection(db, 'reservations'), {
        ...data,
        createdAt: new Date().toISOString()
      });

      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 3000);
    } catch (err) {
      console.error('Reservation submission error:', err);
      setSubmitError('Failed to submit reservation. Please try again.');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Make a Reservation
      </Typography>

      {submitError && <Alert severity="error" sx={{ mb: 2 }}>{submitError}</Alert>}
      {submitSuccess && <Alert severity="success" sx={{ mb: 2 }}>Reservation submitted successfully!</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label="Customer Name"
          margin="normal"
          {...register('customerName', { required: 'Name is required' })}
          error={!!errors.customerName}
          helperText={errors.customerName?.message}
        />

        <TextField
          fullWidth
          label="Phone Number"
          margin="normal"
          {...register('phone', {
            required: 'Phone number is required',
            pattern: {
              value: /^\d+$/,
              message: 'Please enter a valid phone number'
            }
          })}
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <TextField
          fullWidth
          label="Date"
          type="date"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register('date', {
            required: 'Date is required',
            validate: value => new Date(value) >= new Date() || 'Cannot select past dates'
          })}
          error={!!errors.date}
          helperText={errors.date?.message}
        />

        <TextField
          fullWidth
          label="Time"
          type="time"
          margin="normal"
          InputLabelProps={{ shrink: true }}
          {...register('time', { required: 'Time is required' })}
          error={!!errors.time}
          helperText={errors.time?.message}
        />

        <TextField
          fullWidth
          label="Number of Guests"
          type="number"
          margin="normal"
          InputProps={{ inputProps: { min: 1 } }}
          {...register('numberOfGuests', {
            required: 'Number of guests is required',
            min: { value: 1, message: 'Must be at least 1 guest' }
          })}
          error={!!errors.numberOfGuests}
          helperText={errors.numberOfGuests?.message}
        />

        <TextField
          fullWidth
          label="Table Number"
          type="number"
          margin="normal"
          InputProps={{ inputProps: { min: 1 } }}
          {...register('tableNumber', {
            required: 'Table number is required',
            min: { value: 1, message: 'Invalid table number' }
          })}
          error={!!errors.tableNumber}
          helperText={errors.tableNumber?.message}
        />

        <TextField
          fullWidth
          label="Notes"
          multiline
          rows={3}
          margin="normal"
          {...register('notes')}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 2 }}
          fullWidth
        >
          Submit Reservation
        </Button>
      </form>
    </Box>
  );
}
