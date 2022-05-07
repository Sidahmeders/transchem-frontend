import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl'
import Breadcrumbs from '@components/breadcrumbs'
import './style.css'
import addMarkers from './addMarkers'
import LocationsList from './LocationsList'
import AddNewSite from './AddNewSite'
import mockStores from './stores'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const containerStyle = {
  border: "8px solid #7367f0",
  borderBottom: '0',
  borderRadius: '50px 50px 0 0',
  margin: 0,
  display: 'flex',
  justifyContent: 'center'
}

const OwnedSites = () => {
  const map = useRef(null)
  const [lng, lat, zoom] = [-77.034084, 38.909671, 9]
  const [stores, setStores] = useState({ features: [] })

  const flyToMarker = (currentFeature) => {
    map.current.flyTo({
      center: currentFeature.geometry.coordinates,
      zoom: 15
    })
  }
  
  const createPopUp = (currentFeature) => {
    const popUps = document.getElementsByClassName('mapboxgl-popup')
    /** Check if there is already a popup on the map and if so, remove it */
    if (popUps[0]) popUps[0].remove()
  
    new mapboxgl
      .Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(`<h3>Transchem</h3><h4>${currentFeature.properties.address}</h4>`)
      .addTo(map.current)
  }
  
  useEffect(() => {
    setStores(() => mockStores)
  }, [])

  useEffect(() => {
    // initialize map only once
    if (map.current) {
      map.current.on('load', () => {
        addMarkers({ stores, map, flyToMarker, createPopUp })
      })
    } else {
      map.current = new mapboxgl.Map({
        container: document.getElementById('map'),
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom
      })
    }
  })
  
  return (
    <>
      <Breadcrumbs title='Owned Sites' data={[{ title: 'Dashboard' }, { title: 'Owned Sites' }]} />
      <div className='demo-inline-spacing' style={containerStyle} >
        <LocationsList
          features={stores.features}
          flyToMarker={flyToMarker}
          createPopUp={createPopUp}
        />
        <AddNewSite />
      </div>
      <div id='map-container'>
        <div className='map' id='map' />
      </div>
    </>
  )
}

export default OwnedSites