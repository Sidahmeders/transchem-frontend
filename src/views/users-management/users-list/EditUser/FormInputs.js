import { Col, Input, Label, Button } from 'reactstrap'
import Select from 'react-select'
import { Check, X } from 'react-feather'
import { selectThemeColors } from '@utils'

export const TextInput = ({ onChangeHandler, id, label, readOnly, defaultValue = 'NOT SET' }) => (
  <Col md={6} xs={12}>
    <Label className='form-label' for={id}>{label}</Label>
    <Input onChange={onChangeHandler} id={id} readOnly={readOnly} defaultValue={defaultValue} />
  </Col>
)

export const SelectBox = ({ onChangeHandler, id, label, options }) => {
  return (
    <Col md={6} xs={12}>
      <Label className='form-label' for={id}>{label}</Label>
      <Select
        id={id}
        isClearable={false}
        className='react-select'
        classNamePrefix='select'
        options={options}
        onChange={onChangeHandler}
        theme={selectThemeColors}
        defaultValue={options[0]}
      />
    </Col>
  )
}

export const CheckBox = ({ onChangeHandler, id, label }) => {
  return (
    <Col xs={12}>
      <div className='d-flex align-items-center'>
        <div className='form-switch'>
          <Input onChange={onChangeHandler} type='switch' defaultChecked id={id} name={id} />
          <Label className='form-check-label' htmlFor={id}>
            <span className='switch-icon-left'>
              <Check size={14} />
            </span>
            <span className='switch-icon-right'>
              <X size={14} />
            </span>
          </Label>
        </div>
        <Label className='form-check-label fw-bolder' htmlFor={id}>{label}</Label>
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
