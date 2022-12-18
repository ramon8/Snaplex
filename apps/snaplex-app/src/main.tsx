import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';

import App from './app/app';
import { store } from './app/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);