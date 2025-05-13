// import React from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Box,
// } from "@mui/material";
// import ProfileMenu from "../profile/ProfileMenu.tsx";
// export function HomeLayout({ children }: { children: React.ReactNode }) {
//   // const navigate = useNavigate();
//
//   return (
//     <Box display="flex" width="100%" flexDirection="column">
//       <AppBar
//         position="static"
//         elevation={0}
//         sx={{ bgcolor: "white", color: "black", width: "100%" }}
//       >
//         <Toolbar
//           sx={{ justifyContent: "space-between", gap: 2, flexWrap: "wrap" }}
//         >
//           {/* Logo */}
//           <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
//             Office Booking
//           </Typography>
//           {/* Desktop Menu */}
//           <Box sx={{ display: { xs: "none", md: "flex" }, gap: 2 }}>
//             <ProfileMenu />
//           </Box>
//           {/* Mobile Menu Icon */}
//           <Box sx={{ display: { xs: "flex", md: "none" } }}>
//             <ProfileMenu />
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Box sx={{ my: 4, flex: 1, position: "relative", width: "100%" }}>
//         {children}
//       </Box>
//     </Box>
//   );
// }
