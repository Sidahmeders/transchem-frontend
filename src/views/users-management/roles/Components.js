import { Link } from 'react-router-dom'
import { Row, Col, Card, Button, CardBody, Input, Label, FormFeedback } from 'reactstrap'
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'
import { Copy } from 'react-feather'
import { Controller } from 'react-hook-form'
import AvatarGroup from '@components/avatar-group'


export function CardItem({ item, setModalType, setShow }) {
  const showRoleEdit = (event) => {
    event.preventDefault()
    setModalType('Edit')
    setShow(true)
  }

  return (
    <Col xl={4} md={6}>
      <Card>
        <CardBody>
          <div className='d-flex justify-content-between'>
            <span>{`Total ${item.totalUsers} users`}</span>
            <AvatarGroup data={item.users} />
          </div>
          <div className='d-flex justify-content-between align-items-end mt-1 pt-25'>
            <div className='role-heading'>
              <h4 className='fw-bolder'>{item.title}</h4>
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
  )
}

export function AddNewRoleItem({ setModalType, setShow }) {
  const addNewRole = () => {
    setModalType('Add New')
    setShow(true)
  }

  return (
    <Col xl={4} md={6}>
      <Card>
        <Row>
          <Col sm={5}>
            <div className='d-flex align-items-end justify-content-center h-100'>
              <img className='img-fluid mt-2' src={illustration} alt='Image' width={85} />
            </div>
          </Col>
          <Col sm={7}>
            <CardBody className='text-sm-end text-center ps-sm-0'>
              <Button color='primary' className='text-nowrap mb-1' onClick={addNewRole}>
                Add New Role
              </Button>
              <p className='mb-0'>Add a new role, if it does not exist</p>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export const RoleAction = ({ label, role }) => (
  <div className='form-check me-3 me-lg-5'>
    <Input type='checkbox' id={`read-${role}`} />
    <Label className='form-check-label' for={`read-${role}`}>
      {label}
    </Label>
  </div>
)

export const RoleButtons = ({ onReset }) => (
  <Col className='text-center mt-2' xs={12}>
    <Button type='submit' color='primary' className='me-1'>
      Submit
    </Button>
    <Button type='reset' outline onClick={onReset}>
      Discard
    </Button>
  </Col>
)

export const RoleNameSearchInput = ({ control, errors }) => (
  <Col xs={12}>
    <Label className='form-label' for='roleName'>
      Role Name
    </Label>
    <Controller
      name='roleName'
      control={control}
      render={({ field }) => (
        <Input {...field} id='roleName' placeholder='Enter role name' invalid={errors.roleName && true} />
      )}
    />
    {errors.roleName && <FormFeedback>Please enter a valid role name</FormFeedback>}
  </Col>
)
