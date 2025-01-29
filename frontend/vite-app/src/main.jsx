import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ConnectWallet } from './components/connectWallet'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConnectWallet>
      <App />
    </ConnectWallet>
  </StrictMode>,
)
