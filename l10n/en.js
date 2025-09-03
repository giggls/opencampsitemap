// a poor mans l10n :)

var l10n = {
  "hints": "Hints from mappers",
  "edit_in_josm": "Edit in JOSM",
  "edit_in_id": "Edit in iD",
  "unnamed_campsite": "Unnamed campsite",
  'nodeonly': "Site should be mapped as area instead of node.",
  "website": "Website",
  "operator": "Operator",
  "email": "Email",
  "phone": "Phone",
  "fax": "Fax",
  "mobile": "Mobile",
  "coords": "Coordinates",
  "address": "Address",
  "reservation_required": "Advance reservation required!",
  "no_reservation_required": "No reservation in advance!",
  "likely_untagged_features": "Likely missing features",
  "noname": "Object has no <b>name</b> tag.",
  "notoilet": "Tag <b>toilets</b> is missing",
  "noshower": "Tag <b>shower</b> is missing",
  "notents": "Tag <b>tents</b> is missing",
  "no_unavailable": "explicitely tag with <b>no</b> if unavailable",
  "tag_tents": "tag if tents are allowed/not allowed",
  "nocaravans": "tag <b>caravans</b> is missing",
  "tag_caravans": "tag if caravans are allowed/not allowed",
  "nocontact": "No contact information (website, phone, email) given",
  "no_bugs_found": ["No apparent bugs found!", "Site seems to be decently tagged."],
  "backcountry": "backcountry camp",
  "group_only": "group only camp",
  "nudist": "nudist campsite",
  "standard": "campsite",
  "camping": "tents only campsite",
  "caravan": "caravan site",
  "attribution": 'Map data &copy; OpenStreetMap contributors',
  "esri_attribution": 'Aerial images &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">ESRI World Imagery</a>',
  "mapstyle": "OSM (en)",
  "reception": "reception",
  "fire-extinguisher": "fire extinguisher",
  "power-supply": "power supply",
  "toilets": "toilets",
  "shower": "shower",
  "drinking_water": "drinking water",
  "sanitary_dump_station": "sanitary dump station",
  "sink": "kitchen sink",
  "kitchen": "kitchen",
  "capacity_persons": "capacity (persons)",
  "capacity_tents": "capacity (tents)",
  "capacity_caravans": "capacity (RV/caravans)",
  "capacity": 'The <b>capacity</b> tag is ambiguous. Use <b>capacity:caravans</b>, <b>capacity:tents</b> or <b>capacity:persons</b> instead.',
  "maxtents": 'The tag <b>maxtents</b> is deprecated. Use <b>capacity:tents</b> instead.',
  "invalidsiterel": 'More than one campsite object in relation',
  "uselesssiterel": 'Site-relation not needed',
  "site_inside": 'Site located inside other object tagged <b>tourism&nbsp;=&nbsp;camp_site</b>',
  "site_contains": 'Site contains other objects tagged <b>tourism&nbsp;=&nbsp;camp_site</b>',
  "add_review": 'Add review',
  "reviews": 'Reviews',
  "default_reviewer_name": 'Anonymous',
  "loading_reviews": 'Loading, please wait...',
  "no_reviews_yet": 'No reviews yet.',
  "powered_by": 'powered by',
  "enable_javascript": 'Please enable Javascript to view site on map!'
};

/* 

list and description of campsite facilities (sport and others)

this is used for building site info bars and map legend

*/

