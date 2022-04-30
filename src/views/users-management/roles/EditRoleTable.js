import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Row, Col, Table, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { RoleAction, CRUDAccess, RoleButtons, RoleNameSearchInput } from './Components'

export default function EditRoleTable ({ permissions, show, setShow, modalType, setModalType }) {
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { roleName: '' } })

  const onSubmit = (data) => {
    if (data.roleName.length) {
      setShow(false)
    } else {
      setError('roleName', {
        type: 'manual'
      })
    }
  }

  const onReset = () => {
    setShow(false)
    reset({ roleName: '' })
  }

  const handleModalClosed = () => {
    setModalType('Add New')
    setValue('roleName')
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
          <p>Set role permissions</p>
        </div>
        <Row tag='form' onSubmit={handleSubmit(onSubmit)}>
          <RoleNameSearchInput control={control} errors={errors} />
          <Col xs={12}>
            <h4 className='mt-2 pt-50'>Role Permissions</h4>
            <Table className='table-flush-spacing' responsive>
              <tbody>
                {permissions?.map((resource, index) => (<RoleNameItem key={index} resource={resource} />))}
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
        <div className='d-flex'>
          {Object.keys(resource.actions).map((action, index) => (
            <RoleAction
              key={index}
              canAssign={!resource.actions[action]}
              label={action}
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
