// a poor mans l10n :)

var l10n = {
  "hints": "Indications des mappers",
  "edit_in_josm": "Éditer avec JOSM",
  "edit_in_id": "Éditer avec iD",
  "unnamed_campsite": "Camping sans nom",
  'nodeonly': "Le site devrait être décrit par une surface plutôt qu'un simple nœud.",
  "website": "Site web",
  "operator": "Operateur",
  "email": "Courriel",
  "phone": "Téléphone",
  "fax": "Fax",
  "mobile": "Mobile",
  "coords": "Coordonnées",
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
  "no_bugs_found": ["Aucun signalement !", "Ce site semble correctement décrit."],
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
  "power-supply": "raccordement électrique",
  "toilets": "toilettes",
  "shower": "douche",
  "drinking_water": "eau potable",
  "sanitary_dump_station": "station de vidange sanitaire",
  "sink": "évier",
  "kitchen": "cuisine",
  "capacity_persons": "Nombre de visiteurs",
  "capacity_tents": "Nombre des tentes",
  "capacity_caravans": "Nombre des caravans",
  "capacity": 'Le tag <b>capicity</b> est ambigu. Utilisez plutôt <b>capacity:caravans</b>, <b>capacity:tents</b> ou <b>capacity:persons</b>.',
  "maxtents": 'Le tag <b>maxtents</b> est obsolète. Utilisez plutôt <b>capacity:tents</b>.',
  "invalidsiterel": 'Plusieurs objets dans la relation.',
  "uselesssiterel": 'Relation de site pas nécessaires.',
  "site_inside": 'Site inclu dans un autre objet marqué <b>tourism&nbsp;=&nbsp;camp_site</b>',
  "site_contains": "Site contient d'autres objets marqués <b>tourism&nbsp;=&nbsp;camp_site</b>",
  "add_review": 'Ajouter un avis',
  "reviews": 'avis',
  "default_reviewer_name": 'Anonyme',
  "loading_reviews": 'Chargement, veuillez patienter...',
  "no_reviews_yet": "Pas encore d'avis.",
  "powered_by": 'propulsé par',
  "enable_javascript": "Merci d'activer Javascript pour voir les sites sur la carte !"
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
  "motorhome": {
    "yes": {
      "icon": "motorhome.svg",
      "text": "camping-car autorisées"
    },
    "no": {
      "icon": "no-motorhome.svg",
      "text": "camping-car non autorisées"
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
      "text": "seulement emplacements pour résidents permanents"
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
    "hot": {
      "icon": "shower-hot.svg",
      "text": "douches chaudes sur place"
    },
    "cold": {
      "icon": "shower-cold.svg",
      "text": "selement douches froides sur place"
    },
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
    "no": {
      "icon": "no-wifi.svg",
      "text": "pas d'accès internet",
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
  "picnic_table": {
    "yes": {
      "icon": "picnic_table.svg",
      "text": "table(s) de picnic disponibles",
    }
  },
  "kitchen": {
    "yes": {
      "icon": "kitchen.svg",
      "text": "cuisine commune disponible",
    }
  },
  "fridge": {
    "yes": {
      "icon": "fridge.svg",
      "text": "réfrigérateur commun disponible",
    }
  },
  "sink": {
    "yes": {
      "icon": "sink.svg",
      "text": "évier disponible",
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
  },
  "fee": {
    "^(?!no).+$": {
      "icon": "fee.svg",
      "text": "camping est payante"
    },
    "no": {
      "icon": "nofee.svg",
      "text": "camping est gratuite"
    }
  }
};

var camp_pitches = {
  "generic": {
    "icon": "../feature-icons/pitch-green.svg",
    "text": "emplacement générique"
  },
  "permanent": {
    "icon": "../feature-icons/pitch-blue.svg",
    "text": "emplacement pour résidents permanents"
  },
  "tents": {
    "icon": "../feature-icons/pitch-red.svg",
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

if (typeof window === 'undefined') {
  exports.facilities = facilities;
  exports.l10n = l10n;
  exports.sport_facilities = sport_facilities;
}
