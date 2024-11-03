import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const Home = lazy(()=> import('../components/Home'))
const Country = lazy(()=> import('../components/Country'))
const Globe = lazy(()=>import('../components/Globe/index'))

const LocalRouter = ({ children }) => {
  return (
    <Router>
      <div className="flex flex-row h-screen overflow-hidden">
        { children }
        <div className="flex-1 p-0 bg-gray-100">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/country" element={<Country className="p-6" />} />
              <Route path="/country/:name" element={<Country className="p-6"/>} />
              <Route path="/globe" element={<Globe />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </Router>
  );
};

export default LocalRouter