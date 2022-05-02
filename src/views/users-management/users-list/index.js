import '@styles/react/apps/app-users.scss'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'
import { Card } from 'reactstrap'
import { getAllData, getData } from '@store/user'
import { columns, ExpandableTable } from './columns'
import AddUserSidebar from './addUser'
import CustomHeader from './CustomHeader'
import CustomPagination from './CustomPagination'
import EditUser from './EditUser'

const UsersList = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)

  const [sort, setSort] = useState('desc')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({})
  const [show, setShow] = useState(false)

  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage
      })
    )
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: value,
        page: currentPage
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
  const handleFilter = val => {
    setSearchTerm(val)
    dispatch(
      getData({
        sort,
        q: val,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage
      })
    )
  }

  const count = Number(Math.ceil(store.total / rowsPerPage))

  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        perPage: rowsPerPage,
        page: page.selected + 1
      })
    )
    setCurrentPage(page.selected + 1)
  }

  const dataToRender = () => {
    const filters = {
      q: searchTerm
    }

    const isFiltered = Object.keys(filters).some(function (k) {
      return filters[k].length > 0
    })

    if (store.data.length > 0) {
      return store.data
    } else if (store.data.length === 0 && isFiltered) {
      return []
    } else {
      return store.allData.slice(0, rowsPerPage)
    }
  }

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        q: searchTerm,
        page: currentPage,
        perPage: rowsPerPage
      })
    )
  }

  return (
    <div className='app-user-list'>
      <h3>Users List</h3>
      <p className='mb-2'>some text to describe what our users will be doing and what rights and status they posess</p>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <EditUser defaultValues={userInfo} show={show} setShow={setShow} />
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            expandableRows
            columns={columns}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            expandableRowsComponent={ExpandableTable}
            paginationComponent={() => <CustomPagination handlePagination={handlePagination} currentPage={currentPage} count={count} />}
            data={dataToRender().map((data) => ({...data, setShow, setUserInfo }))}
            subHeaderComponent={
              <CustomHeader
                count={store}
                searchTerm={searchTerm}
                rowsPerPage={rowsPerPage}
                handleFilter={handleFilter}
                handlePerPage={handlePerPage}
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
