/* Open Camping Map

(c) 2019-2022 Sven Geggus <sven-osm@geggus.net>

*/

// unhide sidebar stuff hidden by CSS for static website
var link = document.createElement('link');
var head = document.getElementsByTagName('HEAD')[0];
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'css/local-sidebar.css';
head.appendChild(link);

/* URL for JSON data. Public server is at
   https://opencampingmap.org/getcampsites
*/
const  JSONurl = "https://opencampingmap.org/getcampsites";

// id of selected campsite
var selected_site = "";

var osmde = L.tileLayer('https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: l10n['attribution']
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: l10n['attribution']
});

var otopo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  maxZoom: 17,
  attribution: l10n['attribution']
});

var esri_img = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 19,
  attribution: l10n['esri_attribution']
});

var osmen = L.tileLayer('https://opencampingmap.{s}.tile.maphosting.uk/en/map/v1/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: l10n['attribution']
});

var osmfr = L.tileLayer('https://opencampingmap.{s}.tile.maphost.fr/fr/map/v1/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: l10n['attribution']
});

var osmes = L.tileLayer('https://opencampingmap.{s}.tile.maphost.es/es/map/v1/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: l10n['attribution']
});

var cfeatures =
  L.tileLayer('camping_features/{z}/{x}/{y}.png', {
    maxZoom: 19, minZoom: 18
  });

var hiking = L.tileLayer('https://tile.waymarkedtrails.org/hiking/{z}/{x}/{y}.png', {
  maxZoom: 18,
});

var cycling = L.tileLayer('https://tile.waymarkedtrails.org/cycling/{z}/{x}/{y}.png', {
  maxZoom: 18,
});

var baseMaps = {
  "OSM (en)": osmen,
  "OSM (de)": osmde,
  "OSM (fr)": osmfr,
  "OSM (es)": osmes,
  "OSM": osm,
  "TOPO": otopo,
  "World Imagery": esri_img
};

/* var overlayMaps = {
  'cf' : cfeatures,
  'ho' : hiking,
  'cy': cycling
};*/

var overlayMaps = {};
overlayMaps['<img src="cicons/camping.svg">']=cfeatures;
overlayMaps['<img src="cicons/hiking.svg">']=hiking;
overlayMaps['<img src="cicons/cycling.svg">']=cycling;

// need to set minZoom and maxZoom here to prevent strang defaults  
var map = L.map('map', {
  layers: [baseMaps[l10n['mapstyle']]],
  minZoom: 3,
  maxZoom: 19
});

let pathlist = window.location.pathname.split("/");
let pathlen = pathlist.length;

// in case a particular campsite is requested
// (if URL looks like http://my.site.example.com/some/path/<lang>/node|way|relation/[0-9]+)
// load campsite data and show
if (pathlist[pathlist.length-2] != lang) {
  get_site_data(pathlist.slice(pathlen-2,pathlen));
} else {
  // default view: black forest :)
  if (window.location.hash == "") {
    map.setView([48.61, 8.24], 10);
  }
}

var geocoderControl = new L.Control.geocoder({
  showResultIcons: true
});
geocoderControl.addTo(map);

L.control.layers(baseMaps, overlayMaps).addTo(map);

// enable cfeatures layer by default
map.addLayer(cfeatures)

// clean selected site on click to map background
map.on('click', function() {
  mselected.remove();
  document.getElementById('info content').innerHTML = "";
  document.getElementById('bugs content').innerHTML = "";
  document.getElementById('reviews_container').innerHTML="";
  selected_site="";
  document.querySelector(':root').style.setProperty('--campcolor', cat_color['standard']);
  document.getElementById('cs_cat').innerHTML = "";
  let pathlist = window.location.pathname.split("/");
  let pathlen = pathlist.length;
  // If URL is a link to a specific site change it to point to the map only
  if (pathlist[pathlist.length-2] != lang) {
    // needs to be relative to respect base
    window.history.pushState("", "", lang+'/'+window.location.hash); 
  };
  sidebar.close();
});

