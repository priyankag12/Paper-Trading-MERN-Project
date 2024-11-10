import React from "react";
import { useSelector } from "react-redux";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate, useLocation } from "react-router-dom";
import menuItems from "./MenuItems";
import Avatar from "@mui/material/Avatar";
import OptionsMenu from "./OptionsMenu";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function SideMenu() {
    const theme = useTheme();
    const isOpen = useSelector((state) => state.sidebar.isOpen);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = useSelector((state) => state.user.userInfo);

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer variant="permanent" open={isOpen}>
                <DrawerHeader>
                    <IconButton sx={{ color: theme.palette.primary.main }}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menuItems.slice(0, -1).map((item, index) => (
                        <ListItem
                            key={index}
                            disablePadding
                            onClick={() => navigate(item.route)}
                            sx={{
                                borderLeft:
                                    location.pathname === item.route
                                        ? `4px solid ${theme.palette.accent.main}`
                                        : "none",
                                "&:hover": {
                                    borderLeft: `4px solid ${theme.palette.accent.light}`,
                                    color: theme.palette.primary.contrastText,
                                },
                            }}
                        >
                            <ListItemButton>
                                <ListItemIcon
                                    sx={{
                                        color:
                                            location.pathname === item.route
                                                ? theme.palette.primary
                                                      .contrastText
                                                : "inherit",
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.label} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />

                <Stack
                    direction="row"
                    sx={{
                        p: 2,
                        gap: 1,
                        alignItems: "center",
                        borderTop: "1px solid",
                        borderColor: theme.palette.divider,
                        mt: "auto",
                        backgroundColor: theme.palette.neutral.light,
                    }}
                >
                    <Avatar
                        sizes="small"
                        onClick={() => navigate("/profile")}
                        alt={userInfo ? userInfo.name : "Guest"}
                        src={userInfo?.avatar}
                        sx={{
                            width: 36,
                            height: 36,
                            cursor: "pointer",
                        }}
                    />
                    <Box sx={{ mr: "auto", pl: 1 }}>
                        <Typography
                            variant="body2"
                            sx={{ fontWeight: 500, lineHeight: "16px" }}
                        >
                            {userInfo ? userInfo.name : "Guest"}
                        </Typography>
                        <Typography
                            variant="caption"
                            sx={{ color: "text.secondary" }}
                        >
                            {userInfo ? userInfo.email : ""}
                        </Typography>
                    </Box>
                    <OptionsMenu />
                </Stack>
            </Drawer>
        </Box>
    );
}
