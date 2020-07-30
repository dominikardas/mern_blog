import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/* Loading */
import { usePromiseTracker } from "react-promise-tracker";

const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  return (
    promiseInProgress &&
    <div className="loading"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>
  );  
}

ReactDOM.render(
  <React.StrictMode>
    <App />
    <LoadingIndicator/>
  </React.StrictMode>,
  document.getElementById('root')
);
