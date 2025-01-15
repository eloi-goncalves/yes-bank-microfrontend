import App from 'next/app';
import '../styles/global.css';
import '../styles/container.css';
import '../styles/home.css';
import '../styles/statement.css';
import 'yes-bank-components/dist/styles.css';
import { Header, Dashboard } from '../components/yes-bank-components';
import store from '../store/store';
import { Provider } from 'react-redux';

function HomeApp({ Component, pageProps }) {
  return (
    <div>
      <Provider store={store}>
        <Header user="N" type='S'/>
        <Dashboard>
          <Component {...pageProps} />
        </Dashboard>
      </Provider>
    </div>
  );
}

HomeApp.getInitialProps = async ctx => {
  const appProps = await App.getInitialProps(ctx);
  return appProps;
};
export default HomeApp;
