import React from 'react';
import ReactDOM from 'react-dom';
import { SearchProvider } from './contexts/Search';
import './index.css';
import Routes from './Routes';

ReactDOM.render(
  <React.StrictMode>
    <SearchProvider>
      <Routes />
    </SearchProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// igor bunda mole
