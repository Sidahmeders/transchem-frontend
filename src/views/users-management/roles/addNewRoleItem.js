import { Row, Col, Card, Button, CardBody } from 'reactstrap'
import illustration from '@src/assets/images/illustration/faq-illustrations.svg'

export default function AddNewRoleItem({ setModalType, setShow }) {
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
