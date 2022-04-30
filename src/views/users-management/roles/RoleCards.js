import { Link } from 'react-router-dom'
import { Fragment, useState, useEffect } from 'react'
import { Row, Col, Card, CardBody } from 'reactstrap'
import { Copy } from 'react-feather'
import AvatarGroup from '@components/avatar-group'
import { AddNewRoleItem } from './Components'
import EditRoleTable from './EditRoleTable'
import axios from 'axios'

const fetchRoles = async (setRoles) => {
  const response = await axios.get('http://localhost:5000/api/access/roles')
  if (response.status !== 200) return null
  const { roles } = response.data
  setRoles(() => roles)
}

const RoleCards = () => {
  const [show, setShow] = useState(false)
  const [modalType, setModalType] = useState('Add New')
  const [roles, setRoles] = useState([])

  useEffect(() => fetchRoles(setRoles), [])

  return (
    <Fragment>
      <Row>
        {roles.map((role, index) => (
          <CardItem
            key={index}
            role={role}
            modalType={modalType}
            setModalType={setModalType}
            show={show}
            setShow={setShow}
          />
        ))}
        <AddNewRoleItem setModalType={setModalType} setShow={setShow} />
      </Row>
    </Fragment>
  )
}


function CardItem({ role, modalType, setModalType, show, setShow }) {
  const showRoleEdit = (event) => {
    event.preventDefault()
    setModalType('Edit')
    setShow(true)
  }

  return (
    <>
      <EditRoleTable
        permissions={role.permissions}
        show={show}
        setShow={setShow}
        modalType={modalType}
        setModalType={setModalType}
      />
      <Col xl={4} md={6}>
        <Card>
          <CardBody>
            <div className='d-flex justify-content-between'>
              <span>{`Total ${role.assigned_users} users`}</span>
              <AvatarGroup data={role.imagesURL.map((image) => ({img: image, size: 'sm'}))} />
            </div>
            <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>
              <div className='role-heading'>
                <h4 className='fw-bolder'>{role.name}</h4>
                <Link to='/' className='role-edit-modal' onClick={showRoleEdit}>
                  <small className='fw-bolder'>Edit Role</small>
                </Link>
              </div>
              <Link to='' className='text-body' onClick={e => e.preventDefault()}>
                <Copy className='font-medium-5' />
              </Link>
            </div>
          </CardBody>
        </Card>
      </Col>
    </>
  )
}

export default RoleCards
