import { Box, Typography } from '@mui/material';

export default function OrdersPage() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Orders
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Manage customer orders
      </Typography>
    </Box>
  );
}
