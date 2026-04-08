// // import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// // import { ThemeProvider, CssBaseline, Box } from "@mui/material";
// // import { ToastContainer } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // import theme from "./theme";
// // import Navbar from "./components/Navbar";
// // import Dashboard from "./pages/Dashboard";
// // import Analytics from "./pages/Analytics";
// // import Login from "./pages/Login";
// // import EcommerceSimulator from "./pages/EcommerceSimulator";
// // import { useSocket } from "./hooks/useSocket";

// // function PrivateLayout() {
// //   const { connected } = useSocket();
// //   const isAuth = localStorage.getItem("ss_auth") === "true";
// //   if (!isAuth) return <Navigate to="/login" replace />;

// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#07090f" }}>
// //       <Navbar connected={connected} />
// //       <Box
// //         component="main"
// //         sx={{
// //           flex: 1,
// //           p: { xs: 2, md: 3 },
// //           overflow: "auto",
// //           // Account for collapsible navbar — use margin-left via CSS variable workaround
// //           minWidth: 0,
// //         }}
// //       >
// //         <Routes>
// //           <Route path="/" element={<Dashboard />} />
// //           <Route path="/analytics" element={<Analytics />} />
// //           <Route path="/ecommerce" element={<EcommerceSimulator />} />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </Box>
// //     </Box>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/*" element={<PrivateLayout />} />
// //         </Routes>
// //       </BrowserRouter>
// //       <ToastContainer
// //         position="top-right"
// //         autoClose={3000}
// //         hideProgressBar={false}
// //         newestOnTop
// //         closeOnClick
// //         pauseOnHover
// //         theme="dark"
// //         toastStyle={{
// //           background: "#0d1117",
// //           border: "1px solid #1e293b",
// //           borderRadius: "12px",
// //           fontFamily: "'Syne', sans-serif",
// //           color: "#e2e8f0",
// //         }}
// //       />
// //     </ThemeProvider>
// //   );
// // }


// // import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// // import { ThemeProvider, CssBaseline, Box } from "@mui/material";
// // import { ToastContainer } from "react-toastify";
// // import { AnimatePresence, motion } from "framer-motion";
// // import "react-toastify/dist/ReactToastify.css";

// // import theme from "./theme";
// // import Navbar from "./components/Navbar";
// // import Dashboard from "./pages/Dashboard";
// // import Analytics from "./pages/Analytics";
// // import Login from "./pages/Login";
// // import EcommerceSimulator from "./pages/EcommerceSimulator";
// // import { useSocket } from "./hooks/useSocket";

// // function AnimatedRoutes() {
// //   const location = useLocation();
// //   return (
// //     <AnimatePresence mode="wait">
// //       <motion.div
// //         key={location.pathname}
// //         initial={{ opacity: 0, x: 16 }}
// //         animate={{ opacity: 1, x: 0 }}
// //         exit={{ opacity: 0, x: -16 }}
// //         transition={{ duration: 0.25, ease: "easeInOut" }}
// //         style={{ flex: 1, minWidth: 0 }}
// //       >
// //         <Routes location={location}>
// //           <Route path="/" element={<Dashboard />} />
// //           <Route path="/analytics" element={<Analytics />} />
// //           <Route path="/ecommerce" element={<EcommerceSimulator />} />
// //           <Route path="*" element={<Navigate to="/" replace />} />
// //         </Routes>
// //       </motion.div>
// //     </AnimatePresence>
// //   );
// // }

// // function PrivateLayout() {
// //   const { connected } = useSocket();
// //   const isAuth = localStorage.getItem("ss_auth") === "true";
// //   if (!isAuth) return <Navigate to="/login" replace />;
// //   return (
// //     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
// //       <Navbar connected={connected} />
// //       <AnimatedRoutes />
// //     </Box>
// //   );
// // }

