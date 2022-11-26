import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ProSidebarProvider } from 'react-pro-sidebar';
import './index.css';


ReactDOM.render(
  <ProSidebarProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ProSidebarProvider>,
  document.getElementById('root')
  
);
