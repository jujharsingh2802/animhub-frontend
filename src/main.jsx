import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { LoginPagePopUp, SignUp, AuthStatus } from './components';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/login",
        // element: <LoginPagePopUp />
      },
      {
        path: "/signup",
        element: (
          <AuthStatus authentication={false}>
            <SignUp />
          </AuthStatus>
        )
      }
    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