// // export default function App() {
// //   return (
// //     <ThemeProvider theme={theme}>
// //       <CssBaseline />
// //       <BrowserRouter>
// //         <Routes>
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/*" element={<PrivateLayout />} />
// //         </Routes>
// //       </BrowserRouter>
// //       <ToastContainer
// //         position="top-right" autoClose={3500}
// //         hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark"
// //       />
// //     </ThemeProvider>
// //   );
// // }
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import theme from "./theme";
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import PaymentPage from "./pages/PaymentPage";
// import { useSocket } from "./hooks/useSocket";
// import { CartProvider } from "./context/CartContext";
// import FlashSales from "./pages/FlashSales"
// import Orders from "./pages/Orders"

// function AnimatedRoutes() {
//   const location = useLocation();
//   return (
//     <AnimatePresence mode="wait">
//       <motion.div
//         key={location.pathname}
//         initial={{ opacity: 0, x: 12 }}
//         animate={{ opacity: 1, x: 0 }}
//         exit={{ opacity: 0, x: -12 }}
//         transition={{ duration: 0.22, ease: "easeInOut" }}
//         style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
//       >
//         <Routes location={location}>
//           <Route path="/" element={<Dashboard />} />
//           <Route path="/analytics" element={<Analytics />} />
//           <Route path="/ecommerce" element={<EcommerceSimulator />} />
//           <Route path="*" element={<Navigate to="/" replace />} />
//           <Route path="/flash-sales" element={<FlashSales />} />
// <Route path="/orders" element={<Orders />} />
//         </Routes>
//       </motion.div>
//     </AnimatePresence>
//   );
// }

// function PrivateLayout() {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   if (!isAuth) return <Navigate to="/login" replace />;
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
//       <Navbar connected={connected} />
//       <AnimatedRoutes />
//     </Box>
//   );
// }

// // Payment page is outside the dashboard layout (full white page like Amazon)
// function PaymentLayout() {
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   if (!isAuth) return <Navigate to="/login" replace />;
//   return <PaymentPage />;
// }

// export default function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/payment" element={<PaymentLayout />} />
//             <Route path="/*" element={<PrivateLayout />} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//       <ToastContainer
//         position="top-right" autoClose={3500}
//         hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="dark"
//       />
//     </ThemeProvider>
//   );
// }


// import { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box, LinearProgress, createTheme } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import { useSocket } from "./hooks/useSocket";

// // Build MUI theme based on dark/light mode
// function buildTheme(mode) {
//   return createTheme({
//     palette: {
//       mode,
//       primary: { main: "#00d4aa" },
//       secondary: { main: "#3b82f6" },
//       error: { main: "#ef4444" },
//       warning: { main: "#f59e0b" },
//       success: { main: "#10b981" },
//       background: {
//         default: mode === "dark" ? "#07090f" : "#f1f5f9",
//         paper:   mode === "dark" ? "#0d1117" : "#ffffff",
//       },
//       text: {
//         primary:   mode === "dark" ? "#e2e8f0" : "#0f172a",
//         secondary: "#64748b",
//       },
//     },
//     typography: { fontFamily: "'Syne','Inter',sans-serif" },
//     shape: { borderRadius: 12 },
//     components: {
//       MuiPaper: { styleOverrides: { root: { backgroundImage:"none" } } },
//       MuiButton: { styleOverrides: { root: { textTransform:"none", fontWeight:700 } } },
//     },
//   });
// }

// // Page transition wrapper
// function PageTransition({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity:0, y:10 }}
//       animate={{ opacity:1, y:0 }}
//       exit={{ opacity:0, y:-10 }}
//       transition={{ duration:0.22, ease:"easeInOut" }}
//       style={{ flex:1, display:"flex", flexDirection:"column", minWidth:0 }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // Page loader bar shown on route change
// function RouteLoader() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const t = setTimeout(() => setLoading(false), 400);
//     return () => clearTimeout(t);
//   }, [location.pathname]);

//   if (!loading) return null;
//   return (
//     <LinearProgress
//       sx={{
//         position: "fixed", top:0, left:0, right:0, zIndex:9999, height:2,
//         background: "transparent",
//         "& .MuiLinearProgress-bar": {
//           background: "linear-gradient(90deg,#00d4aa,#3b82f6,#a855f7)",
//         },
//       }}
//     />
//   );
// }

// function AnimatedRoutes({ role }) {
//   const location = useLocation();
//   const isViewer = role === "viewer";

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
//         <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
//         {!isViewer && <Route path="/ecommerce" element={<PageTransition><EcommerceSimulator /></PageTransition>} />}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// function PrivateLayout({ isDark, onToggleTheme }) {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role = (localStorage.getItem("ss_role") || "admin").toLowerCase();
//   const [shopEventCount, setShopEventCount] = useState(0);

//   if (!isAuth) return <Navigate to="/login" replace />;

//   return (
//     <Box sx={{ display:"flex", minHeight:"100vh", bgcolor: isDark ? "#07090f" : "#f1f5f9" }}>
//       <RouteLoader />
//       <Navbar
//         connected={connected}
//         isDark={isDark}
//         onToggleTheme={onToggleTheme}
//         shopEventCount={shopEventCount}
//       />
//       <Box component="main" sx={{ flex:1, p:{ xs:2,md:3 }, overflow:"auto", minWidth:0, display:"flex", flexDirection:"column" }}>
//         <AnimatedRoutes role={role} />
//       </Box>
//     </Box>
//   );
// }

// export default function App() {
//   const stored = localStorage.getItem("ss_theme") || "dark";
//   const [mode, setMode] = useState(stored);

//   const toggleTheme = () => {
//     setMode(m => {
//       const next = m === "dark" ? "light" : "dark";
//       localStorage.setItem("ss_theme", next);
//       return next;
//     });
//   };

//   const theme = buildTheme(mode);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/*" element={<PrivateLayout isDark={mode==="dark"} onToggleTheme={toggleTheme} />} />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer
//         position="top-right" autoClose={3000} hideProgressBar={false}
//         newestOnTop closeOnClick pauseOnHover theme={mode}
//         toastStyle={{
//           background: mode==="dark" ? "#0d1117" : "#ffffff",
//           border: mode==="dark" ? "1px solid #1e293b" : "1px solid #e2e8f0",
//           borderRadius:"12px", fontFamily:"'Syne',sans-serif",
//           color: mode==="dark" ? "#e2e8f0" : "#0f172a",
//         }}
//       />
//     </ThemeProvider>
//   );
// }



// import { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box, LinearProgress, createTheme } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import { useSocket } from "./hooks/useSocket";
// import { CartProvider } from "./context/CartContext"; // ✅ MERGED BACK
// import PaymentPage from "./pages/PaymentPage";
// // import {FlashSales} from "./pages/FlashSales";
// // import {Orders} from "./pages/Orders"


// // 🎨 Theme builder
// function buildTheme(mode) {
//   return createTheme({
//     palette: {
//       mode,
//       primary: { main: "#00d4aa" },
//       secondary: { main: "#3b82f6" },
//       error: { main: "#ef4444" },
//       warning: { main: "#f59e0b" },
//       success: { main: "#10b981" },
//       background: {
//         default: mode === "dark" ? "#07090f" : "#f1f5f9",
//         paper: mode === "dark" ? "#0d1117" : "#ffffff",
//       },
//       text: {
//         primary: mode === "dark" ? "#e2e8f0" : "#0f172a",
//         secondary: "#64748b",
//       },
//     },
//     typography: { fontFamily: "'Syne','Inter',sans-serif" },
//     shape: { borderRadius: 12 },
//   });
// }

// // 🔄 Page animation
// function PageTransition({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.22 }}
//       style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ⏳ Route loader
// function RouteLoader() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const t = setTimeout(() => setLoading(false), 400);
//     return () => clearTimeout(t);
//   }, [location.pathname]);

//   if (!loading) return null;

//   return (
//     <LinearProgress
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 9999,
//         height: 2,
//       }}
//     />
//   );
// }

// // 📦 Routes
// function AnimatedRoutes({ role }) {
//   const location = useLocation();
//   const isViewer = role === "viewer";

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
//         <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
//         {!isViewer && (
//           <Route path="/ecommerce" element={<PageTransition><EcommerceSimulator /></PageTransition>} />
//         )}
//         <Route path="*" element={<Navigate to="/" replace />} />
//         <Route path="/payment" element={<PaymentPage />} />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// // 🔐 Layout
// function PrivateLayout({ isDark, onToggleTheme }) {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role = (localStorage.getItem("ss_role") || "admin").toLowerCase();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: isDark ? "#07090f" : "#f1f5f9" }}>
//       <RouteLoader />
//       <Navbar connected={connected} isDark={isDark} onToggleTheme={onToggleTheme} />
//       <Box component="main" sx={{ flex: 1, p: 3, overflow: "auto", display: "flex", flexDirection: "column" }}>
//         <AnimatedRoutes role={role} />
//       </Box>
//     </Box>
//   );
// }

// // 🚀 APP
// export default function App() {
//   const stored = localStorage.getItem("ss_theme") || "dark";
//   const [mode, setMode] = useState(stored);

//   const toggleTheme = () => {
//     setMode(m => {
//       const next = m === "dark" ? "light" : "dark";
//       localStorage.setItem("ss_theme", next);
//       return next;
//     });
//   };

//   const theme = buildTheme(mode);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       {/* ✅ CART PROVIDER MERGED HERE */}
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route
//               path="/*"
//               element={<PrivateLayout isDark={mode === "dark"} onToggleTheme={toggleTheme} />}
//             />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>

