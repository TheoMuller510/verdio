import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'

// ============================================================
// FICHIER main.jsx
// On fournit le store à l'application en l'englobant entièrement pour pouvoir l'utiliser partout
// ============================================================

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>, 
)
