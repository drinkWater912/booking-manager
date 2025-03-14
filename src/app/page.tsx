'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Typography, CircularProgress } from '@mui/material';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/reservation');
  }, [router]);

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '60vh',
      gap: 3
    }}>
      <Typography variant="h4" component="h1">
        Welcome to Restaurant Booking Manager
      </Typography>
      <CircularProgress />
      <Typography>
        Redirecting to reservations page...
      </Typography>
    </Box>
  );
}
