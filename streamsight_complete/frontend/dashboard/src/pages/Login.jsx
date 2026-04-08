// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box, Card, CardContent, TextField, Button, Typography,
//   InputAdornment, IconButton, CircularProgress, Chip, Divider, Alert
// } from "@mui/material";
// import { Visibility, VisibilityOff, ElectricBolt, Email, Lock, Info } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// const DEMO_CREDS = [
//   { email: "admin@streamsight.ai", pass: "admin123", role: "Admin" },
//   { email: "analyst@streamsight.ai", pass: "analyst123", role: "Analyst" },
// ];

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError("");
//     if (!email.trim()) { toast.error("Email is required"); return; }
//     if (!/\S+@\S+\.\S+/.test(email)) { toast.error("Enter a valid email address"); return; }
//     if (!password.trim()) { toast.error("Password is required"); return; }
//     if (password.length < 6) { toast.warning("Password must be at least 6 characters"); return; }

//     setLoading(true);
//     toast.info("🔐 Authenticating...", { autoClose: 900 });

//     try {
//       const res = await fetch(`${API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setApiError(data.error || "Login failed");
//         toast.error(`❌ ${data.error || "Login failed"}`);
//         setLoading(false);
//         return;
//       }

//       // Store JWT and user info
//       localStorage.setItem("ss_auth", "true");
//       localStorage.setItem("ss_token", data.token);
//       localStorage.setItem("ss_user", data.user.name);
//       localStorage.setItem("ss_email", data.user.email);
//       localStorage.setItem("ss_role", data.user.role);

//       toast.success(`✅ Welcome, ${data.user.name}! Redirecting...`, { autoClose: 1400 });
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       const msg = "Cannot connect to API server. Make sure the backend is running.";
//       setApiError(msg);
//       toast.error(`❌ ${msg}`);
//       setLoading(false);
//     }
//   };

//   return (
//     <Box sx={{
//       minHeight: "100vh", display: "flex", alignItems: "center",
//       justifyContent: "center", bgcolor: "#07090f", p: 2,
//       position: "relative", overflow: "hidden",
//     }}>
//       {/* Animated background blobs */}
//       {[
//         { c: "#00d4aa", top: "5%", left: "10%", s: 500 },
//         { c: "#3b82f6", bottom: "8%", right: "12%", s: 400 },
//         { c: "#8b5cf6", top: "45%", left: "55%", s: 300 },
//       ].map((b, i) => (
//         <motion.div key={i}
//           animate={{ x: [0, 25, -12, 0], y: [0, -20, 12, 0] }}
//           transition={{ duration: 8 + i * 2.5, repeat: Infinity, ease: "easeInOut" }}
//           style={{
//             position: "absolute", width: b.s, height: b.s, borderRadius: "50%",
//             background: b.c, opacity: 0.06, filter: "blur(80px)",
//             top: b.top, bottom: b.bottom, left: b.left, right: b.right, pointerEvents: "none",
//           }}
//         />
//       ))}

//       <motion.div
//         initial={{ opacity: 0, y: 28 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.55, ease: "easeOut" }}
//         style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 10 }}
//       >
//         <Card sx={{
//           background: "rgba(13,17,23,0.95)", backdropFilter: "blur(30px)",
//           border: "1px solid #1e293b", borderRadius: "20px",
//           boxShadow: "0 40px 100px rgba(0,0,0,0.7)",
//         }}>
//           <Box sx={{ height: 3, background: "linear-gradient(90deg, #00d4aa, #3b82f6, #8b5cf6)" }} />
//           <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
//             {/* Brand */}
//             <Box textAlign="center" mb={4}>
//               <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
//                 <Box sx={{
//                   width: 68, height: 68, borderRadius: "18px", mx: "auto", mb: 2,
//                   background: "linear-gradient(135deg, #00d4aa, #3b82f6)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   boxShadow: "0 0 40px rgba(0,212,170,0.45)",
//                 }}>
//                   <ElectricBolt sx={{ fontSize: 34, color: "#07090f" }} />
//                 </Box>
//               </motion.div>
//               <Typography variant="h4" fontWeight={800} sx={{
//                 background: "linear-gradient(135deg, #00d4aa, #3b82f6)",
//                 WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "-0.5px",
//               }}>
//                 StreamSight
//               </Typography>
//               <Typography sx={{ color: "#64748b", fontSize: "0.78rem", fontFamily: "'JetBrains Mono',monospace", mt: 0.5 }}>
//                 Real-Time ClickStream Analytics
//               </Typography>
//             </Box>

//             {/* Error alert */}
//             {apiError && (
//               <Alert severity="error" sx={{ mb: 2.5, borderRadius: 2, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#ef4444" }}>
//                 {apiError}
//               </Alert>
//             )}

//             {/* Form */}
//             <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
//               <TextField
//                 fullWidth label="Email Address" type="email" value={email}
//                 onChange={e => { setEmail(e.target.value); setApiError(""); }}
//                 autoComplete="email" placeholder="admin@streamsight.ai"
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Email sx={{ color: "#475569", fontSize: 20 }} /></InputAdornment>,
//                   sx: { fontFamily: "'JetBrains Mono',monospace", fontSize: "0.9rem" }
//                 }}
//               />
//               <TextField
//                 fullWidth label="Password" type={showPass ? "text" : "password"}
//                 value={password} onChange={e => { setPassword(e.target.value); setApiError(""); }}
//                 autoComplete="current-password"
//                 InputProps={{
//                   startAdornment: <InputAdornment position="start"><Lock sx={{ color: "#475569", fontSize: 20 }} /></InputAdornment>,
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton onClick={() => setShowPass(v => !v)} edge="end" size="small" sx={{ color: "#475569" }}>
//                         {showPass ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                   sx: { fontFamily: "'JetBrains Mono',monospace", fontSize: "0.9rem" }
//                 }}
//               />
//               <Button type="submit" variant="contained" fullWidth size="large"
//                 disabled={loading} sx={{ py: 1.6, mt: 0.5, fontSize: "0.95rem" }}>
//                 {loading
//                   ? <><CircularProgress size={16} sx={{ color: "#07090f", mr: 1.5 }} />Authenticating...</>
//                   : "Sign In →"}
//               </Button>
//             </Box>