//       <ToastContainer position="top-right" autoClose={3000} theme={mode} />
//     </ThemeProvider>
//   );
// }





// import { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box, LinearProgress, createTheme } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import { useSocket } from "./hooks/useSocket";
// import { CartProvider } from "./context/CartContext";
// import PaymentPage from "./pages/PaymentPage";
// import UserActivity from "./pages/UserActivity";


// // 🎨 Theme builder
// function buildTheme(mode) {
//   return createTheme({
//     palette: {
//       mode,
//       primary: { main: "#00d4aa" },
//       secondary: { main: "#3b82f6" },
//       background: {
//         default: mode === "dark" ? "#07090f" : "#f1f5f9",
//         paper: mode === "dark" ? "#0d1117" : "#ffffff",
//       },
//       text: {
//         primary: mode === "dark" ? "#e2e8f0" : "#0f172a",
//         secondary: "#64748b",
//       },
//     },
//     typography: { fontFamily: "'Syne','Inter',sans-serif" },
//     shape: { borderRadius: 12 },
//   });
// }

// // 🔄 Page animation
// function PageTransition({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.22 }}
//       style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ⏳ Route loader
// function RouteLoader() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const t = setTimeout(() => setLoading(false), 400);
//     return () => clearTimeout(t);
//   }, [location.pathname]);

