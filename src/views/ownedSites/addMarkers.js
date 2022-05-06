import mapboxgl from '!mapbox-gl'

export default function addMarkers({ stores, map, flyToMarker, createPopUp }) {
  /* For each feature in the GeoJSON object above: */
  stores.features.forEach((marker) => {
    /* Create a div element for the marker. */
    const el = document.createElement('div')
    /* Assign a unique `id` to the marker. */
    el.id = `marker-${marker.properties.id}`
    /* Assign the `marker` class to each marker for styling. */
    el.className = 'marker'

    el.addEventListener('click', (e) => {
      flyToMarker(marker)
      createPopUp(marker)
      /* Highlight listing in sidebar */
      const activeItem = document.getElementsByClassName('active')
      e.stopPropagation()
      if (activeItem[0]) {
        activeItem[0].classList.remove('active')
      }
      const listing = document.getElementById(`listing-${marker.properties.id}`)
      listing.classList.add('active')
    })

    /**
     * Create a marker using the div element
     * defined above and add it to the map.
     **/
    new mapboxgl.Marker(el, { offset: [0, -23] })
      .setLngLat(marker.geometry.coordinates)
      .addTo(map.current)
  })
}
