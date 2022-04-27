// ** React Imports
import { Outlet } from 'react-router-dom'

// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'

import Navbar from '../components/navbar'

const VerticalLayout = props => {
  return (
    <Layout
      menuData={navigation} 
      navbar={props => <Navbar {...props}/>}
      {...props}
    >
    <Outlet />
  </Layout>
  )
}

export default VerticalLayout
