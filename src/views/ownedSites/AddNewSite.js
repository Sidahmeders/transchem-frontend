import { useState} from 'react' 
import { Row, Col, Label, Input, Modal, Button, ModalBody, ModalHeader } from 'reactstrap'
import Select from 'react-select'
import { Check, X, Briefcase, AlertOctagon } from 'react-feather'
import { selectThemeColors } from '@utils'
import '@styles/react/libs/react-select/_react-select.scss'
import axios from 'axios'

const countryOptions = [
  { value: '', label: 'All Countries' },
  { value: 'ca', label: 'Canada' },
  { value: 'us', label: 'USA' },
  { value: 'uk', label: 'UK' },
  { value: 'fr', label: 'France' },
  { value: 'dz', label: 'Algeria' }
]

const postNewSite = async (siteInfo, addNewSite) => {
  const response = await axios.post('http://localhost:5000/api/sites', siteInfo)
  if (response.status !== 200) return null
  addNewSite(response.data)
}

export default function AddNewSite({ setSearchQuery, setSearchCountry, searchData, addNewSite }) {
  const [show, setShow] = useState(false)
  const toggleShow = () => setShow(!show)
  const [data, setData] = useState({})

  const setSiteGoeJson = (site) => setData(() => ({ ...data, siteGoeJson: site }))

  const onDiscard = () => {
    setShow(false)
    setData(() => {})
  }

  const onSubmit = async (event) => {
    event.preventDefault()
    const newSite = await postNewSite(data, addNewSite)
    if (newSite === null) return // Dipslay the Error
    onDiscard()
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
          <Row tag='form' className='gy-1 gx-2' onSubmit={onSubmit}>
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
                Limit your Search Query to:
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
              <Label className='form-label' for='select-multi'>Your Search Results</Label>
              <Input 
                multiple
                style={{overflowX: 'scroll', height: '200px'}}
                type='select'
                id='select-multi'
                name='select'
              >
                {searchData.map((item, index) => (
                  <SearchOption
                    setSiteGoeJson={setSiteGoeJson}
                    key={index}
                    item={item}
                  />
                ))}
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

/**
  properties: {
    phoneFormatted: '(202) 234-7336',
    phone: '2022347336',
    address: '1471 P St NW',
    city: 'Washington DC',
    country: 'United States',
    crossStreet: 'at 15th St NW',
    postalCode: '20005',
    state: 'D.C.',
    id: 0,
  }
 */

const buildSiteGeoJson = (site, userInfo = {}) => {
  const geoJson = {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: site.center
    },
    properties: Object.assign(Object(site.properties), {
      address: site.place_name,
      phone: userInfo.phone || '+213552104709'
    })
  }
  return geoJson
}

const SearchOption = ({ item, setSiteGoeJson }) => {
  const siteData = buildSiteGeoJson(item)
  return (
    <>
      <option onClick={() => setSiteGoeJson(siteData)}>
        {item.place_name}
      </option>  
    </>
  )
}