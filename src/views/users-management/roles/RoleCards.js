import { Fragment, useState, useEffect } from 'react'
import { Row } from 'reactstrap'
import { AddNewRoleItem } from './Components'
import EditRoleTable from './EditRoleTable'
import CardItem from './CardItem'
import axios from 'axios'

const fetchRoles = async (setRoles, setUserAccess) => {
  const response = await axios.get('http://localhost:5000/api/access/roles')
  if (response.status !== 200) return null
  const { userAccess, rolesList } = response.data
  setRoles(() => rolesList)
  setUserAccess(() => userAccess)
}

const RoleCards = () => {
  const [show, setShow] = useState(false)
  const [modalType, setModalType] = useState('Add New')
  const [roles, setRoles] = useState([])
  const [selectedRole, setSelectedRole] = useState({})
  const [userAccess, setUserAccess] = useState({})

  useEffect(() => fetchRoles(setRoles, setUserAccess), [])

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
        <AddNewRoleItem 
          setShow={setShow}
          setModalType={setModalType}
          userAccess={userAccess}
          setSelectedRole={setSelectedRole}
        />
      </Row>
    </Fragment>
  )
}

export default RoleCards
