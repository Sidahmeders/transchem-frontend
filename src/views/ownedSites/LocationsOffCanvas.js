import { useState } from 'react'
import {
  Button,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  UncontrolledAccordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem
} from 'reactstrap'

const LocationItem = ({ index, store, onSiteClick }) => {
  const phone = store?.properties?.phoneFormatted || ''
  const distance = Math.round(store.properties.distance * 100) / 100  || ''
  const address = store.properties.address
  const city = store.properties.city
  const storeId = store.properties.id

  return (
      <>
       <AccordionItem>
        <AccordionHeader targetId={`site-${index}`}>
          <div id={`listing-${storeId}`}>
            <a id={`link-${storeId}`} onClick={onSiteClick} href="#">{address}</a>
          </div>
        </AccordionHeader>
        <AccordionBody accordionId={`site-${index}`}>
          <div>
            city: <span style={{color: '#f3f'}}>{city}</span>
            <br />
            phone: <span style={{color: '#f3f'}}>{phone}</span>
            <div>
              <strong>{distance ? `${distance} miles away` : ''}</strong>
            </div>
          </div>
        </AccordionBody>
      </AccordionItem>
    </>
  )
}

const containerStyle = {
  border: "10px solid white",
  margin: 0,
  display: 'flex',
  justifyContent: 'center'
}

const OffCanvasPlacement = ({ label, features, flyToMarker, createPopUp }) => {
  const [canvasOpen, setCanvasOpen] = useState(false)
  const toggleCanvas = () => setCanvasOpen(!canvasOpen)

  const onSiteClick = (event) => {
    const target = event.target
    const linkId = target.id

    features.forEach((feature) => {
      if (linkId === `link-${feature.properties.id}`) {
        flyToMarker(feature)
        createPopUp(feature)
      }
    })

    const activeItem = document.getElementsByClassName('active')
    if (activeItem[0]) activeItem[0].classList.remove('active')
    target.parentNode.classList.add('active')
  }

  return (
    <div className='demo-inline-spacing' style={containerStyle} >
      <Button style={{ margin: '10px 15px' }} color='primary' onClick={toggleCanvas}>{label}</Button>
      <Offcanvas direction='end' isOpen={canvasOpen} toggle={toggleCanvas}>
        <OffcanvasHeader toggle={toggleCanvas}>Our Locations</OffcanvasHeader>
        <OffcanvasBody className='my-auto mx-0 flex-grow-0'>
        <UncontrolledAccordion defaultOpen='1'>
          {features.map((store, index) => (
            <LocationItem
              key={index}
              index={index}
              store={store}
              onSiteClick={onSiteClick}
            />
          ))}
        </UncontrolledAccordion>
        </OffcanvasBody>
      </Offcanvas>
    </div>
  )
}

export default OffCanvasPlacement