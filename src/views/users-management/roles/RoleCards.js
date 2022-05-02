import { Fragment, useState, useEffect, useContext } from 'react'
import { Row } from 'reactstrap'
import { AddNewRoleItem } from './Components'
import EditRoleTable from './EditRoleTable'
import CardItem from './CardItem'
import { ContextConsumer } from '@context'

const RoleCards = () => {
  const { usersManagement, roles } = useContext(ContextConsumer)
  const { fetchRoles, addNewRole, updateRoles, setSelectedRole } = usersManagement
    
  const [show, setShow] = useState(false)
  const [modalType, setModalType] = useState('Add New')

  useEffect(() => fetchRoles(), [])

  return (
    <Fragment>
      <Row>
        {roles.all.map((role, index) => (
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
          role={roles.selected}
          addNewRole={addNewRole}
          updateRoles={updateRoles}
          show={show}
          setShow={setShow}
          modalType={modalType}
          setModalType={setModalType}
        />
        <AddNewRoleItem
          setShow={setShow}
          setModalType={setModalType}
          userAccess={roles.userAccess}
          setSelectedRole={setSelectedRole}
        />
      </Row>
    </Fragment>
  )
}

export default RoleCards
