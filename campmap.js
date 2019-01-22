/* Open campsite Map 

(c) 2019 Sven Geggus <sven-osm@geggus.net>

*/

var map = L.map('map');

// default view: black forest :)
map.setView([48.61, 8.24], 10);
var hash = new L.Hash(map);

L.tileLayer(window.location.protocol+'//{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: 'Map data &copy; OpenStreetMap contributors'
}).addTo(map);

var sidebar = L.control.sidebar('sidebar').addTo(map);

var LeafIcon = L.Icon.extend({
    options: {
        iconSize:     [32, 40],
        iconAnchor:   [16, 40]
    }
});

// Setup an Associative Arrays which contains all custom Icons we have
var icons = new Array();
var categories=["backcountry", "group_only", "private","nudist","standard"];
// iterate over the names from geoJSON which are used as a reference to the
// corresponding icon instances
categories.forEach(function(entry) {
  icons[entry] = new LeafIcon({iconUrl: 'markers/m_'+entry+'.png'});
});

L.uGeoJSONLayer({endpoint: window.location.protocol+"//camping.openstreetmap.de/getcampsites", usebbox:true, minzoom:10 }, {
  // called when drawing point features
  pointToLayer: function (featureData, latlng) {
    if (categories.indexOf(featureData.properties["category"]) >= 0) {
      return L.marker(latlng, {icon: icons[featureData.properties["category"]]});
    } else {
      console.log("unknown campsite category: >"+featureData.properties["category"]+"<");
      return L.marker(latlng, {icon: icons['standard']});
    }
  },
  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {
    featureLayer.on('click', function () {
      document.getElementById('info content').innerHTML = f2html(featureData);
      document.getElementById('bugs content').innerHTML = f2bugInfo(featureData);
      sidebar.open('info');
    });
  }
}).addTo(map);