//   if (!loading) return null;

//   return (
//     <LinearProgress
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         right: 0,
//         zIndex: 9999,
//         height: 2,
//       }}
//     />
//   );
// }

// // 📦 Routes (WITHOUT payment)
// function AnimatedRoutes({ role }) {
//   const location = useLocation();
//   const isViewer = role === "viewer";

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
//         <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
//         {!isViewer && (
//           <Route path="/ecommerce" element={<PageTransition><EcommerceSimulator /></PageTransition>} />
//         )}
//         <Route path="*" element={<Navigate to="/" replace />} />
//         {!isViewer && <Route path="/user-activity" element={<PageTransition><UserActivity /></PageTransition>} />}

//       </Routes>
//     </AnimatePresence>
//   );
// }

// // 🔐 Layout WITH Navbar
// function PrivateLayout({ isDark, onToggleTheme }) {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role = (localStorage.getItem("ss_role") || "admin").toLowerCase();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: isDark ? "#07090f" : "#f1f5f9" }}>
//       <RouteLoader />
//       <Navbar connected={connected} isDark={isDark} onToggleTheme={onToggleTheme} />
//       <Box component="main" sx={{ flex: 1, p: 3, overflow: "auto", display: "flex", flexDirection: "column" }}>
//         <AnimatedRoutes role={role} />
//       </Box>
//     </Box>
//   );
// }

// // ✅ Payment layout WITHOUT Navbar
// function PaymentLayout() {
//   const isAuth = localStorage.getItem("ss_auth") === "true";

//   if (!isAuth) return <Navigate to="/login" replace />;

//   return <PaymentPage />;
// }

// // 🚀 APP
// export default function App() {
//   const stored = localStorage.getItem("ss_theme") || "dark";
//   const [mode, setMode] = useState(stored);

//   const toggleTheme = () => {
//     setMode((m) => {
//       const next = m === "dark" ? "light" : "dark";
//       localStorage.setItem("ss_theme", next);
//       return next;
//     });
//   };

//   const theme = buildTheme(mode);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />

//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/login" element={<Login />} />

//             {/* ✅ Payment FULL PAGE (NO NAVBAR) */}
//             <Route path="/payment" element={<PaymentLayout />} />

//             {/* ✅ All other pages */}
//             <Route
//               path="/*"
//               element={<PrivateLayout isDark={mode === "dark"} onToggleTheme={toggleTheme} />}
//             />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>

//       <ToastContainer position="top-right" autoClose={3000} theme={mode} />
//     </ThemeProvider>
//   );
// }





// // frontend/dashboard/src/App.jsx — FULL REPLACEMENT
// import { useState, useEffect } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box, LinearProgress, createTheme } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import UserActivity from "./pages/UserActivity";
// // import CustomerLayout from "./CustomerLayout";

