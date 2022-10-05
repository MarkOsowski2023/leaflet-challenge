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

    var earthquakes = response.metadata;

    var earthquakeMarkers = [];

    for (var i = 0; i < earthquakes; i++) {
        var earthquake = earthquakes[i];

        var earthquakeMarker = L.marker([earthquake.properties.geometry.type[0]]).bindPopup("<h3>" + earthquake.properties.geometry.type[0] + "</h3>");

        earthquakeMarkers.push(earthquakeMarker);
    }

    createMap(L.layerGroup(earthquakeMarkers));
}

d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(createMarkers);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url, function(data) {
    function style(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),
            stroke: true,
            weight: 0.4
        };

         // set different color from magnitude
    function getColor(magnitude) {
        switch (true) {
        case magnitude > 5:
          return "#ea2c2c";
        case magnitude > 4:
          return "#ea822c";
        case magnitude > 3:
          return "#ee9c00";
        case magnitude > 2:
          return "#eecc00";
        case magnitude > 1:
          return "#d4ee00";
        default:
          return "#98ee00";
        }
      }
      // set radiuss from magnitude
        function getRadius(magnitude) {
        if (magnitude === 0) {
          return 1;
        };
    
        return magnitude * 4;
      };
    
    };

    

});