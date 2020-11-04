import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { ThemeProvider } from 'styled-components'

import App from './App';
//import { configureStore } from './config/configerStore'
import { configureStore } from './config/configureStore'
import reportWebVitals from './reportWebVitals';
import { defaultTheme } from './style/theme'

import './global.css';

// TODO: Add store and theme providers


export const store = configureStore()

ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
      <ThemeProvider theme={defaultTheme}>
         <App />
      </ThemeProvider>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
