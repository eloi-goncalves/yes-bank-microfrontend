import App from 'next/app';

function TransactionApp({ Component, pageProps }) {
  return ( <Component {...pageProps} /> );
}

TransactionApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default TransactionApp;