//             <Divider sx={{ my: 3, borderColor: "#1e293b" }}>
//               <Typography sx={{ color: "#334155", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace" }}>DEMO ACCESS</Typography>
//             </Divider>

//             <Box sx={{ p: 2, borderRadius: 2, background: "rgba(0,212,170,0.04)", border: "1px solid rgba(0,212,170,0.12)" }}>
//               <Box display="flex" alignItems="center" gap={1} mb={1.5}>
//                 <Info sx={{ fontSize: 14, color: "#00d4aa" }} />
//                 <Typography sx={{ color: "#64748b", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace" }}>
//                   Click to auto-fill — credentials stored in MongoDB
//                 </Typography>
//               </Box>
//               <Box display="flex" gap={1} flexWrap="wrap">
//                 {DEMO_CREDS.map(c => (
//                   <Chip key={c.email}
//                     label={`${c.email.split("@")[0]} (${c.role})`}
//                     size="small"
//                     onClick={() => { setEmail(c.email); setPassword(c.pass); toast.info(`Filled: ${c.role} credentials`); }}
//                     sx={{
//                       cursor: "pointer", fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem",
//                       background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)", color: "#00d4aa",
//                       "&:hover": { background: "rgba(0,212,170,0.18)", transform: "scale(1.03)" }, transition: "all 0.2s",
//                     }}
//                   />
//                 ))}
//               </Box>
//             </Box>
//           </CardContent>
//         </Card>
//         <Typography textAlign="center" mt={2.5} sx={{ color: "#1e293b", fontSize: "0.72rem", fontFamily: "'JetBrains Mono',monospace" }}>
//           Credentials stored in MongoDB · JWT authenticated · StreamSight v2.0
//         </Typography>
//       </motion.div>
//     </Box>
//   );
// }




// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Visibility, VisibilityOff, ElectricBolt, Email, Lock } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const navigate = useNavigate();

//   // ── All existing logic preserved exactly ──────────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError("");
//     if (!email.trim()) { toast.error("Email is required"); return; }
//     if (!/\S+@\S+\.\S+/.test(email)) { toast.error("Enter a valid email address"); return; }
//     if (!password.trim()) { toast.error("Password is required"); return; }
//     if (password.length < 6) { toast.warning("Password must be at least 6 characters"); return; }

//     setLoading(true);
//     toast.info("🔐 Authenticating...", { autoClose: 900 });

//     try {
//       const res = await fetch(`${API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setApiError(data.error || "Login failed");
//         toast.error(`❌ ${data.error || "Login failed"}`);
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("ss_auth", "true");
//       localStorage.setItem("ss_token", data.token);
//       localStorage.setItem("ss_user", data.user.name);
//       localStorage.setItem("ss_email", data.user.email);
//       localStorage.setItem("ss_role", data.user.role);
//       // localStorage.setItem("ss_role",  data.user.role);

//       toast.success(`✅ Welcome, ${data.user.name}! Redirecting...`, { autoClose: 1400 });
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       const msg = "Cannot connect to API server. Make sure the backend is running.";
//       setApiError(msg);
//       toast.error(`❌ ${msg}`);
//       setLoading(false);
//     }
//   };
//   // ─────────────────────────────────────────────────────────────────────────

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

//         .ss-login-page {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 2rem 1rem;
//           background: #EEF3FF;
//           font-family: 'DM Sans', sans-serif;
//           position: relative;
//           overflow: hidden;
//         }

//         /* subtle grid */
//         .ss-login-page::after {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(55,138,221,0.045) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(55,138,221,0.045) 1px, transparent 1px);
//           background-size: 40px 40px;
//           pointer-events: none;
//           z-index: 0;
//         }

//         .ss-orb {
//           position: fixed;
//           border-radius: 50%;
//           pointer-events: none;
//           z-index: 0;
//         }

//         .ss-card {
//           width: 100%;
//           max-width: 424px;
//           position: relative;
//           z-index: 10;
//           background: rgba(255, 255, 255, 0.80);
//           backdrop-filter: blur(24px);
//           -webkit-backdrop-filter: blur(24px);
//           border: 1px solid rgba(255, 255, 255, 0.92);
//           border-radius: 24px;
//           padding: 1.5rem 1.8rem 1.5rem;
//           box-shadow:
//             0 4px 6px rgba(55,138,221,0.05),
//             0 20px 60px rgba(55,138,221,0.12),
//             0 1px 0 rgba(255,255,255,0.85) inset;
//         }

        

//         /* ── Logo ─────────────────────────────────────── */
//         .ss-logo-wrap {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin-bottom: 2rem;
//         }

//         .ss-logo-icon {
//           width: 58px;
//           height: 58px;
//           border-radius: 16px;
//           background: linear-gradient(135deg, #378ADD 0%, #185FA5 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 1rem;
//           box-shadow: 0 8px 24px rgba(55,138,221,0.30), 0 2px 4px rgba(55,138,221,0.18);
//           position: relative;
//           overflow: hidden;
//         }

//         .ss-logo-icon::before {
//           content: '';
//           position: absolute;
//           top: 0; left: 0; right: 0;
//           height: 48%;
//           background: rgba(255,255,255,0.13);
//           border-radius: 16px 16px 0 0;
//         }

//         .ss-brand-name {
//           font-size: 1.55rem;
//           font-weight: 600;
//           color: #0C447C;
//           letter-spacing: -0.035em;
//           line-height: 1;
//           margin-bottom: 0.35rem;
//         }

//         .ss-brand-sub {
//           font-size: 0.72rem;
//           color: #8facc0;
//           letter-spacing: 0.07em;
//           font-family: 'DM Mono', monospace;
//           font-weight: 400;
//           text-transform: uppercase;
//         }

