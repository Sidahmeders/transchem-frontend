import { useState, useContext } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input } from 'reactstrap'
import { addUser } from '@store/user'
import { useDispatch } from 'react-redux'
import { defaultValues, countryOptions } from './data'
import { ContextConsumer } from '@context'

const checkIsValid = data => Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))

const AddUser = ({ open, toggleSidebar }) => {
  const { randomFunction } = useContext(ContextConsumer)
  randomFunction()

  const [data, setData] = useState(null)
  const [role, setRole] = useState('subscriber')

  const dispatch = useDispatch()

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    setData(data)
    if (checkIsValid(data)) {
      toggleSidebar()
      dispatch(
        addUser({
          fullName: data.fullName,
          avatar: '',
          email: data.email,
          role: data.role.value,
          role
        })
      )
    } else {
      for (const key in data) {
        if (data[key] === null) {
          setError('role', {
            type: 'manual'
          })
        }
        if (data[key] !== null && data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
    setRole('subscriber')
    setPlan('basic')
  }

  return (
    <Sidebar
      size='lg'
      open={open}
      title='New User'
      headerClassName='mb-1'
      contentClassName='pt-0'
      toggleSidebar={toggleSidebar}
      onClosed={handleSidebarClosed}
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-1'>
          <Label className='form-label' for='fullName'>Full Name <span className='text-danger'>*</span></Label>
          <Controller
            name='fullName'
            control={control}
            render={({ field }) => (
              <Input id='fullName' placeholder='John Doe' invalid={errors.fullName && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='userEmail'>Email <span className='text-danger'>*</span></Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <Input
                type='email'
                id='userEmail'
                placeholder='john.doe@example.com'
                invalid={errors.email && true}
                {...field}
              />
            )}
          />
          <FormText color='muted'>You can use letters, numbers & periods</FormText>
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='contact'>Contact <span className='text-danger'>*</span></Label>
          <Controller
            name='contact'
            control={control}
            render={({ field }) => (
              <Input id='contact' placeholder='(397) 294-5153' invalid={errors.contact && true} {...field} />
            )}
          />
        </div>
        <div className='mb-1'>
          <Label className='form-label' for='role'>Role <span className='text-danger'>*</span>
          </Label>
          <Controller
            name='role'
            control={control}
            render={({ field }) => (
              // <Input id='role' placeholder='Australia' invalid={errors.role && true} {...field} />
              <Select
                isClearable={false}
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': data !== null && data.role === null })}
                {...field}
              />
            )}
          />
        </div>
        <Button type='submit' className='me-1' color='primary'>Submit</Button>
        <Button type='reset' color='secondary' outline onClick={toggleSidebar}>Cancel</Button>
      </Form>
    </Sidebar>
  )
}

export default AddUser
