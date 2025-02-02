import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import store from './store/store.js'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignUp, AuthStatus, Login } from './components/index.js';
import Home from './pages/Home.jsx'
import VideoPage from './pages/VideoPage.jsx'

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
      },
      {
        path: "/video/:videoId",
        element: (
          <AuthStatus authentication={true}>
            <VideoPage/>
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
