function createMap(earthquakeMap) {

    var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });

    var baseMap = {
        "Street Map": streetmap
    };

    var overlayMaps = {
        "Earthquake Maps": earthquakeMap
    };

    var map = L.map("map", {
        center: [37.7749, -122.4194],
        zoom: 5,
        layers: [streetmap, earthquakeMap]
    });

    L.control.layers(baseMap, overlayMaps, {
        collapsed: false
      }).addTo(map);

}

function createMarkers(response) {

    var earthquakes = response.metadata.properties;

    var earthquakeMarkers = [];

    for (var i = 0; i < earthquakes; i++) {
        var earthquake = earthquakes[i];

        var earthquakeMarker = L.marker([earthquake.mag]).bindPopup("<h3>" + earthquake.mag + "</h3>");

        earthquakeMarkers.push(earthquakeMarker);
    }

    createMap(L.layerGroup(earthquakeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);