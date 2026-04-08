// import { useState } from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import {
//   Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
//   ListItemButton, Typography, Chip, Tooltip, IconButton, Avatar, Divider
// } from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined, Person
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";

// const DRAWER_WIDTH = 240;
// const COLLAPSED_WIDTH = 68;

// const NAV_ITEMS = [
//   { to: "/", label: "Dashboard", icon: <Dashboard />, end: true, color: "#00d4aa" },
//   { to: "/analytics", label: "Analytics", icon: <Analytics />, end: false, color: "#3b82f6" },
//   { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />, end: false, color: "#a855f7" },
// ];

// export default function Navbar({ connected }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const user = localStorage.getItem("ss_user") || "admin";
//   const role = localStorage.getItem("ss_role") || "Admin";

//   const width = collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH;

//   const handleLogout = () => {
//     localStorage.removeItem("ss_auth");
//     localStorage.removeItem("ss_user");
//     localStorage.removeItem("ss_role");
//     toast.info("👋 Logged out successfully");
//     setTimeout(() => navigate("/login"), 800);
//   };

//   return (
//     <Drawer variant="permanent" sx={{
//       width,
//       flexShrink: 0,
//       transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
//       "& .MuiDrawer-paper": {
//         width,
//         transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
//         overflowX: "hidden",
//         borderRight: "1px solid #1e293b",
//         background: "linear-gradient(180deg, #0a0f1a 0%, #07090f 100%)",
//       },
//     }}>
//       {/* Logo */}
//       <Box sx={{
//         p: collapsed ? 1.5 : 2.5,
//         borderBottom: "1px solid #1e293b",
//         display: "flex", alignItems: "center",
//         justifyContent: collapsed ? "center" : "space-between",
//         minHeight: 70,
//       }}>
//         {!collapsed && (
//           <Box display="flex" alignItems="center" gap={1.5}>
//             <Box sx={{
//               width: 38, height: 38, borderRadius: "10px",
//               background: "linear-gradient(135deg, #00d4aa, #3b82f6)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 0 20px rgba(0,212,170,0.35)", flexShrink: 0,
//             }}>
//               <ElectricBolt sx={{ fontSize: 20, color: "#07090f" }} />
//             </Box>
//             <Box>
//               <Typography fontWeight={800} sx={{ color: "#e2e8f0", fontSize: "0.95rem", lineHeight: 1.2 }}>
//                 StreamSight
//               </Typography>
//               <Typography sx={{ color: "#00d4aa", fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace" }}>
//                 Analytics
//               </Typography>
//             </Box>
//           </Box>
//         )}
//         {collapsed && (
//           <Box sx={{
//             width: 38, height: 38, borderRadius: "10px",
//             background: "linear-gradient(135deg, #00d4aa, #3b82f6)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//           }}>
//             <ElectricBolt sx={{ fontSize: 20, color: "#07090f" }} />
//           </Box>
//         )}
//         {!collapsed && (
//           <IconButton size="small" onClick={() => setCollapsed(true)} sx={{ color: "#334155", "&:hover": { color: "#00d4aa" } }}>
//             <ChevronLeft fontSize="small" />
//           </IconButton>
//         )}
//       </Box>

//       {/* Expand button when collapsed */}
//       {collapsed && (
//         <Box sx={{ display: "flex", justifyContent: "center", pt: 1 }}>
//           <IconButton size="small" onClick={() => setCollapsed(false)} sx={{ color: "#334155", "&:hover": { color: "#00d4aa" } }}>
//             <ChevronRight fontSize="small" />
//           </IconButton>
//         </Box>
//       )}

//       {/* Connection status */}
//       {!collapsed && (
//         <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
//           <Box sx={{
//             px: 2, py: 1.2, borderRadius: 2,
//             background: connected ? "rgba(0,212,170,0.06)" : "rgba(239,68,68,0.06)",
//             border: `1px solid ${connected ? "rgba(0,212,170,0.2)" : "rgba(239,68,68,0.2)"}`,
//             display: "flex", alignItems: "center", gap: 1,
//           }}>
//             <Box className={connected ? "live-dot" : ""} sx={{
//               width: 7, height: 7, borderRadius: "50%",
//               background: connected ? "#00d4aa" : "#ef4444", flexShrink: 0,
//             }} />
//             <Typography sx={{ color: connected ? "#00d4aa" : "#ef4444", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace" }}>
//               {connected ? "Pipeline Active" : "Disconnected"}
//             </Typography>
//           </Box>
//         </Box>
//       )}

//       {/* Nav */}
//       <Box sx={{ flex: 1, px: collapsed ? 0.5 : 1.5, py: 1 }}>
//         {!collapsed && (
//           <Typography sx={{ px: 1.5, mb: 1, color: "#1e293b", fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", letterSpacing: "0.15em", textTransform: "uppercase" }}>
//             Navigation
//           </Typography>
//         )}
//         <List dense disablePadding>
//           {NAV_ITEMS.map(item => (
//             <Tooltip key={item.to} title={collapsed ? item.label : ""} placement="right">
//               <ListItem disablePadding sx={{ mb: 0.5 }}>
//                 <NavLink to={item.to} end={item.end} style={{ width: "100%", textDecoration: "none" }}>
//                   {({ isActive }) => (
//                     <ListItemButton sx={{
//                       borderRadius: 2, minHeight: 44,
//                       justifyContent: collapsed ? "center" : "flex-start",
//                       px: collapsed ? 1 : 2,
//                       background: isActive
//                         ? `linear-gradient(135deg, ${item.color}18, ${item.color}08)`
//                         : "transparent",
//                       border: `1px solid ${isActive ? `${item.color}30` : "transparent"}`,
//                       "&:hover": {
//                         background: `${item.color}0a`,
//                         border: `1px solid ${item.color}20`,
//                       },
//                       transition: "all 0.2s",
//                     }}>
//                       <ListItemIcon sx={{
//                         minWidth: collapsed ? 0 : 36,
//                         color: isActive ? item.color : "#475569",
//                         "& svg": { fontSize: 20, transition: "color 0.2s" },
//                         mr: collapsed ? 0 : 0,
//                       }}>
//                         {item.icon}
//                       </ListItemIcon>
//                       {!collapsed && (
//                         <ListItemText
//                           primary={item.label}
//                           primaryTypographyProps={{
//                             fontSize: "0.875rem",
//                             fontWeight: isActive ? 700 : 500,
//                             color: isActive ? item.color : "#94a3b8",
//                             fontFamily: "'Syne', sans-serif",
//                           }}
//                         />
//                       )}
//                       {!collapsed && isActive && (
//                         <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: item.color, boxShadow: `0 0 8px ${item.color}`, flexShrink: 0 }} />
//                       )}
//                     </ListItemButton>
//                   )}
//                 </NavLink>
//               </ListItem>
//             </Tooltip>
//           ))}
//         </List>
//       </Box>

//       {/* Footer */}
//       <Divider sx={{ borderColor: "#1e293b" }} />
//       <Box sx={{ p: collapsed ? 1 : 2 }}>
//         {!collapsed ? (
//           <Box sx={{ p: 1.5, borderRadius: 2, background: "#0d1117", border: "1px solid #1e293b", display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Avatar sx={{ width: 32, height: 32, background: "linear-gradient(135deg, #00d4aa, #3b82f6)", fontSize: "0.8rem", fontWeight: 700 }}>
//               {user[0].toUpperCase()}
//             </Avatar>
//             <Box flex={1} minWidth={0}>
//               <Typography sx={{ color: "#e2e8f0", fontSize: "0.82rem", fontWeight: 600, lineHeight: 1.2 }}>{user}</Typography>
//               <Typography sx={{ color: "#475569", fontSize: "0.68rem", fontFamily: "'JetBrains Mono',monospace" }}>{role}</Typography>
//             </Box>
//             <Tooltip title="Logout">
//               <IconButton size="small" onClick={handleLogout} sx={{ color: "#334155", "&:hover": { color: "#ef4444" } }}>
//                 <LogoutOutlined fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         ) : (
//           <Tooltip title="Logout" placement="right">
//             <IconButton onClick={handleLogout} sx={{ color: "#334155", "&:hover": { color: "#ef4444" }, width: "100%" }}>
//               <LogoutOutlined fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Box>
//     </Drawer>
//   );
// }


// import { useState } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton,
//   Typography, Tooltip, IconButton, Avatar, Divider, Chip, Badge
// } from "@mui/material";
// import { Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined, NotificationsOutlined } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion } from "framer-motion";
// import { useSocket } from "../hooks/useSocket";

// const DRAWER_W = 248;
// const COLLAPSED_W = 68;

// const NAV = [
//   { to: "/",          label: "Dashboard",  icon: <Dashboard />,          end: true,  color: "#00d4aa", desc: "Live metrics" },
//   { to: "/analytics", label: "Analytics",  icon: <Analytics />,           end: false, color: "#a855f7", desc: "Historical trends" },
//   { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />,  end: false, color: "#f59e0b", desc: "E-commerce sim" },
// ];

// export default function Navbar({ connected }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { anomalies } = useSocket();
//   const highCount = anomalies.filter(a => a.severity === "high").length;
//   const user = localStorage.getItem("ss_user") || "Admin";
//   const role = localStorage.getItem("ss_role") || "admin";
//   const width = collapsed ? COLLAPSED_W : DRAWER_W;

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.info("👋 Logged out");
//     setTimeout(() => navigate("/login"), 700);
//   };

//   const activeColor = NAV.find(n => n.end ? location.pathname === n.to : location.pathname.startsWith(n.to))?.color || "#00d4aa";

//   return (
//     <Drawer variant="permanent" sx={{
//       width, flexShrink: 0,
//       transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
//       "& .MuiDrawer-paper": {
//         width, overflow: "hidden",
//         transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
//         background: "#0f172a",
//         borderRight: "1px solid #1e293b",
//       },
//     }}>
//       {/* Logo */}
//       <Box sx={{ p: collapsed ? 1.5 : 2.5, borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", minHeight: 72 }}>
//         {!collapsed && (
//           <Box display="flex" alignItems="center" gap={1.5}>
//             <Box sx={{
//               width: 40, height: 40, borderRadius: "12px", flexShrink: 0,
//               background: "linear-gradient(135deg, #00d4aa, #3b82f6)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 0 24px rgba(0,212,170,0.4)",
//             }}>
//               <ElectricBolt sx={{ fontSize: 22, color: "#0a0f1a" }} />
//             </Box>
//             <Box>
//               <Typography fontWeight={800} sx={{ color: "#f1f5f9", fontSize: "1rem", lineHeight: 1.2, letterSpacing: "-0.3px" }}>StreamSight</Typography>
//               <Typography sx={{ color: "#00d4aa", fontSize: "0.62rem", fontFamily: "'JetBrains Mono',monospace" }}>Analytics v2.0</Typography>
//             </Box>
//           </Box>
//         )}
//         {collapsed && (
//           <Box sx={{ width: 38, height: 38, borderRadius: "10px", background: "linear-gradient(135deg, #00d4aa, #3b82f6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <ElectricBolt sx={{ fontSize: 20, color: "#0a0f1a" }} />
//           </Box>
//         )}
//         {!collapsed && (
//           <IconButton size="small" onClick={() => setCollapsed(true)} sx={{ color: "#475569", "&:hover": { color: "#00d4aa" } }}>
//             <ChevronLeft fontSize="small" />
//           </IconButton>
//         )}
//       </Box>

//       {collapsed && (
//         <Box display="flex" justifyContent="center" pt={1}>
//           <IconButton size="small" onClick={() => setCollapsed(false)} sx={{ color: "#475569", "&:hover": { color: "#00d4aa" } }}>
//             <ChevronRight fontSize="small" />
//           </IconButton>
//         </Box>
//       )}

//       {/* Status */}
//       {!collapsed && (
//         <Box sx={{ px: 2.5, pt: 2, pb: 1 }}>
//           <Box sx={{
//             px: 2, py: 1.2, borderRadius: 2,
//             background: connected ? "rgba(0,212,170,0.06)" : "rgba(244,63,94,0.06)",
//             border: `1px solid ${connected ? "rgba(0,212,170,0.2)" : "rgba(244,63,94,0.2)"}`,
//             display: "flex", alignItems: "center", gap: 1,
//           }}>
//             <Box className={connected ? "live-dot" : ""} sx={{ width: 7, height: 7, borderRadius: "50%", background: connected ? "#00d4aa" : "#f43f5e", flexShrink: 0 }} />
//             <Typography sx={{ color: connected ? "#00d4aa" : "#f43f5e", fontSize: "0.68rem", fontFamily: "'JetBrains Mono',monospace" }}>
//               {connected ? "Pipeline Active" : "Disconnected"}
//             </Typography>
//             {highCount > 0 && (
//               <Chip label={`${highCount} HIGH`} size="small" sx={{ ml: "auto", height: 18, fontSize: "0.6rem", background: "rgba(244,63,94,0.15)", color: "#f43f5e", border: "1px solid rgba(244,63,94,0.3)", fontFamily: "'JetBrains Mono',monospace", animation: "glowPulse 2s ease-in-out infinite" }} />
//             )}
//           </Box>
//         </Box>
//       )}

