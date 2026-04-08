// import { useState } from "react";
// import { 
//   Box, Typography, Paper, Button, Divider, Step, StepLabel, 
//   Stepper, Dialog, DialogContent, DialogTitle, IconButton 
// } from "@mui/material";
// import { 
//   LocalShipping, ChevronRight, Replay, StarBorder, 
//   Close, LocationOn, FiberManualRecord 
// } from "@mui/icons-material";
// import { motion } from "framer-motion";

// const ORDERS = [
//   { id: "OD4432115", date: "Mar 30, 2026", status: "Shipped", statusStep: 1, items: [{ name: "Nike Air Jordan 1", price: 180, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" }] },
//   { id: "OD4432109", date: "Mar 28, 2026", status: "Delivered", statusStep: 3, items: [{ name: "AirPods Pro Max", price: 549, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" }] },
// ];

// const STEPS = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

// export default function Orders() {
//   const [trackingOrder, setTrackingOrder] = useState(null);

//   return (
//     <Box sx={{ p: 3, maxWidth: 900, margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
//       <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: "white" }}>My Orders</Typography>

//       <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
//         {ORDERS.map((order) => (
//           <Paper key={order.id} variant="outlined" sx={{ borderRadius: 3, background: "#1e293b", borderColor: "rgba(255,255,255,0.1)", transition: '0.2s', '&:hover': { borderColor: '#3b82f6' } }}>
//             <Box sx={{ p: 2, bgcolor: 'rgba(255,255,255,0.03)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
//               <Box>
//                 <Typography sx={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 700 }}>ORDER ID: {order.id}</Typography>
//                 <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: "white" }}>{order.statusStep === 3 ? `Delivered on ${order.date}` : `Arriving soon`}</Typography>
//               </Box>
//               <Button 
//                 onClick={() => setTrackingOrder(order)}
//                 variant="outlined" size="small" startIcon={<LocalShipping />} 
//                 sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, borderColor: '#3b82f6', color: '#3b82f6' }}
//               >
//                 Track Package
//               </Button>
//             </Box>

//             <Box sx={{ p: 3 }}>
//               {order.items.map((item, idx) => (
//                 <Box key={idx} sx={{ display: 'flex', gap: 2 }}>
//                   <img src={item.img} alt={item.name} style={{ width: 70, height: 70, borderRadius: 12, objectFit: 'cover' }} />
//                   <Box sx={{ flex: 1 }}>
//                     <Typography sx={{ fontWeight: 700, fontSize: '0.95rem', color: "white" }}>{item.name}</Typography>
//                     <Typography sx={{ color: '#94a3b8', fontSize: '0.85rem' }}>Standard Delivery</Typography>
//                     <Typography sx={{ fontWeight: 800, mt: 0.5, color: '#10b981' }}>${item.price}</Typography>
//                   </Box>
//                 </Box>
//               ))}
//             </Box>
//           </Paper>
//         ))}
//       </Box>

//       {/* Live Tracking Modal */}
//       <Dialog open={Boolean(trackingOrder)} onClose={() => setTrackingOrder(null)} maxWidth="md" fullWidth PaperProps={{ sx: { borderRadius: 4, bgcolor: "#0f172a" } }}>
//         <DialogTitle sx={{ m: 0, p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white' }}>
//           <Typography variant="h6" sx={{ fontWeight: 700 }}>Live Tracking</Typography>
//           <IconButton onClick={() => setTrackingOrder(null)} sx={{ color: 'white' }}><Close /></IconButton>
//         </DialogTitle>
//         <DialogContent sx={{ p: 0, height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: '#1e293b' }}>
//            <Typography sx={{ color: "#94a3b8" }}>Live Map Simulation Loading...</Typography>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// }
import { useState } from "react";
import { 
  Box, Typography, Paper, Button, Divider, Step, StepLabel, 
  Stepper, Dialog, DialogContent, DialogTitle, IconButton, Stack, 
  Grid, TextField, InputAdornment, Tabs, Tab, useTheme 
} from "@mui/material";
import { 
  LocalShipping, Replay, StarBorder, Close, Search,
  CheckCircle, PendingActions, HelpOutline, Receipt
} from "@mui/icons-material";
import { motion } from "framer-motion";

