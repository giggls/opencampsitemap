/* build "site info" HTML for sidebar from json features */

/* supported tags */
var facilities = {
    "tents": {
        "yes": "tent.svg", 
        "no": "no-tent.svg"
    },
    "caravans": {
        "yes": "caravan.svg", 
        "no": "no-caravan.svg"
    },
    "static_caravans": {
        "yes": "static_caravans.svg"
    }, 
    "cabins": {
        "yes": "cabins.svg"
    },
    "permanent_camping": {
        "yes": "permanent.svg"
    },
    "motor_vehicle": {
        "yes": "motor_vehicle.svg", 
        "no": "no-motor_vehicle.svg"
    },
    "power_supply": {
        "yes": "power_supply.svg", 
        "no": "no-power_supply.svg"
    },
// poi
    "sanitary_dump_station": {
        "yes": "sanitary_dump_station.svg"
    },
// poi
    "shop": {
        "yes": "shop.svg"
    },
// poi
    "laundry": {
        "yes": "laundry.svg"
    },
// poi
    "toilets": {
        "yes": "toilet.svg", 
        "no": "no-toilet.svg"
    },
// poi
    "shower": {
        "yes": "shower.svg", 
        "no": "no-shower.svg"
    },
// poi
    "drinking_water": {
        "yes": "drinking_water.svg", 
        "no": "no-drinking_water.svg"
    },
// poi 
    "pub": {
        "yes": "pub.svg"
    },
// poi
    "bar": {
        "yes": "bar.svg"
    },
// poi 
    "restaurant": {
        "yes": "restaurant.svg"
    },
// poi 
    "fast_food": {
         "yes": "fast_food.svg"
    },
// poi
    "telephone": {
        "yes": "telephone.svg"
    },
// poi
    "post_box": {
        "yes": "post_box.svg"
    },
// poi
    "playground": {
        "yes": "playground.svg"
    }, 
    "washing_machine": {
        "yes": "laundry.svg"
    }, 
    "internet_access": {
        "yes": "wifi.svg", 
        "wifi": "wifi.svg", 
        "wlan": "wifi.svg"
    },
// poi (firepit) 
    "openfire": {
        "yes": "firepit.svg", 
        "no": "no-firepit.svg"
    }, 
// poi
    "bbq": {
        "yes": "bbq.svg"
    },
// poi 
    "sauna": {
        "yes": "sauna.svg"
    },
// poi
    "swimming_pool": {
        "yes": "swimming_pool.svg"
    }
};


function genlink(url) {
  return('<a href=\"'+url+'\" target=\"_blank\">'+url+'<\a>');
}


function f2html(fdata) {
  // console.debug('Properties: ' + JSON.stringify(fdata.properties));
  
  var ihtml = "";
  
  // add stars if available
  if ("stars" in fdata.properties) {
    if ((numstars=Number(fdata.properties.stars)) != NaN) {
      if (numstars > 0) {
        ihtml = ihtml + '<p>'
        for (i = 0; i < numstars; i++) {
          ihtml = ihtml + '<img src=\"icons/star.svg\">'
        }
        ihtml = ihtml + '</p>\n'
      }
    }
  }
  
  // generate facility icons
  for (var f in facilities) {
    if (f in fdata.properties) {
      if (fdata.properties[f] in facilities[f]) {
        ihtml = ihtml + '<img src=\"icons/'+facilities[f][fdata.properties[f]]+'\">';
      }
    }
  }
  
  if ("name" in fdata.properties) {
    ihtml = ihtml + '<h2>' + fdata.properties.name + '</h2>\n';
  } else {
    if ("operator" in fdata.properties) {
      ihtml = ihtml + '<h2>' + fdata.properties.operator + '</h2>\n';  
    } else {
      ihtml = ihtml + '<h2>' + "Unnamed campsite" + '</h2>\n';
    }
  };
    
  if ("website" in fdata.properties) {
    ihtml = ihtml + genlink(fdata.properties.website);
  };
  
  var osmlink = genlink(fdata.id);
  
  var ihtml = ihtml + '\n<p><hr />Openstreetmap object:<br />'+ osmlink + '</p>';
  return(ihtml);
}

/* build "bugs info" HTML for sidebar from json features */
function f2bugInfo(featureData) {
  var ok = true;
  var bhtml = "<h2>Likely untagged features:</h2>\n<ul>\n";
  
  if (!("name" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>Object has no <b>name</b> tag.</li>";
  }
  
  if (!("toilets" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>toilets are missing<br />(explicitely tag with <b>no</b> if unavailable).</li>";
  }

  if (!("shower" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>shower is missing<br />(explicitely tag with <b>no</b> if unavailable).</li>";
  }

  if (!("tents" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>tag <b>tents</b> is missing<br />(tag if tents are allowed/not allowed).</li>";
  }

  if (!("caravans" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>tag <b>caravans</b> is missing<br />(tag if caravans are allowed/not allowed).</li>";
  }
  
  // check if any contact information is available
  
  if (!("website" in featureData.properties)) {
    if (!("contact:phone" in featureData.properties)) {
      if (!("phone" in featureData.properties)) {
        if (!("contact:phone" in featureData.properties)) {
          ok = false;
          bhtml = bhtml + "<li>No contact information given (website,phone)</li>";
        }
      }
    }
  }
  
  bhtml = bhtml + "</ul>";
  if (ok) {
    bhtml = '<p><b>No apparent bugs found!<p>Site seems to be decently tagged.</b></p></p>';
  }
  return(bhtml);
}
