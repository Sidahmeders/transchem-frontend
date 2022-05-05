import { useState } from 'react'
import Select from 'react-select'
import { Col, Input, Label } from 'reactstrap'
import { Check, X } from 'react-feather'
import { selectThemeColors } from '@utils'

export const TextInput = ({ onChangeHandler, id, label, readOnly, defaultValue = 'NOT SET' }) => (
  <Col md={6} xs={12}>
    <Label className='form-label' for={id}>{label}</Label>
    <Input onChange={onChangeHandler} id={id} readOnly={readOnly} defaultValue={defaultValue} />
  </Col>
)

export const SelectBox = ({ id, label, options, defaultValue, onChangeHandler }) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue)
  return (
    <Col md={6} xs={12}>
      <Label className='form-label' for={id}>{label}</Label>
      <Select
        id={id}
        isClearable={false}
        className='react-select'
        classNamePrefix='select'
        options={options}
        onChange={value => {
          setSelectedOption(value)
          onChangeHandler(value)
        }}
        theme={selectThemeColors}
        defaultValue={selectedOption}
      />
    </Col>
  )
}

export const CheckBox = ({ id, label, isAuthorized, onChangeHandler }) => {
  return (
    <Col xs={12}>
      <div className='d-flex align-items-center'>
        <div className='form-switch'>
          <Input
            id={id}
            name={id}
            type='switch'
            defaultChecked={isAuthorized}
            onChange={(event) => { 
              isAuthorized = !isAuthorized
              onChangeHandler(event)
            }}
          />
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

