
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Founders from './pages/Founders';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/founders" element={<Founders />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
