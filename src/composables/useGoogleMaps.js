export default function () {
  function getAddressFromPlaceDetails(gPlaceDetails) {
    let newAddressFromMap = {}
    if (gPlaceDetails.geometry) {
      newAddressFromMap["street_address"] = gPlaceDetails.formatted_address
      newAddressFromMap["street-address"] = gPlaceDetails.formatted_address
      newAddressFromMap.google_place_id = gPlaceDetails.place_id
      newAddressFromMap.latitude = gPlaceDetails.geometry.location.lat()
      newAddressFromMap.longitude = gPlaceDetails.geometry.location.lng()
      
      if (gPlaceDetails.address_components) {
        gPlaceDetails.address_components.forEach((address_component, i) => {
          if (address_component.types[0] === "route") {
            newAddressFromMap.street_name = address_component.long_name
          }
          if (address_component.types[0] === "locality") {
            newAddressFromMap.city = address_component.long_name
          }
          if (address_component.types[0] === "country") {
            newAddressFromMap.country = address_component.long_name
          }
          if (address_component.types[0] === "postal_code") {
            newAddressFromMap["postal-code"] = address_component.long_name
            newAddressFromMap["postal_code"] = address_component.long_name
          }
          if (address_component.types[0] === "street_number") {
            newAddressFromMap["street-number"] = address_component.long_name
            newAddressFromMap["street_number"] = address_component.long_name
          }
          if (address_component.types[0] === "administrative_area_level_1") {
            newAddressFromMap.region = address_component.long_name
          }
        })
      }
    }
    return newAddressFromMap
  }

  return {
    getAddressFromPlaceDetails,
  }
}
