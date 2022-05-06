import { lazy } from 'react'

const UsersManagement = lazy(() => import('../../views/users-management'))
const OwnedSites = lazy(() => import('../../views/ownedSites'))

export default [
  {
    path: '/users-management',
    index: true,
    element: <UsersManagement />,
    meta: {
      action: 'read',
      resource: 'users-management'
    }
  },
  {
    path: '/dashboard/owned-sites',
    index: true,
    element: <OwnedSites />,
    meta: {
      action: 'read',
      resource: 'owned-sites'
    }
  }
]