//       {/* Nav items */}
//       <Box sx={{ flex: 1, px: collapsed ? 0.5 : 1.5, py: 1 }}>
//         {!collapsed && <Typography className="section-label" sx={{ px: 1.5, mb: 1.5, display: "block" }}>Navigation</Typography>}
//         <List dense disablePadding>
//           {NAV.map(item => (
//             <Tooltip key={item.to} title={collapsed ? `${item.label} — ${item.desc}` : ""} placement="right">
//               <ListItem disablePadding sx={{ mb: 0.5 }}>
//                 <NavLink to={item.to} end={item.end} style={{ width: "100%", textDecoration: "none" }}>
//                   {({ isActive }) => (
//                     <ListItemButton sx={{
//                       borderRadius: 2, minHeight: 46, justifyContent: collapsed ? "center" : "flex-start", px: collapsed ? 1 : 2,
//                       background: isActive ? `linear-gradient(135deg, ${item.color}15, ${item.color}08)` : "transparent",
//                       border: `1px solid ${isActive ? `${item.color}30` : "transparent"}`,
//                       "&:hover": { background: `${item.color}0a`, border: `1px solid ${item.color}20` },
//                       transition: "all 0.2s",
//                     }}>
//                       <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: isActive ? item.color : "#475569", "& svg": { fontSize: 20 } }}>
//                         {item.icon}
//                       </ListItemIcon>
//                       {!collapsed && (
//                         <>
//                           <ListItemText
//                             primary={item.label}
//                             secondary={!isActive ? item.desc : null}
//                             primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: isActive ? 700 : 500, color: isActive ? item.color : "#94a3b8" }}
//                             secondaryTypographyProps={{ fontSize: "0.65rem", color: "#475569", fontFamily: "'JetBrains Mono',monospace" }}
//                           />
//                           {isActive && <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: item.color, boxShadow: `0 0 8px ${item.color}`, flexShrink: 0 }} />}
//                         </>
//                       )}
//                     </ListItemButton>
//                   )}
//                 </NavLink>
//               </ListItem>
//             </Tooltip>
//           ))}
//         </List>
//       </Box>

//       {/* Footer user card */}
//       <Divider sx={{ borderColor: "#1e293b" }} />
//       <Box sx={{ p: collapsed ? 1 : 2 }}>
//         {!collapsed ? (
//           <Box sx={{ p: 1.5, borderRadius: 2, background: "#162032", border: "1px solid #1e293b", display: "flex", alignItems: "center", gap: 1.5 }}>
//             <Avatar sx={{ width: 34, height: 34, background: `linear-gradient(135deg, ${activeColor}, #3b82f6)`, fontSize: "0.85rem", fontWeight: 800 }}>
//               {user[0]?.toUpperCase()}
//             </Avatar>
//             <Box flex={1} minWidth={0}>
//               <Typography sx={{ color: "#f1f5f9", fontSize: "0.82rem", fontWeight: 700, lineHeight: 1.2, textTransform: "capitalize" }}>{user}</Typography>
//               <Typography sx={{ color: "#475569", fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", textTransform: "uppercase" }}>{role}</Typography>
//             </Box>
//             <Tooltip title="Logout">
//               <IconButton size="small" onClick={handleLogout} sx={{ color: "#334155", "&:hover": { color: "#f43f5e" } }}>
//                 <LogoutOutlined fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         ) : (
//           <Tooltip title="Logout" placement="right">
//             <IconButton onClick={handleLogout} sx={{ color: "#334155", "&:hover": { color: "#f43f5e" }, width: "100%" }}>
//               <LogoutOutlined fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Box>
//     </Drawer>
//   );
// }
// import { useState } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { Tooltip, IconButton } from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined,
//   NotificationsOutlined, WarningAmberRounded,
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSocket } from "../hooks/useSocket";

// // ── Constants — unchanged ───────────────────────────────────────────────────
// const DRAWER_W    = 248;
// const COLLAPSED_W = 68;

// const NAV = [
//   { to: "/",          label: "Dashboard",  icon: Dashboard,          end: true,  color: "#1D9E75", bg: "#E1F5EE", desc: "Live metrics" },
//   { to: "/analytics", label: "Analytics",  icon: Analytics,          end: false, color: "#7F77DD", bg: "#EEEDFE", desc: "Historical trends" },
//   { to: "/ecommerce", label: "ShopStream", icon: StorefrontOutlined, end: false, color: "#EF9F27", bg: "#FAEEDA", desc: "E-commerce sim" },
// ];

// // ── Avatar initials ─────────────────────────────────────────────────────────
// function UserAvatar({ name, color, size = 34 }) {
//   const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "50%",
//       background: `linear-gradient(135deg, ${color}, ${color}99)`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size * 0.35, fontWeight: 700, color: "white",
//       flexShrink: 0, letterSpacing: "-0.01em",
//       boxShadow: `0 2px 8px ${color}40`,
//     }}>{initials}</div>
//   );
// }

// export default function Navbar({ connected }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const { anomalies } = useSocket();

//   // ── All logic — unchanged ─────────────────────────────────────────────────
//   const highCount  = anomalies.filter(a => a.severity === "high").length;
//   const user       = localStorage.getItem("ss_user") || "Admin";
//   const role       = localStorage.getItem("ss_role") || "admin";
//   const width      = collapsed ? COLLAPSED_W : DRAWER_W;
//   const activeNav  = NAV.find(n => n.end ? location.pathname === n.to : location.pathname.startsWith(n.to));
//   const activeColor = activeNav?.color || "#1D9E75";

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.info("👋 Logged out");
//     setTimeout(() => navigate("/login"), 700);
//   };
//   // ──────────────────────────────────────────────────────────────────────────

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');
//         @keyframes nb-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.8)} }
//         @keyframes nb-shimmer { 0%{background-position:0% 0} 100%{background-position:200% 0} }
//         .nb-nav-btn { transition: all 0.18s ease; }
//         .nb-nav-btn:hover { background: rgba(255,255,255,0.04) !important; }
//         .nb-logout:hover { color: #E24B4A !important; background: rgba(226,75,74,0.08) !important; }
//         .nb-collapse-btn:hover { background: rgba(255,255,255,0.06) !important; }
//       `}</style>

//       {/* ── Sidebar shell ── */}
//       <motion.div
//         animate={{ width }}
//         transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
//         style={{
//           flexShrink: 0, height: "100vh", position: "sticky", top: 0,
//           background: "#0B1120",
//           borderRight: "1px solid rgba(255,255,255,0.06)",
//           display: "flex", flexDirection: "column",
//           overflow: "hidden", zIndex: 100,
//           fontFamily: "'DM Sans', sans-serif",
//         }}
//       >
//         {/* top accent line */}
//         <div style={{
//           height: 2, flexShrink: 0,
//           background: "linear-gradient(90deg,#1D9E75,#378ADD,#7F77DD,#EF9F27,#1D9E75)",
//           backgroundSize: "200% 100%",
//           animation: "nb-shimmer 5s linear infinite",
//         }} />