L.control.scale({ position: 'bottomright' }).addTo(map);

var hash = new L.Hash(map, baseMaps, overlayMaps, CategoriesFromHash, ["bef"]);

var sidebar = L.control.sidebar('sidebar').addTo(map);

sidebar.on('closing', function(e) {
  selected_site="";
  CategoriesToHash();
})

var LeafIcon = L.Icon.extend({
  options: {
    iconSize: [32, 40],
    iconAnchor: [16, 40]
  }
});

var selIcon = L.Icon.extend({
  options: {
    iconSize: [36, 45],
    iconAnchor: [18, 42]
  }
});

// Setup associative arrays which contains all custom icons we have
var public_icons = new Array();
var private_icons = new Array();
var public_icons_warn = new Array();

var public_icons_selected = new Array();
var private_icons_selected = new Array();
var public_icons_warn_selected = new Array();
var categories = ["standard", "caravan", "camping", "nudist", "group_only", "backcountry"];

var cat_color = {
  "backcountry": "#225500",
  "group_only": "#552200",
  "nudist": "#68228b",
  "standard": "#000080",
  "camping": "#000080",
  "caravan": "#000080",
  "private": "#666666"
};

var private_values = ['private', 'members'];

// iterate over the names from geoJSON which are used as a reference to the
// corresponding icon instances
categories.forEach(function (entry) {
  public_icons[entry] = new LeafIcon({ iconUrl: 'markers/m_' + entry + '.png' });
  public_icons_selected[entry] = new selIcon({ iconUrl: 'markers/m_' + entry + '_sel.png' });
  public_icons_warn[entry] = new LeafIcon({ iconUrl: 'markers/m_' + entry + '_warn.png' });
  public_icons_warn_selected[entry] = new selIcon({ iconUrl: 'markers/m_' + entry + '_warn_sel.png' });
  private_icons[entry] = new LeafIcon({ iconUrl: 'markers/m_private_' + entry + '.png' });
  private_icons_selected[entry] = new selIcon({ iconUrl: 'markers/m_private_' + entry + '_sel.png' });
});

// marker for selected site
var mselected = new L.Marker([0,0]);

// GeoJSON layer with campsite POI
var gjson = L.uGeoJSONLayer({ endpoint: JSONurl, usebbox: true, minzoom: 10 }, {
  // called when drawing point features
  pointToLayer: function (featureData, latlng) {
    // campsite needs fixing
    // Use modified icon in this case
    let attn = isBroken(featureData.properties);

    // standard icon is fallback
    let icon = attn ? public_icons_warn['standard'] : public_icons['standard'];

    if (categories.indexOf(featureData.properties["category"]) >= 0) {
      icon = attn ? public_icons_warn[featureData.properties["category"]] : public_icons[featureData.properties["category"]];
      if ('access' in featureData.properties) {
        if (private_values.indexOf(featureData.properties['access']) >= 0) {
          icon = private_icons[featureData.properties["category"]];
          if (!(document.getElementById('private_' + featureData.properties["category"]).checked)) {
            return;
          };
        } else {
          if (!(document.getElementById(featureData.properties["category"]).checked)) {
            return;
          };
        };
      } else {
        if (!(document.getElementById(featureData.properties["category"]).checked)) {
          return;
        };
      };
    };
    return L.marker(latlng, { icon: icon });
  },
  // Executes on each feature in the dataset
  onEachFeature: function (featureData, featureLayer) {
    featureLayer.on('click', function () {
      updateSidebars(featureData);
    });
  }
}).addTo(map);

// GPS location for smartphone use
var gps = new L.Control.Gps({
  autoCenter: true
}).addTo(map);

