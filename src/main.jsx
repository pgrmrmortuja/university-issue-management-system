import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router/dom";
import './index.css'
import { router } from './Routes/Routes';
import AuthProvider from './Providers/AuthProvider'

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <AuthProvider>
      <QueryClientProvider client={queryClient}>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />
          </div>
          <ToastContainer />
      </QueryClientProvider>
    </AuthProvider>
);