const ORDERS = [
  { 
    id: "403-992115-1102", 
    date: "March 30, 2026", 
    total: 194.50,
    shipTo: "John Doe",
    status: "In Transit", 
    statusStep: 1, 
    items: [{ name: "Nike Air Jordan 1 - Retro High OG (Chicago)", price: 180, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100" }] 
  },
  { 
    id: "403-110293-8821", 
    date: "March 22, 2026", 
    total: 582.00,
    shipTo: "John Doe",
    status: "Delivered", 
    statusStep: 3, 
    items: [{ name: "AirPods Pro Max - Space Gray", price: 549, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100" }] 
  },
];

const TRACKING_STEPS = ["Order Placed", "Shipped", "Out for Delivery", "Delivered"];

export default function AmazonOrders() {
  const [trackingOrder, setTrackingOrder] = useState(null);
  const [tabValue, setTabValue] = useState(0);

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 1050, margin: "0 auto", bgcolor: "#0f172a", minHeight: "100vh", color: "white" }}>
      
      {/* Top Breadcrumb & Header */}
      <Box sx={{ mb: 3 }}>
        <Typography sx={{ color: "#94a3b8", fontSize: "0.85rem", mb: 1 }}>Your Account › Your Orders</Typography>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>Your Orders</Typography>
        
        {/* Amazon-style Tabs & Search */}
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={2} sx={{ borderBottom: '1px solid #334155', pb: 0 }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} textColor="inherit" sx={{ 
            '& .MuiTabs-indicator': { bgcolor: '#fbbf24', height: 3 },
            '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, minWidth: 80, color: '#94a3b8' },
            '& .Mui-selected': { color: 'white !important' }
          }}>
            <Tab label="Orders" />
            <Tab label="Buy Again" />
            <Tab label="Not Yet Shipped" />
            <Tab label="Cancelled" />
          </Tabs>
          
          {/* <Box sx={{ pb: 1 }}>
            <TextField 
              placeholder="Search all orders" 
              size="small"
              sx={{ 
                bgcolor: 'white', borderRadius: 2, width: { xs: '100%', md: 300 },
                '& .MuiOutlinedInput-root': { '& fieldset': { border: 'none' } }
              }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment>,
                endAdornment: <Button variant="contained" size="small" sx={{ bgcolor: '#334155', borderRadius: 1.5, textTransform: 'none', px: 3, ml: 1 }}>Search</Button>
              }}
            />
          </Box> */}
        </Stack>
      </Box>

      {/* Orders List */}
      <Stack spacing={3}>
        {ORDERS.map((order) => (
          <Paper key={order.id} elevation={0} sx={{ borderRadius: 2, overflow: 'hidden', background: "#1e293b", border: "1px solid #334155" }}>
            
            {/* Meta Header (The Grey Bar) */}
            <Box sx={{ p: 2, bgcolor: '#334155', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
              <Stack direction="row" spacing={4}>
                <Box>
                  <Typography sx={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase' }}>Order Placed</Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'white' }}>{order.date}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase' }}>Total</Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: 'white' }}>${order.total.toFixed(2)}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 700, textTransform: 'uppercase' }}>Ship To</Typography>
                  <Typography sx={{ fontSize: '0.85rem', color: '#3b82f6', cursor: 'pointer', fontWeight: 600 }}>{order.shipTo}</Typography>
                </Box>
              </Stack>
              <Box sx={{ textAlign: 'right' }}>
                <Typography sx={{ fontSize: '0.7rem', color: '#cbd5e1', fontWeight: 700 }}>ORDER # {order.id}</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 0.5 }}>
                  <Typography sx={{ fontSize: '0.8rem', color: '#3b82f6', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>View order details</Typography>
                  <Divider orientation="vertical" flexItem sx={{ bgcolor: '#475569' }} />
                  <Typography sx={{ fontSize: '0.8rem', color: '#3b82f6', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}>Invoice</Typography>
                </Stack>
              </Box>
            </Box>

            {/* Content Body */}
            <Grid container sx={{ p: 3 }}>
              <Grid item xs={12} md={8}>
                <Stack spacing={3}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {order.status === 'Delivered' ? <CheckCircle sx={{ color: '#10b981' }} /> : <PendingActions sx={{ color: '#fbbf24' }} />}
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{order.status}</Typography>
                  </Stack>
                  
                  {order.items.map((item, idx) => (
                    <Stack key={idx} direction="row" spacing={2} alignItems="flex-start">
                      <Box component="img" src={item.img} sx={{ width: 90, height: 90, borderRadius: 1.5, objectFit: 'cover', border: '1px solid #475569' }} />
                      <Box>
                        <Typography sx={{ fontWeight: 700, color: "#3b82f6", cursor: 'pointer', '&:hover': { color: '#fbbf24' } }}>{item.name}</Typography>
                        <Typography sx={{ fontSize: '0.8rem', color: '#94a3b8', my: 0.5 }}>Return window closed on April 29, 2026</Typography>
                        <Button 
                          size="small" 
                          variant="contained" 
                          startIcon={<Replay />}
                          sx={{ bgcolor: '#fbbf24', color: '#000', fontWeight: 800, textTransform: 'none', mt: 1, borderRadius: 2 }}
                        >
                          Buy it again
                        </Button>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Grid>

              {/* Action Buttons Side */}
              <Grid item xs={12} md={4} sx={{ mt: { xs: 3, md: 0 }, borderLeft: { md: '1px solid #334155' }, pl: { md: 3 } }}>
                <Stack spacing={1.5}>
                  <Button fullWidth onClick={() => setTrackingOrder(order)} variant="contained" sx={{ bgcolor: '#3b82f6', borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>
                    Track package
                  </Button>
                  <Button fullWidth variant="outlined" sx={{ borderColor: '#475569', color: 'white', borderRadius: 2, textTransform: 'none' }}>
                    Return or replace items
                  </Button>
                  <Button fullWidth variant="outlined" sx={{ borderColor: '#475569', color: 'white', borderRadius: 2, textTransform: 'none' }}>
                    Share gift receipt
                  </Button>
                  <Button fullWidth variant="outlined" sx={{ borderColor: '#475569', color: 'white', borderRadius: 2, textTransform: 'none' }}>
                    Write a product review
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Stack>

      {/* Tracking Modal */}
      <Dialog open={Boolean(trackingOrder)} onClose={() => setTrackingOrder(null)} fullWidth maxWidth="sm" PaperProps={{ sx: { bgcolor: '#1e293b', borderRadius: 4, backgroundImage: 'none' } }}>
        <DialogTitle sx={{ color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Arriving Wednesday</Typography>
          <IconButton onClick={() => setTrackingOrder(null)} sx={{ color: 'white' }}><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
           <Box sx={{ py: 2 }}>
             <Stepper activeStep={trackingOrder?.statusStep} orientation="vertical" sx={{ 
               '& .MuiStepIcon-root.Mui-active': { color: '#fbbf24' },
               '& .MuiStepIcon-root.Mui-completed': { color: '#10b981' }
             }}>
               {TRACKING_STEPS.map((label) => (
                 <Step key={label}>
                   <StepLabel><Typography sx={{ color: 'white', fontWeight: 600 }}>{label}</Typography></StepLabel>
                 </Step>
               ))}
             </Stepper>
           </Box>
           <Divider sx={{ my: 2, borderColor: '#334155' }} />
           <Button fullWidth startIcon={<HelpOutline />} sx={{ color: '#3b82f6', textTransform: 'none' }}>Problem with order?</Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}