// a poor mans l10n :)

var l10n = {
   "hints": "Indications des mappers",
   "edit_in_josm":  "Éditer avec JOSM",
   "edit_in_id": "Éditer avec iD",
   "unnamed_campsite": "Camping sans nom",
   'nodeonly': "Le site devrait être décrit par une surface plutôt qu'un simple nœud.",
   "website": "Site web",
   "operator": "Operateur",
   "email": "Courriel",
   "phone": "Téléphone",
   "fax": "Fax",
   "capacity": "Capacité",
   "address": "Adresse",
   "reservation_required": "Réservation obligatoire !",
   "no_reservation_required": "Pas de réservation obligatoire !",
   "likely_untagged_features": "Informations vraisemblablement manquantes",
   "noname": "L'attribut <b>name</b> est absent.",
   "notoilet": "L'attribut <b>toilets</b> est absent",
   "noshower": "L'attribut <b>shower</b> est absent",
   "notents": "L'attribut <b>tents</b> est absent",
   "no_unavailable": "utiliser explicitement l'attribut <b>no</b> si non disponible",
   "tag_tents": "indiquer si les tentes sont autorisées ou non",
   "nocaravans": "l'attribut <b>caravans</b> est absent",
   "tag_caravans": "indiquer si les caravanes sont autorisées ou non",
   "nocontact": "Pas d'informations de contact (site web, téléphone, courriel)",
   "no_bugs_found": ["Aucun signalement !","Ce site semble correctement décrit."],
   "backcountry": "camping sauvage",
   "group_only": "camping pour groupes uniquement",
   "nudist": "camping nudiste",
   "standard": "camping",
   "camping": "tentes uniquement",
   "caravan": "caravanes",
   "attribution": 'Données &copy; contributeurs OpenStreetMap',
   "esri_attribution": 'Imagerie aérienne &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">ESRI World Imagery</a>',
   "mapstyle": "OSM (fr)",
   "reception": "réception",
   "fire-extinguisher": "extincteur",
   "power-supply": "raccordement électrique"
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
           "text": "tentes autorisées",
         },
        "no": {
           "icon": "no-tent.svg",
           "text": "tentes non autorisées",
         }
    },
    "caravans": {
        "yes": {
           "icon": "caravan.svg",
           "text": "caravanes autorisées",
         },
        "no": {
           "icon": "no-caravan.svg",
           "text": "caravanes non autorisées",
         }
    },
    "static_caravans": {
        "yes": {
           "icon": "static_caravans.svg",
           "text": "caravanes à demeure disponibles à la location",
         }
    },
    "cabins": {
        "yes": {
           "icon": "cabins.svg",
           "text": "bungalows disponibles à la location",
         }
    },
    "permanent_camping": {
        "yes": {
           "icon": "permanent.svg",
           "text": "emplacements pour résidents permanents disponibles",
         },
         "only": {
           "icon": "permanent.svg",
           "text": "seulmont emplacements pour résidents permanents"
         }
    },
    "toilets": {
        "yes": {
           "icon": "toilet.svg",
           "text": "toilettes sur place",
         },
        "no": {
           "icon": "no-toilet.svg",
           "text": "pas de toilettes",
         }
    },
    "shower": {
        "yes": {
           "icon": "shower.svg",
           "text": "douches sur place",
         },
        "no": {
           "icon": "no-shower.svg",
           "text": "pas de douches",
         }
    },
    "drinking_water": {
        "yes": {
           "icon": "drinking_water.svg",
           "text": "eau potable sur place",
         },
        "no": {
           "icon": "no-drinking_water.svg",
           "text": "pas d'eau potable",
         }
    },
    "power_supply": {
        "^(?!no).+$": {
           "icon": "power_supply.svg",
           "text": "alimentation électrique sur place",
         },
        "no": {
           "icon": "no-power_supply.svg",
           "text": "pas d'alimentation électrique",
         }
    },
    "sanitary_dump_station": {
        "^(?!no).+$": {
           "icon": "sanitary_dump_station.svg",
           "text": "station de vidange sanitaire sur place",
         }
    },
    "shop": {
        "yes": {
           "icon": "shop.svg",
           "text": "magasin sur place",
         }
    },
    "laundry": {
        "yes": {
           "icon": "laundry.svg",
           "text": "laverie ou machine à laver sur place",
         }
    },
    "washing_machine": {
        "yes": {
           "icon": "laundry.svg",
           "text": "laverie ou machine à laver sur place",
         }
    },
    "pub": {
        "yes": {
           "icon": "pub.svg",
           "text": "bar sur place",
         }
    },
    "bar": {
        "yes": {
           "icon": "bar.svg",
           "text": "café sur place",
         }
    },
    "restaurant": {
        "yes": {
           "icon": "restaurant.svg",
           "text": "restaurant sur place",
         }
    },
    "fast_food": {
        "yes": {
           "icon": "fast_food.svg",
           "text": "restauration rapide sur place",
         }
    },
    "telephone": {
        "yes": {
           "icon": "telephone.svg",
           "text": "téléphone public sur place",
         }
    },
    "post_box": {
        "yes": {
           "icon": "post_box.svg",
           "text": "boîte aux lettres sur place",
         }
    },
    "playground": {
        "yes": {
           "icon": "playground.svg",
           "text": "aire de jeux sur place",
         }
    },
    "internet_access": {
        "yes": {
           "icon": "wifi.svg",
           "text": "accès internet",
         },
        "wifi": {
           "icon": "wifi.svg",
           "text": "accès wifi",
         },
        "wlan": {
           "icon": "wifi.svg",
           "text": "accès wifi",
         }
    },
    "bbq": {
        "yes": {
           "icon": "bbq.svg",
           "text": "barbecue sur place",
         }
    },
    "dog": {
        "yes": {
           "icon": "dog.svg",
           "text": "Chiens permis"
         },
        "no": {
           "icon": "no-dog.svg",
           "text": "Chiens interdits"
         },
        "leashed": {
           "icon": "dog-leashed.svg",
           "text": "Chiens permis en laisse"
         }
    },
    "motor_vehicle": {
        "yes": {
           "icon": "motor_vehicle.svg",
           "text": "véhicules à moteur autorisés",
         },
        "no": {
           "icon": "no-motor_vehicle.svg",
           "text": "véhicules à moteur interdits sur le site",
         }
    },
    "openfire": {
        "yes": {
           "icon": "firepit.svg",
           "text": "feu autorisé en plein air",
         },
        "no": {
           "icon": "no-firepit.svg",
           "text": "feu interdit en plein air",
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
           "text": "terrain de mini-golf"
         }
    },
    "swimming_pool": {
        "yes": {
           "icon": "swimming_pool.svg",
           "text": "piscine"
         }
    },
    "golf_course": {
        "yes": {
           "icon": "sport-golf.svg",
           "text": "terrain de golf"
         }
    }
};

