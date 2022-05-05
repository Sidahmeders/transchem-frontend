import { Mail, Home, Shield } from 'react-feather'

const myNavigations = [
  {
    id: 'users-management',
    title: 'Users Management',
    icon: <Shield size={20} />,
    navLink: '/users-management',
    action: 'read',
    resource: 'users-management'
  }
]

export default [
  {
    id: 'home',
    title: 'Home',
    icon: <Home size={20} />,
    navLink: '/home',
    action: 'read',
    resource: 'home'
  },
  {
    id: 'secondPage',
    title: 'Second Page',
    icon: <Mail size={20} />,
    navLink: '/second-page',
    action: 'read',
    resource: 'second-page'
  },
  ...myNavigations
]
