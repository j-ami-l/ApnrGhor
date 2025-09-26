import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import { router } from './router/Router.jsx'
import AuthProvider from './Provider/AuthProvider/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import UserInfoProvider from './Provider/UserInfoProvider/UserInfoProvider.jsx'
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserInfoProvider>
          <RouterProvider router={router}></RouterProvider>
          <Toaster
            position="top-right"
            reverseOrder={false}
            containerStyle={{
              zIndex: 10000,
            }}
          />
        </UserInfoProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
