import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignUp, AuthStatus, Login } from './components/index.js';
import Home from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "",
        element: (
          <AuthStatus authentication={false}>
            <Home />
          </AuthStatus>
        )
      },
      {
        path: "/login",
        element: (
          <AuthStatus authentication={false}>
          <Login />
          </AuthStatus>
        )
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
