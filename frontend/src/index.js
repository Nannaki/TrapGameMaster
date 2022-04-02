//Imports
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import Theme from "./Theme";

//Rendu de l'store avec les provider et le thème MUI
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

