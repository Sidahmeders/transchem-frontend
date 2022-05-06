import { Mail, Home, Shield, Square, Map, Activity, ShoppingBag } from 'react-feather'

const myNavigations = [
  {
    id: 'users-management',
    title: 'Users Management',
    icon: <Shield size={20} />,
    navLink: '/users-management',
    action: 'read',
    resource: 'users-management'
  },
  {
    id: 'admin-dashboard',
    title: 'Dashboard',
    icon: <Square size={20} />,
    children: [
      {
        id: 'owned-sites',
        title: 'Owned Sites',
        icon: <Map />,
        navLink: '/dashboard/owned-sites',
        action: 'read',
        resource: 'owned-sites'
      },
      {
        id: 'activity-logs',
        title: 'Activity Logs',
        icon: <Activity />,
        navLink: '/dashboard/activity-logs',
        action: 'read',
        resource: 'activity-logs'
      },
      {
        id: 'stock-overview',
        title: 'Stock Overview',
        icon: <ShoppingBag />,
        navLink: '/dashboard/stock-overview',
        action: 'read',
        resource: 'stock-overview'
      }
    ]
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
