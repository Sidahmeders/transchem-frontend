import { Row, Col, Card, Button, CardBody, Input, Label, FormFeedback, UncontrolledTooltip } from 'reactstrap'
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'
import { Info } from 'react-feather'
import { Controller } from 'react-hook-form'

export function AddNewRoleItem({ userAccess, setSelectedRole, setModalType, setShow }) {
  const addNewRole = () => {
    setModalType('Add New')
    setShow(true)
    setSelectedRole(() => userAccess)
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
              <Button color='primary' className='text-nowrap mb-1' onClick={addNewRole}>Add New Role</Button>
              <p className='mb-0'>Add a new role, if it does not exist</p>
            </CardBody>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export const RoleAction = ({ label, canAssign, state, setState }) => {
  const handleBoxCheck = () => setState(() => ({...state, [label]: !state[label]}))
  return (
    <div className='form-check me-3 me-lg-5'>
      <Input 
        id={`read-${label}`}
        type='checkbox'
        disabled={canAssign}
        onChange={handleBoxCheck} 
        checked={state[label]}
      /> 
      <Label className='form-check-label' for={`read-${label}`}>{label}</Label>
    </div>
  )
}

export const CRUDAccess = ({ actions, state, setState }) => {
  const canAssign = !Object.values(actions).reduce((prev, curr) => (prev && curr), true)
  
  const handleBoxCheck = () => {
    const newState = Object.keys(state).reduce((prev, curr) => ({...prev, [curr]: !Boolean(state.crud) }), {})
    setState(() => newState)
  }

  return (
    <>
      <div className='d-flex flex-row form-check me-3 me-lg-5'>
        <div>
          <Input
            id='select-all'
            type='checkbox'
            disabled={canAssign}
            onChange={handleBoxCheck} 
            checked={state.crud}
          />
          <Label className='d-flex flex-row form-check-label' for='select-all'>CRUD</Label>
        </div>
        <div className='ms-1'>
          <Info size={14} id='info-tooltip' />
          <UncontrolledTooltip placement='top' target='info-tooltip'>
            Allows a full access to the resource
          </UncontrolledTooltip>
        </div>
      </div>
    </>
  )
}

export const RoleButtons = ({ onReset }) => (
  <Col className='text-center mt-2' xs={12}>
    <Button type='submit' color='primary' className='me-1'>Submit</Button>
    <Button type='reset' outline onClick={onReset}>Discard</Button>
  </Col>
)

export const RoleNameSearchInput = ({ control, errors }) => (
  <Col xs={12}>
    <Label className='form-label' for='roleName'>Role Name</Label>
    <Controller
      name='roleName'
      control={control}
      render={({ field }) => (
        <Input
          {...field}
          id='roleName'
          placeholder='Enter role name'
          label='roleName' 
          value={field.value}
          invalid={errors.roleName && true} 
        />
      )}
    />
    {errors.roleName && <FormFeedback>Please enter a valid role name</FormFeedback>}
  </Col>
)
