import React from 'react';
import Routers from '../routes/server';

const App = () => {
  return <div className="container_bg">{Routers()}</div>;
};
export default App;
