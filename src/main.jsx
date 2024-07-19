import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//Create a root element using the 'root' div in the HTML file and render the App component within it.
// React.StrictMode is a wrapper component that helps with highlighting potential problems in an application.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
