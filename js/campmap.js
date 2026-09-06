/* Open Camping Map

(c) 2019-2026 Sven Geggus <sven-osm@geggus.net>

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
   For testing purposes nodejs-campmap.js provides a proxy on this URL
*/
const JSONurl = "/getcampsites";

// show camsites at zoomlevels > this value
const minzoom = 8;

const default_lon = 17.06;
const default_lat = -35.07;
const default_zoom = 3;

// supported campsite categories
var categories = ["standard", "caravan", "camping", "nudist", "group_only", "backcountry"];

// id of selected campsite
var selected_site = "";

var osmde = L.tileLayer('https://tile.openstreetmap.de/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: l10n['attribution']
});

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: l10n['attribution']
});

var otopo = L.tileLayer('https://tile.opentopomap.org/{z}/{x}/{y}.png', {
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

// Symbols for available overlay layers
const overlayIcons = {
  "camping": '<img src="cicons/camping.svg">',
  "hiking": '<img src="cicons/hiking.svg">',
  "cycling": '<img src="cicons/cycling.svg">'
};

var overlayMaps = {};
overlayMaps[overlayIcons['camping']]=cfeatures;
overlayMaps[overlayIcons['hiking']]=hiking;
overlayMaps[overlayIcons['cycling']]=cycling;

const DEFAULT_STYLE = l10n['mapstyle'];
// default overlays is show campsite features no hiking and cycling overlays
const DEFAULT_OVERLAYS = [overlayIcons['camping']];
// keys for local storage
const LS_BASE_KEY = 'selectedBaseLayer';
const LS_OVL_KEYS  = 'selectedOverlays';
const LS_PRIV_CATS = "private_categories";
const LS_CATS = "categories";

const initialLayer = baseMaps[loadSavedLayerName()];
const initialOverlays = loadSavedOverlayNames().map(n => overlayMaps[n]);

// need to set minZoom and maxZoom here to prevent strang defaults  
var map = L.map('map', {
  minZoom: 3,
  maxZoom: 19,
  layers: [initialLayer, ...initialOverlays]
});

let pathlist = window.location.pathname.split("/");
let pathlen = pathlist.length;


/* ------------------- initial URL parsing ------------------------ */

// in case a particular campsite is requested from url
// (if URL looks like /<lang>/node|way|relation/[0-9]+ or /node|way|relation/[0-9]+)
// load campsite data, show and guess location
let sitereq="";
let lshash=localStorage.getItem("hash");

if (pathlist[pathlen-2] != lang) {
  // site requested
  sitereq=pathlist.slice(pathlen-2,pathlen);
  CategoriesFromLocalstorage();
  get_site_data(sitereq);
} else {
  // area (or site from localStorage requested
  
  // set hash and/or site from local storage if not given in URL
  if (window.location.hash == "") {
    // no hash in request

    // in rare cases this means we have a site request stored in localStorage
    sitereq=localStorage.getItem("site")
    if (sitereq != null) {
      sitereq=sitereq.replace(/^\//, '').split("/");
      get_site_data(sitereq);
    }

    // if local storage contains a hash use this
    // otherwise use default location
    if (lshash != null) {
      // setting hash from local storage
      window.location.hash = lshash;
    } else {
      // zoom to default location
      map.setView([default_lon, default_lat], default_zoom);
    }
    CategoriesFromLocalstorage();
  } else {
    // hash given in request
    hashlist=window.location.hash.split("/");
    hashlen=hashlist.length;

    // set default location if one of hashlist[0], hashlist[1] or hashlist[2] is invalid
    let changed = false;
    if ((hashlist[0] == "#") | (hashlist[1] == "") || (hashlist[2] == "")) {
      // truncated location hash requested
      if (lshash != null) {
        // fallback to hash from local storage
        window.location.hash = lshash;
      } else {
        // fallback to default location
        map.setView([default_lon, default_lat], default_zoom);
      }
    }
    
    // * set layers from hash instead of local storage if requested
    // * do not persist this into local storage either
    // * store only if changed in legend tab or layer selector
    // This way we can link to this map with given settings without
    // destroying the users default
    //
    // We do support limited backward compatibility for old layer hash
    // converting it into a category list
    //
    if (hashlen > 3) {
      // parse hash and set layers and categories shown accordingly

      // enable categories as requested in hash part of url
      if ((hashlist[5] == "") || (hashlist[5] === undefined)) {
        CategoriesFromLocalstorage();
      } else {
        console.log(hashlist[5]);
        const cathashRe = /^[0-9a-fA-F]{1,3}$/;
        let cats;
        if (cathashRe.test(hashlist[5])) {
          cats = CategoriesFromOldHash(hashlist[5]);
        } else {
          cats = hashlist[5].split(",");
        }

        // show requested categories. This ignores all unknown category names given
        for (let cat of categories) {
          let pcat = 'private_'+cat;
          if (cats.includes(cat)) {
            document.getElementById(cat).checked=true;
          } else {
            document.getElementById(cat).checked=false;
          }
          if (cats.includes(pcat)) {
            document.getElementById(pcat).checked=true;
          } else {
            document.getElementById(pcat).checked=false;
          }
        }
      }

      // activate base layer as requested in hash part of url
      if (!((hashlist[3] == "") || (hashlist[3] === undefined))) {
        if (hashlist[3] in baseMaps) baseMaps[hashlist[3]].addTo(map)
      }
      
      // activate overlays as requested in hash part of url
      if (!((hashlist[4] == "") || (hashlist[4] === undefined))) {
        let ovls = hashlist[4].split(",");
        for (let ovl in overlayIcons) {
          if (ovls.includes(ovl)) {
            map.addLayer(overlayMaps[overlayIcons[ovl]]);
          } else {
            map.removeLayer(overlayMaps[overlayIcons[ovl]]);
          }
        }
      }
    } else {
      CategoriesFromLocalstorage();
    }
    
    // we do not store the location here in localStorage 
    // However this will automatically happen after pan or zoom
  }
}
ignore_base_layer_change = false;

if (map.getZoom() < minzoom) {
  document.getElementById('zoominfo').style.visibility = 'visible';
}

// if language set in localStorage is different from the one loaded redirect to the one
// from localStorage
let lslang=localStorage.getItem("lang");

if (lslang != null) {
  if (lslang != lang) {
    openURL(lslang);
  }
} else {
  localStorage.setItem("lang", lang);
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
  // and delete the local storage pointing to the site
  if (pathlist[pathlen-2] != lang) {
    window.history.pushState("", "", lang+'/'+window.location.hash); 
    localStorage.removeItem("site"); 
  };
  sidebar.close();
});



L.control.scale({ position: 'bottomright' }).addTo(map);

var hash = new L.Hash(map, updatehashCallback);

var sidebar = L.control.sidebar('sidebar').addTo(map);

sidebar.on('closing', function(e) {
  selected_site="";
  //CategoriesToHash();
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

var cat_color = {
  "backcountry": "#225500",
  "group_only": "#552200",
  "nudist": "#68228b",
  "standard": "#000080",
  "camping": "#000080",
  "caravan": "#000080",
  "private": "#666666"
};

var private_values = ['private', 'members', 'no'];

// iterate over the names from geoJSON which are used as a reference to the
// corresponding icon instances
categories.forEach(function (entry) {
  public_icons[entry] = new LeafIcon({ iconUrl: 'markers/m_' + entry + '.svg' });
  public_icons_selected[entry] = new selIcon({ iconUrl: 'markers/m_' + entry + '_sel.svg' });
  public_icons_warn[entry] = new LeafIcon({ iconUrl: 'markers/m_' + entry + '_warn.svg' });
  public_icons_warn_selected[entry] = new selIcon({ iconUrl: 'markers/m_' + entry + '_warn_sel.svg' });
  private_icons[entry] = new LeafIcon({ iconUrl: 'markers/m_private_' + entry + '.svg' });
  private_icons_selected[entry] = new selIcon({ iconUrl: 'markers/m_private_' + entry + '_sel.svg' });
});

// marker for selected site
var mselected = new L.Marker([0,0]);

// GeoJSON layer with campsite POI
const pointToLayer = function (featureData, latlng) {
  // campsite needs fixing
  // Use modified icon in this case
  let attn = isBroken(featureData.properties);

  // standard icon is fallback
  let icon = attn ? public_icons_warn['standard'] : public_icons['standard'];

  // handle symbol for permanent_camping=only like access=private/members
  if (featureData.properties["permanent_camping"] == 'only') {
    featureData.properties['access'] = 'private';
  }
  
  // * Never show site with unknown filter key unset as we have no idea about it
  // * Only show site when key has one of the defined values
  for (const filtername in tag_filters) {
    let checked = document.getElementById('filter_'+filtername).checked;
    if (checked) {
      let matched=false;
      for (const filtertag of tag_filter_keys[filtername]) {
        // no match if tag is not in featureData
        if (!(filtertag in featureData.properties)) continue;
        // regular expression match with any value
        for (const v of tag_filters[filtername]) {
          if (featureData.properties[filtertag].match(v)) {
            matched=true;
          }
        }
      }
      if (!(matched)) return;
    }
  }
  
  if (categories.indexOf(featureData.properties["category"]) >= 0) {
    icon = attn ? public_icons_warn[featureData.properties["category"]] : public_icons[featureData.properties["category"]];
    if ('access' in featureData.properties) {
      if (private_values.indexOf(featureData.properties['access']) >= 0) {
        icon = private_icons[featureData.properties["category"]];
        if (!(document.getElementById('private_' + featureData.properties["category"]).checked)) {
          return;
        }
      } else {
        if (!(document.getElementById(featureData.properties["category"]).checked)) {
          return;
        }
      }
    } else {
      if (!(document.getElementById(featureData.properties["category"]).checked)) {
        return;
      }
    }
  }
  let marker = L.marker(latlng, {icon: icon});
  marker.on('click', () => updateSidebars(featureData));
  return marker;
};
const markerLayer = L.markerClusterGroup({
  maxClusterRadius: 40,
  showCoverageOnHover: false
});
markerLayer.addTo(map);

let runningRequest;
const updateMapContents = () => {
  let zoom = map.getZoom();

  if(runningRequest) {
    runningRequest.abort();
  }

  const zoomInfoDiv= document.getElementById('zoominfo');
  if (zoom < minzoom) {
    zoomInfoDiv.style.visibility = 'visible';
    markerLayer.clearLayers();
  } else {
    zoomInfoDiv.style.visibility = 'hidden';
    let params = 'bbox='+map.getBounds().toBBoxString();

    var request = new XMLHttpRequest();
    request.open('POST', JSONurl, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    runningRequest = request;

    request.onload = function () {
      runningRequests = null;

      if (this.status >= 200 && this.status < 400) {
        var data = JSON.parse(this.responseText);

        markerLayer.clearLayers();
        markerLayer.addLayers(L.GeoJSON.geometryToLayer(data, {pointToLayer}))
      }
    };

    request.send(params);
  }

}

/* ---------- map and layer selector event bindings ---------- */

map.on('load', () => updateMapContents());
map.on('dragend', () => updateMapContents());
map.on('zoomend', () => updateMapContents());
map.on('refresh', () => updateMapContents());
map.on('resize', () => updateMapContents());

// we need to wrap this into whenReady function to make sure
// that these events are not yet fired in map setup stage
map.whenReady(function () {
  // save new base layer name to localStorage when changed in selector
  map.on('baselayerchange', function (e) {
    if (e.name) {
      saveLayerName(e.name);
    }
  });
  // save overlay selection to localStorage when changed in selector
  map.on('overlayadd overlayremove', saveOverlayNames);
});

// GPS location for smartphone use
var gps = new L.Control.Gps({
  autoCenter: true
}).addTo(map);

function updateSidebars(featureData) {
  mselected.setLatLng([featureData.geometry.coordinates[1],featureData.geometry.coordinates[0]]);
  
  let isPrivate = false;
  if ('access' in featureData.properties) {
    if (private_values.indexOf(featureData.properties['access']) >= 0) {
      isPrivate = true;
    };
  };  
    
  if ('permanent_camping' in featureData.properties) {
    if (featureData.properties['permanent_camping'] == 'only') {
      isPrivate = true;
    };
  };
    
  let attn = isBroken(featureData.properties);
  let icon;
  if (isPrivate) {
    icon = private_icons_selected[featureData.properties.category];
  } else {
    icon = attn ? public_icons_warn_selected[featureData.properties.category] : public_icons_selected[featureData.properties.category];
  }
  mselected.setIcon(icon);
  mselected.addTo(map);
  selected_site=featureData.id.match("/[^/]+/[0-9]+$")[0];
  document.getElementById('info content').innerHTML = f2html(featureData,lang,lang+selected_site);
  initializeFacilityLabels(document.getElementById('info content'));
  document.getElementById('bugs content').innerHTML = f2bugInfo(featureData,lang);
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
  if (isPrivate) {
    document.querySelector(':root').style.setProperty('--campcolor', cat_color['private']);
  } else {
    document.querySelector(':root').style.setProperty('--campcolor', cat_color[cat]);
  };
  let html;
  if (isPrivate) {
    html = '<img src="markers/l_private_'+ cat +'.svg"> ' + l10n[cat];
  } else {
    html = '<img src="markers/l_'+ cat +'.svg"> ' + l10n[cat];
  };
  document.getElementById('cs_cat').innerHTML = html;
  window.history.pushState("", "", lang+selected_site+window.location.hash);
  localStorage.setItem("site",selected_site);
  sidebar.open('info');
}

//add facilities to map legend
var fdiv = document.getElementsByClassName("facilities")[0];
fdiv.innerHTML = gen_facilities4legend();

// add available filters to filter tab
let filterdiv = document.getElementsByClassName("filter-content")[0];
filterdiv.innerHTML=genFilterHTML();

// event bindings for filter checkboxes
for (const key in tag_filters) {
  let cbname='filter_'+key;
  document.getElementById(cbname).addEventListener('click', function () {
    updateMapContents();
  });
}
loadRoutes();

function openURL(newlang) {
  localStorage.setItem("lang",newlang);
  window.location.pathname=window.location.pathname.replace(`/${lang}/`,`/${newlang}/`);
};

// event bindings for category checkboxes
for (var i = 0; i < categories.length; i++) {
  document.getElementById(categories[i]).addEventListener('click', function () {
    updateMapContents();
    CategoriesToLocalstorage();
  });
  document.getElementById('private_' + categories[i]).addEventListener('click', function () {
    updateMapContents();
    CategoriesToLocalstorage();
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

// If a the hash gets updated also call this function
function updatehashCallback(newhash) {
  localStorage.setItem("hash",newhash);
};

/* ---------- Local storage functions for Categories ---------- */

function CategoriesToLocalstorage() {
  let active_cats = {};
  let active_priv_cats = {};
  for (let cat of categories) {
    active_cats[cat]=document.getElementById(cat).checked;    
  }
  for (let cat of categories) {
    active_priv_cats[cat]=document.getElementById('private_'+cat).checked;    
  }
  localStorage.setItem(LS_CATS, JSON.stringify(active_cats));
  localStorage.setItem(LS_PRIV_CATS, JSON.stringify(active_priv_cats));
}

function CategoriesFromLocalstorage() {
  let active_cats = JSON.parse(localStorage.getItem(LS_CATS));
  let active_priv_cats = JSON.parse(localStorage.getItem(LS_PRIV_CATS));
  for (let cat in active_cats) {
    document.getElementById(cat).checked=active_cats[cat];
  }
  for (let cat in active_priv_cats) {
    document.getElementById('private_'+cat).checked=active_priv_cats[cat];
  }  
}

/* ---------- Local storage functions for Base layer ---------- */

function saveLayerName(name) {
  localStorage.setItem(LS_BASE_KEY, name);
}

// load saved base layer name from localStorage
// write and return default if not available or invalid layer name
function loadSavedLayerName() {
  const layername = localStorage.getItem(LS_BASE_KEY);
  if (layername !== null && layername in baseMaps) {
    return layername;
  }
  return DEFAULT_STYLE;
}

/* ---------- Local storage functions for Overlay layers ---------- */

function loadSavedOverlayNames() {
  let names = [];
  try {
    const raw = localStorage.getItem(LS_OVL_KEYS);
    if (raw !== null) {
      names = JSON.parse(raw);
    } else {
      names = DEFAULT_OVERLAYS;
    }
  } catch (e) {
    names = DEFAULT_OVERLAYS;
  }
  if (!Array.isArray(names)) {
    names = DEFAULT_OVERLAYS;
  }
  names = names.filter(n => n in overlayMaps);
  localStorage.setItem(LS_OVL_KEYS, JSON.stringify(names));
  return names;
}

// derive current overlay state from the map and store it
function saveOverlayNames() {
  const active = Object.keys(overlayMaps).filter(n => map.hasLayer(overlayMaps[n]));
  localStorage.setItem(LS_OVL_KEYS, JSON.stringify(active));
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
  fhtml += '<img src="' + 'feature-icons/kitchen.svg">&nbsp;' + l10n['kitchen'] + '<br />\n'
  fhtml += '<img src="' + 'feature-icons/sink.svg">&nbsp;' + l10n['sink'] + '<br />\n'
  fhtml += "</p>";
  return (fhtml);
};

/* Generate HTML for filters only called once in initial loading of map */

function genFilterHTML() {
  let fhtml = '<p>';
  for (const tfkey in tag_filters) {
    fhtml += '<label class="switch"><input type="checkbox" id="filter_'+tfkey
    fhtml += '" unchecked><span class="slider round"></span></label>&nbsp;'

    for (const key of tag_filter_keys[tfkey]) {
      for (const v of tag_filters[tfkey]) {
        let icon = facilities[key][v].icon;
        let title = facilities[key][v].text;
      
        fhtml += '<img src="cicons/'+icon+'" title="'+title+'">';
      }
    }
    fhtml += '<br />'
  }
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
      // Zoom to site if no hash is given
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

// A former version of OpenCampingMap has been using a 12bit
// hex string for encoding selected categories
// we support them to be backward compatible
function CategoriesFromOldHash(cat_hash) {
  let cats= "";  
  let hpad;
  
  // 2 in toString means output binary system
  // 16 in parseInt means use hexadecimal system
  // pad result with up to 12 zeroes
  // as our old hash is 12 bit hex encoded binary (0-0xfff)
  // interpreted as boolean in list order
  let bstr = parseInt(cat_hash, 16).toString(2).padStart(12, '0');
  // console.log(bstr);

  let first=true;
  for (let i = 0; i < categories.length; i++) {
    // public are first 6 values
    if (bstr[i] == 1) {
      if (!(first)) cats+=',';
      cats+=categories[i];
      first=false;
    }
    // private are second 6 values
    if (bstr[i + 6] == 1) {
      if (!(first)) cats+=',';
      cats+='private_'+categories[i];
      first=false;
    }
  }
  return cats;
}
