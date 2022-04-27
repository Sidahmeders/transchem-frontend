import { lazy } from 'react'

const UsersManagement = lazy(() => import('../../views/users-management'))

export default [
  {
    path: '/users-management',
    index: true,
    element: <UsersManagement />,
    meta: {
      action: 'read',
      resource: 'users-management'
    }
  }
]