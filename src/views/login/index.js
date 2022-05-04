import { Row, Col, CardTitle, CardText } from 'reactstrap'
import '@styles/react/pages/page-authentication.scss'
import LoginForm from './LoginForm'
import { TrueVueSvgIcon, LoginCover, CreateAccount, ThirdPartyAuth } from './Components'

export default function Login() {
  const authError = localStorage.getItem('auth-error')

  const ErrorCard = () => {
    const { email, message } = JSON.parse(authError)
    return (
      <CardText style={{color: '#d72'}}> 
        The email: <span style={{color: '#37f'}}>{email} </span> {message}
      </CardText>
    )
  }
  const SignInCard = () => <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <TrueVueSvgIcon />
        <LoginCover />
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to TrueVue 👋
            </CardTitle>
            {authError ? <ErrorCard /> : <SignInCard />}
            <LoginForm />
            <CreateAccount />
            <ThirdPartyAuth />
          </Col>
        </Col>
      </Row>
    </div>
  )
}
