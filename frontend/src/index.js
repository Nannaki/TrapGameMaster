import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Theme from "./components/Theme";

ReactDOM.render(
  <React.StrictMode>
      <Theme>
        <Provider store={store}>
          <App />
        </Provider>
      </Theme>
  </React.StrictMode>,
  document.getElementById('root')
);

