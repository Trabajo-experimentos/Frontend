import { Typography, Container } from '@mui/material';

export default function DashboardPage() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Welcome to FoodFlow Restaurant Management System
      </Typography>
    </Container>
  );
}
