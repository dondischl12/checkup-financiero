import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import App from './App'
import './index.css'

function RedirectHandler({ children }) {
  const navigate = useNavigate()
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const redirect = params.get('r')
    if (redirect) {
      navigate(redirect, { replace: true })
    }
  }, [])
  return children
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/checkup-financiero">
      <RedirectHandler>
        <App />
      </RedirectHandler>
    </BrowserRouter>
  </React.StrictMode>
)
