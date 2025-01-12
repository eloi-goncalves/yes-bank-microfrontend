import React, { Fragment, Suspense, lazy } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { HelloWorld } from '../components/helloWorld';
typeof window !== 'undefined' && console.log(window.checkout);

const Home = ({ loaded }) => {
  return (
    <div>
      <HelloWorld />
    </div>
  );
};
//
Home.getInitialProps = async ctx => {
  return {};
};

export default Home;
