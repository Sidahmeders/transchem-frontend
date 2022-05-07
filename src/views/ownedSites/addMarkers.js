import mapboxgl from '!mapbox-gl'

export default function addMarkers({ stores, map, flyToMarker, createPopUp }) {
  /* For each feature in the GeoJSON object above: */
  stores.features.forEach((marker) => {
    const markerElement = document.createElement('div')
    markerElement.id = `marker-${marker.properties.id}`
    markerElement.className = 'marker'

    markerElement.addEventListener('click', () => {
      flyToMarker(marker)
      createPopUp(marker)
    })

    /**
     * Create a marker using the div element
     * defined above and add it to the map.
     **/
    new mapboxgl.Marker(markerElement, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map.current)
  })
}
