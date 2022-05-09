import mapboxgl from '!mapbox-gl'

export default function addMarkers({ store, map, flyToMarker, createPopUp }) {
  const canRemovePlaces = map.current.getSource('places')
  if (canRemovePlaces) map.current.removeSource('places')
  map.current.addSource('places', { type: 'geojson', data: store })

  store.features.forEach((marker) => {
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