//         /* ── Error alert ──────────────────────────────── */
//         .ss-error {
//           display: flex;
//           align-items: center;
//           gap: 8px;
//           background: rgba(226,75,74,0.07);
//           border: 1px solid rgba(226,75,74,0.22);
//           border-radius: 10px;
//           padding: 10px 14px;
//           font-size: 0.83rem;
//           color: #A32D2D;
//           margin-bottom: 1.1rem;
//           animation: ss-shake 0.35s ease;
//         }

//         @keyframes ss-shake {
//           0%,100% { transform: translateX(0); }
//           20%      { transform: translateX(-5px); }
//           40%      { transform: translateX(5px); }
//           60%      { transform: translateX(-3px); }
//           80%      { transform: translateX(3px); }
//         }

//         /* ── Fields ───────────────────────────────────── */
//         .ss-field {
//           margin-bottom: 1rem;
//         }

//         .ss-label {
//           display: block;
//           font-size: 0.78rem;
//           font-weight: 500;
//           color: #4a6080;
//           margin-bottom: 0.45rem;
//           letter-spacing: 0.01em;
//         }

//         .ss-input-wrap {
//           position: relative;
//         }

//         .ss-input-icon {
//           position: absolute;
//           left: 13px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #8facc0;
//           pointer-events: none;
//           display: flex;
//           align-items: center;
//           transition: color 0.2s;
//           font-size: 18px !important;
//         }

//         .ss-input {
//           width: 100%;
//           height: 48px;
//           padding: 0 14px 0 42px;
//           background: rgba(238,243,255,0.65);
//           border: 1px solid rgba(55,138,221,0.18);
//           border-radius: 12px;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.9rem;
//           color: #0f2040;
//           outline: none;
//           transition: all 0.2s;
//           -webkit-appearance: none;
//         }

//         .ss-input::placeholder { color: #8facc0; font-weight: 300; }

//         .ss-input:hover {
//           background: rgba(238,243,255,0.88);
//           border-color: rgba(55,138,221,0.32);
//         }

//         .ss-input:focus {
//           background: #ffffff;
//           border-color: rgba(55,138,221,0.58);
//           box-shadow: 0 0 0 3px rgba(55,138,221,0.10);
//         }

//         .ss-pw-toggle {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #8facc0;
//           padding: 4px;
//           border-radius: 6px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: color 0.2s;
//           font-size: 18px !important;
//         }

//         .ss-pw-toggle:hover { color: #378ADD; }

//         /* ── Forgot link ──────────────────────────────── */
//         .ss-forgot-row {
//           display: flex;
//           justify-content: flex-end;
//           margin-top: -0.3rem;
//           margin-bottom: 1.4rem;
//         }

//         .ss-forgot {
//           font-size: 0.78rem;
//           color: #378ADD;
//           text-decoration: none;
//           font-weight: 500;
//           transition: color 0.15s;
//         }

//         .ss-forgot:hover { color: #0C447C; }

//         /* ── Sign in button ───────────────────────────── */
//         .ss-btn {
//           width: 100%;
//           height: 50px;
//           background: linear-gradient(135deg, #378ADD 0%, #185FA5 100%);
//           border: none;
//           border-radius: 12px;
//           color: white;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.95rem;
//           font-weight: 600;
//           cursor: pointer;
//           letter-spacing: 0.01em;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           transition: all 0.2s;
//           box-shadow: 0 4px 16px rgba(55,138,221,0.30);
//           position: relative;
//           overflow: hidden;
//         }

//         .ss-btn:not(:disabled):hover {
//           transform: translateY(-1px);
//           box-shadow: 0 8px 24px rgba(55,138,221,0.40);
//         }

//         .ss-btn:not(:disabled):active { transform: translateY(0); }

//         .ss-btn:disabled {
//           opacity: 0.75;
//           cursor: not-allowed;
//           transform: none;
//         }

//         .ss-btn .ss-arrow { transition: transform 0.2s; }
//         .ss-btn:not(:disabled):hover .ss-arrow { transform: translateX(3px); }

//         /* ── Divider ──────────────────────────────────── */
//         .ss-divider {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//           margin: 1.5rem 0;
//         }

//         .ss-divider::before, .ss-divider::after {
//           content: '';
//           flex: 1;
//           height: 1px;
//           background: rgba(55,138,221,0.12);
//         }

//         .ss-divider span {
//           font-size: 0.7rem;
//           color: #8facc0;
//           font-family: 'DM Mono', monospace;
//           letter-spacing: 0.06em;
//           white-space: nowrap;
//         }

//         /* ── Google SSO button ────────────────────────── */
//         .ss-sso {
//           width: 100%;
//           height: 46px;
//           background: rgba(255,255,255,0.72);
//           border: 1px solid rgba(55,138,221,0.18);
//           border-radius: 12px;
//           color: #4a6080;
//           font-family: 'DM Sans', sans-serif;
//           font-size: 0.88rem;
//           font-weight: 500;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 9px;
//           transition: all 0.2s;
//         }

//         .ss-sso:hover {
//           background: white;
//           border-color: rgba(55,138,221,0.32);
//           color: #0f2040;
//           box-shadow: 0 2px 8px rgba(55,138,221,0.09);
//         }

//         /* ── Card footer ──────────────────────────────── */
//         .ss-card-footer {
//           margin-top: 1.6rem;
//           padding-top: 1.2rem;
//           border-top: 1px solid rgba(55,138,221,0.08);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           flex-wrap: wrap;
//         }

//         .ss-footer-badge {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           font-size: 0.7rem;
//           color: #8facc0;
//           font-family: 'DM Mono', monospace;
//         }

//         .ss-status-dot {
//           width: 6px;
//           height: 6px;
//           border-radius: 50%;
//           background: #1D9E75;
//           animation: ss-pulse 2s ease-in-out infinite;
//           flex-shrink: 0;
//         }

