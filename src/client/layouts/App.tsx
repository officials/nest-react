import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from '../routes';
import 'antd/dist/antd.css';

const App = () => {
  return <BrowserRouter basename="/">{Routers()}</BrowserRouter>;
};
export default App;
