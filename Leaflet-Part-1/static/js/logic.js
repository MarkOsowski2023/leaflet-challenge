var map = L.map('map').setView([37.7749, -122.4194], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);



// Features

//  geojson url for earquake data
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Empty Geojson layer
// var myLayer = L.geoJSON().addTo(map);
// // myLayer.addData(geojsonFeature);

// data for geojson layer
d3.json(url).then(({features}) => {
  features.forEach(feature => {
    let { coordinates } = feature.geometry;
    let { mag, place } = feature.properties;

    L.circle([coordinates[1], coordinates[0]], {radius: mag*12000, color: 'black', fillColor: chooseColor(feature.properties.mag), fillOpacity: coordinates[2]}).addTo(map)
  })
});

function chooseColor(mag) {
  if (mag >= 0 & mag <= 1) return "green";
  else if (mag > 1 & mag <= 3) return "yellow";
  else if (mag > 3 & mag <= 5) return "orange";
  else if (mag > 5 & mag <= 7) return "darkorange";
  else if (mag > 7 & mag <= 9.5) return "red";
  else return "lightgreen";
}