//         @keyframes ss-pulse {
//           0%,100% { opacity: 1; transform: scale(1); }
//           50%      { opacity: 0.55; transform: scale(0.8); }
//         }

//         .ss-footer-sep { color: rgba(55,138,221,0.2); font-size: 0.7rem; }

//         @media (max-width: 480px) {
//           .ss-card { padding: 2rem 1.5rem 1.5rem; border-radius: 20px; }
//           .ss-brand-name { font-size: 1.3rem; }
//         }
//       `}</style>

//       {/* Floating orbs — same positions as original blobs */}
//       <div className="ss-login-page">
//         {[
//           { color: "rgba(55,138,221,0.12)",  top: "5%",  left: "10%", size: 480 },
//           { color: "rgba(29,158,117,0.09)",  bottom: "8%", right: "12%", size: 380 },
//           { color: "rgba(96,165,250,0.08)",  top: "45%", left: "55%",  size: 280 },
//         ].map((b, i) => (
//           <motion.div
//             key={i}
//             className="ss-orb"
//             animate={{ x: [0, 25, -12, 0], y: [0, -20, 12, 0] }}
//             transition={{ duration: 8 + i * 2.5, repeat: Infinity, ease: "easeInOut" }}
//             style={{
//               width: b.size, height: b.size,
//               background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
//               filter: "blur(60px)",
//               top: b.top, bottom: b.bottom, left: b.left, right: b.right,
//             }}
//           />
//         ))}

//         <motion.div
//           initial={{ opacity: 0, y: 28 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.55, ease: "easeOut" }}
//           style={{ width: "100%", maxWidth: 424, position: "relative", zIndex: 10 }}
//         >
//           <div className="ss-card">

//             {/* Logo */}
//             <div className="ss-logo-wrap">
//               <motion.div
//                 animate={{ y: [0, -5, 0] }}
//                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
//               >
//                 <div className="ss-logo-icon">
//                   <ElectricBolt style={{ fontSize: 28, color: "white", position: "relative", zIndex: 1 }} />
//                 </div>
//               </motion.div>
//               <div className="ss-brand-name">StreamSight</div>
//               <div className="ss-brand-sub">Real-Time ClickStream Analytics</div>
//             </div>

//             {/* Error alert */}
//             {apiError && (
//               <div className="ss-error">
//                 <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
//                   <circle cx="8" cy="8" r="7" stroke="#E24B4A" strokeWidth="1.2"/>
//                   <path d="M8 5v4M8 11v.5" stroke="#E24B4A" strokeWidth="1.4" strokeLinecap="round"/>
//                 </svg>
//                 {apiError}
//               </div>
//             )}

//             {/* Form */}
//             <form onSubmit={handleSubmit} noValidate>

//               {/* Email */}
//               <div className="ss-field">
//                 <label className="ss-label" htmlFor="ss-email">Email Address</label>
//                 <div className="ss-input-wrap">
//                   <Email className="ss-input-icon" />
//                   <input
//                     id="ss-email"
//                     className="ss-input"
//                     type="email"
//                     placeholder="you@company.com"
//                     autoComplete="email"
//                     value={email}
//                     onChange={e => { setEmail(e.target.value); setApiError(""); }}
//                   />
//                 </div>
//               </div>

//               {/* Password */}
//               <div className="ss-field">
//                 <label className="ss-label" htmlFor="ss-password">Password</label>
//                 <div className="ss-input-wrap">
//                   <Lock className="ss-input-icon" />
//                   <input
//                     id="ss-password"
//                     className="ss-input"
//                     type={showPass ? "text" : "password"}
//                     placeholder="Enter your password"
//                     autoComplete="current-password"
//                     style={{ paddingRight: 44 }}
//                     value={password}
//                     onChange={e => { setPassword(e.target.value); setApiError(""); }}
//                   />
//                   <button
//                     type="button"
//                     className="ss-pw-toggle"
//                     onClick={() => setShowPass(v => !v)}
//                     aria-label="Toggle password visibility"
//                   >
//                     {showPass
//                       ? <Visibility style={{ fontSize: 18 }} />
//                       : <VisibilityOff style={{ fontSize: 18 }} />}
//                   </button>
//                 </div>
//               </div>

//               {/* Forgot */}
//               <div className="ss-forgot-row">
//                 <a href="#" className="ss-forgot">Forgot password?</a>
//               </div>

//               {/* Submit */}
//               <button type="submit" className="ss-btn" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation: "ss-spin 0.7s linear infinite" }}>
//                       <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
//                       <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
//                     </svg>
//                     Authenticating...
//                   </>
//                 ) : (
//                   <>
//                     Sign In
//                     <svg className="ss-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
//                       <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </>
//                 )}
//               </button>

//               <style>{`@keyframes ss-spin { to { transform: rotate(360deg); } }`}</style>
//             </form>

//             {/* Divider — no demo access, just SSO */}
//             <div className="ss-divider"><span>or continue with</span></div>

//             <button type="button" className="ss-sso">
//               <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//                 <path d="M14.5 8.18c0-.5-.04-.87-.12-1.25H8v2.36h3.65c-.08.6-.5 1.5-1.44 2.1l-.01.09 2.1 1.62.14.01c1.33-1.23 2.1-3.04 2.1-4.93z" fill="#4285F4"/>
//                 <path d="M8 14.5c1.84 0 3.38-.6 4.5-1.64l-2.14-1.66c-.57.4-1.34.68-2.36.68-1.8 0-3.32-1.22-3.87-2.9l-.08.01-2.18 1.69-.03.08C2.76 13.1 5.2 14.5 8 14.5z" fill="#34A853"/>
//                 <path d="M4.13 8.98A3.7 3.7 0 013.92 8c0-.34.06-.67.2-.98L2.1 5.3l-.07.03A6.5 6.5 0 001.5 8c0 1.05.25 2.04.69 2.92l1.94-1.94z" fill="#FBBC05"/>
//                 <path d="M8 4.12c1.27 0 2.13.55 2.62 1.01l1.91-1.86C11.37 2.19 9.84 1.5 8 1.5 5.2 1.5 2.76 2.9 1.57 5.07l1.94 1.94C4.06 5.34 5.58 4.12 8 4.12z" fill="#EA4335"/>
//               </svg>
//               Sign in with Google
//             </button>

