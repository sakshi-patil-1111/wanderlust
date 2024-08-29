async function getCoords(userInput) {
  const encodedLocation = encodeURIComponent(userInput.trim());
  const apiUrl = `https://api.tomtom.com/search/2/geocode/${encodedLocation}.json?key=OQK4Xx1vsse1GMyGX7G9q7ihh1lTosQZ&limit=1`;
  const response = await fetch(apiUrl);
  const data = await response.json();
  return [data.results[0].position.lon, data.results[0].position.lat];
}

let listingLocation = await getCoords(userInput);

let map = tt.map({
  container: "map",
  key: mapToken,
  center: listingLocation,
  zoom: 15,
});

let marker = new tt.Marker().setLngLat(listingLocation).addTo(map);

let popupOffsets = {
  top: [100, 100],
  bottom: [0, -30],
  "bottom-right": [0, -70],
  "bottom-left": [0, -70],
  left: [25, -35],
  right: [-25, -35],
};

let popup = new tt.Popup({ offset: popupOffsets }).setHTML(
  `<h4>${userInput}</h4><p>Exact location will be provided after booking</p>`
);

marker.setPopup(popup).togglePopup();

tt.setProductInfo("WanderLust", "1.0");
