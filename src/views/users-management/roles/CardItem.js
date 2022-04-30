import { Link } from 'react-router-dom'
import { Col, Card, CardBody } from 'reactstrap'
import { Copy } from 'react-feather'
import AvatarGroup from '@components/avatar-group'

export default function CardItem({ setSelectedRole, role, setModalType, setShow }) {
  const showRoleEdit = (event) => {
    event.preventDefault()
    setModalType('Edit')
    setShow(true)
    setSelectedRole(() => role)
  }

  return (
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
  )
}
