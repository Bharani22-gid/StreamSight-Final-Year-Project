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

import { useState, useEffect, useCallback } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Chip,
  Tooltip,
  IconButton,
  Avatar,
  Divider,
  Badge,
  Popover,
  InputBase,
} from "@mui/material";
import {
  Dashboard,
  Analytics,
  StorefrontOutlined,
  ElectricBolt,
  ChevronLeft,
  ChevronRight,
  LogoutOutlined,
  Search,
  NotificationsOutlined,
  LightMode,
  DarkMode,
  Timer,
  LocalOfferOutlined,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { useSocket } from "../hooks/useSocket";
import { PeopleOutlined } from "@mui/icons-material";



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
<<<<<<< main
  {
    to: "/",
    label: "Dashboard",
    icon: <Dashboard />,
    end: true,
    color: "#1D9E75",
    desc: "Live Overview",
  },
  {
    to: "/analytics",
    label: "Insights",
    icon: <Analytics />,
    end: false,
    color: "#7F77DD",
    desc: "Sales Reports",
  },
  {
    to: "/ecommerce",
    label: "ShopStream",
    icon: <StorefrontOutlined />,
    end: false,
    color: "#EF9F27",
    desc: "Browse Products",
  },
  {
    to: "/user-activity",
    label: "User Activity",
    icon: <PeopleOutlined />,
    end: false,
    color: "#3b82f6",
    adminOnly: true,
  },

  { to: "/", label: "Dashboard", icon: <Dashboard />, color: "#1D9E75" },
  { to: "/analytics", label: "Insights", icon: <Analytics />, color: "#7F77DD" },
  { to: "/ecommerce", label: "ShopStream", icon: <StorefrontOutlined />, color: "#EF9F27" },
  { to: "/user-activity", label: "User Activity", icon: <PeopleOutlined />, color: "#3b82f6" },

];

const QUICK_LINKS = [
  {
    to: "/flash-sales",
    label: "Flash Sales",
    icon: LocalOfferOutlined,
    color: "#F43F5E",
  },
  {
    to: "/orders",
    label: "My Orders",
    icon: ShoppingBagOutlined,
    color: "#3B82F6",
  },
  { to: "/flash-sales", label: "Flash Sales", icon: LocalOfferOutlined, color: "#F43F5E" },
  { to: "/orders", label: "My Orders", icon: ShoppingBagOutlined, color: "#3B82F6" },
 
];

const ROLE_ACCESS = {
<<<<<<< main
  admin: ["/", "/analytics", "/ecommerce"],
  analyst: ["/", "/analytics", "/ecommerce"],
  viewer: ["/", "/analytics"],
};

// JWT expiry decoder from new code
function getTokenExpiry() {
  try {
    const token = localStorage.getItem("ss_token");
    if (!token) return null;
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000;
  } catch {
    return null;
  }
}