//             {/* Footer */}
//             {/* <div className="ss-card-footer">
//               <div className="ss-footer-badge">
//                 <span className="ss-status-dot" />
//                 Pipeline Active
//               </div>
//               <span className="ss-footer-sep">·</span>
//               <div className="ss-footer-badge">StreamSight v2.0</div>
//               <span className="ss-footer-sep">·</span>
//               <div className="ss-footer-badge">JWT Auth</div>
//             </div> */}

//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }



// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Visibility, VisibilityOff, ElectricBolt, Email, Lock } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPass, setShowPass] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [apiError, setApiError] = useState("");
//   const navigate = useNavigate();

//   // ── Existing Logic with Improved Validation ───────────────────────────────
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setApiError("");

//     // Enhanced Validation
//     if (!email.trim()) { 
//       toast.error("Email is required"); 
//       return; 
//     }
//     if (!/\S+@\S+\.\S+/.test(email)) { 
//       toast.error("Please enter a valid email address (e.g., name@company.com)"); 
//       return; 
//     }
//     if (!password.trim()) { 
//       toast.error("Password is required"); 
//       return; 
//     }
//     if (password.length < 6) { 
//       toast.warning("Password must be at least 6 characters long"); 
//       return; 
//     }

//     setLoading(true);
//     toast.info("🔐 Authenticating...", { autoClose: 900 });

//     try {
//       const res = await fetch(`${API_URL}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setApiError(data.error || "Login failed");
//         toast.error(`❌ ${data.error || "Login failed"}`);
//         setLoading(false);
//         return;
//       }

//       localStorage.setItem("ss_auth", "true");
//       localStorage.setItem("ss_token", data.token);
//       localStorage.setItem("ss_user", data.user.name);
//       localStorage.setItem("ss_email", data.user.email);
//       localStorage.setItem("ss_role", data.user.role);

//       toast.success(`✅ Welcome, ${data.user.name}! Redirecting...`, { autoClose: 1400 });
//       setTimeout(() => navigate("/"), 1500);
//     } catch (err) {
//       const msg = "Cannot connect to API server. Make sure the backend is running.";
//       setApiError(msg);
//       toast.error(`❌ ${msg}`);
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

//         .ss-login-page {
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 1.5rem 1rem;
//           background: #EEF3FF;
//           font-family: 'DM Sans', sans-serif;
//           position: relative;
//         }

//         .ss-card {
//           width: 100%;
//           max-width: 410px;
//           position: relative;
//           z-index: 10;
//           background: rgba(255, 255, 255, 0.90);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(255, 255, 255, 1);
//           border-radius: 24px;
//           padding: 1.8rem 2.2rem 1.5rem; /* Reduced vertical padding */
//           box-shadow: 0 20px 60px rgba(55,138,221,0.12);
//         }

//         .ss-logo-wrap {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           margin-bottom: 1.5rem; /* Reduced from 2rem */
//         }

//         .ss-logo-icon {
//           width: 52px; /* Slightly smaller icon */
//           height: 52px;
//           border-radius: 14px;
//           background: linear-gradient(135deg, #378ADD 0%, #185FA5 100%);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           margin-bottom: 0.8rem;
//           box-shadow: 0 8px 20px rgba(55,138,221,0.25);
//         }

//         .ss-brand-name {
//           font-size: 1.45rem;
//           font-weight: 600;
//           color: #0C447C;
//           letter-spacing: -0.02em;
//           margin-bottom: 0.2rem;
//         }

//         .ss-brand-sub {
//           font-size: 0.68rem;
//           color: #8facc0;
//           letter-spacing: 0.05em;
//           font-family: 'DM Mono', monospace;
//           text-transform: uppercase;
//         }

//         .ss-field { margin-bottom: 0.9rem; }

//         .ss-label {
//           display: block;
//           font-size: 0.75rem;
//           font-weight: 600;
//           color: #4a6080;
//           margin-bottom: 0.4rem;
//         }

//         .ss-input-wrap { position: relative; }

//         .ss-input {
//           width: 100%;
//           height: 46px;
//           padding: 0 12px 0 40px;
//           background: #ffffff;
//           border: 1px solid rgba(55,138,221,0.2);
//           border-radius: 12px;
//           font-size: 0.88rem;
//           color: #0f2040;
//           transition: all 0.2s;
//         }

//         .ss-input:focus {
//           border-color: #378ADD;
//           box-shadow: 0 0 0 3px rgba(55,138,221,0.08);
//           outline: none;
//         }

//         .ss-input-icon {
//           position: absolute;
//           left: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           color: #8facc0;
//           font-size: 18px !important;
//         }

//         .ss-pw-toggle {
//           position: absolute;
//           right: 12px;
//           top: 50%;
//           transform: translateY(-50%);
//           background: none;
//           border: none;
//           cursor: pointer;
//           color: #8facc0;
//         }

//         .ss-forgot-row {
//           text-align: right;
//           margin-top: -0.2rem;
//           margin-bottom: 1.2rem;
//         }

//         .ss-forgot {
//           font-size: 0.75rem;
//           color: #378ADD;
//           text-decoration: none;
//           font-weight: 500;
//         }

//         .ss-btn {
//           width: 100%;
//           height: 48px;
//           background: linear-gradient(135deg, #378ADD 0%, #185FA5 100%);
//           border: none;
//           border-radius: 12px;
//           color: white;
//           font-size: 0.92rem;
//           font-weight: 600;
//           cursor: pointer;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 8px;
//           box-shadow: 0 4px 12px rgba(55,138,221,0.2);
//         }

