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
var public_icons = new Array();
var private_icons = new Array();
var categories=["backcountry", "group_only","nudist","standard","camping","caravan"];

var cat_txt = { "backcountry": "backcountry camp",
                "group_only": "group only camp",
                "nudist": "nudist campsite",
                "standard": "campsite",
                "camping": "tents only campsite",
                "caravan": "caravan site" };

var cat_color = { "backcountry": "#225500",
                "group_only": "#552200",
                "nudist": "#68228b",
                "standard": "#000080",
                "camping": "#000080",
                "caravan": "#000080",
                "private": "#666666" };
                
var private_values = ['private','members'];

// iterate over the names from geoJSON which are used as a reference to the
// corresponding icon instances
categories.forEach(function(entry) {
  public_icons[entry] = new LeafIcon({iconUrl: 'markers/m_'+entry+'.png'});
  private_icons[entry] = new LeafIcon({iconUrl: 'markers/m_private_'+entry+'.png'});
});

L.uGeoJSONLayer({endpoint: window.location.protocol+"//camping.openstreetmap.de/getcampsites", usebbox:true, minzoom:10 }, {
  // called when drawing point features
  pointToLayer: function (featureData, latlng) {
    // standard icon is fallback
    var icon = public_icons['standard'];
    if (categories.indexOf(featureData.properties["category"]) >= 0) {
      icon = public_icons[featureData.properties["category"]];
      if ('access' in featureData.properties) {
        if (private_values.indexOf(featureData.properties['access']) >= 0) {
          icon = private_icons[featureData.properties["category"]];
        };
      };
    };
    return L.marker(latlng, {icon: icon});
  },
  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {
    featureLayer.on('click', function () {
      f2html(featureData);
      f2bugInfo(featureData);
      var cat;
      var private = false;
      if ('access' in featureData.properties) {
        if (private_values.indexOf(featureData.properties['access']) >= 0) {
          private = true;
        };
      };
      if (categories.indexOf(featureData.properties["category"]) >= 0) {
        cat=featureData.properties["category"];
      } else {
        cat="standard";
      }
      var sh = document.getElementsByClassName('sidebar-header');
      for(var i = 0; i < sh.length; i++) {
        if (private) {
          sh[i].style.backgroundColor = cat_color['private'];
        } else {
          sh[i].style.backgroundColor = cat_color[cat];
        };
      };
      var html;
      if (private) {
        html = '<img src=\"markers/l_private_'+ cat + '.svg\"> private ' + cat_txt[cat];
      } else {
        html = '<img src=\"markers/l_'+ cat + '.svg\"> ' + cat_txt[cat];
      };
      document.getElementById('cs_cat').innerHTML = html;
      sidebar.open('info');
    });
  }
}).addTo(map);

//add facilities to map legend
var fdiv = document.getElementsByClassName("facilities")[0];
fdiv.innerHTML = gen_facilities4legend();

// add click event to language flags
for (var i=0; i < document.getElementsByClassName("flags")[0].getElementsByTagName("img").length; i++) {
  var lang_img = document.getElementsByClassName("flags")[0].getElementsByTagName("img")[i];
  lang_img.addEventListener('click', function(event) {
    var tlang=event.target.src.split("/");
    tlang=tlang[tlang.length-1].split(".")[0];
    var urlpos=window.location.href.split("#");
    var baseurl=urlpos[0].replace(/[^/]*$/g,"")
    window.open(baseurl+'index.html.'+tlang+'#'+urlpos[1], '_self')    
  });
}

