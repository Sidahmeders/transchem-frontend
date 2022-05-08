import { useState} from 'react' 
import { Row, Col, Label, Input, Modal, Button, ModalBody, ModalHeader } from 'reactstrap'
import Select from 'react-select'
import { useForm } from 'react-hook-form'
import { Check, X, Briefcase, AlertOctagon } from 'react-feather'
import { selectThemeColors } from '@utils'
import '@styles/react/libs/react-select/_react-select.scss'

const countryOptions = [
  { value: '', label: 'All Countries' },
  { value: 'ca', label: 'Canada' },
  { value: 'us', label: 'USA' },
  { value: 'uk', label: 'UK' },
  { value: 'fr', label: 'France' },
  { value: 'dz', label: 'Algeria' }
]

export default function AddNewSite({ setSearchQuery, setSearchCountry, searchData }) {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)

  console.log(searchData, '-+++-')

  const {
    reset,
    clearErrors,
    handleSubmit
  } = useForm({})

  const onSubmit = (data) => console.log(data)

  const onDiscard = () => {
    clearErrors()
    setShow(false)
    reset()
  }
  
  return (
    <>
      <Button 
        color='primary' 
        style={{ margin: '10px 15px' }} 
        onClick={toggleShow}
      >
        Add New Site
      </Button>
      <Modal
        isOpen={show}
        className='modal-dialog-centered modal-lg'
      >
        <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
        <ModalBody className='pb-5 px-sm-4 mx-50'>
          <h1 className='address-title text-center mb-1'>Add New Address</h1>
          <p className='address-subtitle text-center mb-2 pb-75'>Add address for billing address</p>
          <Row tag='form' className='gy-1 gx-2' onSubmit={handleSubmit(onSubmit)}>
            <Col xs={12}>
              <Row className='custom-options-checkable'>
                <Col md={6} className='mb-md-0 mb-2'>
                  <Input
                    type='radio'
                    defaultChecked
                    id='homeAddress'
                    name='addressRadio'
                    value='homeAddress'
                    className='custom-option-item-check'
                  />
                  <label className='custom-option-item px-2 py-1' htmlFor='homeAddress'>
                    <span className='d-flex align-items-center mb-50'>
                      <AlertOctagon className='font-medium-4 me-50' />
                      <span className='custom-option-item-title h4 fw-bolder mb-0'>Idle</span>
                    </span>
                    <span className='d-block'>Requires Maintenance</span>
                  </label>
                </Col>
                <Col md={6} className='mb-md-0 mb-2'>
                  <Input
                    type='radio'
                    id='officeAddress'
                    name='addressRadio'
                    value='officeAddress'
                    className='custom-option-item-check'
                  />
                  <label className='custom-option-item px-2 py-1' htmlFor='officeAddress'>
                    <span className='d-flex align-items-center mb-50'>
                      <Briefcase className='font-medium-4 me-50' />
                      <span className='custom-option-item-title h4 fw-bolder mb-0'>Active</span>
                    </span>
                    <span className='d-block'>Working Hours (10am – 6pm)</span>
                  </label>
                </Col>
              </Row>
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='country'>
                Limit your search Query to:
              </Label>
              <Select
                id='country'
                isClearable={false}
                className='react-select'
                classNamePrefix='select'
                options={countryOptions}
                theme={selectThemeColors}
                defaultValue={countryOptions[0]}
                onChange={(e) => setSearchCountry(e.value)}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='addressLine'>
                Search Query:
              </Label>
              <Input
                id='addressLine'
                placeholder='Address Line / Town / State / Province / Zip Code'
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Col>
            <Col xs={12}>
              <Label className='form-label' for='select-multi'>Your search results</Label>
              <Input type='select' name='select' id='select-multi' multiple>
                {searchData.map((item, index) => <SearchOption key={index} item={item} />)}
              </Input>
            </Col>
            <Col xs={12}>
              <div className='d-flex align-items-center'>
                <div className='form-check form-switch form-check-primary me-25'>
                  <Input type='switch' defaultChecked id='billing-switch' name='billing-switch' />
                  <Label className='form-check-label' htmlFor='billing-switch'>
                    <span className='switch-icon-left'>
                      <Check size={14} />
                    </span>
                    <span className='switch-icon-right'>
                      <X size={14} />
                    </span>
                  </Label>
                </div>
                <label className='form-check-label fw-bolder' htmlFor='billing-switch'>
                  Show this on the map?
                </label>
              </div>
            </Col>
            <Col className='text-center' xs={12}>
              <Button type='submit' className='me-1 mt-2' color='primary'>Submit</Button>
              <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>Discard</Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </>
  )
}

const SearchOption = ({ item }) => {
  return (
    <>
      <option>{item.place_name}</option>  
    </>
  )
}