/* supported tags */
var facilities = {
  "tents": {
    "yes": {
      "icon": "tent.svg",
      "text": "tents allowed on site",
    },
    "no": {
      "icon": "no-tent.svg",
      "text": "no tents allowed on site",
    }
  },
  "caravans": {
    "yes": {
      "icon": "caravan.svg",
      "text": "caravans allowed on site",
    },
    "no": {
      "icon": "no-caravan.svg",
      "text": "no caravans allowed on site",
    }
  },
  "motorhome": {
    "yes": {
      "icon": "motorhome.svg",
      "text": "motorhome/RV allowed on site"
    },
    "no": {
      "icon": "no-motorhome.svg",
      "text": "no motorhome/RV allowed on site"
    }
  },
  "static_caravans": {
    "yes": {
      "icon": "static_caravans.svg",
      "text": "static caravans for rent",
    }
  },
  "cabins": {
    "yes": {
      "icon": "cabins.svg",
      "text": "cabins for rent",
    }
  },
  "permanent_camping": {
    "yes": {
      "icon": "permanent.svg",
      "text": "pitches for permanent residents available",
    },
    "only": {
      "icon": "permanent.svg",
      "text": "permanent residents only"
    }
  },
  "toilets": {
    "yes": {
      "icon": "toilet.svg",
      "text": "toilets on site",
    },
    "no": {
      "icon": "no-toilet.svg",
      "text": "no toilets on site",
    }
  },
  "shower": {
    "hot": {
      "icon": "shower-hot.svg",
      "text": "hot showers on site",
    },
    "cold": {
      "icon": "shower-cold.svg",
      "text": "only cold showers on site",
    },
    "yes": {
      "icon": "shower.svg",
      "text": "showers on site",
    },
    "no": {
      "icon": "no-shower.svg",
      "text": "no showers on site",
    }
  },
  "drinking_water": {
    "yes": {
      "icon": "drinking_water.svg",
      "text": "drinking water available on site",
    },
    "no": {
      "icon": "no-drinking_water.svg",
      "text": "no drinking water available on site",
    }
  },
  "power_supply": {
    "^(?!no).+$": {
      "icon": "power_supply.svg",
      "text": "electrical power supply available",
    },
    "no": {
      "icon": "no-power_supply.svg",
      "text": "no electrical power supply available",
    }
  },
  "sanitary_dump_station": {
    "^(?!no).+$": {
      "icon": "sanitary_dump_station.svg",
      "text": "sanitary dump station available",
    }
  },
  "shop": {
    "yes": {
      "icon": "shop.svg",
      "text": "shop on site",
    }
  },
  "laundry": {
    "yes": {
      "icon": "laundry.svg",
      "text": "laundry or washing machine on site",
    }
  },
  "washing_machine": {
    "yes": {
      "icon": "laundry.svg",
      "text": "laundry or washing machine on site",
    }
  },
  "pub": {
    "yes": {
      "icon": "pub.svg",
      "text": "pub on site",
    }
  },
  "bar": {
    "yes": {
      "icon": "bar.svg",
      "text": "bar on site",
    }
  },
  "restaurant": {
    "yes": {
      "icon": "restaurant.svg",
      "text": "restaurant on site",
    }
  },
  "fast_food": {
    "yes": {
      "icon": "fast_food.svg",
      "text": "fast food restaurant on site",
    }
  },
  "telephone": {
    "yes": {
      "icon": "telephone.svg",
      "text": "public telephone on site",
    }
  },
  "post_box": {
    "yes": {
      "icon": "post_box.svg",
      "text": "post box on site",
    }
  },
  "playground": {
    "yes": {
      "icon": "playground.svg",
      "text": "playground on site",
    }
  },
  "internet_access": {
    "yes": {
      "icon": "wifi.svg",
      "text": "internet access",
    },
    "no": {
      "icon": "no-wifi.svg",
      "text": "no internet access",
    },
    "wifi": {
      "icon": "wifi.svg",
      "text": "wifi internet access",
    },
    "wlan": {
      "icon": "wifi.svg",
      "text": "wifi internet access",
    }
  },
  "bbq": {
    "yes": {
      "icon": "bbq.svg",
      "text": "barbeque on site",
    }
  },
  "picnic_table": {
    "yes": {
      "icon": "picnic_table.svg",
      "text": "picnic table(s) available",
    }
  },
  "kitchen": {
    "yes": {
      "icon": "kitchen.svg",
      "text": "public kitchen available",
    }
  },
  "fridge": {
    "yes": {
      "icon": "fridge.svg",
      "text": "public fridge available",
    }
  },
  "sink": {
    "yes": {
      "icon": "sink.svg",
      "text": "kitchen sink available",
    }
  },
  "dog": {
    "yes": {
      "icon": "dog.svg",
      "text": "Dogs are allowed"
    },
    "no": {
      "icon": "no-dog.svg",
      "text": "Dogs are not allowed"
    },
    "leashed": {
      "icon": "dog-leashed.svg",
      "text": "Dogs on leash only"
    }
  },
  "motor_vehicle": {
    "yes": {
      "icon": "motor_vehicle.svg",
      "text": "motor vehicles allowed on site",
    },
    "no": {
      "icon": "no-motor_vehicle.svg",
      "text": "no motor vehicles allowed on site",
    }
  },
  "openfire": {
    "yes": {
      "icon": "firepit.svg",
      "text": "open fire allowed",
    },
    "no": {
      "icon": "no-firepit.svg",
      "text": "open fire prohibited",
    }
  },
  "sauna": {
    "yes": {
      "icon": "sauna.svg",
      "text": "sauna",
    }
  },
  "miniature_golf": {
    "yes": {
      "icon": "miniature_golf.svg",
      "text": "miniature golf course"
    }
  },
  "swimming_pool": {
    "yes": {
      "icon": "swimming_pool.svg",
      "text": "swimming pool"
    }
  },
  "golf_course": {
    "yes": {
      "icon": "sport-golf.svg",
      "text": "golf course"
    }
  },
  "fee": {
    "^(?!no).+$": {
      "icon": "fee.svg",
      "text": "There is a fee for usage"
    },
    "no": {
      "icon": "nofee.svg",
      "text": "Usage free of charge"
    }
  }
};

var camp_pitches = {
  "generic": {
    "icon": "../feature-icons/pitch-green.svg",
    "text": "generic camping pitch"
  },
  "permanent": {
    "icon": "../feature-icons/pitch-blue.svg",
    "text": "pitch for permanent residents"
  },
  "tents": {
    "icon": "../feature-icons/pitch-red.svg",
    "text": "camping pitch for tents"
  }
}

var sport_facilities = {
  "swimming": {
    "icon": "swimming_pool.svg",
    "text": "swimming pool",
  },
  "golf": {
    "icon": "sport-golf.svg",
    "text": "golf court",
  },
  "tennis": {
    "icon": "sport-tennis.svg",
    "text": "tennis court",
  },
  "soccer": {
    "icon": "sport-soccer.svg",
    "text": "soccer pitch",
  },
  "archery": {
    "icon": "sport-archery.svg",
    "text": "archery range"
  },
  "baseball": {
    "icon": "sport-baseball.svg",
    "text": "Baseballfeld verfügbar"
  },
  "basketball": {
    "icon": "sport-basketball.svg",
    "text": "basketball court"
  },
  "beachvolleyball": {
    "icon": "sport-beachvolleyball.svg",
    "text": "beach volleyball ground"
  },
  "equestrian": {
    "icon": "sport-equestrian.svg",
    "text": "riding arena"
  },
  "table_tennis": {
    "icon": "sport-table_tennis.svg",
    "text": "table tennis table"
  },
  "volleyball": {
    "icon": "sport-volleyball.svg",
    "text": "volleyball field"
  }
};

if (typeof window === 'undefined') {
  exports.facilities = facilities;
  exports.l10n = l10n;
  exports.sport_facilities = sport_facilities;
}
