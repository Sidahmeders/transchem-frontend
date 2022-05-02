import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Row, Col, Table, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { RoleAction, CRUDAccess, RoleButtons, RoleNameSearchInput } from './Components'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import axios from 'axios'

const extractUserPermissions = () => {
  const tableRowCollection = document.getElementById('editable-roles-form').getElementsByTagName('tr')
  
  const permissionsList = []
  Array.from(tableRowCollection).forEach((rowElement) => {
    const resourceElement = rowElement.childNodes[1].childNodes[0]
    const resourceName = resourceElement.dataset.resource
    
    const resourceActions = {}
    resourceElement.childNodes.forEach((actionNode) => {
      const actionElement = actionNode.childNodes[0]
      const actionName = actionElement.dataset.action
      const canAssignAction = actionElement.checked
      resourceActions[actionName] = canAssignAction
    })

    permissionsList.push({ name: resourceName, actions: resourceActions })
  })

  return permissionsList
}

const schema = yup.object({
  roleName: yup.string().min(5).max(20).required()
}).required()

export default function EditRoleTable ({ role, addNewRole, updateRoles, show, setShow, modalType, setModalType }) {
  const {
    reset,
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { roleName: '' }, resolver: yupResolver(schema)})

  const onReset = () => {
    setShow(false)
    reset({ roleName: '' })
  }

  const buildUserRequest = (roleName) => {
    const permissionsList = extractUserPermissions()
    const payload = {
      id: role.id,
      createdByUser: '#1234567',
      createdByRole: role.name,
      name: roleName || role.name,
      permissions: permissionsList
    }
    return payload
  }

  const submitNewRole = async (data) => {
    if (!data?.roleName) {
      setError('roleName', { type: 'manual' })
      return
    }
    const payload = buildUserRequest(data.roleName)
    const response = await axios.post('http://localhost:5000/api/access/roles', payload)
    if (response.status !== 200) return // TODO: Display the Errors
    
    addNewRole(response.data)
    onReset()
    setShow(false) 
  }

  const submitRoleEdit = async (event) => {
    event.preventDefault()
    const payload = buildUserRequest()
    const response = await axios.put('http://localhost:5000/api/access/roles', payload)
    if (response.status !== 200) return // TODO: Display the Errors
    
    updateRoles(response.data)
    setShow(false)
  }
  
  const handleModalClosed = () => {
    setModalType('Add New')
  }

  return (
    <Modal
      isOpen={show}
      onClosed={handleModalClosed}
      toggle={() => setShow(!show)}
      className='modal-dialog-centered modal-lg'
    >
      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
      <ModalBody className='px-5 pb-5'>
        <div className='text-center mb-4'>
          <h1>{modalType} Role</h1>
          <h5>current role: <span style={{color:'#7367f0'}}>{role.name}</span></h5>
          <p>Set role permissions</p>
        </div>
        <Row id='editable-roles-form' tag='form' onSubmit={modalType === 'Add New' ? handleSubmit(submitNewRole) : submitRoleEdit }>
          { modalType === 'Add New' ? <RoleNameSearchInput control={control} errors={errors} /> : null }
          <Col xs={12}>
            <h4 className='mt-2 pt-50'>Role Permissions</h4>
            <Table className='table-flush-spacing' responsive>
              <tbody>
                {role.permissions?.map((resource, index) => (<RoleNameItem key={index} resource={resource} />))}
              </tbody>
            </Table>
          </Col>
          <RoleButtons onReset={onReset} />
        </Row>
      </ModalBody>
    </Modal>
  )
}

const RoleNameItem = ({ resource }) => {
  const [state, setState] = useState({ ...resource.actions, crud: false })
  return (
    <tr>
      <td className='text-nowrap fw-bolder'>{resource.name}</td>
      <td>
        <div data-resource={resource.name} className='d-flex'>
          {Object.keys(resource.actions).map((action, index) => (
            <RoleAction
              key={index}
              canAssign={!resource.actions[action]}
              label={action}
              name={resource.name}
              state={state}
              setState={setState} 
            />
          ))}
          <CRUDAccess actions={resource.actions} state={state} setState={setState} />
        </div>
      </td>
    </tr>
  )
}
