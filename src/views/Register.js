import '@styles/react/pages/page-authentication.scss'
import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button } from 'reactstrap'
import { ThirdPartyAuth, TrueVueSvgIcon, RegisterCover } from './login/Components'

const Register = () => {
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <TrueVueSvgIcon />
        <RegisterCover />
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' xs='12' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Adventure starts here 🚀
            </CardTitle>
            <CardText className='mb-2'>Make your app management easy and fun!</CardText>
            
            <Form className='auth-register-form mt-2' onSubmit={e => e.preventDefault()}>
              <div className='mb-1'>
                <Label className='form-label' for='register-username'>Username</Label>
                <Input type='text' id='register-username' placeholder='johndoe' autoFocus />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-email'>Email</Label>
                <Input type='email' id='register-email' placeholder='john@example.com' />
              </div>
              <div className='mb-1'>
                <Label className='form-label' for='register-password'>Password</Label>
                <InputPasswordToggle className='input-group-merge' id='register-password' />
              </div>
              <PrivacyPolicy />
              <Button tag={Link} to='/' color='primary' block>Sign up</Button>
            </Form>

            <p className='text-center mt-2'>
              <span className='me-25'>Already have an account?</span>
              <Link to='/login'><span>Sign in instead</span></Link>
            </p>
            <ThirdPartyAuth />
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Register

const PrivacyPolicy = () => (
  <>
    <div className='form-check mb-1'>
      <Input type='checkbox' id='terms' />
      <Label className='form-check-label' for='terms'>
        I agree to
        <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
          privacy policy & terms
        </a>
      </Label>
    </div>
  </>
)