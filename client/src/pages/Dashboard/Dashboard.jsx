import React, { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import SideMenu from "../../components/Dashboard/SideMenu";
import Header from "../../components/Dashboard/Header";
import { Outlet } from "react-router-dom";
import SideMenuMobile from "../../components/Dashboard/SideMenuMobile";
import { useMediaQuery } from "@mui/material";
import { useDispatch } from "react-redux";
import { closeMobileMenu } from "../../redux/MobileMenuSlice";
import ForumIcon from "@mui/icons-material/Forum";
import ChatBot from "../../components/ChatBot/ChatBot";

export default function Dashboard() {
  const isMobile = useMediaQuery("(max-width: 900px)");
  const dispatch = useDispatch();
  const [openChatbot, setOpenChatbot] = useState(false);

  useEffect(() => {
    if (!isMobile) {
      dispatch(closeMobileMenu());
    }
  }, [isMobile, dispatch]);

  const toggleChatbot = () => {
    setOpenChatbot((prev) => !prev);
  };
  return (
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        {/* Desktop Sidebar */}
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <SideMenu />
        </Box>

        {/* Mobile Sidebar */}
        <Box sx={{ display: { xs: "block", md: "none" } }}>
          <SideMenuMobile />
        </Box>

        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            mt: { md: 9 },
            marginInline: "auto",
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : theme.palette.background.default,
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
        <ForumIcon
          onClick={toggleChatbot}
          sx={{
            position: "fixed",
            bottom: 20,
            right: 20,
            backgroundColor: "primary.main",
            fontSize: 45,
            borderRadius: "50%",
            padding: "10px",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              transform: "scale(1.1)",
              boxShadow: `0px 0px 10px 5px rgba(135, 55, 255, 0.4)`,
            },
          }}
        />
        {openChatbot && (
          <Box
            sx={{
              position: "fixed",
              bottom: 80,
              right: 20,
              width: "300px",
              height: "400px",
              borderRadius: "8px",
              overflow: "hidden",
              zIndex: 10,
            }}
          >
            <ChatBot /> 
          </Box>
        )}
      </Box>
    </>
  );
}
