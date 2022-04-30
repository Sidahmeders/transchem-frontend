import { Fragment, useState, useEffect } from 'react'
import { Row } from 'reactstrap'
import { AddNewRoleItem } from './Components'
import EditRoleTable from './EditRoleTable'
import CardItem from './CardItem'
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
  const [selectedRole, setSelectedRole] = useState({})

  useEffect(() => fetchRoles(setRoles), [])

  return (
    <Fragment>
      <Row>
        {roles.map((role, index) => (
          <Fragment key={index}>
            <CardItem
              role={role}
              setSelectedRole={setSelectedRole}
              setModalType={setModalType}
              setShow={setShow}
            />
          </Fragment>
        ))}
        <EditRoleTable
          role={selectedRole}
          show={show}
          setShow={setShow}
          modalType={modalType}
          setModalType={setModalType}
        />
        <AddNewRoleItem setModalType={setModalType} setShow={setShow} />
      </Row>
    </Fragment>
  )
}

export default RoleCards