function updateSidebars(featureData) {
  mselected.setLatLng([featureData.geometry.coordinates[1],featureData.geometry.coordinates[0]]);
  
  let private = false;
  if ('access' in featureData.properties) {
    if (private_values.indexOf(featureData.properties['access']) >= 0) {
      private = true;
    };
  };  
    
  let attn = isBroken(featureData.properties);
  let icon;
  if (private) {
    icon = private_icons_selected[featureData.properties.category];
  } else {
    icon = attn ? public_icons_warn_selected[featureData.properties.category] : public_icons_selected[featureData.properties.category];
  }
  mselected.setIcon(icon);
  mselected.addTo(map);
  selected_site=featureData.id.match("/[^/]+/[0-9]+$")[0];
  CategoriesToHash();
  document.getElementById('info content').innerHTML = f2html(featureData,lang,lang+selected_site);
  document.getElementById('bugs content').innerHTML = f2bugInfo(featureData,true);
  document.getElementById('josm').addEventListener('click', function () {
    editInJOSM(featureData);
  });
  document.getElementById('id').addEventListener('click', function () {
    editInID(featureData);
  });
  loadReviews(featureData);
  let cat;
  if (categories.indexOf(featureData.properties["category"]) >= 0) {
    cat = featureData.properties["category"];
  } else {
    cat = "standard";
  }
  if (private) {
    document.querySelector(':root').style.setProperty('--campcolor', cat_color['private']);
  } else {
    document.querySelector(':root').style.setProperty('--campcolor', cat_color[cat]);
  };
  let html;
  if (private) {
    html = '<img src="markers/l_private_'+ cat +'.svg"> ' + l10n[cat];
  } else {
    html = '<img src="markers/l_'+ cat +'.svg"> ' + l10n[cat];
  };
  document.getElementById('cs_cat').innerHTML = html;
  // needs to be relative to respect base
  window.history.pushState("", "", lang+selected_site+window.location.hash);
  sidebar.open('info');
}

//add facilities to map legend
var fdiv = document.getElementsByClassName("facilities")[0];
fdiv.innerHTML = gen_facilities4legend();

function openURL(newlang) {
  window.location.pathname=window.location.pathname.replace(`/${lang}/`,`/${newlang}/`);
};

// event bindings for category sliders
for (var i = 0; i < categories.length; i++) {
  document.getElementById(categories[i]).addEventListener('click', function () {
    gjson.onMoveEnd();
    CategoriesToHash();
  });
  document.getElementById('private_' + categories[i]).addEventListener('click', function () {
    gjson.onMoveEnd();
    CategoriesToHash();
  });
};

// check if campsites need fixing
function isBroken(properties) {
  let attn = false;
  
  if (!('name' in properties)) {
    attn = true;
  } else {
    // in this case the name tag is the only tag
    if (Object.keys(properties).length == 4) {
      attn = true;
    }
  }

  if ('inside_sites' in properties) {
    attn = true;
  }

  if ('contains_sites' in properties) {
    attn = true;
  }
  return (attn)
}

function CategoriesToHash() {
  let newhash = 0;

  for (let i = 0; i < categories.length; i++) {
    if (document.getElementById(categories[categories.length - 1 - i]).checked) {
      newhash += Math.pow(2, i + 6);
    }
    if (document.getElementById('private_' + categories[categories.length - 1 - i]).checked) {
      newhash += Math.pow(2, i);
    }
  }
  // store additional options in hash
  hash.updateAUX([newhash.toString(16)]);
}

function CategoriesFromHash(hash) {
  let h0;
  h0 = hash[0];
  
  // we support 12 categories (FFF -> FFFF)
  // this hack prevents that leading zeros get lost
  // and gives us a minimum lenght of 4hex digits (16bit)
  if (h0.length == 3) h0 = "f" + h0;
  if (h0.length == 2) h0 = "f0" + h0;
  if (h0.length == 1) h0 = "f00" + h0;

  let bstr = parseInt(h0, 16).toString(2);
  for (let i = 0; i < categories.length; i++) {
    // public is +4
    if (bstr[i + 4] == 1) {
      document.getElementById(categories[i]).checked = true;
    } else {
      document.getElementById(categories[i]).checked = false;
    }
    // private is +10
    if (bstr[i + 10] == 1) {
      document.getElementById('private_' + categories[i]).checked = true;
    } else {
      document.getElementById('private_' + categories[i]).checked = false;
    }
  }
}

