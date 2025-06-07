import { BrowserRouter } from "react-router-dom"
import Router from './routes'
import { store } from '../src/store'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useTranslation } from "react-i18next";
import useEffectOnUpdate from "./custom-hooks/useEffectOnUpdate";
const queryClient = new QueryClient()
function App() {
  const { i18n } = useTranslation();
  useEffectOnUpdate(() => {
    document.documentElement.setAttribute('dir', i18n.language === 'ar' ? 'rtl' : 'ltr');
  }, [ i18n.language ])
  return (
    <div className="text-secondary">
      <ToastContainer position="bottom-right" />
      <BrowserRouter>
        <QueryClientProvider client={ queryClient }>
          <Provider store={ store }>
            <Router />
          </Provider>
        </QueryClientProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
