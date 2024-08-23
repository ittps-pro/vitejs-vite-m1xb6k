import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import Form from './Form';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Form />
    <App />
  </StrictMode>
);