// function buildTheme(mode) {
//   return createTheme({
//     palette: {
//       mode,
//       primary: { main: "#00d4aa" },
//       secondary: { main: "#3b82f6" },
//       error: { main: "#ef4444" },
//       warning: { main: "#f59e0b" },
//       success: { main: "#10b981" },
//       background: {
//         default: mode === "dark" ? "#07090f" : "#f1f5f9",
//         paper:   mode === "dark" ? "#0d1117" : "#ffffff",
//       },
//       text: {
//         primary:   mode === "dark" ? "#e2e8f0" : "#0f172a",
//         secondary: "#64748b",
//       },
//     },
//     typography: { fontFamily: "'Syne','Inter',sans-serif" },
//     shape: { borderRadius: 12 },
//     components: {
//       MuiPaper: { styleOverrides: { root: { backgroundImage: "none" } } },
//       MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 700 } } },
//     },
//   });
// }

// function PageTransition({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }}
//       transition={{ duration: 0.22 }}
//       style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// function RouteLoader() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     setLoading(true);
//     const t = setTimeout(() => setLoading(false), 400);
//     return () => clearTimeout(t);
//   }, [location.pathname]);
//   if (!loading) return null;
//   return (
//     <LinearProgress sx={{
//       position:"fixed", top:0, left:0, right:0, zIndex:9999, height:2, background:"transparent",
//       "& .MuiLinearProgress-bar":{ background:"linear-gradient(90deg,#00d4aa,#3b82f6,#a855f7)" },
//     }} />
//   );
// }

// function AnimatedRoutes({ role }) {
//   const location = useLocation();
//   const isViewer   = role === "viewer";
//   const isCustomer = role === "customer";

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route path="/" element={<PageTransition><Dashboard /></PageTransition>} />
//         <Route path="/analytics" element={<PageTransition><Analytics /></PageTransition>} />
//         {!isViewer && !isCustomer && (
//           <Route path="/ecommerce" element={<PageTransition><EcommerceSimulator /></PageTransition>} />
//         )}
//         {!isViewer && !isCustomer && (
//           <Route path="/user-activity" element={<PageTransition><UserActivity /></PageTransition>} />
//         )}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// // Admin / Analyst / Viewer layout — full sidebar
// function StaffLayout({ isDark, onToggleTheme }) {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role = (localStorage.getItem("ss_role") || "admin").toLowerCase();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   return (
//     <Box sx={{ display:"flex", minHeight:"100vh", bgcolor: isDark ? "#07090f" : "#f1f5f9" }}>
//       <RouteLoader />
//       <Navbar connected={connected} isDark={isDark} onToggleTheme={onToggleTheme} />
//       <Box component="main" sx={{ flex:1, p:{ xs:2, md:3 }, overflow:"auto", minWidth:0, display:"flex", flexDirection:"column" }}>
//         <AnimatedRoutes role={role} />
//       </Box>
//     </Box>
//   );
// }

// // Route guard — decides which layout to show
// function PrivateRoute({ isDark, onToggleTheme }) {
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role   = (localStorage.getItem("ss_role") || "admin").toLowerCase();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   // 🛒 Customer → ShopStream-only layout
//   if (role === "customer") return <EcommerceSimulator />;

//   // 👑 Admin / Analyst / Viewer → full sidebar layout
//   return <StaffLayout isDark={isDark} onToggleTheme={onToggleTheme} />;
// }

// // Need useSocket inside component — import here
// import { useSocket } from "./hooks/useSocket";

// export default function App() {
//   const stored = localStorage.getItem("ss_theme") || "dark";
//   const [mode, setMode] = useState(stored);

//   const toggleTheme = () => {
//     setMode(m => {
//       const next = m === "dark" ? "light" : "dark";
//       localStorage.setItem("ss_theme", next);
//       return next;
//     });
//   };

//   const theme = buildTheme(mode);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/*" element={<PrivateRoute isDark={mode === "dark"} onToggleTheme={toggleTheme} />} />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer
//         position="top-right" autoClose={3000} hideProgressBar={false}
//         newestOnTop closeOnClick pauseOnHover theme={mode}
//         toastStyle={{
//           background: mode === "dark" ? "#0d1117" : "#ffffff",
//           border: mode === "dark" ? "1px solid #1e293b" : "1px solid #e2e8f0",
//           borderRadius: "12px", fontFamily: "'Syne',sans-serif",
//           color: mode === "dark" ? "#e2e8f0" : "#0f172a",
//         }}
//       />
//     </ThemeProvider>
//   );
// }



// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box, LinearProgress, createTheme } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import { AnimatePresence, motion } from "framer-motion";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar          from "./components/Navbar";
// import Dashboard       from "./pages/Dashboard";
// import Analytics       from "./pages/Analytics";
// import Login           from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import PaymentPage     from "./pages/PaymentPage";
// import UserActivity    from "./pages/UserActivity";
// // import CustomerLayout  from "./CustomerLayout";
// import { useSocket }   from "./hooks/useSocket";
// import { CartProvider } from "./context/CartContext";