//         {/* ── Logo ── */}
//         <div style={{
//           padding: collapsed ? "16px 10px" : "16px 20px",
//           borderBottom: "1px solid rgba(255,255,255,0.06)",
//           display: "flex", alignItems: "center",
//           justifyContent: collapsed ? "center" : "space-between",
//           minHeight: 68, flexShrink: 0,
//         }}>
//           <AnimatePresence mode="wait">
//             {!collapsed ? (
//               <motion.div key="full" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
//                 style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
//                 {/* Logo icon */}
//                 <div style={{
//                   width: 38, height: 38, borderRadius: 11, flexShrink: 0,
//                   background: "linear-gradient(135deg,#1D9E75,#378ADD)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   boxShadow: "0 4px 14px rgba(29,158,117,0.35)",
//                 }}>
//                   <ElectricBolt style={{ fontSize: 20, color: "white" }} />
//                 </div>
//                 <div style={{ minWidth: 0 }}>
//                   <div style={{ fontWeight: 700, color: "#F1F5F9", fontSize: 15, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
//                     StreamSight
//                   </div>
//                   <div style={{ color: "#1D9E75", fontSize: 10, fontFamily: "'DM Mono',monospace", marginTop: 1 }}>
//                     Analytics v2.0
//                   </div>
//                 </div>
//               </motion.div>
//             ) : (
//               <motion.div key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
//                 <div style={{
//                   width: 36, height: 36, borderRadius: 10,
//                   background: "linear-gradient(135deg,#1D9E75,#378ADD)",
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   boxShadow: "0 4px 12px rgba(29,158,117,0.3)",
//                 }}>
//                   <ElectricBolt style={{ fontSize: 19, color: "white" }} />
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {!collapsed && (
//             <Tooltip title="Collapse sidebar">
//               <IconButton size="small" onClick={() => setCollapsed(true)}
//                 className="nb-collapse-btn"
//                 style={{ color: "#475569", borderRadius: 8, padding: 5 }}>
//                 <ChevronLeft fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           )}
//         </div>

//         {/* expand button when collapsed */}
//         {collapsed && (
//           <div style={{ display: "flex", justifyContent: "center", paddingTop: 8 }}>
//             <Tooltip title="Expand sidebar" placement="right">
//               <IconButton size="small" onClick={() => setCollapsed(false)}
//                 className="nb-collapse-btn"
//                 style={{ color: "#475569", borderRadius: 8, padding: 5 }}>
//                 <ChevronRight fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </div>
//         )}

//         {/* ── Pipeline status ── */}
//         {!collapsed && (
//           <div style={{ padding: "12px 16px 6px" }}>
//             <div style={{
//               padding: "9px 14px", borderRadius: 10,
//               background: connected ? "rgba(29,158,117,0.07)" : "rgba(226,75,74,0.07)",
//               border: `1px solid ${connected ? "rgba(29,158,117,0.22)" : "rgba(226,75,74,0.22)"}`,
//               display: "flex", alignItems: "center", gap: 8,
//             }}>
//               <div style={{
//                 width: 7, height: 7, borderRadius: "50%", flexShrink: 0,
//                 background: connected ? "#1D9E75" : "#E24B4A",
//                 animation: connected ? "nb-pulse 2s ease-in-out infinite" : "none",
//               }} />
//               <span style={{ color: connected ? "#1D9E75" : "#E24B4A", fontSize: 11, fontFamily: "'DM Mono',monospace", flex: 1 }}>
//                 {connected ? "Pipeline Active" : "Disconnected"}
//               </span>
//               {/* {highCount > 0 && (
//                 <motion.div
//                   animate={{ scale: [1, 1.08, 1] }}
//                   transition={{ duration: 1.5, repeat: Infinity }}
//                   style={{
//                     display: "flex", alignItems: "center", gap: 4,
//                     padding: "2px 8px", borderRadius: 20,
//                     background: "rgba(226,75,74,0.14)", border: "1px solid rgba(226,75,74,0.32)",
//                   }}>
//                   <WarningAmberRounded style={{ fontSize: 11, color: "#E24B4A" }} />
//                   <span style={{ fontSize: 10, fontFamily: "'DM Mono',monospace", color: "#E24B4A", fontWeight: 700 }}>
//                     {highCount} HIGH
//                   </span>
//                 </motion.div>
//               )} */}
//             </div>
//           </div>
//         )}

//         {/* ── Nav section label ── */}
//         {!collapsed && (
//           <div style={{ padding: "14px 20px 6px" }}>
//             <span style={{ fontSize: 10, fontWeight: 600, color: "#334155", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace" }}>
//               Navigation
//             </span>
//           </div>
//         )}

//         {/* ── Nav items ── */}
//         <div style={{ flex: 1, padding: collapsed ? "4px 8px" : "4px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
//           {NAV.map(item => {
//             const isActive = item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);
//             const IconComp = item.icon;
//             return (
//               <Tooltip key={item.to} title={collapsed ? `${item.label} — ${item.desc}` : ""} placement="right">
//                 <NavLink to={item.to} end={item.end} style={{ textDecoration: "none" }}>
//                   <motion.div
//                     whileHover={{ x: collapsed ? 0 : 2 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="nb-nav-btn"
//                     style={{
//                       display: "flex", alignItems: "center",
//                       gap: 10, padding: collapsed ? "10px" : "10px 14px",
//                       borderRadius: 10, cursor: "pointer",
//                       justifyContent: collapsed ? "center" : "flex-start",
//                       background: isActive
//                         ? `linear-gradient(135deg, ${item.color}18, ${item.color}08)`
//                         : "transparent",
//                       border: `1px solid ${isActive ? item.color + "30" : "transparent"}`,
//                       position: "relative", overflow: "hidden",
//                     }}
//                   >
//                     {/* Active left bar */}
//                     {isActive && (
//                       <motion.div
//                         layoutId="active-bar"
//                         style={{
//                           position: "absolute", left: 0, top: "20%", bottom: "20%",
//                           width: 3, borderRadius: "0 3px 3px 0",
//                           background: item.color,
//                           boxShadow: `0 0 8px ${item.color}`,
//                         }}
//                       />
//                     )}

//                     {/* Icon with colored bg when active */}
//                     <div style={{
//                       width: 32, height: 32, borderRadius: 8, flexShrink: 0,
//                       display: "flex", alignItems: "center", justifyContent: "center",
//                       background: isActive ? item.bg + "33" : "rgba(255,255,255,0.04)",
//                       border: `1px solid ${isActive ? item.color + "30" : "rgba(255,255,255,0.06)"}`,
//                       transition: "all 0.18s",
//                     }}>
//                       <IconComp style={{ fontSize: 17, color: isActive ? item.color : "#475569" }} />
//                     </div>

//                     <AnimatePresence>
//                       {!collapsed && (
//                         <motion.div
//                           initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
//                           style={{ flex: 1, minWidth: 0 }}
//                         >
//                           <div style={{
//                             fontSize: 13, fontWeight: isActive ? 600 : 500,
//                             color: isActive ? item.color : "#94A3B8",
//                             lineHeight: 1.2,
//                           }}>{item.label}</div>
//                           {!isActive && (
//                             <div style={{ fontSize: 10, color: "#334155", fontFamily: "'DM Mono',monospace", marginTop: 1 }}>
//                               {item.desc}
//                             </div>
//                           )}
//                         </motion.div>
//                       )}
//                     </AnimatePresence>

//                     {/* Active dot */}
//                     {isActive && !collapsed && (
//                       <div style={{
//                         width: 6, height: 6, borderRadius: "50%",
//                         background: item.color, flexShrink: 0,
//                         boxShadow: `0 0 6px ${item.color}`,
//                         animation: "nb-pulse 2s ease-in-out infinite",
//                       }} />
//                     )}
//                   </motion.div>
//                 </NavLink>
//               </Tooltip>
//             );
//           })}
//         </div>

//         {/* ── Divider ── */}
//         <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 12px" }} />

//         {/* ── User card ── */}
//         <div style={{ padding: collapsed ? "10px 8px" : "12px 12px", flexShrink: 0 }}>
//           {!collapsed ? (
//             <motion.div
//               whileHover={{ background: "rgba(255,255,255,0.04)" }}
//               style={{
//                 display: "flex", alignItems: "center", gap: 10,
//                 padding: "10px 12px", borderRadius: 12,
//                 background: "rgba(255,255,255,0.02)",
//                 border: "1px solid rgba(255,255,255,0.06)",
//               }}
//             >
//               <UserAvatar name={user} color={activeColor} size={34} />
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <div style={{ fontSize: 13, fontWeight: 600, color: "#F1F5F9", lineHeight: 1.2, textTransform: "capitalize", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
//                   {user}
//                 </div>
//                 <div style={{ fontSize: 10, color: "#475569", fontFamily: "'DM Mono',monospace", textTransform: "uppercase", marginTop: 1 }}>
//                   {role}
//                 </div>
//               </div>
//               <Tooltip title="Logout">
//                 <IconButton size="small" onClick={handleLogout}
//                   className="nb-logout"
//                   style={{ color: "#334155", borderRadius: 8, padding: 6, transition: "all 0.18s" }}>
//                   <LogoutOutlined style={{ fontSize: 16 }} />
//                 </IconButton>
//               </Tooltip>
//             </motion.div>
//           ) : (
//             <Tooltip title={`Logout (${user})`} placement="right">
//               <IconButton onClick={handleLogout}
//                 className="nb-logout"
//                 style={{ color: "#334155", borderRadius: 10, width: "100%", padding: "10px 0", transition: "all 0.18s" }}>
//                 <LogoutOutlined style={{ fontSize: 18 }} />
//               </IconButton>
//             </Tooltip>
//           )}
//         </div>
//       </motion.div>
//     </>
//   );
// }

// import { useState } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { Tooltip, IconButton, Badge, InputBase ,Typography} from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined, Search,
//   NotificationsOutlined, ShoppingBagOutlined, LocalOfferOutlined,
//   AccountCircleOutlined, SettingsOutlined
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSocket } from "../hooks/useSocket";


// const DRAWER_W = 260;
// const COLLAPSED_W = 72;

// const NAV = [
//   { to: "/", label: "Dashboard", icon: Dashboard, color: "#1D9E75", bg: "#E1F5EE", desc: "Live Overview" },
//   { to: "/ecommerce", label: "ShopStream", icon: StorefrontOutlined, color: "#EF9F27", bg: "#FAEEDA", desc: "Browse Products" },
//   { to: "/analytics", label: "Insights", icon: Analytics, color: "#7F77DD", bg: "#EEEDFE", desc: "Sales Reports" },
// ];

// const QUICK_LINKS = [
//   { label: "Flash Sales", icon: LocalOfferOutlined, color: "#F43F5E" },
//   { label: "My Orders", icon: ShoppingBagOutlined, color: "#3B82F6" },
// ];

// function UserAvatar({ name, color, size = 36 }) {
//   const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "10px",
//       background: `linear-gradient(135deg, ${color}, ${color}CC)`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size * 0.35, fontWeight: 700, color: "white", flexShrink: 0,
//       boxShadow: `0 4px 12px ${color}30`,
//     }}>{initials}</div>
//   );
// }

// export default function Navbar({ connected }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { anomalies } = useSocket();

//   const user = localStorage.getItem("ss_user") || "Admin";
//   const role = localStorage.getItem("ss_role") || "Vendor";
//   const width = collapsed ? COLLAPSED_W : DRAWER_W;

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.info("Logging out...");
//     setTimeout(() => navigate("/login"), 500);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap');
//         .nav-item-active { background: rgba(255,255,255,0.05); }
//         .nav-item-hover:hover { background: rgba(255,255,255,0.03); }
//         .search-focus:focus-within { border-color: #1D9E75 !important; background: rgba(255,255,255,0.05) !important; }
//       `}</style>

//       <motion.div
//         animate={{ width }}
//         transition={{ duration: 0.3, ease: "circOut" }}
//         style={{
//           height: "100vh", position: "sticky", top: 0, background: "#0F172A",
//           borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex",
//           flexDirection: "column", zIndex: 100, fontFamily: "'DM Sans', sans-serif",
//         }}
//       >
//         {/* ── LOGO SECTION ── */}
//         <div style={{ padding: "20px 16px", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{
//               width: 38, height: 38, borderRadius: 10, bgcolor: "#1D9E75",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               background: "linear-gradient(135deg, #10B981, #059669)",
//               boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)"
//             }}>
//               <ElectricBolt sx={{ color: "white", fontSize: 22 }} />
//             </div>
//             {!collapsed && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <Typography sx={{ color: "white", fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px" }}>StreamSight</Typography>
//                 <Typography sx={{ color: "#10B981", fontSize: 9, fontWeight: 700, textTransform: "uppercase" }}>Retail Engine</Typography>
//               </motion.div>
//             )}
//           </div>
//         </div>

//         {/* ── SEARCH (Retail style) ── */}
//         {!collapsed && (
//           <div style={{ padding: "0 16px 20px" }}>
//             <div className="search-focus" style={{
//               display: "flex", alignItems: "center", background: "rgba(255,255,255,0.03)",
//               borderRadius: "10px", padding: "6px 12px", border: "1px solid rgba(255,255,255,0.1)",
//               transition: "0.2s"
//             }}>
//               <Search sx={{ color: "#64748B", fontSize: 18 }} />
//               <InputBase placeholder="Search metrics..." sx={{ ml: 1, color: "white", fontSize: 13, flex: 1 }} />
//             </div>
//           </div>
//         )}

//         {/* ── NAVIGATION ── */}
//         <div style={{ flex: 1, px: 2, display: "flex", flexDirection: "column", gap: 4, padding: "0 12px" }}>
//           {!collapsed && (
//             <Typography sx={{ color: "#475569", fontSize: 10, fontWeight: 700, px: 1, mb: 1, textTransform: "uppercase" }}>Menu</Typography>
//           )}
          
//           {NAV.map((item) => {
//             const isActive = location.pathname === item.to;
//             return (
//               <Tooltip key={item.to} title={collapsed ? item.label : ""} placement="right">
//                 <NavLink to={item.to} style={{ textDecoration: "none" }}>
//                   <div className={isActive ? "" : "nav-item-hover"} style={{
//                     display: "flex", alignItems: "center", padding: "10px 12px", borderRadius: "10px",
//                     background: isActive ? `${item.color}15` : "transparent",
//                     border: `1px solid ${isActive ? `${item.color}30` : "transparent"}`,
//                     justifyContent: collapsed ? "center" : "flex-start", gap: 12, transition: "0.2s"
//                   }}>
//                     <item.icon sx={{ color: isActive ? item.color : "#64748B", fontSize: 20 }} />
//                     {!collapsed && (
//                       <div style={{ flex: 1 }}>
//                         <Typography sx={{ color: isActive ? "white" : "#94A3B8", fontSize: 14, fontWeight: isActive ? 600 : 500 }}>{item.label}</Typography>
//                         <Typography sx={{ color: "#475569", fontSize: 10 }}>{item.desc}</Typography>
//                       </div>
//                     )}
//                     {isActive && !collapsed && <div style={{ width: 4, height: 4, borderRadius: "50%", background: item.color }} />}
//                   </div>
//                 </NavLink>
//               </Tooltip>
//             );
//           })}

//           {/* ── QUICK LINKS (Amazon Style) ── */}
//           {!collapsed && (
//             <>
//               <Typography sx={{ color: "#475569", fontSize: 10, fontWeight: 700, px: 1, mt: 3, mb: 1, textTransform: "uppercase" }}>Quick Links</Typography>
//               {QUICK_LINKS.map(link => (
//                 <div key={link.label} className="nav-item-hover" style={{ display: "flex", alignItems: "center", padding: "8px 12px", borderRadius: "10px", gap: 12, cursor: "pointer" }}>
//                   <link.icon sx={{ color: "#64748B", fontSize: 18 }} />
//                   <Typography sx={{ color: "#94A3B8", fontSize: 13 }}>{link.label}</Typography>
//                 </div>
//               ))}
//             </>
//           )}
//         </div>

//         {/* ── FOOTER / USER ── */}
//         <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
//           <div style={{ 
//             display: "flex", alignItems: "center", gap: 12, 
//             padding: collapsed ? "0" : "10px", borderRadius: "12px",
//             background: collapsed ? "transparent" : "rgba(255,255,255,0.03)",
//             justifyContent: collapsed ? "center" : "flex-start"
//           }}>
//             <UserAvatar name={user} color="#3B82F6" size={collapsed ? 38 : 34} />
//             {!collapsed && (
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <Typography sx={{ color: "white", fontSize: 13, fontWeight: 600, noWrap: true }}>{user}</Typography>
//                 <Typography sx={{ color: "#10B981", fontSize: 10, fontWeight: 700 }}>{role}</Typography>
//               </div>
//             )}
//             {!collapsed && (
//               <IconButton size="small" onClick={handleLogout} sx={{ color: "#64748B", "&:hover": { color: "#F43F5E" } }}>
//                 <LogoutOutlined fontSize="small" />
//               </IconButton>
//             )}
//           </div>
//           {collapsed && (
//             <IconButton onClick={handleLogout} sx={{ color: "#64748B", width: "100%", mt: 1 }}>
//               <LogoutOutlined fontSize="small" />
//             </IconButton>
//           )}
//         </div>

//         {/* ── COLLAPSE TOGGLE ── */}
//         <div 
//           onClick={() => setCollapsed(!collapsed)}
//           style={{
//             position: "absolute", right: -12, top: 72, width: 24, height: 24,
//             background: "#1D9E75", borderRadius: "50%", display: "flex", 
//             alignItems: "center", justifyContent: "center", cursor: "pointer",
//             border: "4px solid #0F172A", color: "white"
//           }}
//         >
//           {collapsed ? <ChevronRight sx={{ fontSize: 14 }} /> : <ChevronLeft sx={{ fontSize: 14 }} />}
//         </div>
//       </motion.div>
//     </>
//   );
// }


// import { useState } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import { Tooltip, IconButton, InputBase, Typography } from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined, Search,
//   LocalOfferOutlined, ShoppingBagOutlined, 
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { motion, AnimatePresence } from "framer-motion";
// import { useSocket } from "../hooks/useSocket";

// const DRAWER_W = 260;
// const COLLAPSED_W = 72;

// const NAV = [
//   { to: "/", label: "Dashboard", icon: Dashboard, color: "#1D9E75", desc: "Live Overview" },
//   { to: "/ecommerce", label: "ShopStream", icon: StorefrontOutlined, color: "#EF9F27", desc: "Browse Products" },
//   { to: "/analytics", label: "Insights", icon: Analytics, color: "#7F77DD", desc: "Sales Reports" },
// ];

// // Added 'to' paths for these to make them work as NavLinks
// const QUICK_LINKS = [
//   { to: "/flash-sales", label: "Flash Sales", icon: LocalOfferOutlined, color: "#F43F5E" },
//   { to: "/orders", label: "My Orders", icon: ShoppingBagOutlined, color: "#3B82F6" },
// ];

// function UserAvatar({ name, color, size = 36 }) {
//   const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "10px",
//       background: `linear-gradient(135deg, ${color}, ${color}CC)`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size * 0.35, fontWeight: 700, color: "white", flexShrink: 0,
//       boxShadow: `0 4px 12px ${color}30`,
//     }}>{initials}</div>
//   );
// }

// export default function Navbar({ connected }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { anomalies } = useSocket();

//   const user = localStorage.getItem("ss_user") || "Admin";
//   const role = localStorage.getItem("ss_role") || "Vendor";
//   const width = collapsed ? COLLAPSED_W : DRAWER_W;

//   const handleLogout = () => {
//     localStorage.clear();
//     toast.info("Logging out...");
//     setTimeout(() => navigate("/login"), 500);
//   };

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        
//         /* Fixed Hover States */
//         .nav-link-item { 
//           transition: all 0.2s ease-in-out;
//           cursor: pointer;
//           text-decoration: none;
//         }
//         .nav-link-item:hover { 
//           background: rgba(255, 255, 255, 0.05) !important;
//         }
//         .nav-link-item:active {
//           transform: scale(0.98);
//         }
//         .search-focus:focus-within { 
//           border-color: #1D9E75 !important; 
//           background: rgba(255, 255, 255, 0.08) !important; 
//         }
//       `}</style>

//       <motion.div
//         animate={{ width }}
//         transition={{ duration: 0.3, ease: "circOut" }}
//         style={{
//           height: "100vh", position: "sticky", top: 0, background: "#0F172A",
//           borderRight: "1px solid rgba(255,255,255,0.08)", display: "flex",
//           flexDirection: "column", zIndex: 100, fontFamily: "'DM Sans', sans-serif",
//         }}
//       >
//         {/* ── LOGO ── */}
//         <div style={{ padding: "24px 16px", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between" }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
//             <div style={{
//               width: 38, height: 38, borderRadius: 10,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               background: "linear-gradient(135deg, #10B981, #059669)",
//               boxShadow: "0 0 20px rgba(16, 185, 129, 0.2)"
//             }}>
//               <ElectricBolt sx={{ color: "white", fontSize: 22 }} />
//             </div>
//             {!collapsed && (
//               <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
//                 <Typography sx={{ color: "white", fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px", lineHeight: 1 }}>StreamSight</Typography>
//                 <Typography sx={{ color: "#10B981", fontSize: 9, fontWeight: 700, textTransform: "uppercase", mt: 0.5 }}>Retail Engine</Typography>
//               </motion.div>
//             )}
//           </div>
//         </div>

//         {/* ── SEARCH ── */}
//         {!collapsed && (
//           <div style={{ padding: "0 16px 20px" }}>
//             <div className="search-focus" style={{
//               display: "flex", alignItems: "center", background: "rgba(255,255,255,0.03)",
//               borderRadius: "10px", padding: "8px 12px", border: "1px solid rgba(255,255,255,0.1)",
//               transition: "0.2s"
//             }}>
//               <Search sx={{ color: "#64748B", fontSize: 18 }} />
//               <InputBase placeholder="Search..." sx={{ ml: 1, color: "white", fontSize: 13, flex: 1 }} />
//             </div>
//           </div>
//         )}

//         {/* ── NAVIGATION ── */}
//         <div style={{ flex: 1, padding: "0 12px", display: "flex", flexDirection: "column", gap: 4 }}>
//           {!collapsed && (
//             <Typography sx={{ color: "#475569", fontSize: 10, fontWeight: 700, px: 1, mb: 1, textTransform: "uppercase", letterSpacing: 1 }}>Main Menu</Typography>
//           )}
          
//           {NAV.map((item) => {
//             const isActive = location.pathname === item.to;
//             return (
//               <Tooltip key={item.to} title={collapsed ? item.label : ""} placement="right">
//                 <NavLink to={item.to} className="nav-link-item" style={{
//                   display: "flex", alignItems: "center", padding: "12px", borderRadius: "10px",
//                   background: isActive ? `${item.color}15` : "transparent",
//                   border: `1px solid ${isActive ? `${item.color}30` : "transparent"}`,
//                   justifyContent: collapsed ? "center" : "flex-start", gap: 12,
//                 }}>
//                   <item.icon sx={{ color: isActive ? item.color : "#64748B", fontSize: 20 }} />
//                   {!collapsed && (
//                     <div style={{ flex: 1, minWidth: 0 }}>
//                       <Typography sx={{ color: isActive ? "white" : "#94A3B8", fontSize: 14, fontWeight: isActive ? 600 : 500 }}>{item.label}</Typography>
//                       <Typography sx={{ color: "#475569", fontSize: 10, noWrap: true, overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.desc}</Typography>
//                     </div>
//                   )}
//                 </NavLink>
//               </Tooltip>
//             );
//           })}

//           {/* ── QUICK LINKS (FIXED) ── */}
//           {!collapsed && (
//             <>
//               <Typography sx={{ color: "#475569", fontSize: 10, fontWeight: 700, px: 1, mt: 3, mb: 1, textTransform: "uppercase", letterSpacing: 1 }}>Quick Links</Typography>
//               {QUICK_LINKS.map(link => (
//                 <Tooltip key={link.label} title={collapsed ? link.label : ""} placement="right">
//                   <NavLink to={link.to} className="nav-link-item" style={{ 
//                     display: "flex", alignItems: "center", padding: "10px 12px", 
//                     borderRadius: "10px", gap: 12,
//                     background: location.pathname === link.to ? "rgba(255,255,255,0.05)" : "transparent"
//                   }}>
//                     <link.icon sx={{ color: location.pathname === link.to ? link.color : "#64748B", fontSize: 18 }} />
//                     <Typography sx={{ color: location.pathname === link.to ? "white" : "#94A3B8", fontSize: 13, fontWeight: 500 }}>{link.label}</Typography>
//                   </NavLink>
//                 </Tooltip>
//               ))}
//             </>
//           )}
//         </div>

//         {/* ── USER SECTION ── */}
//         <div style={{ padding: "16px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
//           <div style={{ 
//             display: "flex", alignItems: "center", gap: 12, 
//             padding: collapsed ? "0" : "10px", borderRadius: "12px",
//             background: collapsed ? "transparent" : "rgba(255,255,255,0.02)",
//             border: collapsed ? "none" : "1px solid rgba(255,255,255,0.05)",
//             justifyContent: collapsed ? "center" : "flex-start"
//           }}>
//             <UserAvatar name={user} color="#3B82F6" size={collapsed ? 38 : 34} />
//             {!collapsed && (
//               <div style={{ flex: 1, minWidth: 0 }}>
//                 <Typography sx={{ color: "white", fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user}</Typography>
//                 <Typography sx={{ color: "#10B981", fontSize: 10, fontWeight: 700, textTransform: 'uppercase' }}>{role}</Typography>
//               </div>
//             )}
//             {!collapsed && (
//               <IconButton size="small" onClick={handleLogout} sx={{ color: "#64748B", "&:hover": { color: "#F43F5E", background: 'rgba(244, 63, 94, 0.1)' } }}>
//                 <LogoutOutlined fontSize="small" />
//               </IconButton>
//             )}
//           </div>
//           {collapsed && (
//             <IconButton onClick={handleLogout} sx={{ color: "#64748B", width: "100%", mt: 1, "&:hover": { color: "#F43F5E" } }}>
//               <LogoutOutlined fontSize="small" />
//             </IconButton>
//           )}
//         </div>

//         {/* ── FLOATING TOGGLE ── */}
//         <div 
//           onClick={() => setCollapsed(!collapsed)}
//           style={{
//             position: "absolute", right: -12, top: 30, width: 24, height: 24,
//             background: "#1D9E75", borderRadius: "50%", display: "flex", 
//             alignItems: "center", justifyContent: "center", cursor: "pointer",
//             border: "4px solid #0F172A", color: "white", zIndex: 10,
//             boxShadow: "0 4px 10px rgba(0,0,0,0.3)"
//           }}
//         >
//           {collapsed ? <ChevronRight sx={{ fontSize: 14 }} /> : <ChevronLeft sx={{ fontSize: 14 }} />}
//         </div>
//       </motion.div>
//     </>
//   );
// }




// import { useState, useEffect, useCallback } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
//   ListItemButton, Typography, Chip, Tooltip, IconButton,
//   Avatar, Divider, Badge, Popover, Switch
// } from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined,
//   NotificationsOutlined, LightMode, DarkMode, Timer
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { useSocket } from "../hooks/useSocket";

// const DRAWER_W = 242;
// const COLLAPSED_W = 68;

// const NAV_ITEMS = [
//   { to: "/",          label: "Dashboard",  icon: <Dashboard />,         end: true,  color: "#00d4aa" },
//   { to: "/analytics", label: "Analytics",  icon: <Analytics />,          end: false, color: "#a855f7" },
//   { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />, end: false, color: "#f59e0b" },
// ];

// // Decode JWT expiry from localStorage
// function getTokenExpiry() {
//   try {
//     const token = localStorage.getItem("ss_token");
//     if (!token) return null;
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000; // ms
//   } catch { return null; }
// }

// function formatCountdown(ms) {
//   if (ms <= 0) return "Expired";
//   const h = Math.floor(ms / 3600000);
//   const m = Math.floor((ms % 3600000) / 60000);
//   const s = Math.floor((ms % 60000) / 1000);
//   if (h > 0) return `${h}h ${m}m`;
//   if (m > 0) return `${m}m ${s}s`;
//   return `${s}s`;
// }

// // Role access control
// const ROLE_ACCESS = {
//   admin:   ["/", "/analytics", "/ecommerce"],
//   analyst: ["/", "/analytics", "/ecommerce"],
//   viewer:  ["/", "/analytics"],
// };

// export default function Navbar({ connected, isDark, onToggleTheme, shopEventCount = 0 }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [bellAnchor, setBellAnchor] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { anomalies } = useSocket();

//   const user  = localStorage.getItem("ss_user")  || "Admin";
//   const role  = (localStorage.getItem("ss_role")  || "admin").toLowerCase();
//   const email = localStorage.getItem("ss_email") || "";
//   const width = collapsed ? COLLAPSED_W : DRAWER_W;

//   // Unread anomaly count — resets when bell is opened
//   useEffect(() => {
//     const high = anomalies.filter(a => a.severity === "high").length;
//     setUnreadCount(high);
//   }, [anomalies]);

//   // Session expiry countdown
//   useEffect(() => {
//     const expiry = getTokenExpiry();
//     if (!expiry) return;
//     const tick = () => {
//       const left = expiry - Date.now();
//       setTimeLeft(left);
//       if (left < 300000 && left > 0) { // warn at 5 min
//         toast.warning(`⏱ Session expires in ${formatCountdown(left)}`, { toastId: "session-warn", autoClose: false });
//       }
//       if (left <= 0) {
//         toast.error("Session expired — please login again");
//         handleLogout();
//       }
//     };
//     tick();
//     const iv = setInterval(tick, 1000);
//     return () => clearInterval(iv);
//   }, []);

//   const handleLogout = useCallback(() => {
//     ["ss_auth","ss_user","ss_role","ss_email","ss_token"].forEach(k => localStorage.removeItem(k));
//     toast.info("👋 Logged out");
//     setTimeout(() => navigate("/login"), 600);
//   }, [navigate]);

//   const allowedPaths = ROLE_ACCESS[role] || ["/"];
//   const visibleNav = NAV_ITEMS.filter(n => allowedPaths.includes(n.to));

//   const recentAnomalies = anomalies.slice(0, 5);

//   return (
//     <Drawer variant="permanent" sx={{
//       width, flexShrink: 0,
//       transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
//       "& .MuiDrawer-paper": {
//         width, transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
//         overflowX: "hidden", borderRight: "1px solid #1e293b",
//         background: "linear-gradient(180deg, #0a0f1a 0%, #07090f 100%)",
//       },
//     }}>
//       {/* Logo */}
//       <Box sx={{ p: collapsed ? 1.5 : 2.5, borderBottom: "1px solid #1e293b", display: "flex", alignItems: "center", justifyContent: collapsed ? "center" : "space-between", minHeight: 70 }}>
//         {!collapsed && (
//           <Box display="flex" alignItems="center" gap={1.5}>
//             <Box sx={{ width:38,height:38,borderRadius:"10px",background:"linear-gradient(135deg,#00d4aa,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center",boxShadow:"0 0 20px rgba(0,212,170,0.35)",flexShrink:0 }}>
//               <ElectricBolt sx={{ fontSize:20,color:"#07090f" }} />
//             </Box>
//             <Box>
//               <Typography fontWeight={800} sx={{ color:"#e2e8f0",fontSize:"0.95rem",lineHeight:1.2 }}>StreamSight</Typography>
//               <Typography sx={{ color:"#00d4aa",fontSize:"0.62rem",fontFamily:"'JetBrains Mono',monospace" }}>Analytics</Typography>
//             </Box>
//           </Box>
//         )}
//         {collapsed && (
//           <Box sx={{ width:38,height:38,borderRadius:"10px",background:"linear-gradient(135deg,#00d4aa,#3b82f6)",display:"flex",alignItems:"center",justifyContent:"center" }}>
//             <ElectricBolt sx={{ fontSize:20,color:"#07090f" }} />
//           </Box>
//         )}
//         {!collapsed && (
//           <IconButton size="small" onClick={() => setCollapsed(true)} sx={{ color:"#334155","&:hover":{color:"#00d4aa"} }}>
//             <ChevronLeft fontSize="small" />
//           </IconButton>
//         )}
//       </Box>

//       {collapsed && (
//         <Box display="flex" justifyContent="center" pt={1}>
//           <IconButton size="small" onClick={() => setCollapsed(false)} sx={{ color:"#334155","&:hover":{color:"#00d4aa"} }}>
//             <ChevronRight fontSize="small" />
//           </IconButton>
//         </Box>
//       )}

//       {/* Status + Tools Row */}
//       {!collapsed && (
//         <Box sx={{ px:2.5, pt:2, pb:1 }}>
//           {/* Pipeline status */}
//           <Box sx={{ px:2,py:1,borderRadius:2,background:connected?"rgba(0,212,170,0.06)":"rgba(239,68,68,0.06)",border:`1px solid ${connected?"rgba(0,212,170,0.2)":"rgba(239,68,68,0.2)"}`,display:"flex",alignItems:"center",gap:1,mb:1.5 }}>
//             <Box sx={{ width:7,height:7,borderRadius:"50%",background:connected?"#00d4aa":"#ef4444",flexShrink:0,
//               ...(connected ? { animation:"livePulse 2s ease-in-out infinite" } : {}) }} />
//             <Typography sx={{ color:connected?"#00d4aa":"#ef4444",fontSize:"0.7rem",fontFamily:"'JetBrains Mono',monospace",flex:1 }}>
//               {connected ? "Pipeline Active" : "Disconnected"}
//             </Typography>
//             {/* Notification Bell */}
//             <Tooltip title="Anomaly alerts">
//               <IconButton size="small" onClick={e => { setBellAnchor(e.currentTarget); setUnreadCount(0); }}
//                 sx={{ color:"#64748b","&:hover":{color:"#f43f5e"},p:0.3 }}>
//                 <Badge badgeContent={unreadCount} color="error" sx={{ "& .MuiBadge-badge":{fontSize:"0.55rem",height:14,minWidth:14} }}>
//                   <NotificationsOutlined sx={{ fontSize:17 }} />
//                 </Badge>
//               </IconButton>
//             </Tooltip>
//             {/* Dark/Light toggle */}
//             <Tooltip title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}>
//               <IconButton size="small" onClick={onToggleTheme} sx={{ color:"#64748b","&:hover":{color:"#f59e0b"},p:0.3 }}>
//                 {isDark ? <LightMode sx={{ fontSize:16 }} /> : <DarkMode sx={{ fontSize:16 }} />}
//               </IconButton>
//             </Tooltip>
//           </Box>

//           {/* Session timer */}
//           {timeLeft !== null && timeLeft > 0 && (
//             <Box sx={{ display:"flex",alignItems:"center",gap:0.8,px:1.5,py:0.6,borderRadius:1.5,
//               background: timeLeft < 300000 ? "rgba(244,63,94,0.08)" : "rgba(100,116,139,0.06)",
//               border:`1px solid ${timeLeft < 300000 ? "rgba(244,63,94,0.2)" : "#1e293b"}` }}>
//               <Timer sx={{ fontSize:12,color: timeLeft < 300000 ? "#f43f5e" : "#475569" }} />
//               <Typography sx={{ fontSize:"0.62rem",fontFamily:"'JetBrains Mono',monospace",color: timeLeft < 300000 ? "#f43f5e" : "#475569" }}>
//                 Session: {formatCountdown(timeLeft)}
//               </Typography>
//             </Box>
//           )}
//         </Box>
//       )}

//       {/* Nav items */}
//       <Box sx={{ flex:1, px:collapsed?0.5:1.5, py:1 }}>
//         {!collapsed && (
//           <Typography sx={{ px:1.5,mb:1,color:"#1e293b",fontSize:"0.62rem",fontFamily:"'JetBrains Mono',monospace",letterSpacing:"0.15em",textTransform:"uppercase" }}>
//             Navigation
//           </Typography>
//         )}
//         <List dense disablePadding>
//           {visibleNav.map(item => (
//             <Tooltip key={item.to} title={collapsed ? item.label : ""} placement="right">
//               <ListItem disablePadding sx={{ mb:0.5 }}>
//                 <NavLink to={item.to} end={item.end} style={{ width:"100%",textDecoration:"none" }}>
//                   {({ isActive }) => (
//                     <ListItemButton sx={{
//                       borderRadius:2,minHeight:44,justifyContent:collapsed?"center":"flex-start",px:collapsed?1:2,
//                       background:isActive?`linear-gradient(135deg,${item.color}18,${item.color}08)`:"transparent",
//                       border:`1px solid ${isActive?`${item.color}30`:"transparent"}`,
//                       "&:hover":{ background:`${item.color}0a`,border:`1px solid ${item.color}20` },
//                       transition:"all 0.2s",
//                     }}>
//                       <ListItemIcon sx={{ minWidth:collapsed?0:36,color:isActive?item.color:"#475569","& svg":{fontSize:20},mr:collapsed?0:0 }}>
//                         {/* Show event badge on ShopStream */}
//                         {item.to === "/ecommerce" && shopEventCount > 0 && !collapsed ? (
//                           <Badge badgeContent={shopEventCount} color="warning" max={99}
//                             sx={{ "& .MuiBadge-badge":{fontSize:"0.55rem",height:14,minWidth:14} }}>
//                             {item.icon}
//                           </Badge>
//                         ) : item.icon}
//                       </ListItemIcon>
//                       {!collapsed && (
//                         <>
//                           <ListItemText
//                             primary={item.label}
//                             primaryTypographyProps={{ fontSize:"0.875rem",fontWeight:isActive?700:500,color:isActive?item.color:"#94a3b8",fontFamily:"'Syne',sans-serif" }}
//                           />
//                           {/* Role chip for viewer */}
//                           {item.to==="/" && role==="viewer" && (
//                             <Chip label="READ" size="small" sx={{ height:14,fontSize:"0.5rem",background:"rgba(59,130,246,0.1)",color:"#60a5fa",border:"none" }} />
//                           )}
//                           {isActive && <Box sx={{ width:6,height:6,borderRadius:"50%",background:item.color,boxShadow:`0 0 8px ${item.color}`,flexShrink:0 }} />}
//                         </>
//                       )}
//                     </ListItemButton>
//                   )}
//                 </NavLink>
//               </ListItem>
//             </Tooltip>
//           ))}
//         </List>
//       </Box>

//       {/* Footer */}
//       <Divider sx={{ borderColor:"#1e293b" }} />
//       <Box sx={{ p:collapsed?1:2 }}>
//         {!collapsed ? (
//           <Box sx={{ p:1.5,borderRadius:2,background:"#0d1117",border:"1px solid #1e293b",display:"flex",alignItems:"center",gap:1.5 }}>
//             <Avatar sx={{ width:32,height:32,background:"linear-gradient(135deg,#00d4aa,#3b82f6)",fontSize:"0.8rem",fontWeight:700 }}>
//               {user[0]?.toUpperCase()}
//             </Avatar>
//             <Box flex={1} minWidth={0}>
//               <Typography sx={{ color:"#e2e8f0",fontSize:"0.82rem",fontWeight:600,lineHeight:1.2 }}>{user}</Typography>
//               <Typography sx={{ color:"#475569",fontSize:"0.65rem",fontFamily:"'JetBrains Mono',monospace",textTransform:"capitalize" }}>{role}</Typography>
//             </Box>
//             <Tooltip title="Logout">
//               <IconButton size="small" onClick={handleLogout} sx={{ color:"#334155","&:hover":{color:"#ef4444"} }}>
//                 <LogoutOutlined fontSize="small" />
//               </IconButton>
//             </Tooltip>
//           </Box>
//         ) : (
//           <Tooltip title="Logout" placement="right">
//             <IconButton onClick={handleLogout} sx={{ color:"#334155","&:hover":{color:"#ef4444"},width:"100%" }}>
//               <LogoutOutlined fontSize="small" />
//             </IconButton>
//           </Tooltip>
//         )}
//       </Box>

//       {/* Notification Bell Popover */}
//       <Popover open={Boolean(bellAnchor)} anchorEl={bellAnchor} onClose={() => setBellAnchor(null)}
//         anchorOrigin={{ vertical:"bottom",horizontal:"right" }}
//         transformOrigin={{ vertical:"top",horizontal:"right" }}
//         PaperProps={{ sx:{ background:"#0d1117",border:"1px solid #1e293b",borderRadius:2,minWidth:280,maxHeight:360,overflow:"auto" } }}>
//         <Box sx={{ px:2,py:1.5,borderBottom:"1px solid #1e293b" }}>
//           <Typography sx={{ color:"#e2e8f0",fontWeight:700,fontSize:"0.85rem" }}>🔔 Anomaly Alerts</Typography>
//           <Typography sx={{ color:"#64748b",fontSize:"0.65rem",fontFamily:"'JetBrains Mono',monospace" }}>{anomalies.length} total detected</Typography>
//         </Box>
//         {recentAnomalies.length === 0 ? (
//           <Box sx={{ p:3,textAlign:"center",color:"#334155",fontSize:"0.8rem" }}>No anomalies yet</Box>
//         ) : recentAnomalies.map((a,i) => (
//           <Box key={i} sx={{ px:2,py:1.2,borderBottom:"1px solid #111827","&:last-child":{borderBottom:0} }}>
//             <Box display="flex" alignItems="center" gap={1} mb={0.3}>
//               <Box sx={{ width:6,height:6,borderRadius:"50%",background:a.severity==="high"?"#f43f5e":a.severity==="medium"?"#f59e0b":"#3b82f6",flexShrink:0 }} />
//               <Typography sx={{ color:"#e2e8f0",fontSize:"0.78rem",fontWeight:600 }}>{a.user_id}</Typography>
//               <Typography sx={{ color:"#334155",fontSize:"0.65rem",fontFamily:"'JetBrains Mono',monospace",ml:"auto" }}>
//                 {a.severity?.toUpperCase()}
//               </Typography>
//             </Box>
//             <Typography sx={{ color:"#64748b",fontSize:"0.72rem",pl:1.8 }}>{a.reason}</Typography>
//           </Box>
//         ))}
//       </Popover>
//     </Drawer>
//   );
// }




// import { useState, useEffect, useCallback } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   Box, Drawer, List, ListItem, ListItemIcon, ListItemText,
//   ListItemButton, Typography, Chip, Tooltip, IconButton,
//   Avatar, Divider, Badge, Popover, InputBase,
// } from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined, Search,
//   NotificationsOutlined, LightMode, DarkMode, Timer,
//   LocalOfferOutlined, ShoppingBagOutlined,
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { useSocket } from "../hooks/useSocket";
// import {  PeopleOutlined } from "@mui/icons-material";

// const DRAWER_W    = 260;
// const COLLAPSED_W = 72;

// const NAV_ITEMS = [
//   { to: "/",          label: "Dashboard",  icon: <Dashboard />,         end: true,  color: "#1D9E75", desc: "Live Overview"   },
//   { to: "/analytics", label: "Insights",   icon: <Analytics />,         end: false, color: "#7F77DD", desc: "Sales Reports"   },
//   { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />, end: false, color: "#EF9F27", desc: "Browse Products" },
//   { to: "/user-activity", label: "User Activity", icon: <PeopleOutlined />,   end: false, color: "#3b82f6", adminOnly: true }, 
// ];

// // Quick links from old code — kept as NavLinks
// const QUICK_LINKS = [
//   { to: "/flash-sales", label: "Flash Sales", icon: LocalOfferOutlined, color: "#F43F5E" },
//   { to: "/orders",      label: "My Orders",   icon: ShoppingBagOutlined, color: "#3B82F6" },
// ];

// // Role access control from new code
// const ROLE_ACCESS = {
//   admin:   ["/", "/analytics", "/ecommerce"],
//   analyst: ["/", "/analytics", "/ecommerce"],
//   viewer:  ["/", "/analytics"],
// };

// // JWT expiry decoder from new code
// function getTokenExpiry() {
//   try {
//     const token = localStorage.getItem("ss_token");
//     if (!token) return null;
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000;
//   } catch {
//     return null;
//   }
// }

// function formatCountdown(ms) {
//   if (ms <= 0) return "Expired";
//   const h = Math.floor(ms / 3600000);
//   const m = Math.floor((ms % 3600000) / 60000);
//   const s = Math.floor((ms % 60000) / 1000);
//   if (h > 0) return `${h}h ${m}m`;
//   if (m > 0) return `${m}m ${s}s`;
//   return `${s}s`;
// }

// // UserAvatar from old code — gradient tile with initials
// function UserAvatar({ name, color = "#3B82F6", size = 36 }) {
//   const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "10px",
//       background: `linear-gradient(135deg, ${color}, ${color}CC)`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size * 0.35, fontWeight: 700, color: "white", flexShrink: 0,
//       boxShadow: `0 4px 12px ${color}30`,
//     }}>{initials}</div>
//   );
// }

// export default function Navbar({ connected, isDark, onToggleTheme, shopEventCount = 0 }) {
//   const [collapsed,   setCollapsed]   = useState(false);
//   const [bellAnchor,  setBellAnchor]  = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [timeLeft,    setTimeLeft]    = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate  = useNavigate();
//   const location  = useLocation();
//   const { anomalies } = useSocket();

//   const user  = localStorage.getItem("ss_user")  || "Admin";
//   const role  = (localStorage.getItem("ss_role") || "admin").toLowerCase();
//   const email = localStorage.getItem("ss_email") || "";
//   const width = collapsed ? COLLAPSED_W : DRAWER_W;

//   // Unread anomaly count — resets when bell is opened
//   useEffect(() => {
//     const high = anomalies.filter(a => a.severity === "high").length;
//     setUnreadCount(high);
//   }, [anomalies]);

//   // Session expiry countdown from new code
//   useEffect(() => {
//     const expiry = getTokenExpiry();
//     if (!expiry) return;
//     const tick = () => {
//       const left = expiry - Date.now();
//       setTimeLeft(left);
//       if (left < 300000 && left > 0) {
//         toast.warning(`⏱ Session expires in ${formatCountdown(left)}`, { toastId: "session-warn", autoClose: false });
//       }
//       if (left <= 0) {
//         toast.error("Session expired — please login again");
//         handleLogout();
//       }
//     };
//     tick();
//     const iv = setInterval(tick, 1000);
//     return () => clearInterval(iv);
//   }, []);

//   const handleLogout = useCallback(() => {
//     ["ss_auth", "ss_user", "ss_role", "ss_email", "ss_token"].forEach(k => localStorage.removeItem(k));
//     toast.info("👋 Logged out");
//     setTimeout(() => navigate("/login"), 600);
//   }, [navigate]);

//   // Search — filter nav items and navigate on match
//   const handleSearch = (e) => {
//     if (e.key !== "Enter") return;
//     const q = searchQuery.trim().toLowerCase();
//     if (!q) return;
//     const match = NAV_ITEMS.find(n => n.label.toLowerCase().includes(q) || n.desc?.toLowerCase().includes(q));
//     if (match) { navigate(match.to); setSearchQuery(""); }
//     else toast.info(`No page found for "${searchQuery}"`);
//   };

//   const allowedPaths  = ROLE_ACCESS[role] || ["/"];
//   // const visibleNav    = NAV_ITEMS.filter(n => allowedPaths.includes(n.to));
//   const visibleNav = NAV_ITEMS.filter(n => {
//   if (n.adminOnly && role === "viewer") return false;  // hide from viewer
//   return allowedPaths.includes(n.to) || n.adminOnly;
// });
//   const recentAnomalies = anomalies.slice(0, 5);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
//         @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.82)} }
//         @keyframes ss-shimmer { 0%{background-position:0% 0} 100%{background-position:300% 0} }

//         /* Search focus from old code */
//         .ss-search-box:focus-within {
//           border-color: #1D9E75 !important;
//           background: rgba(255,255,255,0.08) !important;
//         }

//         /* Nav link base from old code */
//         .ss-nav-link {
//           transition: all 0.2s ease-in-out;
//           cursor: pointer;
//           text-decoration: none;
//         }
//         .ss-nav-link:hover {
//           background: rgba(255,255,255,0.05) !important;
//         }
//         .ss-nav-link:active {
//           transform: scale(0.98);
//         }

//         /* Floating toggle button from old code */
//         .ss-toggle-btn {
//           position: absolute;
//           right: -12px;
//           top: 30px;
//           width: 24px;
//           height: 24px;
//           background: #1D9E75;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           cursor: pointer;
//           border: 4px solid #0F172A;
//           color: white;
//           z-index: 10;
//           box-shadow: 0 4px 10px rgba(0,0,0,0.3);
//           transition: background 0.2s, transform 0.15s;
//         }
//         .ss-toggle-btn:hover {
//           background: #0F6E56;
//           transform: scale(1.12);
//         }
//       `}</style>

//       <Box
//         component="nav"
//         sx={{
//           width,
//           flexShrink: 0,
//           position: "sticky",
//           top: 0,
//           height: "100vh",
//           transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
//           background: "linear-gradient(180deg, #0a0f1a 0%, #07090f 100%)",
//           borderRight: "1px solid rgba(255,255,255,0.08)",
//           display: "flex",
//           flexDirection: "column",
//           zIndex: 100,
//           fontFamily: "'DM Sans', sans-serif",
//           overflowX: "hidden",
//           overflowY: "auto",
//         }}
//       >

//         {/* ── LOGO + Floating Toggle ── */}
//         <Box sx={{
//           px: collapsed ? 1.5 : 2.5, py: 2.5,
//           borderBottom: "1px solid rgba(255,255,255,0.08)",
//           display: "flex", alignItems: "center",
//           justifyContent: collapsed ? "center" : "space-between",
//           minHeight: 70, position: "relative",
//         }}>
//           <Box display="flex" alignItems="center" gap={1.5}>
//             <Box sx={{
//               width: 38, height: 38, borderRadius: "10px",
//               background: "linear-gradient(135deg, #10B981, #059669)",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               boxShadow: "0 0 20px rgba(16,185,129,0.2)", flexShrink: 0,
//             }}>
//               <ElectricBolt sx={{ color: "white", fontSize: 22 }} />
//             </Box>
//             {!collapsed && (
//               <Box>
//                 <Typography sx={{ color: "white", fontWeight: 800, fontSize: 16, letterSpacing: "-0.5px", lineHeight: 1 }}>
//                   StreamSight
//                 </Typography>
//                 <Typography sx={{ color: "#10B981", fontSize: 9, fontWeight: 700, textTransform: "uppercase", mt: 0.5, fontFamily: "'JetBrains Mono',monospace" }}>
//                   Retail Engine
//                 </Typography>
//               </Box>
//             )}
//           </Box>

//           {/* Floating circular toggle — from old code */}
//           <div
//             className="ss-toggle-btn"
//             onClick={() => setCollapsed(v => !v)}
//           >
//             {collapsed
//               ? <ChevronRight sx={{ fontSize: 14 }} />
//               : <ChevronLeft  sx={{ fontSize: 14 }} />}
//           </div>
//         </Box>

//         {/* ── SEARCH — from old code, hidden when collapsed ── */}
//         {!collapsed && (
//           <Box sx={{ px: 2, pt: 2, pb: 1 }}>
//             <Box
//               className="ss-search-box"
//               sx={{
//                 display: "flex", alignItems: "center",
//                 background: "rgba(255,255,255,0.03)",
//                 borderRadius: "10px", px: 1.5, py: 1,
//                 border: "1px solid rgba(255,255,255,0.1)",
//                 transition: "0.2s",
//               }}
//             >
//               <Search sx={{ color: "#64748B", fontSize: 18 }} />
//               <InputBase
//                 placeholder="Search pages..."
//                 value={searchQuery}
//                 onChange={e => setSearchQuery(e.target.value)}
//                 onKeyDown={handleSearch}
//                 sx={{ ml: 1, color: "white", fontSize: 13, flex: 1 }}
//               />
//             </Box>
//           </Box>
//         )}

//         {/* ── PIPELINE STATUS + TOOLS ROW — from new code ── */}
//         {!collapsed && (
//           <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
//             <Box sx={{
//               px: 2, py: 1, borderRadius: 2,
//               background: connected ? "rgba(29,158,117,0.06)" : "rgba(239,68,68,0.06)",
//               border: `1px solid ${connected ? "rgba(29,158,117,0.2)" : "rgba(239,68,68,0.2)"}`,
//               display: "flex", alignItems: "center", gap: 1, mb: 1.5,
//             }}>
//               <Box sx={{
//                 width: 7, height: 7, borderRadius: "50%",
//                 background: connected ? "#1D9E75" : "#ef4444", flexShrink: 0,
//                 ...(connected ? { animation: "livePulse 2s ease-in-out infinite" } : {}),
//               }} />
//               <Typography sx={{ color: connected ? "#1D9E75" : "#ef4444", fontSize: "0.7rem", fontFamily: "'JetBrains Mono',monospace", flex: 1 }}>
//                 {connected ? "Pipeline Active" : "Disconnected"}
//               </Typography>

//               {/* Notification Bell */}
//               <Tooltip title="Anomaly alerts">
//                 <IconButton
//                   size="small"
//                   onClick={e => { setBellAnchor(e.currentTarget); setUnreadCount(0); }}
//                   sx={{ color: "#64748b", "&:hover": { color: "#F43F5E" }, p: 0.3 }}
//                 >
//                   <Badge badgeContent={unreadCount} color="error" sx={{ "& .MuiBadge-badge": { fontSize: "0.55rem", height: 14, minWidth: 14 } }}>
//                     <NotificationsOutlined sx={{ fontSize: 17 }} />
//                   </Badge>
//                 </IconButton>
//               </Tooltip>

//               {/* Dark / Light toggle */}
//               <Tooltip title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}>
//                 <IconButton size="small" onClick={onToggleTheme} sx={{ color: "#64748b", "&:hover": { color: "#f59e0b" }, p: 0.3 }}>
//                   {isDark ? <LightMode sx={{ fontSize: 16 }} /> : <DarkMode sx={{ fontSize: 16 }} />}
//                 </IconButton>
//               </Tooltip>
//             </Box>

//             {/* Session timer */}
//             {timeLeft !== null && timeLeft > 0 && (
//               <Box sx={{
//                 display: "flex", alignItems: "center", gap: 0.8,
//                 px: 1.5, py: 0.6, borderRadius: 1.5,
//                 background: timeLeft < 300000 ? "rgba(244,63,94,0.08)" : "rgba(100,116,139,0.06)",
//                 border: `1px solid ${timeLeft < 300000 ? "rgba(244,63,94,0.2)" : "rgba(255,255,255,0.08)"}`,
//               }}>
//                 <Timer sx={{ fontSize: 12, color: timeLeft < 300000 ? "#f43f5e" : "#475569" }} />
//                 <Typography sx={{ fontSize: "0.62rem", fontFamily: "'JetBrains Mono',monospace", color: timeLeft < 300000 ? "#f43f5e" : "#475569" }}>
//                   Session: {formatCountdown(timeLeft)}
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         )}

//         {/* ── MAIN NAVIGATION ── */}
//         <Box sx={{ flex: 1, px: collapsed ? 0.5 : 1.5, py: 1 }}>
//           {!collapsed && (
//             <Typography sx={{ px: 1, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
//               Main Menu
//             </Typography>
//           )}
//           <List dense disablePadding>
//             {visibleNav.map(item => (
//               <Tooltip key={item.to} title={collapsed ? item.label : ""} placement="right">
//                 <ListItem disablePadding sx={{ mb: 0.5 }}>
//                   <NavLink to={item.to} end={item.end} style={{ width: "100%", textDecoration: "none" }}>
//                     {({ isActive }) => (
//                       <ListItemButton
//                         className="ss-nav-link"
//                         sx={{
//                           borderRadius: 2,
//                           minHeight: 44,
//                           justifyContent: collapsed ? "center" : "flex-start",
//                           px: collapsed ? 1 : 2,
//                           background: isActive ? `${item.color}15` : "transparent",
//                           border: `1px solid ${isActive ? `${item.color}30` : "transparent"}`,
//                           "&:hover": {
//                             background: `${item.color}0a`,
//                             border: `1px solid ${item.color}20`,
//                           },
//                           transition: "all 0.2s",
//                         }}
//                       >
//                         <ListItemIcon sx={{ minWidth: collapsed ? 0 : 36, color: isActive ? item.color : "#64748B", "& svg": { fontSize: 20 } }}>
//                           {/* ShopStream event badge */}
//                           {item.to === "/ecommerce" && shopEventCount > 0 && !collapsed ? (
//                             <Badge badgeContent={shopEventCount} color="warning" max={99} sx={{ "& .MuiBadge-badge": { fontSize: "0.55rem", height: 14, minWidth: 14 } }}>
//                               {item.icon}
//                             </Badge>
//                           ) : item.icon}
//                         </ListItemIcon>

//                         {!collapsed && (
//                           <>
//                             <ListItemText
//                               primary={item.label}
//                               secondary={item.desc}
//                               primaryTypographyProps={{ fontSize: "0.875rem", fontWeight: isActive ? 700 : 500, color: isActive ? item.color : "#94A3B8" }}
//                               secondaryTypographyProps={{ fontSize: "0.68rem", color: "#475569", noWrap: true }}
//                             />
//                             {/* Role chip for viewer */}
//                             {item.to === "/" && role === "viewer" && (
//                               <Chip label="READ" size="small" sx={{ height: 14, fontSize: "0.5rem", background: "rgba(59,130,246,0.1)", color: "#60a5fa", border: "none" }} />
//                             )}
//                             {/* Active dot */}
//                             {isActive && (
//                               <Box sx={{ width: 6, height: 6, borderRadius: "50%", background: item.color, boxShadow: `0 0 8px ${item.color}`, flexShrink: 0 }} />
//                             )}
//                           </>
//                         )}
//                       </ListItemButton>
//                     )}
//                   </NavLink>
//                 </ListItem>
//               </Tooltip>
//             ))}
//           </List>

//           {/* ── QUICK LINKS — from old code, hidden when collapsed ── */}
//           {!collapsed && (
//             <>
//               <Typography sx={{ px: 1, mt: 3, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1 }}>
//                 Quick Links
//               </Typography>
//               {QUICK_LINKS.map(link => {
//                 const isActive = location.pathname === link.to;
//                 return (
//                   <Tooltip key={link.label} title="" placement="right">
//                     <ListItem disablePadding sx={{ mb: 0.5 }}>
//                       <NavLink to={link.to} style={{ width: "100%", textDecoration: "none" }}>
//                         <ListItemButton
//                           className="ss-nav-link"
//                           sx={{
//                             borderRadius: 2, minHeight: 40, px: 2,
//                             background: isActive ? "rgba(255,255,255,0.05)" : "transparent",
//                             border: `1px solid ${isActive ? "rgba(255,255,255,0.1)" : "transparent"}`,
//                             "&:hover": { background: "rgba(255,255,255,0.05)" },
//                             transition: "all 0.2s",
//                           }}
//                         >
//                           <ListItemIcon sx={{ minWidth: 36, color: isActive ? link.color : "#64748B", "& svg": { fontSize: 18 } }}>
//                             <link.icon />
//                           </ListItemIcon>
//                           <ListItemText
//                             primary={link.label}
//                             primaryTypographyProps={{ fontSize: "0.82rem", fontWeight: 500, color: isActive ? "white" : "#94A3B8" }}
//                           />
//                         </ListItemButton>
//                       </NavLink>
//                     </ListItem>
//                   </Tooltip>
//                 );
//               })}
//             </>
//           )}
//         </Box>

//         {/* ── USER SECTION — merges old gradient avatar tile + new role/email layout ── */}
//         <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
//         <Box sx={{ p: collapsed ? 1 : 2 }}>
//           {!collapsed ? (
//             <Box sx={{
//               display: "flex", alignItems: "center", gap: 1.5,
//               p: "10px", borderRadius: "12px",
//               background: "rgba(255,255,255,0.02)",
//               border: "1px solid rgba(255,255,255,0.05)",
//             }}>
//               {/* Old code's gradient avatar tile */}
//               <UserAvatar name={user} color="#3B82F6" size={34} />
//               <Box flex={1} minWidth={0}>
//                 <Typography sx={{ color: "white", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                   {user}
//                 </Typography>
//                 <Typography sx={{ color: "#10B981", fontSize: 10, fontWeight: 700, textTransform: "uppercase", fontFamily: "'JetBrains Mono',monospace" }}>
//                   {role}
//                 </Typography>
//                 {email && (
//                   <Typography sx={{ color: "#475569", fontSize: 9, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//                     {email}
//                   </Typography>
//                 )}
//               </Box>
//               <Tooltip title="Logout">
//                 <IconButton size="small" onClick={handleLogout} sx={{ color: "#64748B", "&:hover": { color: "#F43F5E", background: "rgba(244,63,94,0.1)" } }}>
//                   <LogoutOutlined fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           ) : (
//             <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
//               <UserAvatar name={user} color="#3B82F6" size={38} />
//               <Tooltip title="Logout" placement="right">
//                 <IconButton onClick={handleLogout} sx={{ color: "#64748B", width: "100%", "&:hover": { color: "#F43F5E" } }}>
//                   <LogoutOutlined fontSize="small" />
//                 </IconButton>
//               </Tooltip>
//             </Box>
//           )}
//         </Box>

//         {/* ── NOTIFICATION BELL POPOVER — from new code ── */}
//         <Popover
//           open={Boolean(bellAnchor)}
//           anchorEl={bellAnchor}
//           onClose={() => setBellAnchor(null)}
//           anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//           transformOrigin={{ vertical: "top", horizontal: "right" }}
//           PaperProps={{
//             sx: {
//               background: "#0d1117", border: "1px solid #1e293b",
//               borderRadius: 2, minWidth: 280, maxHeight: 360, overflow: "auto",
//             },
//           }}
//         >
//           <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #1e293b" }}>
//             <Typography sx={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.85rem" }}>🔔 Anomaly Alerts</Typography>
//             <Typography sx={{ color: "#64748b", fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace" }}>
//               {anomalies.length} total detected
//             </Typography>
//           </Box>
//           {recentAnomalies.length === 0 ? (
//             <Box sx={{ p: 3, textAlign: "center", color: "#334155", fontSize: "0.8rem" }}>No anomalies yet</Box>
//           ) : recentAnomalies.map((a, i) => (
//             <Box key={i} sx={{ px: 2, py: 1.2, borderBottom: "1px solid #111827", "&:last-child": { borderBottom: 0 } }}>
//               <Box display="flex" alignItems="center" gap={1} mb={0.3}>
//                 <Box sx={{
//                   width: 6, height: 6, borderRadius: "50%", flexShrink: 0,
//                   background: a.severity === "high" ? "#f43f5e" : a.severity === "medium" ? "#f59e0b" : "#3b82f6",
//                 }} />
//                 <Typography sx={{ color: "#e2e8f0", fontSize: "0.78rem", fontWeight: 600 }}>{a.user_id}</Typography>
//                 <Typography sx={{ color: "#334155", fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", ml: "auto" }}>
//                   {a.severity?.toUpperCase()}
//                 </Typography>
//               </Box>
//               <Typography sx={{ color: "#64748b", fontSize: "0.72rem", pl: 1.8 }}>{a.reason}</Typography>
//             </Box>
//           ))}
//         </Popover>
//       </Box>
//     </>
//   );
// }



// import { useState, useEffect, useCallback } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   Box, List, ListItem, ListItemIcon, ListItemText,
//   ListItemButton, Typography, Chip, Tooltip, IconButton,
//   Divider, Badge, Popover, InputBase,
// } from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined, Search,
//   NotificationsOutlined, LightMode, DarkMode, Timer,
//   LocalOfferOutlined, ShoppingBagOutlined, PeopleOutlined
// } from "@mui/icons-material";
// import { toast } from "react-toastify";
// import { useSocket } from "../hooks/useSocket";

// const DRAWER_W = 260;
// const COLLAPSED_W = 72;

// // DEFINITION OF ALL POSSIBLE ITEMS
// const NAV_ITEMS = [
//   { to: "/", label: "Dashboard", icon: <Dashboard />, color: "#1D9E75", desc: "Live Overview" },
//   { to: "/analytics", label: "Insights", icon: <Analytics />, color: "#7F77DD", desc: "Sales Reports" },
//   { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />, color: "#EF9F27", desc: "Browse Products" },
//   { to: "/user-activity", label: "User Activity", icon: <PeopleOutlined />, color: "#3b82f6" },
// ];

// const QUICK_LINKS = [
//   { to: "/flash-sales", label: "Flash Sales", icon: LocalOfferOutlined, color: "#F43F5E" },
//   { to: "/orders", label: "My Orders", icon: ShoppingBagOutlined, color: "#3B82F6" },
// ];

// // STRICT ROLE ACCESS
// const ROLE_ACCESS = {
//   admin: ["/", "/analytics", "/user-activity"],
//   analyst: ["/", "/analytics"],
//   viewer: ["/", "/analytics"],
//   customer: ["/ecommerce", "/flash-sales", "/orders"],
// };

// function getTokenExpiry() {
//   try {
//     const token = localStorage.getItem("ss_token");
//     if (!token) return null;
//     const payload = JSON.parse(atob(token.split(".")[1]));
//     return payload.exp * 1000;
//   } catch { return null; }
// }

// function formatCountdown(ms) {
//   if (ms <= 0) return "Expired";
//   const m = Math.floor((ms % 3600000) / 60000);
//   const s = Math.floor((ms % 60000) / 1000);
//   return `${m}m ${s}s`;
// }

// function UserAvatar({ name, color = "#3B82F6", size = 36 }) {
//   const initials = name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2);
//   return (
//     <div style={{
//       width: size, height: size, borderRadius: "10px",
//       background: `linear-gradient(135deg, ${color}, ${color}CC)`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size * 0.35, fontWeight: 700, color: "white", flexShrink: 0,
//     }}>{initials}</div>
//   );
// }

// export default function Navbar({ connected, isDark, onToggleTheme, shopEventCount = 0 }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [bellAnchor, setBellAnchor] = useState(null);
//   const [unreadCount, setUnreadCount] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { anomalies } = useSocket();

//   const user = localStorage.getItem("ss_user") || "User";
//   const role = (localStorage.getItem("ss_role") || "viewer").toLowerCase();
//   const email = localStorage.getItem("ss_email") || "";
//   const width = collapsed ? COLLAPSED_W : DRAWER_W;

//   const allowedPaths = ROLE_ACCESS[role] || [];
//   const visibleNav = NAV_ITEMS.filter(item => allowedPaths.includes(item.to));
//   const visibleQuick = QUICK_LINKS.filter(link => allowedPaths.includes(link.to));

//   useEffect(() => {
//     const high = anomalies.filter(a => a.severity === "high").length;
//     setUnreadCount(high);
//   }, [anomalies]);

//   useEffect(() => {
//     const expiry = getTokenExpiry();
//     if (!expiry) return;
//     const tick = () => {
//       const left = expiry - Date.now();
//       setTimeLeft(left);
//       if (left <= 0) handleLogout();
//     };
//     tick();
//     const iv = setInterval(tick, 1000);
//     return () => clearInterval(iv);
//   }, []);

//   const handleLogout = useCallback(() => {
//     ["ss_auth", "ss_user", "ss_role", "ss_email", "ss_token"].forEach(k => localStorage.removeItem(k));
//     toast.info("👋 Logged out");
//     navigate("/login");
//   }, [navigate]);

//   return (
//     <>
//       <Box component="nav" sx={{
//         width, flexShrink: 0, position: "sticky", top: 0, height: "100vh",
//         transition: "width 0.3s", background: "#0a0f1a", borderRight: "1px solid rgba(255,255,255,0.08)",
//         display: "flex", flexDirection: "column", zIndex: 100, overflowX: "hidden"
//       }}>
//         {/* LOGO */}
//         <Box sx={{ px: 2.5, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
//           <Box display="flex" alignItems="center" gap={1.5}>
//             <Box sx={{ width: 32, height: 32, borderRadius: "8px", background: "#10B981", display: "flex", alignItems: "center", justifyContent: "center" }}>
//               <ElectricBolt sx={{ color: "white", fontSize: 18 }} />
//             </Box>
//             {!collapsed && <Typography sx={{ color: "white", fontWeight: 800 }}>StreamSight</Typography>}
//           </Box>
//           <IconButton size="small" onClick={() => setCollapsed(!collapsed)} sx={{ color: "#10B981" }}>
//             {collapsed ? <ChevronRight /> : <ChevronLeft />}
//           </IconButton>
//         </Box>

//         {/* MAIN NAV */}
//         <Box sx={{ flex: 1, px: collapsed ? 1 : 2 }}>
//           {!collapsed && (
//             <Typography sx={{ px: 1, mt: 2, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>
//               Menu
//             </Typography>
//           )}
//           <List dense>
//             {visibleNav.map(item => (
//               <ListItemButton key={item.to} component={NavLink} to={item.to} sx={{
//                 borderRadius: 2, mb: 0.5, px: collapsed ? 1 : 2,
//                 "&.active": { background: `${item.color}20`, color: item.color }
//               }}>
//                 <ListItemIcon sx={{ minWidth: collapsed ? 0 : 35, color: "inherit" }}>{item.icon}</ListItemIcon>
//                 {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }} />}
//               </ListItemButton>
//             ))}
//           </List>

//           {/* QUICK LINKS - Only shows if role has access (Customers) */}
//           {visibleQuick.length > 0 && !collapsed && (
//             <>
//               <Typography sx={{ px: 1, mt: 3, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>
//                 Shopping
//               </Typography>
//               <List dense>
//                 {visibleQuick.map(link => (
//                   <ListItemButton key={link.to} component={NavLink} to={link.to} sx={{ borderRadius: 2, mb: 0.5 }}>
//                     <ListItemIcon sx={{ minWidth: 35 }}><link.icon sx={{ fontSize: 18 }} /></ListItemIcon>
//                     <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: 13 }} />
//                   </ListItemButton>
//                 ))}
//               </List>
//             </>
//           )}
//         </Box>

//         {/* USER INFO */}
//         <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
//         <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
//            <UserAvatar name={user} size={32} />
//            {!collapsed && (
//              <Box sx={{ overflow: "hidden" }}>
//                <Typography noWrap sx={{ color: "white", fontSize: 12, fontWeight: 600 }}>{user}</Typography>
//                <Typography sx={{ color: "#10B981", fontSize: 10, textTransform: "uppercase" }}>{role}</Typography>
//              </Box>
//            )}
//            <IconButton size="small" onClick={handleLogout} sx={{ ml: "auto", color: "#64748B" }}><LogoutOutlined fontSize="small"/></IconButton>
//         </Box>
//       </Box>
//     </>
//   );
// }


// import { useState, useEffect, useCallback } from "react";
// import { NavLink, useNavigate, useLocation } from "react-router-dom";
// import {
//   Box, List, ListItemIcon, ListItemText, ListItemButton, 
//   Typography, Tooltip, IconButton, Divider
// } from "@mui/material";
// import {
//   Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
//   ChevronLeft, ChevronRight, LogoutOutlined, 
//   LocalOfferOutlined, ShoppingBagOutlined, PeopleOutlined
// } from "@mui/icons-material";
// import { toast } from "react-toastify";

// const DRAWER_W = 260;
// const COLLAPSED_W = 72;

// // Master List of Menu Items
// const NAV_ITEMS = [
//   { to: "/", label: "Dashboard", icon: <Dashboard />, color: "#1D9E75" },
//   { to: "/analytics", label: "Insights", icon: <Analytics />, color: "#7F77DD" },
//   { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />, color: "#EF9F27" },
//   { to: "/user-activity", label: "User Activity", icon: <PeopleOutlined />, color: "#3b82f6" },
// ];

// const QUICK_LINKS = [
//   { to: "/flash-sales", label: "Flash Sales", icon: LocalOfferOutlined, color: "#F43F5E" },
//   { to: "/orders", label: "My Orders", icon: ShoppingBagOutlined, color: "#3B82F6" },
// ];

// // Permission Mapping
// const ROLE_ACCESS = {
//   admin: ["/", "/analytics", "/user-activity"],
//   analyst: ["/", "/analytics"],
//   viewer: ["/", "/analytics"],
//   customer: ["/ecommerce", "/flash-sales", "/orders"], // Staff cannot see these
// };

// export default function Navbar({ connected }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const user = localStorage.getItem("ss_user") || "User";
//   const role = (localStorage.getItem("ss_role") || "viewer").toLowerCase();
//   const width = collapsed ? COLLAPSED_W : DRAWER_W;

//   // Filter items based on current role
//   const allowedPaths = ROLE_ACCESS[role] || [];
//   const visibleNav = NAV_ITEMS.filter(item => allowedPaths.includes(item.to));
//   const visibleQuick = QUICK_LINKS.filter(link => allowedPaths.includes(link.to));

//   const handleLogout = useCallback(() => {
//     localStorage.clear();
//     toast.info("👋 Logged out");
//     navigate("/login");
//   }, [navigate]);

//   return (
//     <Box component="nav" sx={{
//       width, flexShrink: 0, position: "sticky", top: 0, height: "100vh",
//       transition: "width 0.3s", background: "#0a0f1a", borderRight: "1px solid rgba(255,255,255,0.08)",
//       display: "flex", flexDirection: "column", zIndex: 100, overflowX: "hidden"
//     }}>
//       {/* Header / Logo */}
//       <Box sx={{ px: 2, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//         <Box display="flex" alignItems="center" gap={1.5}>
//           <ElectricBolt sx={{ color: "#10B981" }} />
//           {!collapsed && <Typography sx={{ color: "white", fontWeight: 700 }}>StreamSight</Typography>}
//         </Box>
//         <IconButton size="small" onClick={() => setCollapsed(!collapsed)} sx={{ color: "#64748B" }}>
//           {collapsed ? <ChevronRight /> : <ChevronLeft />}
//         </IconButton>
//       </Box>

//       {/* Main Menu Items */}
//       <Box sx={{ flex: 1, px: collapsed ? 1 : 2 }}>
//         {!collapsed && (
//           <Typography sx={{ px: 1, mt: 2, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>
//             Main Navigation
//           </Typography>
//         )}
//         <List dense>
//           {visibleNav.map(item => (
//             <ListItemButton 
//               key={item.to} 
//               component={NavLink} 
//               to={item.to}
//               sx={{
//                 borderRadius: 2, mb: 0.5,
//                 "&.active": { bgcolor: "rgba(16, 185, 129, 0.1)", color: "#10B981" },
//                 color: "#94A3B8"
//               }}
//             >
//               <ListItemIcon sx={{ minWidth: collapsed ? 0 : 35, color: "inherit" }}>{item.icon}</ListItemIcon>
//               {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }} />}
//             </ListItemButton>
//           ))}
//         </List>

//         {/* Quick Links Section (Only for Customers) */}
//         {visibleQuick.length > 0 && !collapsed && (
//           <>
//             <Typography sx={{ px: 1, mt: 3, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>
//               Shop Tools
//             </Typography>
//             <List dense>
//               {visibleQuick.map(link => (
//                 <ListItemButton 
//                   key={link.to} 
//                   component={NavLink} 
//                   to={link.to}
//                   sx={{ 
//                     borderRadius: 2, mb: 0.5, color: "#94A3B8",
//                     "&.active": { bgcolor: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" }
//                   }}
//                 >
//                   <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}><link.icon sx={{ fontSize: 18 }} /></ListItemIcon>
//                   <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: 13 }} />
//                 </ListItemButton>
//               ))}
//             </List>
//           </>
//         )}
//       </Box>

//       {/* User Info & Logout */}
//       <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
//       <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
//         <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "#3B82F6", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 12, fontWeight: 700 }}>
//           {user[0].toUpperCase()}
//         </Box>
//         {!collapsed && (
//           <Box sx={{ flex: 1, overflow: "hidden" }}>
//             <Typography noWrap sx={{ color: "white", fontSize: 12, fontWeight: 600 }}>{user}</Typography>
//             <Typography sx={{ color: "#10B981", fontSize: 10, textTransform: "uppercase" }}>{role}</Typography>
//           </Box>
//         )}
//         <IconButton size="small" onClick={handleLogout} sx={{ color: "#64748B" }}>
//           <LogoutOutlined fontSize="small" />
//         </IconButton>
//       </Box>
//     </Box>
//   );
// }




import { useState, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Box, List, ListItemIcon, ListItemText, ListItemButton, 
  Typography, IconButton, Divider
} from "@mui/material";
import {
  Dashboard, Analytics, StorefrontOutlined, ElectricBolt,
  ChevronLeft, ChevronRight, LogoutOutlined, 
  LocalOfferOutlined, ShoppingBagOutlined, PeopleOutlined,
  CreditCard
} from "@mui/icons-material";
import { toast } from "react-toastify";

const DRAWER_W = 260;
const COLLAPSED_W = 72;

const NAV_ITEMS = [
  { to: "/", label: "Dashboard", icon: <Dashboard />, color: "#1D9E75" },
  { to: "/analytics", label: "Insights", icon: <Analytics />, color: "#7F77DD" },
  { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />, color: "#EF9F27" },
  { to: "/user-activity", label: "User Activity", icon: <PeopleOutlined />, color: "#3b82f6" },
];

const QUICK_LINKS = [
  { to: "/flash-sales", label: "Flash Sales", icon: LocalOfferOutlined, color: "#F43F5E" },
  { to: "/orders", label: "My Orders", icon: ShoppingBagOutlined, color: "#3B82F6" },
 
];

const ROLE_ACCESS = {
  admin: ["/", "/analytics", "/user-activity"],
  analyst: ["/", "/analytics"],
  viewer: ["/", "/analytics"],
  customer: ["/ecommerce", "/flash-sales", "/orders"],
};

export default function Navbar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const user = localStorage.getItem("ss_user") || "User";
  const role = (localStorage.getItem("ss_role") || "viewer").toLowerCase();
  const width = collapsed ? COLLAPSED_W : DRAWER_W;

  const allowedPaths = ROLE_ACCESS[role] || [];
  const visibleNav = NAV_ITEMS.filter(item => allowedPaths.includes(item.to));
  const visibleQuick = QUICK_LINKS.filter(link => allowedPaths.includes(link.to));

  const handleLogout = useCallback(() => {
    localStorage.clear();
    toast.info("👋 Logged out");
    navigate("/login");
  }, [navigate]);

  return (
    <Box component="nav" sx={{
      width, flexShrink: 0, position: "sticky", top: 0, height: "100vh",
      transition: "width 0.3s", background: "#0a0f1a", borderRight: "1px solid rgba(255,255,255,0.08)",
      display: "flex", flexDirection: "column", zIndex: 100, overflowX: "hidden"
    }}>
      <Box sx={{ px: 2, py: 2.5, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1.5}>
          <ElectricBolt sx={{ color: "#10B981" }} />
          {!collapsed && <Typography sx={{ color: "white", fontWeight: 700 }}>StreamSight</Typography>}
        </Box>
        <IconButton size="small" onClick={() => setCollapsed(!collapsed)} sx={{ color: "#64748B" }}>
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </Box>

      <Box sx={{ flex: 1, px: collapsed ? 1 : 2 }}>
        {!collapsed && (
          <Typography sx={{ px: 1, mt: 2, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>
            Navigation
          </Typography>
        )}
        <List dense>
          {visibleNav.map(item => (
            <ListItemButton 
              key={item.to} 
              component={NavLink} 
              to={item.to}
              sx={{
                borderRadius: 2, mb: 0.5,
                "&.active": { bgcolor: "rgba(16, 185, 129, 0.1)", color: "#10B981" },
                color: "#94A3B8"
              }}
            >
              <ListItemIcon sx={{ minWidth: collapsed ? 0 : 35, color: "inherit" }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.label} primaryTypographyProps={{ fontSize: 13, fontWeight: 600 }} />}
            </ListItemButton>
          ))}
        </List>

        {visibleQuick.length > 0 && !collapsed && (
          <>
            <Typography sx={{ px: 1, mt: 3, mb: 1, color: "#475569", fontSize: 10, fontWeight: 700, textTransform: "uppercase" }}>
              Services
            </Typography>
            <List dense>
              {visibleQuick.map(link => (
                <ListItemButton 
                  key={link.to} 
                  component={NavLink} 
                  to={link.to}
                  sx={{ 
                    borderRadius: 2, mb: 0.5, color: "#94A3B8",
                    "&.active": { bgcolor: "rgba(59, 130, 246, 0.1)", color: "#3B82F6" }
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 35, color: "inherit" }}><link.icon sx={{ fontSize: 18 }} /></ListItemIcon>
                  <ListItemText primary={link.label} primaryTypographyProps={{ fontSize: 13 }} />
                </ListItemButton>
              ))}
            </List>
          </>
        )}
      </Box>

      <Divider sx={{ borderColor: "rgba(255,255,255,0.05)" }} />
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1.5 }}>
        <Box sx={{ width: 32, height: 32, borderRadius: "50%", bgcolor: "#10B981", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700 }}>
          {user[0].toUpperCase()}
        </Box>
        {!collapsed && (
          <Box sx={{ flex: 1, overflow: "hidden" }}>
            <Typography noWrap sx={{ color: "white", fontSize: 12, fontWeight: 600 }}>{user}</Typography>
            <Typography sx={{ color: "#10B981", fontSize: 10, textTransform: "uppercase" }}>{role}</Typography>
          </Box>
        )}
        <IconButton size="small" onClick={handleLogout} sx={{ color: "#64748B" }}>
          <LogoutOutlined fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
}