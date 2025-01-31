import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { Toaster } from './components/ui/toaster';
// import { PayPalScriptProvider } from '@paypal/react-paypal-js';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      {/* <PayPalScriptProvider
        options={{
          clientId:
            'ATN7_PKEOFD-E2qVrWQ58wdai9TKbzcDzFftMj7vpoRdgbms1QY3T1ncyL8VroH3dIPwCjL9e282A6RC',
        }}
      > */}
        <App />
        <Toaster />
      {/* </PayPalScriptProvider> */}
    </Provider>
  </BrowserRouter>,
);
