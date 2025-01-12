import { Suspense, lazy } from 'react';
import App from 'next/app';
import dynamic from 'next/dynamic';
// const Nav = lazy(() => import('home/nav'));
// const Nav = dynamic(() => import('home/nav'), { 
//   ssr: false, // Disable server-side rendering for this component
//   loading: () => <div>Loading...</div> // Custom loading state
// });

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Suspense fallback={'loading'}>
        {/* <Nav /> */}
        <div>Teste</div>
      </Suspense>
      <Component {...pageProps} />
    </>
  );
}

MyApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default MyApp;
