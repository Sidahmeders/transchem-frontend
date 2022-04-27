// ** Router imports
import { useRoutes, Navigate } from 'react-router-dom'
// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '../utility/Utils'
// import { Can } from '../utility/context/Can'

const Router = ({ allRoutes }) => {
  const getHomeRoute = () => {
    const user = getUserData()
    if (user) {
      return getHomeRouteForLoggedInUser(user.role)
    } else {
      return '/login'
    }
  }
  
  const routes = useRoutes([
    {
      path: '/',
      index: true,
      element: <Navigate replace to={getHomeRoute()} />
    },
    ...allRoutes
  ])

  return routes
}

export default Router
