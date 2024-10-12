import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Authentication/SignIn';
import SignUp from './components/Authentication/SignUp';
import Portfolio from './components/Portfolio/Portfolio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} /> 
        <Route path="/signup" element={<SignUp />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