// // ── Theme builder ──────────────────────────────────────────────
// function buildTheme(mode) {
//   return createTheme({
//     palette: {
//       mode,
//       primary:    { main: "#00d4aa" },
//       secondary:  { main: "#3b82f6" },
//       error:      { main: "#ef4444" },
//       warning:    { main: "#f59e0b" },
//       success:    { main: "#10b981" },
//       background: {
//         default: mode === "dark" ? "#07090f" : "#f1f5f9",
//         paper:   mode === "dark" ? "#0d1117" : "#ffffff",
//       },
//       text: {
//         primary:   mode === "dark" ? "#e2e8f0" : "#0f172a",
//         secondary: "#64748b",
//       },
//     },
//     typography: { fontFamily: "'Syne','Inter',sans-serif" },
//     shape: { borderRadius: 12 },
//     components: {
//       MuiPaper:  { styleOverrides: { root: { backgroundImage: "none" } } },
//       MuiButton: { styleOverrides: { root: { textTransform: "none", fontWeight: 700 } } },
//     },
//   });
// }

// // ── Page transition ────────────────────────────────────────────
// function PageTransition({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.22 }}
//       style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}
//     >
//       {children}
//     </motion.div>
//   );
// }

// // ── Top loader bar on route change ─────────────────────────────
// function RouteLoader() {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   useState(() => {
//     setLoading(true);
//     const t = setTimeout(() => setLoading(false), 400);
//     return () => clearTimeout(t);
//   }, [location.pathname]);
//   if (!loading) return null;
//   return (
//     <LinearProgress sx={{
//       position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999, height: 2, background: "transparent",
//       "& .MuiLinearProgress-bar": { background: "linear-gradient(90deg,#00d4aa,#3b82f6,#a855f7)" },
//     }} />
//   );
// }

// // ── Staff routes (Admin / Analyst / Viewer) ────────────────────
// function StaffRoutes({ role }) {
//   const location = useLocation();
//   const isViewer   = role === "viewer";

//   return (
//     <AnimatePresence mode="wait">
//       <Routes location={location} key={location.pathname}>
//         <Route path="/"             element={<PageTransition><Dashboard /></PageTransition>} />
//         <Route path="/analytics"    element={<PageTransition><Analytics /></PageTransition>} />
//         {!isViewer && (
//           <Route path="/ecommerce"    element={<PageTransition><EcommerceSimulator /></PageTransition>} />
//         )}
//         {!isViewer && (
//           <Route path="/user-activity" element={<PageTransition><UserActivity /></PageTransition>} />
//         )}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </AnimatePresence>
//   );
// }

// // ── Staff layout (sidebar + pages) ────────────────────────────
// function StaffLayout({ isDark, onToggleTheme }) {
//   const { connected } = useSocket();
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role   = (localStorage.getItem("ss_role") || "admin").toLowerCase();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: isDark ? "#07090f" : "#f1f5f9" }}>
//       <RouteLoader />
//       <Navbar connected={connected} isDark={isDark} onToggleTheme={onToggleTheme} />
//       <Box component="main" sx={{ flex: 1, p: 3, overflow: "auto", display: "flex", flexDirection: "column" }}>
//         <StaffRoutes role={role} />
//       </Box>
//     </Box>
//   );
// }

// // ── Payment page (no sidebar, no top bar) ─────────────────────
// function PaymentLayout() {
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   if (!isAuth) return <Navigate to="/login" replace />;
//   return <PaymentPage />;
// }

// // ── Main route guard — picks layout by role ───────────────────
// function PrivateRoute({ isDark, onToggleTheme }) {
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role   = (localStorage.getItem("ss_role") || "admin").toLowerCase();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   // ✅ Customer → full-screen shopping layout (no sidebar)
//   if (role === "customer") {
//     return <EcommerceSimulator isDark={isDark} onToggleTheme={onToggleTheme} />;
//   }

//   // ✅ Admin / Analyst / Viewer → sidebar layout
//   return <StaffLayout isDark={isDark} onToggleTheme={onToggleTheme} />;
// }

// // ── App root ──────────────────────────────────────────────────
// export default function App() {
//   const stored = localStorage.getItem("ss_theme") || "dark";
//   const [mode, setMode] = useState(stored);

