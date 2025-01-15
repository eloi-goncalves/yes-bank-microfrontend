import App from 'next/app';

function StatementApp({ Component, pageProps }) {
  return ( <Component {...pageProps} /> );
}

StatementApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default StatementApp;
