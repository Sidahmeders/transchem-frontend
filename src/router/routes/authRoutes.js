import { lazy } from 'react'

const Home = lazy(() => import('../../views/Home'))
const SecondPage = lazy(() => import('../../views/SecondPage'))
const Login = lazy(() => import('../../views/login'))
const Register = lazy(() => import('../../views/Register'))
const ForgotPassword = lazy(() => import('../../views/ForgotPassword'))
const NotAuthorized = lazy(() => import('../../views/NotAuthorized'))
const Error = lazy(() => import('../../views/Error'))

export default [
  // ** Filler Routes.
  //////////////////////////
  {
    path: '/home',
    element: <Home />,
    meta: {
      action: 'read',
      resource: 'home'
    }
  },
  {
    path: '/second-page',
    element: <SecondPage />,
    meta: {
      action: 'read',
      resource: 'second-page'
    }
  },
  //////////////////////////
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/not-authorized',
    element: <NotAuthorized />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '*',
    element: <Error />,
    meta: {
      layout: 'blank'
    }
  }
]