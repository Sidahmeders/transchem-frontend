import '@styles/react/libs/react-select/_react-select.scss'
import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { statusOptions, countryOptions, languageOptions, defaultValues } from './data'
import { TextInput, TextInputValidation, SelectBox, CheckBox, SubmitButton } from './FormInputs'
import { Row, Modal, ModalBody, ModalHeader } from 'reactstrap'

const EditUser = ({ show, setShow }) => {
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: 'manual'
          })
        }
      }
    }
  }

  return (
    <Fragment>
      <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='px-sm-5 mx-50 pb-5'>
          <div className='text-center mb-2'>
            <h1 className='mb-1'>Edit User Information</h1>
            <p>Updating user details will receive a privacy audit.</p>
          </div>
          <Row tag='form' className='gy-1 pt-75' onSubmit={handleSubmit(onSubmit)}>
            <TextInputValidation control={control} errors={errors} label='FirstName' />
            <TextInputValidation control={control} errors={errors} label='LastName' />
            <TextInputValidation control={control} errors={errors} label='Username' />
            <TextInput label='Billing Email' keyName='email' defaultValue='example@domain.com' />
            <SelectBox placeholder='Status' options={statusOptions} />
            <TextInput label='Tax ID' keyName='tax-id' defaultValue='Tax-8894' />
            <TextInput label='Contact' keyName='contact' defaultValue='+1 609 933 4422' />
            <SelectBox label='Language' options={languageOptions} />
            <SelectBox label='Country' options={countryOptions} />
            <CheckBox keyName='billing-switch' label='Use as a billing address?' />
            <SubmitButton setShow={setShow} />
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  )
}

export default EditUser