function formatCountdown(ms) {
  if (ms <= 0) return "Expired";
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

// UserAvatar from old code — gradient tile with initials
function UserAvatar({ name, color = "#3B82F6", size = 36 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "10px",
        background: `linear-gradient(135deg, ${color}, ${color}CC)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 700,
        color: "white",
        flexShrink: 0,
        boxShadow: `0 4px 12px ${color}30`,
      }}
    >
      {initials}
    </div>
  );
}

export default function Navbar({
  connected,
  isDark,
  onToggleTheme,
  shopEventCount = 0,
}) {
  const [collapsed, setCollapsed] = useState(false);
  const [bellAnchor, setBellAnchor] = useState(null);
  const [unreadCount, setUnreadCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { anomalies } = useSocket();

  const user = localStorage.getItem("ss_user") || "Admin";
  const role = (localStorage.getItem("ss_role") || "admin").toLowerCase();
  const email = localStorage.getItem("ss_email") || "";
  const width = collapsed ? COLLAPSED_W : DRAWER_W;

  // Unread anomaly count — resets when bell is opened
  useEffect(() => {
    const high = anomalies.filter((a) => a.severity === "high").length;
    setUnreadCount(high);
  }, [anomalies]);

  // Session expiry countdown from new code
  useEffect(() => {
    const expiry = getTokenExpiry();
    if (!expiry) return;
    const tick = () => {
      const left = expiry - Date.now();
      setTimeLeft(left);
      if (left < 300000 && left > 0) {
        toast.warning(`⏱ Session expires in ${formatCountdown(left)}`, {
          toastId: "session-warn",
          autoClose: false,
        });
      }
      if (left <= 0) {
        toast.error("Session expired — please login again");
        handleLogout();
      }
    };
    tick();
    const iv = setInterval(tick, 1000);
    return () => clearInterval(iv);
  }, []);

  const handleLogout = useCallback(() => {
    ["ss_auth", "ss_user", "ss_role", "ss_email", "ss_token"].forEach((k) =>
      localStorage.removeItem(k),
    );
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
>>>>>>> main
    toast.info("👋 Logged out");
    navigate("/login");
  }, [navigate]);

<<<<<<< main
  // Search — filter nav items and navigate on match
  const handleSearch = (e) => {
    if (e.key !== "Enter") return;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return;
    const match = NAV_ITEMS.find(
      (n) =>
        n.label.toLowerCase().includes(q) || n.desc?.toLowerCase().includes(q),
    );
    if (match) {
      navigate(match.to);
      setSearchQuery("");
    } else toast.info(`No page found for "${searchQuery}"`);
  };

  const allowedPaths = ROLE_ACCESS[role] || ["/"];
  // const visibleNav    = NAV_ITEMS.filter(n => allowedPaths.includes(n.to));
  const visibleNav = NAV_ITEMS.filter((n) => {
    if (n.adminOnly && role === "viewer") return false; // hide from viewer
    return allowedPaths.includes(n.to) || n.adminOnly;
  });
  const recentAnomalies = anomalies.slice(0, 5);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        @keyframes livePulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.55;transform:scale(.82)} }
        @keyframes ss-shimmer { 0%{background-position:0% 0} 100%{background-position:300% 0} }

        /* Search focus from old code */
        .ss-search-box:focus-within {
          border-color: #1D9E75 !important;
          background: rgba(255,255,255,0.08) !important;
        }

        /* Nav link base from old code */
        .ss-nav-link {
          transition: all 0.2s ease-in-out;
          cursor: pointer;
          text-decoration: none;
        }
        .ss-nav-link:hover {
          background: rgba(255,255,255,0.05) !important;
        }
        .ss-nav-link:active {
          transform: scale(0.98);
        }

        /* Floating toggle button from old code */
        .ss-toggle-btn {
          position: absolute;
          right: -12px;
          top: 30px;
          width: 24px;
          height: 24px;
          background: #1D9E75;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: 4px solid #0F172A;
          color: white;
          z-index: 10;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          transition: background 0.2s, transform 0.15s;
        }
        .ss-toggle-btn:hover {
          background: #0F6E56;
          transform: scale(1.12);
        }
      `}</style>

      <Box
        component="nav"
        sx={{
          width,
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
          transition: "width 0.3s cubic-bezier(0.4,0,0.2,1)",
          background: "linear-gradient(180deg, #0a0f1a 0%, #07090f 100%)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          display: "flex",
          flexDirection: "column",
          zIndex: 100,
          fontFamily: "'DM Sans', sans-serif",
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {/* ── LOGO + Floating Toggle ── */}
        <Box
          sx={{
            px: collapsed ? 1.5 : 2.5,
            py: 2.5,
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            minHeight: 70,
            position: "relative",
          }}
        >
          <Box display="flex" alignItems="center" gap={1.5}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: "10px",
                background: "linear-gradient(135deg, #10B981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(16,185,129,0.2)",
                flexShrink: 0,
              }}
            >
              <ElectricBolt sx={{ color: "white", fontSize: 22 }} />
            </Box>
            {!collapsed && (
              <Box>
                <Typography
                  sx={{
                    color: "white",
                    fontWeight: 800,
                    fontSize: 16,
                    letterSpacing: "-0.5px",
                    lineHeight: 1,
                  }}
                >
                  StreamSight
                </Typography>
                <Typography
                  sx={{
                    color: "#10B981",
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    mt: 0.5,
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  Retail Engine
                </Typography>
              </Box>
            )}
          </Box>

          {/* Floating circular toggle — from old code */}
          <div
            className="ss-toggle-btn"
            onClick={() => setCollapsed((v) => !v)}
          >
            {collapsed ? (
              <ChevronRight sx={{ fontSize: 14 }} />
            ) : (
              <ChevronLeft sx={{ fontSize: 14 }} />
            )}
          </div>

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
>>>>>>> main
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
<<<<<<< main
                display: "flex",
                alignItems: "center",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "10px",
                px: 1.5,
                py: 1,
                border: "1px solid rgba(255,255,255,0.1)",
                transition: "0.2s",
              }}
            >
              <Search sx={{ color: "#64748B", fontSize: 18 }} />
              <InputBase
                placeholder="Search pages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                sx={{ ml: 1, color: "white", fontSize: 13, flex: 1 }}
              />
            </Box>
          </Box>
        )}

        {/* ── PIPELINE STATUS + TOOLS ROW — from new code ── */}
        {!collapsed && (
          <Box sx={{ px: 2, pt: 1.5, pb: 1 }}>
            <Box
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                background: connected
                  ? "rgba(29,158,117,0.06)"
                  : "rgba(239,68,68,0.06)",
                border: `1px solid ${connected ? "rgba(29,158,117,0.2)" : "rgba(239,68,68,0.2)"}`,
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 1.5,
              }}
            >
              <Box
                sx={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: connected ? "#1D9E75" : "#ef4444",
                  flexShrink: 0,
                  ...(connected
                    ? { animation: "livePulse 2s ease-in-out infinite" }
                    : {}),
                }}
              />
              <Typography
                sx={{
                  color: connected ? "#1D9E75" : "#ef4444",
                  fontSize: "0.7rem",
                  fontFamily: "'JetBrains Mono',monospace",
                  flex: 1,
                }}
              >
                {connected ? "Pipeline Active" : "Disconnected"}
              </Typography>

              {/* Notification Bell */}
              <Tooltip title="Anomaly alerts">
                <IconButton
                  size="small"
                  onClick={(e) => {
                    setBellAnchor(e.currentTarget);
                    setUnreadCount(0);
                  }}
                  sx={{
                    color: "#64748b",
                    "&:hover": { color: "#F43F5E" },
                    p: 0.3,
                  }}
                >
                  <Badge
                    badgeContent={unreadCount}
                    color="error"
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: "0.55rem",
                        height: 14,
                        minWidth: 14,
                      },
                    }}
                  >
                    <NotificationsOutlined sx={{ fontSize: 17 }} />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* Dark / Light toggle */}
              <Tooltip
                title={isDark ? "Switch to Light mode" : "Switch to Dark mode"}
              >
                <IconButton
                  size="small"
                  onClick={onToggleTheme}
                  sx={{
                    color: "#64748b",
                    "&:hover": { color: "#f59e0b" },
                    p: 0.3,
                  }}
                >
                  {isDark ? (
                    <LightMode sx={{ fontSize: 16 }} />
                  ) : (
                    <DarkMode sx={{ fontSize: 16 }} />
                  )}
                </IconButton>
              </Tooltip>
            </Box>

            {/* Session timer */}
            {timeLeft !== null && timeLeft > 0 && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 0.8,
                  px: 1.5,
                  py: 0.6,
                  borderRadius: 1.5,
                  background:
                    timeLeft < 300000
                      ? "rgba(244,63,94,0.08)"
                      : "rgba(100,116,139,0.06)",
                  border: `1px solid ${timeLeft < 300000 ? "rgba(244,63,94,0.2)" : "rgba(255,255,255,0.08)"}`,
                }}
              >
                <Timer
                  sx={{
                    fontSize: 12,
                    color: timeLeft < 300000 ? "#f43f5e" : "#475569",
                  }}
                />
                <Typography
                  sx={{
                    fontSize: "0.62rem",
                    fontFamily: "'JetBrains Mono',monospace",
                    color: timeLeft < 300000 ? "#f43f5e" : "#475569",
                  }}
                >
                  Session: {formatCountdown(timeLeft)}
                </Typography>
              </Box>
            )}
          </Box>

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
>>>>>>> main
        )}
      </Box>

