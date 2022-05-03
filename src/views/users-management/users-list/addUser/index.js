import { useState, useContext } from 'react'
import Sidebar from '@components/sidebar'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
import classnames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Button, Label, FormText, Form, Input } from 'reactstrap'
import { ContextConsumer } from '@context'

const checkIsValid = data => Object.values(data).every(field => (typeof field === 'object' ? field !== null : field.length > 0))

const getRoleOptions = (roles) => roles.map((role) => ({ id: role.id, label: role.name }))

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  role: null
}

const AddUser = ({ open, toggleSidebar }) => {
  const { roles, usersManagement } = useContext(ContextConsumer)
  const { postNewUser } = usersManagement
  const roleOptions = getRoleOptions(roles.all)
  const [userData, setUserData] = useState(null)

  const {
    control,
    setValue,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = async (data) => {
    setUserData(data)

    if (checkIsValid(data)) {
      const newUser = await postNewUser(data)
      if (newUser === null) return // TODO: Display the Errors
      toggleSidebar()
      return
    }

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

  const handleSidebarClosed = () => {
    for (const key in defaultValues) {
      setValue(key, '')
    }
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
          <Label className='form-label' for='phone'>Phone <span className='text-danger'>*</span></Label>
          <Controller
            name='phone'
            control={control}
            render={({ field }) => (
              <Input id='phone' placeholder='(397) 294-5153' invalid={errors.phone && true} {...field} />
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
                options={roleOptions}
                theme={selectThemeColors}
                className={classnames('react-select', { 'is-invalid': userData !== null && userData.role === null })}
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
