import React, { useEffect } from 'react'; 
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import SideMenu from '../../components/Dashboard/SideMenu';
import Header from '../../components/Dashboard/Header';
import { Outlet } from 'react-router-dom';
import SideMenuMobile from '../../components/Dashboard/SideMenuMobile';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closeMobileMenu } from '../../redux/MobileMenuSlice';

export default function Dashboard() {
    const isMobile = useMediaQuery('(max-width: 900px)');
    const dispatch = useDispatch();

    useEffect(() => {
        if (!isMobile) {
            dispatch(closeMobileMenu());
        }
    }, [isMobile, dispatch]);

    return (
        <>
            <CssBaseline enableColorScheme />
            <Box sx={{ display: 'flex' }}>
                {/* Desktop Sidebar */}
                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                    <SideMenu />
                </Box>

                {/* Mobile Sidebar */}
                <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <SideMenuMobile />
                </Box>

                <Box
                    component="main"
                    sx={(theme) => ({
                        flexGrow: 1,
                        mt: { md: 9 },
                        marginInline: 'auto',
                        backgroundColor: theme.vars
                            ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
                            : theme.palette.background.default,
                        overflow: 'auto',
                    })}
                >
                    <Stack
                        spacing={2}
                        sx={{
                            alignItems: 'center',
                            mx: 3,
                            pb: 5,
                            mt: { xs: 8, md: 0 },
                        }}
                    >
                        <Header />
                        <Outlet />
                    </Stack>
                </Box>
            </Box>
        </>
    );
}