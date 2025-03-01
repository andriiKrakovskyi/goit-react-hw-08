// React та ReactDOM
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Головний компонент застосунку
import App from './App.jsx';

// Глобальні стилі
import 'modern-normalize';
import './styles/reset.css';
import './styles/variables.css';
import './styles/global.css';

// Бібліотеки
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';

// Локальні імпорти (Redux store)
import { store, persistor } from './redux/store';

// import { StyledEngineProvider } from '@mui/material/styles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
    <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
  </StrictMode>,
);