function gen_facilities4legend() {
  let fhtml = '<p>';
  let icon = "";
  // generic facilities
  for (let f in facilities) {
    if (["motor_vehicle", "sauna", "toilets"].indexOf(f) >= 0) {
      fhtml += '</p>\n<p>';
    };
    var kv = facilities[f];
    for (let k in kv) {
      // this prevents duplicate icons
      if (icon != kv[k].icon) {
        fhtml += '<img src="cicons/' + kv[k].icon + '">&nbsp;' + kv[k]['text'] + '<br />\n'
        icon = kv[k].icon;
      };
    };
  };
  // sport facilities
  for (let s in sport_facilities) {
    if ((s != 'swimming') && (s != 'golf')) {
      fhtml += '<img src="cicons/' + sport_facilities[s].icon + '">&nbsp;' + sport_facilities[s]['text'] + '<br />\n'
    };
  };
  fhtml += "</p>";
  fhtml += "<p>";
  fhtml += '<img src=' + camp_pitches['generic'].icon + '>&nbsp;' + camp_pitches['generic'].text + '<br />\n'
  fhtml += '<img src=' + camp_pitches['tents'].icon + '>&nbsp;' + camp_pitches['tents'].text + '<br />\n'
  fhtml += '<img src=' + camp_pitches['permanent'].icon + '>&nbsp;' + camp_pitches['permanent'].text + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/reception.svg">&nbsp;' + l10n['reception'] + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/power_supply.svg">&nbsp;' + l10n['power-supply'] + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/fire_extinguisher.svg">&nbsp;' + l10n['fire-extinguisher'] + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/toilet.svg">&nbsp;' + l10n['toilets'] + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/shower.svg">&nbsp;' + l10n['shower'] + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/drinking_water.svg">&nbsp;' + l10n['drinking_water'] + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/sanitary_dump_station.svg">&nbsp;' + l10n['sanitary_dump_station'] + '<br />\n'
  fhtml += "</p>";
  return (fhtml);
};

/*

fetch campsite data as given in URL bar and update sidebar accordingly 


*/
function get_site_data(type_id) {
  let osm_id;
  if (["node", "way", "relation"].indexOf(type_id[0]) == -1) {
    return
  }
  if ((osm_id = Number(type_id[1])) == NaN) {
    return
  }

  let gcsr = new XMLHttpRequest();
  gcsr.open("GET", JSONurl + "?osm_id=" + osm_id + "&osm_type=" + type_id[0]);
  gcsr.addEventListener('load', function (event) {
    if (gcsr.status >= 200 && gcsr.status < 300) {
      let obj = JSON.parse(gcsr.responseText);
      updateSidebars(obj.features[0]);
      hash.aux = [hash.aux[0]];
      // Zoom to site
      if ((window.location.href.indexOf('#') < 0) ) {
        let x,y;
        if (obj.features[0].bbox == undefined) {
          x = obj.features[0].geometry.coordinates[1];
          y = obj.features[0].geometry.coordinates[0];
        } else {
          x = obj.features[0].bbox[1]+(obj.features[0].bbox[3]-obj.features[0].bbox[1])/2.0;
          y = obj.features[0].bbox[0]+(obj.features[0].bbox[2]-obj.features[0].bbox[0])/2.0;
        }
        map.setView([x, y], 16);
      }
    } else {
      console.warn(gcsr.statusText, gcsr.responseText);
    }
  });
  gcsr.send();
}

