import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import MobileOnlyGuard from './layouts/MobileOnlyGuard.jsx' // Adjust path if needed

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The Guard intercepts everything before the App even loads */}
    <MobileOnlyGuard>
      <App />
    </MobileOnlyGuard>
  </React.StrictMode>,
)