var camp_pitches = {
  "generic": {
        "icon": "feature-icons/pitch-green.svg",
        "text": "emplacement généralement"
  },
  "permanent": {
        "icon": "feature-icons/pitch-blue.svg",
        "text": "emplacement pour résidents permanents"
  },
 "tents": {
        "icon": "feature-icons/pitch-red.svg",
        "text": "emplacement pour tentes"
  }
}

var sport_facilities = {
    "swimming": {
        "icon": "swimming_pool.svg",
        "text": "piscine",
    },
    "golf": {
        "icon": "sport-golf.svg",
        "text": "terrain de golf",
    },
    "tennis": {
        "icon": "sport-tennis.svg",
        "text": "court de tennis",
    },
    "soccer": {
        "icon": "sport-soccer.svg",
        "text": "terrain de foot",
    },
    "archery": {
        "icon": "sport-archery.svg",
        "text": "stand de tir à l'arc"
    },
    "baseball": {
        "icon": "sport-baseball.svg",
        "text": "terrain de baseball"
    },
    "basketball": {
        "icon": "sport-basketball.svg",
        "text": "terrain de basket"
    },
    "beachvolleyball": {
        "icon": "sport-beachvolleyball.svg",
        "text": "terrain de beach-volley"
    },
    "equestrian": {
        "icon": "sport-equestrian.svg",
        "text": "installation équestre"
    },
    "table_tennis": {
        "icon": "sport-table_tennis.svg",
        "text": "table de ping-pong"
    },
    "volleyball": {
        "icon": "sport-volleyball.svg",
        "text": "terrain de volleyball"
    }
};

