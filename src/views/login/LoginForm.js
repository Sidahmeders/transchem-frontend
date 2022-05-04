import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { Form, Label, Input, Button, FormFeedback } from 'reactstrap'
import { getHomeRouteForLoggedInUser } from '@utils'
import axios from 'axios'
import * as yup from 'yup'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const signInHandler = async (event) => {
  event.preventDefault()
  const inputElements = document.getElementById('login-form').getElementsByTagName('input')
  const userInfo = {}
  Array.from(inputElements).forEach(input => (userInfo[input.type] = input.value))

  const response = await axios.post('http://localhost:5000/api/auth/login', userInfo)
  const { status, data } = response
  if (status !== 200) return
  
  localStorage.setItem('userData', JSON.stringify(data))
  location.href = getHomeRouteForLoggedInUser()
}

const SignupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
})

export default function LoginForm() {
  const {
    control,
    formState: { errors }
  } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })

  return (
    <Form id='login-form' className='auth-login-form mt-2' onSubmit={signInHandler}>
      <div className='mb-1'>
        <Label className='form-label' for='login-email'>Email</Label>
        <Controller
          id='email'
          name='email'
          defaultValue=''
          control={control}
          render={({ field }) => (
            <Input {...field} id='login-email' type='email' placeholder='john@example.com' autoFocus invalid={errors.email && true} />
          )}
        />
        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
      </div>
      <div className='mb-1'>
        <div className='d-flex justify-content-between'>
          <Label className='form-label' for='login-password'>Password</Label>
          <Link to='/forgot-password'><small>Forgot Password?</small></Link>
        </div>
        <Controller
          id='password'
          name='password'
          defaultValue=''
          control={control}
          render={({ field }) => (
            <InputPasswordToggle {...field} className='input-group-merge' id='login-password' invalid={errors.password && true} />
          )}
        />
        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
      </div>
      <div className='form-check mb-1'>
        <Input type='checkbox' id='remember-me' />
        <Label className='form-check-label' for='remember-me'>Remember Me</Label>
      </div>
      <Button color='primary' block> Sign in</Button>
    </Form>
  )
}
