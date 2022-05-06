/* eslint-disable no-unused-vars */
import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from '!mapbox-gl'
import './style.css'
import stores from './stores'
import buildLocationList from './buildLocationList'
import addMarkers from './addMarkers'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN

const OwnedSites = () => {
  const mapContainer = useRef(null)
  const map = useRef(null)
  const [lng, setLng] = useState(-77.034084)
  const [lat, setLat] = useState(38.909671)
  const [zoom, setZoom] = useState(9)

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
  
    new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(currentFeature.geometry.coordinates)
      .setHTML(`<h3>Sweetgreen</h3><h4>${currentFeature.properties.address}</h4>`)
      .addTo(map.current)
  }
  
  const addMapDataLayer = () => {
    map.current.addSource('places', {
      type: 'geojson',
      data: stores
    })
    // add custom markers
    addMarkers({ stores, map, flyToMarker, createPopUp })
    // build the sidebar Locations List
    buildLocationList({ stores, flyToMarker, createPopUp })
  }

  useEffect(() => {
    if (map.current) return // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom
    })
    map.current.on('load', addMapDataLayer)
  })

  return (
    <>
      <div id='map-container'>
        <div className='sidebar'>
          <div className='heading'>
            <h1>Our Locations</h1>
          </div>
          <div id='listings' className='listings'></div>
        </div>
        <div
          className='map'
          ref={mapContainer}
        />
      </div>
    </>
  )
}

export default OwnedSites