<<<<<<< main
        {/* ── MAIN NAVIGATION ── */}
        <Box sx={{ flex: 1, px: collapsed ? 0.5 : 1.5, py: 1 }}>
          {!collapsed && (
            <Typography
              sx={{
                px: 1,
                mb: 1,
                color: "#475569",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              Main Menu
            </Typography>
          )}
          <List dense disablePadding>
            {visibleNav.map((item) => (
              <Tooltip
                key={item.to}
                title={collapsed ? item.label : ""}
                placement="right"
              >
                <ListItem disablePadding sx={{ mb: 0.5 }}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    style={{ width: "100%", textDecoration: "none" }}
                  >
                    {({ isActive }) => (
                      <ListItemButton
                        className="ss-nav-link"
                        sx={{
                          borderRadius: 2,
                          minHeight: 44,
                          justifyContent: collapsed ? "center" : "flex-start",
                          px: collapsed ? 1 : 2,
                          background: isActive
                            ? `${item.color}15`
                            : "transparent",
                          border: `1px solid ${isActive ? `${item.color}30` : "transparent"}`,
                          "&:hover": {
                            background: `${item.color}0a`,
                            border: `1px solid ${item.color}20`,
                          },
                          transition: "all 0.2s",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: collapsed ? 0 : 36,
                            color: isActive ? item.color : "#64748B",
                            "& svg": { fontSize: 20 },
                          }}
                        >
                          {/* ShopStream event badge */}
                          {item.to === "/ecommerce" &&
                          shopEventCount > 0 &&
                          !collapsed ? (
                            <Badge
                              badgeContent={shopEventCount}
                              color="warning"
                              max={99}
                              sx={{
                                "& .MuiBadge-badge": {
                                  fontSize: "0.55rem",
                                  height: 14,
                                  minWidth: 14,
                                },
                              }}
                            >
                              {item.icon}
                            </Badge>
                          ) : (
                            item.icon
                          )}
                        </ListItemIcon>

                        {!collapsed && (
                          <>
                            <ListItemText
                              primary={item.label}
                              secondary={item.desc}
                              primaryTypographyProps={{
                                fontSize: "0.875rem",
                                fontWeight: isActive ? 700 : 500,
                                color: isActive ? item.color : "#94A3B8",
                              }}
                              secondaryTypographyProps={{
                                fontSize: "0.68rem",
                                color: "#475569",
                                noWrap: true,
                              }}
                            />
                            {/* Role chip for viewer */}
                            {item.to === "/" && role === "viewer" && (
                              <Chip
                                label="READ"
                                size="small"
                                sx={{
                                  height: 14,
                                  fontSize: "0.5rem",
                                  background: "rgba(59,130,246,0.1)",
                                  color: "#60a5fa",
                                  border: "none",
                                }}
                              />
                            )}
                            {/* Active dot */}
                            {isActive && (
                              <Box
                                sx={{
                                  width: 6,
                                  height: 6,
                                  borderRadius: "50%",
                                  background: item.color,
                                  boxShadow: `0 0 8px ${item.color}`,
                                  flexShrink: 0,
                                }}
                              />
                            )}
                          </>
                        )}
                      </ListItemButton>
                    )}
                  </NavLink>
                </ListItem>
              </Tooltip>
            ))}
          </List>

          {/* ── QUICK LINKS — from old code, hidden when collapsed ── */}
          {!collapsed && (
            <>
              <Typography
                sx={{
                  px: 1,
                  mt: 3,
                  mb: 1,
                  color: "#475569",
                  fontSize: 10,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: 1,
                }}
              >
                Quick Links
              </Typography>
              {QUICK_LINKS.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Tooltip key={link.label} title="" placement="right">
                    <ListItem disablePadding sx={{ mb: 0.5 }}>
                      <NavLink
                        to={link.to}
                        style={{ width: "100%", textDecoration: "none" }}
                      >
                        <ListItemButton
                          className="ss-nav-link"
                          sx={{
                            borderRadius: 2,
                            minHeight: 40,
                            px: 2,
                            background: isActive
                              ? "rgba(255,255,255,0.05)"
                              : "transparent",
                            border: `1px solid ${isActive ? "rgba(255,255,255,0.1)" : "transparent"}`,
                            "&:hover": { background: "rgba(255,255,255,0.05)" },
                            transition: "all 0.2s",
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 36,
                              color: isActive ? link.color : "#64748B",
                              "& svg": { fontSize: 18 },
                            }}
                          >
                            <link.icon />
                          </ListItemIcon>
                          <ListItemText
                            primary={link.label}
                            primaryTypographyProps={{
                              fontSize: "0.82rem",
                              fontWeight: 500,
                              color: isActive ? "white" : "#94A3B8",
                            }}
                          />
                        </ListItemButton>
                      </NavLink>
                    </ListItem>
                  </Tooltip>
                );
              })}
            </>
          )}
        </Box>

        {/* ── USER SECTION — merges old gradient avatar tile + new role/email layout ── */}
        <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />
        <Box sx={{ p: collapsed ? 1 : 2 }}>
          {!collapsed ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                p: "10px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              {/* Old code's gradient avatar tile */}
              <UserAvatar name={user} color="#3B82F6" size={34} />
              <Box flex={1} minWidth={0}>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: 13,
                    fontWeight: 600,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {user}
                </Typography>
                <Typography
                  sx={{
                    color: "#10B981",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    fontFamily: "'JetBrains Mono',monospace",
                  }}
                >
                  {role}
                </Typography>
                {email && (
                  <Typography
                    sx={{
                      color: "#475569",
                      fontSize: 9,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {email}
                  </Typography>
                )}
              </Box>
              <Tooltip title="Logout">
                <IconButton
                  size="small"
                  onClick={handleLogout}
                  sx={{
                    color: "#64748B",
                    "&:hover": {
                      color: "#F43F5E",
                      background: "rgba(244,63,94,0.1)",
                    },
                  }}
                >
                  <LogoutOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          ) : (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={1}
            >
              <UserAvatar name={user} color="#3B82F6" size={38} />
              <Tooltip title="Logout" placement="right">
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: "#64748B",
                    width: "100%",
                    "&:hover": { color: "#F43F5E" },
                  }}
                >
                  <LogoutOutlined fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        {/* ── NOTIFICATION BELL POPOVER — from new code ── */}
        <Popover
          open={Boolean(bellAnchor)}
          anchorEl={bellAnchor}
          onClose={() => setBellAnchor(null)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              background: "#0d1117",
              border: "1px solid #1e293b",
              borderRadius: 2,
              minWidth: 280,
              maxHeight: 360,
              overflow: "auto",
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid #1e293b" }}>
            <Typography
              sx={{ color: "#e2e8f0", fontWeight: 700, fontSize: "0.85rem" }}
            >
              🔔 Anomaly Alerts
            </Typography>
            <Typography
              sx={{
                color: "#64748b",
                fontSize: "0.65rem",
                fontFamily: "'JetBrains Mono',monospace",
              }}
            >
              {anomalies.length} total detected
            </Typography>
          </Box>
          {recentAnomalies.length === 0 ? (
            <Box
              sx={{
                p: 3,
                textAlign: "center",
                color: "#334155",
                fontSize: "0.8rem",
              }}
            >
              No anomalies yet
            </Box>
          ) : (
            recentAnomalies.map((a, i) => (
              <Box
                key={i}
                sx={{
                  px: 2,
                  py: 1.2,
                  borderBottom: "1px solid #111827",
                  "&:last-child": { borderBottom: 0 },
                }}
              >
                <Box display="flex" alignItems="center" gap={1} mb={0.3}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      flexShrink: 0,
                      background:
                        a.severity === "high"
                          ? "#f43f5e"
                          : a.severity === "medium"
                            ? "#f59e0b"
                            : "#3b82f6",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#e2e8f0",
                      fontSize: "0.78rem",
                      fontWeight: 600,
                    }}
                  >
                    {a.user_id}
                  </Typography>
                  <Typography
                    sx={{
                      color: "#334155",
                      fontSize: "0.65rem",
                      fontFamily: "'JetBrains Mono',monospace",
                      ml: "auto",
                    }}
                  >
                    {a.severity?.toUpperCase()}
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "#64748b", fontSize: "0.72rem", pl: 1.8 }}
                >
                  {a.reason}
                </Typography>
              </Box>
            ))
          )}
        </Popover
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
>>>>>>> main
      </Box>
    </Box>
  );
}
