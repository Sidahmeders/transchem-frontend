import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl'
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'
import Breadcrumbs from '@components/breadcrumbs'
import './style.css'
import NoAccessToken from './NoAccessToken'
import addMarkers from './addMarkers'
import LocationsList from './LocationsList'
import AddNewSite from './AddNewSite'
import axios from 'axios'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const containerStyle = {
  border: "8px solid #7367f0",
  borderBottom: '0',
  borderRadius: '50px 50px 0 0',
  margin: 0,
  display: 'flex',
  justifyContent: 'center'
}

const fetchSites = async (setStores) => {
  const response = await axios.get('http://localhost:5000/api/sites')
  if (response.status !== 200) return
  setStores(() => response.data)
}

const OwnedSites = () => {
  if (!mapboxgl.accessToken) return <NoAccessToken />
  const map = useRef(null)
  const [lng, lat, zoom] = [-77.034084, 38.909671, 9]
  const [stores, setStores] = useState({ features: [] })
  const [searchParams, setSearchParams] = useState({ country: '', query: '' })
  const [searchData, setSearchData] = useState([])

  const setSearchQuery = (query) => setSearchParams(() => ({ ...searchParams, query }))
  const setSearchCountry = (country) => setSearchParams(() => ({ ... searchParams, country }))

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

  const [geocoder, setGeocoder] = useState(null)
  
  useEffect(() => {
    fetchSites(setStores)
  }, [])

  useEffect(() => {
    // initialize map & geocoder only once
    if (map.current === null) {
      map.current = new mapboxgl.Map({
        container: document.getElementById('map'),
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom
      })
      const mapGeocoder = new MapboxGeocoder({ accessToken: mapboxgl.accessToken })
      mapGeocoder.addTo('#sites-search-space')
      mapGeocoder.on('results', (data) => setSearchData(() => data.features))
      setGeocoder(() => mapGeocoder)
    } else {
      map.current.on('load', () => addMarkers({ stores, map, flyToMarker, createPopUp }))
    }
  })

  useEffect(() => {
    if (!geocoder) return
    geocoder.setInput(searchParams.query)
    geocoder.setCountries(searchParams.country)
  }, [searchParams])
  
  return (
    <>
      <Breadcrumbs title='Owned Sites' data={[{ title: 'Dashboard' }, { title: 'Owned Sites' }]} />
      <div style={{display: 'none'}} id='sites-search-space'></div>
      <div className='demo-inline-spacing' style={containerStyle} >
        <LocationsList
          features={stores.features}
          flyToMarker={flyToMarker}
          createPopUp={createPopUp}
        />
        <AddNewSite
          setSearchQuery={setSearchQuery}
          setSearchCountry={setSearchCountry}
          searchData={searchData}
        />
      </div>
      <div id='map-container'>
        <div className='map' id='map' />
      </div>
    </>
  )
}

export default OwnedSites