import * as ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'
import './index.css'

import App from './app/app';
import { store } from './app/store'
import { io } from "socket.io-client"
import { getRandomInt } from './utils/getRandomInt';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

const id = localStorage.getItem("id") || getRandomInt(100000);
localStorage.setItem("id", id.toString())

export const socket = io("http://localhost:3000/", {
  query: { id }
});
