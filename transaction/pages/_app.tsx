import App, { AppContext, AppProps } from 'next/app';
import 'yes-bank-components/dist/styles.css';

function TransactionApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

TransactionApp.getInitialProps = async (ctx: AppContext) => {
  const appProps = await App.getInitialProps(ctx);
  return { ...appProps };
};

export default TransactionApp;
