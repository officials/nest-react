import React from 'react';
import './index.less';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      我是首页，你有意见？
      <Link to="/hashtag">gogogo</Link>
    </div>
  );
};

export default Home;
