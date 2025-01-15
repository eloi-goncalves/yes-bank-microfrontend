import React from 'react';
import HomePageComponent from '../components/home-page/HomePageComponent';

const Home = () => {
  return (
    <HomePageComponent />
  );
};

Home.getInitialProps = async ctx => {
  return {};
};

export default Home;
