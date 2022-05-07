import mapboxgl from '!mapbox-gl'

export default function addMarkers({ stores, map, flyToMarker, createPopUp }) {
  map.current.addSource('places', { type: 'geojson', data: stores })
  /* For each feature in the GeoJSON object above: */
  stores.features.forEach((marker) => {
    const markerElement = document.createElement('div')
    markerElement.id = `marker-${marker.properties.id}`
    markerElement.className = 'marker'

    markerElement.addEventListener('click', () => {
      flyToMarker(marker)
      createPopUp(marker)
    })

    new mapboxgl
      .Marker(markerElement, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map.current)
  })
}
