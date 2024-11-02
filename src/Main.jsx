import React, { useState, useEffect } from 'react';
import Navigation from "./navigation/index"

import LocalRouter from './routes/router';

const Main = () => { 

  return (
    <LocalRouter>
      <div className="h-screen">
        <Navigation />
      </div>
    </LocalRouter>
  );
};

export default Main;
