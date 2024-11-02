import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(()=> import('../components/Home'))
const Dashboard = lazy(()=> import('../components/dashboard'))

const LocalRouter = ({ children }) => {
  return (
    <Router>
      <div className="flex flex-row h-screen overflow-hidden">
        { children }
        <div className="flex-1 p-6 bg-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country" element={<Dashboard />} />
              <Route path="/globe" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default LocalRouter