/* 

list and description of campsite facilities (sport and others)

this is used for building site info bars and map legend

*/

/* supported tags */
var facilities = {
    "tents": {
        "yes": {
           "icon": "tent.svg",
           "text": {
             "en": "tents allowed on site",
             "de": "Zelte erlaubt"
           }
        },
        "no": {
           "icon": "no-tent.svg",
           "text": {
             "en": "no tents allowed on site",
             "de": "Zelte verboten"
           }
        }
    },
    "caravans": {
        "yes": {
           "icon": "caravan.svg",
           "text": {
             "en": "caravans allowed on site",
             "de": "Wohnwagen erlaubt"
           }
        },
        "no": {
           "icon": "no-caravan.svg",
           "text": {
             "en": "no caravans allowed on site",
             "de": "Wohnwagen verboten"
           }
        }
    },
    "static_caravans": {
        "yes": {
           "icon": "static_caravans.svg",
           "text": {
             "en": "static caravans for rent",
             "de": "Vermietung ortsfester Wohnwagen"
           }
        }
    },
    "cabins": {
        "yes": {
           "icon": "cabins.svg",
           "text": {
             "en": "cabins for rent",
             "de": "Vermietung von Wohncontainern"
           }
        }
    },
    "permanent_camping": {
        "yes": {
           "icon": "permanent.svg",
           "text": {
             "en": "pitches for permanent residents available",
             "de": "Stellplätze für Dauercamper vorhanden"
           }
        }
    },
    "toilets": {
        "yes": {
           "icon": "toilet.svg",
           "text": {
             "en": "toilets on site",
             "de": "Toiletten vorhanden"
           }
        },
        "no": {
           "icon": "no-toilet.svg",
           "text": {
             "en": "no toilets on site",
             "de": "Keine Toiletten vorhanden"
           }
        }
    },
    "shower": {
        "yes": {
           "icon": "shower.svg",
           "text": {
             "en": "showers on site",
             "de": "Duschen vorhanden"
           }
        },
        "no": {
           "icon": "no-shower.svg",
           "text": {
             "en": "no showers on site",
             "de": "Keine Duschen vorhanden"
           }
        }
    },
    "drinking_water": {
        "yes": {
           "icon": "drinking_water.svg",
           "text": {
             "en": "drinking water available on site",
             "de": "Trinkwasser vor Ort"
           }
        },
        "no": {
           "icon": "no-drinking_water.svg",
           "text": {
             "en": "no drinking water available on site",
             "de": "Kein Trinkwasser vor Ort"
           }
        }
    },    
    "power_supply": {
        "yes": {
           "icon": "power_supply.svg",
           "text": {
             "en": "electrical power supply available",
             "de": "Stromanschluss vorhanden"
           }
        },
        "no": {
           "icon": "no-power_supply.svg",
           "text": {
             "en": "no electrical power supply available",
             "de": "Kein Stromanschluss vorhanden"
           }
        }
    },
    "sanitary_dump_station": {
        "yes": {
           "icon": "sanitary_dump_station.svg",
           "text": {
             "en": "sanitary dump station available",
             "de": "Sanitäre Entsorgungsstation verfügbar"
           }
        }
    },
    "shop": {
        "yes": {
           "icon": "shop.svg",
           "text": {
             "en": "shop on site",
             "de": "Einkaufsmöglichkeit vor Ort"
           }
        }
    },
    "laundry": {
        "yes": {
           "icon": "laundry.svg",
           "text": {
             "en": "laundry or washing machine on site",
             "de": "Wäscherei oder Waschmaschine vorhanden"
           }
        }
    },
    "washing_machine": {
        "yes": {
           "icon": "laundry.svg",
           "text": {
             "en": "laundry or washing machine on site",
             "de": "Wäscherei oder Waschmaschine vorhanden"
           }
        }
    },
    "pub": {
        "yes": {
           "icon": "pub.svg",
           "text": {
             "en": "pub on site",
             "de": "Gaststätte vor Ort"
           }
        }
    },
    "bar": {
        "yes": {
           "icon": "bar.svg",
           "text": {
             "en": "bar on site",
             "de": "Bar vor Ort"
           }
        }
    },
    "restaurant": {
        "yes": {
           "icon": "restaurant.svg",
           "text": {
             "en": "restaurant on site",
             "de": "Restaurant vor Ort"
           }
        }
    },
    "fast_food": {
        "yes": {
           "icon": "fast_food.svg",
           "text": {
             "en": "fast food restaurant on site",
             "de": "Schnellimbiss vor Ort"
           }
        }
    },
    "telephone": {
        "yes": {
           "icon": "telephone.svg",
           "text": {
             "en": "public telephone on site",
             "de": "Öffentl. Fernsprecher vor Ort"
           }
        }
    },
    "post_box": {
        "yes": {
           "icon": "post_box.svg",
           "text": {
             "en": "post box on site",
             "de": "Briefkasten vor Ort"
           }
        }
    },
    "playground": {
        "yes": {
           "icon": "playground.svg",
           "text": {
             "en": "playground on site",
             "de": "Spielplatz vor Ort"
           }
        }
    },
    "internet_access": {
        "yes": {
           "icon": "wifi.svg",
           "text": {
             "en": "internet access",
             "de": "Internetzugang"
           }
        },
        "wifi": {
           "icon": "wifi.svg",
           "text": {
             "en": "wifi internet access",
             "de": "Internetzugang per WLAN"
           }
        },
        "wlan": {
           "icon": "wifi.svg",
           "text": {
             "en": "wifi internet access",
             "de": "Internetzugang per WLAN"
           }
        }
    },
    "bbq": {
        "yes": {
           "icon": "bbq.svg",
           "text": {
             "en": "barbeque on site",
             "de": "Grill vor Ort"
           }
        }
    },
    "motor_vehicle": {
        "yes": {
           "icon": "motor_vehicle.svg",
           "text": {
             "en": "motor vehicles allowed on site",
             "de": "Zufahrt mit Kfz erlaubt"
           }
        },
        "no": {
           "icon": "no-motor_vehicle.svg",
           "text": {
             "en": "no motor vehicles allowed on site",
             "de": "Zufahrt mit Kfz verboten"
           }
        }
    },
    "openfire": {
        "yes": {
           "icon": "firepit.svg",
           "text": {
             "en": "open fire allowed",
             "de": "Offenes Feuer erlaubt"
           }
        },
        "no": {
           "icon": "no-firepit.svg",
           "text": {
             "en": "open fire prohibited",
             "de": "Offenes Feuer verboten"
           }
        }
    },
    "sauna": {
        "yes": {
           "icon": "sauna.svg",
           "text": {
             "en": "sauna on site",
             "de": "Sauna vor Ort"
           }
        }
    },
     // keep swimming pool as last item
    "swimming_pool": {
        "yes": {
           "icon": "swimming_pool.svg",
           "text": {
             "en": "swimming pool on site",
             "de": "Schwimmbecken vor Ort"
           }
        }
    }
};

var sport_facilities = {
    "swimming": {
        "icon": "swimming_pool.svg",
        "text": {
          "en": "swimming pool on site",
          "de": "Schwimmbecken vor Ort"
        }
    },
    "tennis": {
        "icon": "sport-tennis.svg",
        "text": {
          "en": "tennis court on site",
          "de": "Tennisplatz vor Ort"
        }
    },
    "soccer": {
        "icon": "sport-soccer.svg",
        "text": {
          "en": "soccer pitch on site",
          "de": "Fußballplatz vor Ort"
        }
    },
    "golf": {
        "icon": "sport-golf.svg",
        "text": {
          "en": "golf court on site",
          "de": "Golfplatz vor Ort"
        }
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
        fhtml += '<img src="cicons/'+kv[k].icon+'">&nbsp;'+kv[k]['text'][lang]+'<br />\n'
        icon = kv[k].icon;
      };
    };
  };
  // sport facilities
  for (var s in sport_facilities) {
    if (s != 'swimming') {
      fhtml += '<img src="cicons/'+sport_facilities[s].icon+'">&nbsp;'+sport_facilities[s]['text'][lang]+'<br />\n'
    };
  };
  fhtml += "</p>";
  return(fhtml);
};