//         .ss-divider {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           margin: 1.2rem 0;
//           font-size: 0.65rem;
//           color: #8facc0;
//           text-transform: uppercase;
//         }
//         .ss-divider::before, .ss-divider::after { content: ''; flex: 1; height: 1px; background: rgba(55,138,221,0.1); }

//         .ss-sso {
//           width: 100%;
//           height: 44px;
//           background: white;
//           border: 1px solid rgba(55,138,221,0.15);
//           border-radius: 12px;
//           color: #4a6080;
//           font-size: 0.85rem;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           gap: 10px;
//           cursor: pointer;
//         }

//         .ss-card-footer {
//           margin-top: 1.4rem;
//           padding-top: 1rem;
//           border-top: 1px solid rgba(55,138,221,0.06);
//           display: flex;
//           justify-content: center;
//           gap: 8px;
//           font-size: 0.65rem;
//           color: #8facc0;
//           font-family: 'DM Mono', monospace;
//         }

//         .ss-status-dot {
//           width: 6px; height: 6px; border-radius: 50%; background: #1D9E75;
//         }
//       `}</style>

//       <div className="ss-login-page">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="ss-card"
//         >
//           {/* Logo Section */}
//           <div className="ss-logo-wrap">
//             <div className="ss-logo-icon">
//               <ElectricBolt style={{ fontSize: 24, color: "white" }} />
//             </div>
//             <div className="ss-brand-name">StreamSight</div>
//             <div className="ss-brand-sub">Real-Time ClickStream Analytics</div>
//           </div>

//           <form onSubmit={handleSubmit}>
//             <div className="ss-field">
//               <label className="ss-label">Email Address</label>
//               <div className="ss-input-wrap">
//                 <Email className="ss-input-icon" />
//                 <input
//                   className="ss-input"
//                   type="text"
//                   placeholder="you@company.com"
//                   value={email}
//                   onChange={e => setEmail(e.target.value)}
//                 />
//               </div>
//             </div>

