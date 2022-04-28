import { Col, Input, Label, FormFeedback, Button } from 'reactstrap'
import Select from 'react-select'
import { Check, X } from 'react-feather'
import { Controller } from 'react-hook-form'
import { selectThemeColors } from '@utils'

export const TextInput = ({ label, keyName, defaultValue }) => (
  <Col md={6} xs={12}>
    <Label className='form-label' for={keyName}>{label}</Label>
    <Input id={keyName} defaultValue={defaultValue} placeholder={defaultValue} />
  </Col>
)

export const TextInputValidation = ({ label, control, errors }) => (
  <Col md={6} xs={12}>
    <Label className='form-label' for={label}>{label}</Label>
    <Controller
      control={control}
      name={label}
      render={({ field }) => {
        return (
          <Input
            {...field}
            id={label}
            label={label}
            value={field.value}
            invalid={errors[label] && true}
          />
        )
      }}
    />
    {errors[label] && <FormFeedback>Please enter a valid {label}</FormFeedback>}
  </Col>
)

export const SelectBox = ({ label, options }) => {
  return (
    <Col md={6} xs={12}>
      <Label className='form-label' for={label}>{label}</Label>
      <Select
        id={label}
        isClearable={false}
        className='react-select'
        classNamePrefix='select'
        options={options}
        theme={selectThemeColors}
        defaultValue={options[0]}
      />
    </Col>
  )
}

export const CheckBox = ({ label, keyName }) => {
  return (
    <Col xs={12}>
      <div className='d-flex align-items-center'>
        <div className='form-switch'>
          <Input type='switch' defaultChecked id={keyName} name={keyName} />
          <Label className='form-check-label' htmlFor={keyName}>
            <span className='switch-icon-left'>
              <Check size={14} />
            </span>
            <span className='switch-icon-right'>
              <X size={14} />
            </span>
          </Label>
        </div>
        <Label className='form-check-label fw-bolder' htmlFor={keyName}>{label}</Label>
      </div>
    </Col>
  )
}

export const SubmitButton = ({ setShow }) => (
  <Col xs={12} className='text-center mt-2 pt-50'>
    <Button type='submit' className='me-1' color='primary'>Submit</Button>
    <Button type='reset' color='secondary' outline onClick={() => setShow(false)}>Discard</Button>
  </Col>
)
