import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import Home from './components/Home/Home';
import Portfolio from './components/Portfolio/Portfolio';
import TransactionHistory from './components/Transaction/Transaction';
import EarnPoints from './components/Quiz/EarnPoints';
import LeaderBoard from './components/Quiz/Leaderboard';
import LandingPage from './pages/LandingPage/LandingPage';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './Theme';
import { useSelector } from 'react-redux';

function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<Home />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="transaction-history" element={<TransactionHistory />} />
            <Route path="earn-points" element={<EarnPoints />} />
            <Route path="leaderboard" element={<LeaderBoard />} />
          </Route>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
}

export default App;