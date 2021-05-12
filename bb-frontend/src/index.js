import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

// user-defined components
import AuthenticationRouting from './authentication-routing';
import { ProvideAuth } from './use-auth';

ReactDOM.render(
  <React.StrictMode>
    <ProvideAuth>
      <AuthenticationRouting />
    </ProvideAuth>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
