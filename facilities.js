/* 

list and description of campsite facilities (sport and others)

this is used for building site info bars and map legend

*/

/* supported tags */
var facilities = {
    "tents": {
        "yes": {
           "icon": "tent.svg",
           "text": "tents allowed on site"
        },
        "no": {
           "icon": "no-tent.svg",
           "text": "no tents allowed on site"
        }
    },
    "caravans": {
        "yes": {
           "icon": "caravan.svg",
           "text": "caravans allowed  on site"
        },
        "no": {
           "icon": "no-caravan.svg",
           "text": "no caravans allowed  on site"
        }
    },
    "static_caravans": {
        "yes": {
           "icon": "static_caravans.svg",
           "text": "static caravans for rent"
        }
    },
    "cabins": {
        "yes": {
           "icon": "cabins.svg",
           "text": "cabins for rent"
        }
    },
    "permanent_camping": {
        "yes": {
           "icon": "permanent.svg",
           "text": "pitches for permanent residents available"
        }
    },
    "toilets": {
        "yes": {
           "icon": "toilet.svg",
           "text": "toilets on site"
        },
        "no": {
           "icon": "no-toilet.svg",
           "text": "no toilets on site"
        }
    },
    "shower": {
        "yes": {
           "icon": "shower.svg",
           "text": "showers on site"
        },
        "no": {
           "icon": "no-shower.svg",
           "text": "no showers on site"
        }
    },
    "drinking_water": {
        "yes": {
           "icon": "drinking_water.svg",
           "text": "drinking water available on site"
        },
        "no": {
           "icon": "no-drinking_water.svg",
           "text": "no drinking water available on site"
        }
    },    
    "power_supply": {
        "yes": {
           "icon": "power_supply.svg",
           "text": "electrical power supply available"
        },
        "no": {
           "icon": "no-power_supply.svg",
           "text": "no electrical power supply available"
        }
    },
    "sanitary_dump_station": {
        "yes": {
           "icon": "sanitary_dump_station.svg",
           "text": "sanitary dump station available"
        }
    },
    "shop": {
        "yes": {
           "icon": "shop.svg",
           "text": "shop on site"
        }
    },
    "laundry": {
        "yes": {
           "icon": "laundry.svg",
           "text": "laundry or washing machine on site"
        }
    },
    "washing_machine": {
        "yes": {
           "icon": "laundry.svg",
           "text": "laundry or washing machine on site"
        }
    },
    "pub": {
        "yes": {
           "icon": "pub.svg",
           "text": "pub on site"
        }
    },
    "bar": {
        "yes": {
           "icon": "bar.svg",
           "text": "bar on site"
        }
    },
    "restaurant": {
        "yes": {
           "icon": "restaurant.svg",
           "text": "restaurant on site"
        }
    },
    "fast_food": {
        "yes": {
           "icon": "fast_food.svg",
           "text": "fast food restaurant on site"
        }
    },
    "telephone": {
        "yes": {
           "icon": "telephone.svg",
           "text": "public telephone on site"
        }
    },
    "post_box": {
        "yes": {
           "icon": "post_box.svg",
           "text": "post box on site"
        }
    },
    "playground": {
        "yes": {
           "icon": "playground.svg",
           "text": "playground on site"
        }
    },
    "internet_access": {
        "yes": {
           "icon": "wifi.svg",
           "text": "internet access"
        },
        "wifi": {
           "icon": "wifi.svg",
           "text": "wifi internet access"
        },
        "wlan": {
           "icon": "wifi.svg",
           "text": "wifi internet access"
        }
    },
    "bbq": {
        "yes": {
           "icon": "bbq.svg",
           "text": "barbeque on site"
        }
    },
    "motor_vehicle": {
        "yes": {
           "icon": "motor_vehicle.svg",
           "text": "motor vehicles allowed on site"
        },
        "no": {
           "icon": "no-motor_vehicle.svg",
           "text": "no motor vehicles allowed on site"
        }
    },
    "openfire": {
        "yes": {
           "icon": "firepit.svg",
           "text": "open fire allowed"
        },
        "no": {
           "icon": "no-firepit.svg",
           "text": "open fire prohibited"
        }
    },
    "sauna": {
        "yes": {
           "icon": "sauna.svg",
           "text": "sauna on site"
        }
    },
     // keep swimming pool as last item
    "swimming_pool": {
        "yes": {
           "icon": "swimming_pool.svg",
           "text": "swimming pool"
        }
    }
};

var sport_facilities = {
    "swimming": {
        "icon": "swimming_pool.svg",
        "text": "swimming pool on site"
    },
    "tennis": {
        "icon": "sport-tennis.svg",
        "text": "tennis court on site"
    },
    "soccer": {
        "icon": "sport-soccer.svg",
        "text": "soccer pitch on site"
    },
    "golf": {
        "icon": "sport-golf.svg",
        "text": "golf court on site"
    }
};

function gen_facilities4legend() {
  var fhtml = '<p>';
  var icon = "";
  // generic facilities
  for (var f in facilities) {
    if (["motor_vehicle","sauna","toilets"].indexOf(f) >= 0) {
      fhtml += '</p>\n<p>';
    };
    var kv = facilities[f];
    for (var k in kv) {
      // this prevents duplicate icons
      if (icon != kv[k].icon) {
        fhtml += '<img src="icons/'+kv[k].icon+'">'+kv[k].text+'<br />\n'
        icon = kv[k].icon;
      };
    };
  };
  // sport facilities
  for (var s in sport_facilities) {
    if (s != 'swimming') {
      fhtml += '<img src="icons/'+sport_facilities[s].icon+'">'+sport_facilities[s].text+'<br />\n'
    };
  };
  fhtml += "</p>";
  return(fhtml);
};