//             <div className="ss-field">
//               <label className="ss-label">Password</label>
//               <div className="ss-input-wrap">
//                 <Lock className="ss-input-icon" />
//                 <input
//                   className="ss-input"
//                   type={showPass ? "text" : "password"}
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={e => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="ss-pw-toggle"
//                   onClick={() => setShowPass(!showPass)}
//                 >
//                   {showPass ? <Visibility style={{ fontSize: 18 }} /> : <VisibilityOff style={{ fontSize: 18 }} />}
//                 </button>
//               </div>
//             </div>

//             <div className="ss-forgot-row">
//               <a href="#" className="ss-forgot">Forgot password?</a>
//             </div>

//             <button type="submit" className="ss-btn" disabled={loading}>
//               {loading ? "Authenticating..." : <>Sign In <ArrowForward fontSize="small" /></>}
//             </button>
//           </form>

//           <div className="ss-divider"><span>or continue with</span></div>

//           <button type="button" className="ss-sso">
//             <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/smartlock/google.svg" width="16" alt="G" />
//             Sign in with Google
//           </button>

//           <div className="ss-card-footer">
//             <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
//               <div className="ss-status-dot" /> Pipeline Active
//             </div>
//             <span>·</span>
//             <div>StreamSight v2.0</div>
//             <span>·</span>
//             <div>JWT Auth</div>
//           </div>
//         </motion.div>
//       </div>
//     </>
//   );
// }

// // Helper component for the icon
// function ArrowForward({ fontSize }) {
//   return (
//     <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ marginLeft: '4px' }}>
//       <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//     </svg>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, ElectricBolt, Email, Lock } from "@mui/icons-material";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

// ✅ FIX: decide where to send each role after login
function getRedirectPath(role) {
  if (role === "customer") return "/shop";   // customer → ShopStream layout
  return "/";                                // everyone else → Dashboard
}

export default function Login() {
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!email.trim())               { toast.error("Email is required"); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { toast.error("Enter a valid email address"); return; }
    if (!password.trim())            { toast.error("Password is required"); return; }
    if (password.length < 6)         { toast.warning("Password must be at least 6 characters"); return; }

    setLoading(true);
    toast.info("🔐 Authenticating...", { autoClose: 900 });

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setApiError(data.error || "Login failed");
        toast.error(`❌ ${data.error || "Login failed"}`);
        setLoading(false);
        return;
      }

      // ✅ Store all fields (role is critical for routing)
      localStorage.setItem("ss_auth",  "true");
      localStorage.setItem("ss_token", data.token);
      localStorage.setItem("ss_user",  data.user.name);
      localStorage.setItem("ss_email", data.user.email);
      localStorage.setItem("ss_role",  data.user.role);

      const role = data.user.role;
      const redirect = getRedirectPath(role);

      toast.success(`✅ Welcome, ${data.user.name}!`, { autoClose: 1400 });
      setTimeout(() => navigate(redirect), 1500);

    } catch (err) {
      const msg = "Cannot connect to API server. Make sure the backend is running.";
      setApiError(msg);
      toast.error(`❌ ${msg}`);
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        .ss-login-page {
          min-height: 100vh; display: flex; align-items: center; justify-content: center;
          padding: 2rem 1rem; background: #EEF3FF; font-family: 'DM Sans', sans-serif;
          position: relative; overflow: hidden;
        }
        .ss-login-page::after {
          content: ''; position: fixed; inset: 0;
          background-image: linear-gradient(rgba(55,138,221,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(55,138,221,0.045) 1px, transparent 1px);
          background-size: 40px 40px; pointer-events: none; z-index: 0;
        }
        .ss-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
        .ss-card {
          width: 100%; max-width: 424px; position: relative; z-index: 10;
          background: rgba(255,255,255,0.80); backdrop-filter: blur(24px);
          border: 1px solid rgba(255,255,255,0.92); border-radius: 24px;
          padding: 1.5rem 1.8rem; box-shadow: 0 4px 6px rgba(55,138,221,0.05), 0 20px 60px rgba(55,138,221,0.12);
        }
        .ss-logo-wrap { display: flex; flex-direction: column; align-items: center; margin-bottom: 2rem; }
        .ss-logo-icon {
          width: 58px; height: 58px; border-radius: 16px;
          background: linear-gradient(135deg,#378ADD 0%,#185FA5 100%);
          display: flex; align-items: center; justify-content: center; margin-bottom: 1rem;
          box-shadow: 0 8px 24px rgba(55,138,221,0.30); position: relative; overflow: hidden;
        }
        .ss-logo-icon::before { content:''; position:absolute; top:0; left:0; right:0; height:48%; background:rgba(255,255,255,0.13); border-radius:16px 16px 0 0; }
        .ss-brand-name { font-size:1.55rem; font-weight:600; color:#0C447C; letter-spacing:-0.035em; line-height:1; margin-bottom:0.35rem; }
        .ss-brand-sub  { font-size:0.72rem; color:#8facc0; letter-spacing:0.07em; font-family:'DM Mono',monospace; text-transform:uppercase; }
        .ss-error {
          display:flex; align-items:center; gap:8px; background:rgba(226,75,74,0.07);
          border:1px solid rgba(226,75,74,0.22); border-radius:10px; padding:10px 14px;
          font-size:0.83rem; color:#A32D2D; margin-bottom:1.1rem; animation:ss-shake 0.35s ease;
        }
        @keyframes ss-shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-5px)} 40%{transform:translateX(5px)} 60%{transform:translateX(-3px)} 80%{transform:translateX(3px)} }
        .ss-field { margin-bottom:1rem; }
        .ss-label { display:block; font-size:0.78rem; font-weight:500; color:#4a6080; margin-bottom:0.45rem; }
        .ss-input-wrap { position:relative; }
        .ss-input-icon { position:absolute; left:13px; top:50%; transform:translateY(-50%); color:#8facc0; pointer-events:none; display:flex; align-items:center; font-size:18px !important; }
        .ss-input {
          width:100%; height:48px; padding:0 14px 0 42px;
          background:rgba(238,243,255,0.65); border:1px solid rgba(55,138,221,0.18);
          border-radius:12px; font-family:'DM Sans',sans-serif; font-size:0.9rem; color:#0f2040; outline:none; transition:all 0.2s;
        }
        .ss-input::placeholder { color:#8facc0; }
        .ss-input:focus { background:#fff; border-color:rgba(55,138,221,0.58); box-shadow:0 0 0 3px rgba(55,138,221,0.10); }
        .ss-pw-toggle { position:absolute; right:12px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#8facc0; padding:4px; border-radius:6px; display:flex; align-items:center; transition:color 0.2s; font-size:18px !important; }
        .ss-pw-toggle:hover { color:#378ADD; }
        .ss-forgot-row { display:flex; justify-content:flex-end; margin-top:-0.3rem; margin-bottom:1.4rem; }
        .ss-forgot { font-size:0.78rem; color:#378ADD; text-decoration:none; font-weight:500; }
        .ss-forgot:hover { color:#0C447C; }
        .ss-btn {
          width:100%; height:50px; background:linear-gradient(135deg,#378ADD 0%,#185FA5 100%);
          border:none; border-radius:12px; color:white; font-family:'DM Sans',sans-serif;
          font-size:0.95rem; font-weight:600; cursor:pointer; display:flex; align-items:center;
          justify-content:center; gap:8px; transition:all 0.2s; box-shadow:0 4px 16px rgba(55,138,221,0.30);
        }
        .ss-btn:not(:disabled):hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(55,138,221,0.40); }
        .ss-btn:disabled { opacity:0.75; cursor:not-allowed; }
        .ss-btn .ss-arrow { transition:transform 0.2s; }
        .ss-btn:not(:disabled):hover .ss-arrow { transform:translateX(3px); }
        .ss-divider { display:flex; align-items:center; gap:12px; margin:1.5rem 0; }
        .ss-divider::before,.ss-divider::after { content:''; flex:1; height:1px; background:rgba(55,138,221,0.12); }
        .ss-divider span { font-size:0.7rem; color:#8facc0; font-family:'DM Mono',monospace; letter-spacing:0.06em; }
        .ss-sso {
          width:100%; height:46px; background:rgba(255,255,255,0.72);
          border:1px solid rgba(55,138,221,0.18); border-radius:12px; color:#4a6080;
          font-family:'DM Sans',sans-serif; font-size:0.88rem; font-weight:500;
          cursor:pointer; display:flex; align-items:center; justify-content:center; gap:9px; transition:all 0.2s;
        }
        .ss-sso:hover { background:white; border-color:rgba(55,138,221,0.32); color:#0f2040; }
        /* ✅ Role hint badges at bottom */
        .ss-role-hints { margin-top:1.4rem; display:flex; flex-direction:column; gap:6px; }
        .ss-role-row { display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius:8px; background:rgba(55,138,221,0.04); border:1px solid rgba(55,138,221,0.1); }
        .ss-role-badge { font-size:0.62rem; font-weight:700; padding:2px 6px; border-radius:4px; font-family:'DM Mono',monospace; white-space:nowrap; }
        .ss-role-email { font-size:0.72rem; color:#4a6080; font-family:'DM Mono',monospace; }
        @keyframes ss-spin { to { transform: rotate(360deg); } }
        @media (max-width:480px) { .ss-card { padding:2rem 1.5rem 1.5rem; border-radius:20px; } }
      `}</style>

      <div className="ss-login-page">
        {[
          { color:"rgba(55,138,221,0.12)",  top:"5%",  left:"10%",  size:480 },
          { color:"rgba(29,158,117,0.09)",  bottom:"8%", right:"12%", size:380 },
          { color:"rgba(96,165,250,0.08)",  top:"45%", left:"55%",  size:280 },
        ].map((b,i) => (
          <motion.div key={i} className="ss-orb"
            animate={{ x:[0,25,-12,0], y:[0,-20,12,0] }}
            transition={{ duration:8+i*2.5, repeat:Infinity, ease:"easeInOut" }}
            style={{ width:b.size, height:b.size, background:`radial-gradient(circle,${b.color} 0%,transparent 70%)`, filter:"blur(60px)", top:b.top, bottom:b.bottom, left:b.left, right:b.right }}
          />
        ))}

        <motion.div initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.55, ease:"easeOut" }}
          style={{ width:"100%", maxWidth:424, position:"relative", zIndex:10 }}>
          <div className="ss-card">

            {/* Logo */}
            <div className="ss-logo-wrap">
              <motion.div animate={{ y:[0,-5,0] }} transition={{ duration:3, repeat:Infinity, ease:"easeInOut" }}>
                <div className="ss-logo-icon">
                  <ElectricBolt style={{ fontSize:28, color:"white", position:"relative", zIndex:1 }} />
                </div>
              </motion.div>
              <div className="ss-brand-name">StreamSight</div>
              <div className="ss-brand-sub">Real-Time ClickStream Analytics</div>
            </div>

            {/* Error */}
            {apiError && (
              <div className="ss-error">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink:0 }}>
                  <circle cx="8" cy="8" r="7" stroke="#E24B4A" strokeWidth="1.2"/>
                  <path d="M8 5v4M8 11v.5" stroke="#E24B4A" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="ss-field">
                <label className="ss-label" htmlFor="ss-email">Email Address</label>
                <div className="ss-input-wrap">
                  <Email className="ss-input-icon" />
                  <input id="ss-email" className="ss-input" type="email" placeholder="you@company.com"
                    autoComplete="email" value={email}
                    onChange={e => { setEmail(e.target.value); setApiError(""); }} />
                </div>
              </div>

              {/* Password */}
              <div className="ss-field">
                <label className="ss-label" htmlFor="ss-password">Password</label>
                <div className="ss-input-wrap">
                  <Lock className="ss-input-icon" />
                  <input id="ss-password" className="ss-input" type={showPass?"text":"password"}
                    placeholder="Enter your password" autoComplete="current-password" style={{ paddingRight:44 }}
                    value={password} onChange={e => { setPassword(e.target.value); setApiError(""); }} />
                  <button type="button" className="ss-pw-toggle" onClick={() => setShowPass(v=>!v)}>
                    {showPass ? <Visibility style={{ fontSize:18 }}/> : <VisibilityOff style={{ fontSize:18 }}/>}
                  </button>
                </div>
              </div>

              <div className="ss-forgot-row">
                <a href="#" className="ss-forgot">Forgot password?</a>
              </div>

              <button type="submit" className="ss-btn" disabled={loading}>
                {loading ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ animation:"ss-spin 0.7s linear infinite" }}>
                      <circle cx="8" cy="8" r="6" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                      <path d="M8 2a6 6 0 016 6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    Authenticating...
                  </>
                ) : (
                  <>
                    Sign In
                    <svg className="ss-arrow" width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </>
                )}
              </button>
            </form>

            <div className="ss-divider"><span>or continue with</span></div>
            <button type="button" className="ss-sso">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M14.5 8.18c0-.5-.04-.87-.12-1.25H8v2.36h3.65c-.08.6-.5 1.5-1.44 2.1l-.01.09 2.1 1.62.14.01c1.33-1.23 2.1-3.04 2.1-4.93z" fill="#4285F4"/>
                <path d="M8 14.5c1.84 0 3.38-.6 4.5-1.64l-2.14-1.66c-.57.4-1.34.68-2.36.68-1.8 0-3.32-1.22-3.87-2.9l-.08.01-2.18 1.69-.03.08C2.76 13.1 5.2 14.5 8 14.5z" fill="#34A853"/>
                <path d="M4.13 8.98A3.7 3.7 0 013.92 8c0-.34.06-.67.2-.98L2.1 5.3l-.07.03A6.5 6.5 0 001.5 8c0 1.05.25 2.04.69 2.92l1.94-1.94z" fill="#FBBC05"/>
                <path d="M8 4.12c1.27 0 2.13.55 2.62 1.01l1.91-1.86C11.37 2.19 9.84 1.5 8 1.5 5.2 1.5 2.76 2.9 1.57 5.07l1.94 1.94C4.06 5.34 5.58 4.12 8 4.12z" fill="#EA4335"/>
              </svg>
              Sign in with Google
            </button>

            {/* ✅ Credential hints — helpful for demo */}
            {/* <div className="ss-role-hints">
              {[
                { role:"ADMIN",    email:"admin@streamsight.ai",  color:"#1D9E75", bg:"rgba(29,158,117,0.08)" },
                { role:"ANALYST",  email:"analyst@streamsight.ai",color:"#7F77DD", bg:"rgba(127,119,221,0.08)" },
                { role:"VIEWER",   email:"viewer@streamsight.ai", color:"#64748b", bg:"rgba(100,116,139,0.08)" },
                { role:"CUSTOMER", email:"arjun@shop.com",        color:"#f59e0b", bg:"rgba(245,158,11,0.08)" },
              ].map(r => (
                <div key={r.role} className="ss-role-row" 
                  onClick={() => { setEmail(r.email); setApiError(""); }}
                  title="Click to autofill email" style={{ cursor: "pointer",
       background: r.bg,
    borderColor: `${r.color}25`,
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 10px",
    borderRadius: 8,
    border: `1px solid ${r.color}25` }}>
                  <span className="ss-role-badge" style={{ background:`${r.color}18`, color:r.color }}>{r.role}</span>
                  <span className="ss-role-email">{r.email}</span>
                  <span style={{ marginLeft:"auto", fontSize:"0.6rem", color:"#8facc0", fontFamily:"DM Mono" }}>click to fill</span>
                </div>
              ))}
            </div> */}

          </div>
        </motion.div>
      </div>
    </>
  );
}
