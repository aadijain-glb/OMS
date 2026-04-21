import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import './index.css'
import App from './App.jsx'
import { CartContextProvider } from './context/cartContext'

import { AuthProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <CartContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CartContextProvider>
  </AuthProvider>
)
