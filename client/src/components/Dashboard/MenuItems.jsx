import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AnalyticsRoundedIcon from "@mui/icons-material/AnalyticsRounded";
import PaidIcon from "@mui/icons-material/Paid";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const MenuItems = [
    {
        label: "Home",
        icon: <HomeRoundedIcon sx={{ fontSize: 23 }} />,
        route: "/dashboard/home",
    },
    {
        label: "Portfolio",
        icon: <AnalyticsRoundedIcon sx={{ fontSize: 23 }} />,
        route: "/dashboard/portfolio",
    },
    {
        label: "Transaction History",
        icon: <PaidIcon sx={{ fontSize: 23 }} />,
        route: "/dashboard/transaction-history",
    },
    {
        label: "Trade",
        icon: <AccountBalanceWalletIcon sx={{ fontSize: 23 }} />,
        route: "/dashboard/trade",
    },
    {
        label: "Earn Points",
        icon: <EmojiEventsIcon sx={{ fontSize: 23 }} />,
        route: "/dashboard/earn-points",
    },
    {
        label: "Leader Board",
        icon: <LeaderboardIcon sx={{ fontSize: 23 }} />,
        route: "/dashboard/leaderboard",
    },
    {
        label: "Logout",
        icon: <LogoutIcon sx={{ fontSize: 23 }} />,
        route: "/",
    },
];

export default MenuItems;
