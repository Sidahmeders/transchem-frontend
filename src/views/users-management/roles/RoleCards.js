import { Fragment, useState, useEffect } from 'react'
import {
  Row,
  Col,
  Label,
  Input,
  Table,
  Modal,
  ModalBody,
  ModalHeader,
  UncontrolledTooltip
} from 'reactstrap'
import { Info } from 'react-feather'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { CardItem, AddNewRoleItem, RoleAction, RoleButtons, RoleNameSearchInput } from './Components'

const fetchRoles = async (setData, setRolesArr) => {
  const response = await axios.get('http://localhost:5000/api/access/roles')
  if (response.status !== 200) return null
  const { data, rolesArr } = response.data
  setData(() => data)
  setRolesArr(() => rolesArr)
}

const RoleCards = () => {
  // ** States
  const [show, setShow] = useState(false)
  const [modalType, setModalType] = useState('Add New')
  const [data, setData] = useState([])
  const [rolesArr, setRolesArr] = useState([])

  // ** Hooks
  const {
    reset,
    control,
    setError,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { roleName: '' } })

  const onSubmit = data => {
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

  useEffect(() => {
    fetchRoles(setData, setRolesArr)
  }, [])

  return (
    <Fragment>
      <RoleCard data={data} setModalType={setModalType} setShow={setShow} />
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
                  <tr>
                    <td className='text-nowrap fw-bolder'>
                      <span className='me-50'> Administrator Access</span>
                      <Info size={14} id='info-tooltip' />
                      <UncontrolledTooltip placement='top' target='info-tooltip'>
                        Allows a full access to the system
                      </UncontrolledTooltip>
                    </td>
                    <td>
                      <div className='form-check'>
                        <Input type='checkbox' id='select-all' />
                        <Label className='form-check-label' for='select-all'>
                          Select All
                        </Label>
                      </div>
                    </td>
                  </tr>
                  {rolesArr.map((role, index) => (<RoleNameItem key={index} role={role} />))}
                </tbody>
              </Table>
            </Col>
            <RoleButtons onReset={onReset} />
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

const RoleCard = ({ data, setModalType, setShow }) => {
  return (
    <Row>
      {data.map((item, index) => (
        <CardItem key={index} item={item} setModalType={setModalType} setShow={setShow} /> 
      ))}
      <AddNewRoleItem setModalType={setModalType} setShow={setShow} />
    </Row>
  )
}

const RoleNameItem = ({ role }) => {
  return (
    <tr>
      <td className='text-nowrap fw-bolder'>{role}</td>
      <td>
        <div className='d-flex'>
          <RoleAction label='Read' role={role} />
          <RoleAction label='Write' role={role} />
          <RoleAction label='Create' role={role} />
        </div>
      </td>
    </tr>
  )
}

export default RoleCards
