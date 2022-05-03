import '@styles/react/libs/react-select/_react-select.scss'
import { TextInput, SelectBox, CheckBox, SubmitButton } from './FormInputs'
import { Row, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useState } from 'react'

const EditUser = ({ userInfo, roleOptions, putUser, show, setShow }) => {
  const [userUpdateInfo, setUserUpdateInfo] = useState({})
  const onChangeHandler = (event) => {
    if (event.id) {
      const [roleName, roleId] = [event.value, event.id]
      setUserUpdateInfo(() => ({ ...userUpdateInfo, roleName, roleId }))
    } else {
      const target = event.target
      const [key, value] = [target.id, target.value]
      setUserUpdateInfo(() => ({ ...userUpdateInfo, [key]: value }))
    }
  }
  
  const onSubmit = async (event) => {
    event.preventDefault()
    const updatedUser = putUser({ id: userInfo.id, ...userUpdateInfo })
    if (updatedUser === null) return // TODO: Display the Errors
    setShow(false)
  }

  return (
    <>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={onSubmit}>
            <TextInput
              onChangeHandler={onChangeHandler}
              defaultValue={userInfo.fullName}
              id='fullName'
              label='fullName'
            />
            <TextInput
              id='email' 
              readOnly={true}
              defaultValue={userInfo.email}
              label='Email'
            />
            <TextInput 
              onChangeHandler={onChangeHandler}
              id='phone' 
              label='Phone Number'
              defaultValue={userInfo.phone}
            />
            <SelectBox 
              onChangeHandler={onChangeHandler}
              id='role' 
              label='RoleName'
              options={roleOptions}
            />
            <CheckBox
              onChangeHandler={onChangeHandler}
              id='isAuthorized'
              label='do you want to Authorize this user?'
            />
            <SubmitButton setShow={setShow} />
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

export default EditUser