//   const toggleTheme = () => {
//     setMode(m => {
//       const next = m === "dark" ? "light" : "dark";
//       localStorage.setItem("ss_theme", next);
//       return next;
//     });
//   };

//   const theme = buildTheme(mode);

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             {/* Public */}
//             <Route path="/login" element={<Login />} />

//             {/* Payment — full page, no nav, accessible by ALL logged-in roles */}
//             <Route path="/payment" element={<PaymentLayout />} />

//             {/* Customer shop routes — nested under /shop/* */}
//             {/* Handled inside CustomerLayout via nested Routes */}
//             <Route path="/shop/*" element={
//               (() => {
//                 const isAuth = localStorage.getItem("ss_auth") === "true";
//                 const role   = (localStorage.getItem("ss_role")||"admin").toLowerCase();
//                 if (!isAuth) return <Navigate to="/login" replace />;
//                 if (role !== "customer") return <Navigate to="/" replace />;
//                 return <EcommerceSimulator isDark={mode==="dark"} onToggleTheme={toggleTheme} />;
//               })()
//             } />

//             {/* All other pages — role-aware layout */}
//             <Route path="/*" element={
//               <PrivateRoute isDark={mode === "dark"} onToggleTheme={toggleTheme} />
//             } />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>

//       <ToastContainer
//         position="top-right" autoClose={3000} hideProgressBar={false}
//         newestOnTop closeOnClick pauseOnHover theme={mode}
//         toastStyle={{
//           background:   mode === "dark" ? "#0d1117" : "#ffffff",
//           border:       mode === "dark" ? "1px solid #1e293b" : "1px solid #e2e8f0",
//           borderRadius: "12px",
//           fontFamily:   "'Syne',sans-serif",
//           color:        mode === "dark" ? "#e2e8f0" : "#0f172a",
//         }}
//       />
//     </ThemeProvider>
//   );
// }


// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box, createTheme } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import UserActivity from "./pages/UserActivity";
// import { useSocket } from "./hooks/useSocket";

// const ROLE_ACCESS = {
//   admin: ["/", "/analytics", "/user-activity"],
//   analyst: ["/", "/analytics"],
//   viewer: ["/", "/analytics"],
//   customer: ["/ecommerce", "/flash-sales", "/orders"],
// };

// function StaffLayout({ role, children }) {
//   const { connected } = useSocket();
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#07090f" }}>
//       <Navbar connected={connected} />
//       <Box component="main" sx={{ flex: 1, p: 3, overflow: "auto" }}>
//         {children}
//       </Box>
//     </Box>
//   );
// }

// function PrivateRoute() {
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role = (localStorage.getItem("ss_role") || "viewer").toLowerCase();
//   const location = useLocation();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   const allowed = ROLE_ACCESS[role] || [];

//   // 1. Handle Customer Role (No sidebar layout)
//   if (role === "customer") {
//     if (location.pathname === "/") return <Navigate to="/ecommerce" replace />;
//     return <EcommerceSimulator />; 
//   }

//   // 2. Handle Staff Roles (Sidebar layout)
//   if (!allowed.includes(location.pathname) && location.pathname !== "/") {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <StaffLayout role={role}>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/analytics" element={<Analytics />} />
//         {role === "admin" && <Route path="/user-activity" element={<UserActivity />} />}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </StaffLayout>
//   );
// }

// export default function App() {
//   const theme = createTheme({ palette: { mode: "dark" } });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/login" element={<Login />} />
//           <Route path="/*" element={<PrivateRoute />} />
//         </Routes>
//       </BrowserRouter>
//       <ToastContainer theme="dark" />
//     </ThemeProvider>
//   );
// }




// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
// import { ThemeProvider, CssBaseline, Box, createTheme } from "@mui/material";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Components & Context
// import Navbar from "./components/Navbar";
// import Dashboard from "./pages/Dashboard";
// import Analytics from "./pages/Analytics";
// import Login from "./pages/Login";
// import EcommerceSimulator from "./pages/EcommerceSimulator";
// import UserActivity from "./pages/UserActivity";
// import { useSocket } from "./hooks/useSocket";
// import { CartProvider } from "./context/CartContext";

// // Define strict access here as well to prevent URL manual entry bypass
// const ROLE_ACCESS = {
//   admin: ["/", "/analytics", "/user-activity"],
//   analyst: ["/", "/analytics"],
//   viewer: ["/", "/analytics"],
//   customer: ["/ecommerce", "/flash-sales", "/orders"],
// };

