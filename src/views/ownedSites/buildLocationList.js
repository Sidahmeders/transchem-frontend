export default function buildLocationList({ stores, flyToMarker, createPopUp }) {
  const features = stores?.features || []
  features.forEach((store) => {
    /* Add a new listing section to the sidebar. */
    const listings = document.getElementById('listings')
    const listing = listings.appendChild(document.createElement('div'))
    listing.id = `listing-${store.properties.id}`
    listing.className = 'item'

    /* Add the link to the individual listing created above. */
    const link = listing.appendChild(document.createElement('a'))
    link.href = '#'
    link.className = 'title'
    link.id = `link-${store.properties.id}`
    link.innerHTML = `${store.properties.address}`

    /* Add details to the individual listing. */
    const details = listing.appendChild(document.createElement('div'))
    details.innerHTML = `${store.properties.city}`
    if (store.properties.phone) {
      details.innerHTML += ` · ${store.properties.phoneFormatted}`
    }
    if (store.properties.distance) {
      const roundedDistance = Math.round(store.properties.distance * 100) / 100
      details.innerHTML += `<div><strong>${roundedDistance} miles away</strong></div>`
    }

    link.addEventListener('click', function() {
      features.forEach((feature) => {
        // eslint-disable-next-line no-invalid-this
        if (this.id === `link-${feature.properties.id}`) {
          flyToMarker(feature)
          createPopUp(feature)
        }
      })
      const activeItem = document.getElementsByClassName('active')
      if (activeItem[0]) activeItem[0].classList.remove('active')
      // eslint-disable-next-line no-invalid-this
      this.parentNode.classList.add('active')
    })

  })
}
