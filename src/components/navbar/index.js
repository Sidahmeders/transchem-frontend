// ** React Imports
import { Fragment } from 'react'
// ** Custom Components
// ** Dropdowns Imports
import MenuVisibility from './MenuVisibility'
import NavbarSearch from './NavbarSearch'
import UserDropdown from './UserDropdown'
import NotificationDropdown from './NotificationDropdown'

const ThemeNavbar = (props) => {
  return (
    <Fragment>
      <ul className='nav navbar-nav align-items-center me-auto'>
        <MenuVisibility {...props} />
        <NavbarSearch />
      </ul>
      <ul className='nav navbar-nav align-items-center ms-auto'>
        <NotificationDropdown />
        <UserDropdown />
      </ul>
    </Fragment>
  )
}

export default ThemeNavbar