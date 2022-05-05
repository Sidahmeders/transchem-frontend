import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useEffect, useState, useContext } from 'react'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { Card } from 'reactstrap'
import { columns, ExpandableTable } from './columns'
import AddUserSidebar from './addUser'
import CustomHeader from './CustomHeader'
import EditUser from './EditUser'
import { ContextConsumer } from '@context'

const UsersList = () => {
  const { LoggedInUserInfo, usersData, usersManagement } = useContext(ContextConsumer)
  const { fetchUsers, getRoleOptions, putUser } = usersManagement
  const roleOptions = getRoleOptions()

  const [searchTerm, setSearchTerm] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [show, setShow] = useState(false)

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)
  // ** Function in get data on search query change
  const handleFilter = val => setSearchTerm(val)

  const dataToRender = () => {
    // const filters = { q: searchTerm }
    // const isFiltered = Object.keys(filters).some((k) => filters[k].length > 0)
    return usersData
  }

  useEffect(() => {
    fetchUsers(LoggedInUserInfo)
  }, [])

  return (
    <div className='app-user-list'>
      <h3>Users List</h3>
      <p className='mb-2'>some text to describe what our users will be doing and what rights and status they posess</p>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <EditUser
            userInfo={userInfo}
            roleOptions={roleOptions}
            putUser={putUser}
            show={show}
            setShow={setShow}
          />
          <DataTable
            pagination
            responsive
            defaultSortFieldId={1}
            columns={columns}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            expandableRows
            expandableRowsComponent={ExpandableTable}
            data={dataToRender().map((data) => ({...data, setShow, setUserInfo }))}
            subHeader
            subHeaderComponent={
              <CustomHeader
                count={usersData}
                searchTerm={searchTerm}
                handleFilter={handleFilter}
                toggleSidebar={toggleSidebar}
              />
            }
          />
        </div>
      </Card>
      <AddUserSidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
    </div>
  )
}

export default UsersList