// // Layout for Staff (Admin, Analyst, Viewer)
// function StaffLayout({ children }) {
//   const { connected } = useSocket();
//   return (
//     <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#07090f" }}>
//       <Navbar connected={connected} />
//       <Box component="main" sx={{ flex: 1, p: 3, overflow: "auto" }}>
//         {children}
//       </Box>
//     </Box>
//   );
// }

// // Global Guard & Role Splitter
// function PrivateRoute() {
//   const isAuth = localStorage.getItem("ss_auth") === "true";
//   const role = (localStorage.getItem("ss_role") || "viewer").toLowerCase();
//   const location = useLocation();

//   if (!isAuth) return <Navigate to="/login" replace />;

//   const allowed = ROLE_ACCESS[role] || [];

//   // CASE 1: Customer Role (No sidebar, redirects to Shop)
//   if (role === "customer") {
//     // If they try to go to Dashboard or Analytics, send to Shop
//     if (!allowed.includes(location.pathname)) return <Navigate to="/ecommerce" replace />;
//     return <EcommerceSimulator />; 
//   }

//   // CASE 2: Staff Roles (Sidebar Layout)
//   // Prevent Staff from accessing Customer-only pages
//   if (!allowed.includes(location.pathname) && location.pathname !== "/") {
//     return <Navigate to="/" replace />;
//   }

//   return (
//     <StaffLayout>
//       <Routes>
//         <Route path="/" element={<Dashboard />} />
//         <Route path="/analytics" element={<Analytics />} />
//         {role === "admin" && <Route path="/user-activity" element={<UserActivity />} />}
//         <Route path="*" element={<Navigate to="/" replace />} />
//       </Routes>
//     </StaffLayout>
//   );
// }

// export default function App() {
//   const theme = createTheme({ palette: { mode: "dark" } });

//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       {/* CartProvider MUST wrap the Router to fix the "useCart" error */}
//       <CartProvider>
//         <BrowserRouter>
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             {/* All other routes are protected */}
//             <Route path="/*" element={<PrivateRoute />} />
//           </Routes>
//         </BrowserRouter>
//       </CartProvider>
//       <ToastContainer theme="dark" position="top-right" autoClose={3000} />
//     </ThemeProvider>
//   );
// }




import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider, CssBaseline, Box, createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components & Context
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import EcommerceSimulator from "./pages/EcommerceSimulator";
import UserActivity from "./pages/UserActivity";
import PaymentPage from "./pages/PaymentPage"; // Ensure path is correct
import { useSocket } from "./hooks/useSocket";
import { CartProvider } from "./context/CartContext";
import FlashSales from "./pages/FlashSales"
import Orders from "./pages/Orders"

const ROLE_ACCESS = {
  admin: ["/", "/analytics", "/user-activity"],
  analyst: ["/", "/analytics"],
  viewer: ["/", "/analytics"],
  customer: ["/ecommerce", "/flash-sales", "/orders", "/payment"], 
};

function PrivateRoute() {
  const isAuth = localStorage.getItem("ss_auth") === "true";
  const role = (localStorage.getItem("ss_role") || "viewer").toLowerCase();
  const location = useLocation();

  if (!isAuth) return <Navigate to="/login" replace />;

  const allowed = ROLE_ACCESS[role] || [];

  // Redirect to their default landing page if they hit "/"
  if (location.pathname === "/") {
    if (role === "customer") return <Navigate to="/ecommerce" replace />;
  }

  // Check permissions: Redirect to home if path isn't allowed for their role
  if (!allowed.includes(location.pathname) && location.pathname !== "/") {
    return <Navigate to={role === "customer" ? "/ecommerce" : "/"} replace />;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#07090f" }}>
      {/* Navbar is now visible to EVERYONE inside PrivateRoute */}
      <Navbar /> 
      <Box component="main" sx={{ flex: 1, p: 3, overflow: "auto" }}>
        <Routes>
          {/* Staff Specific Routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/user-activity" element={<UserActivity />} />

          {/* Customer Specific Routes */}
          <Route path="/ecommerce" element={<EcommerceSimulator />} />
          <Route path="/flash-sales" element={<FlashSales tab="flash" />} />
          <Route path="/orders" element={<Orders tab="orders" />} />
          <Route path="/payment" element={<PaymentPage />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to={role === "customer" ? "/ecommerce" : "/"} replace />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default function App() {
  const theme = createTheme({ palette: { mode: "dark" } });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/*" element={<PrivateRoute />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
      <ToastContainer theme="dark" position="top-right" autoClose={3000} />
    </ThemeProvider>
  );
}