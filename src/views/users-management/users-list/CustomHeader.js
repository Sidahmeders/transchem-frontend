import { Share, Printer, FileText, File, Grid, Copy } from 'react-feather'
import { Row, Col, Input, Button, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'

function convertArrayOfObjectsToCSV(store, array) {
  let result
  const columnDelimiter = ','
  const lineDelimiter = '\n'
  const keys = Object.keys(store.data[0])

  result = ''
  result += keys.join(columnDelimiter)
  result += lineDelimiter

  array.forEach(item => {
    let ctr = 0
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter
      result += item[key]
      ctr++
    })
    result += lineDelimiter
  })

  return result
}

function downloadCSV(store) {
  const link = document.createElement('a')
  let csv = convertArrayOfObjectsToCSV(store, store.data)
  if (csv === null) return

  const filename = 'export.csv'
  if (!csv.match(/^data:text\/csv/i)) csv = `data:text/csv;charset=utf-8,${csv}`

  link.setAttribute('href', encodeURI(csv))
  link.setAttribute('download', filename)
  link.click()
}

export default function CustomHeader({ store, toggleSidebar, handleFilter, searchTerm }) {
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-6'>
          <h3>Users List</h3>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>Search:</label>
            <Input
              id='search-invoice'
              className='ms-50 w-100'
              type='text'
              value={searchTerm}
              onChange={e => handleFilter(e.target.value)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
            <UncontrolledDropdown className='me-1'>
              <DropdownToggle color='secondary' caret outline>
                <Share className='font-small-4 me-50' />
                <span className='align-middle'>Export</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className='w-100'>
                  <Printer className='font-small-4 me-50' />
                  <span className='align-middle'>Print</span>
                </DropdownItem>
                <DropdownItem className='w-100' onClick={() => downloadCSV(store)}>
                  <FileText className='font-small-4 me-50' />
                  <span className='align-middle'>CSV</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Grid className='font-small-4 me-50' />
                  <span className='align-middle'>Excel</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <File className='font-small-4 me-50' />
                  <span className='align-middle'>PDF</span>
                </DropdownItem>
                <DropdownItem className='w-100'>
                  <Copy className='font-small-4 me-50' />
                  <span className='align-middle'>Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <Button className='add-new-user' color='primary' onClick={toggleSidebar}>Add User</Button>
          </div>
        </Col>
      </Row>
    </div>
  )
}
