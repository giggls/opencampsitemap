// a poor mans l10n :)

var l10n = {
  "hints": "Indicacions dels mapejadors",
  "edit_in_josm": "Edita a JOSM",
  "edit_in_id": "Edita a iD",
  "unnamed_campsite": "Zona d'acampada sense nom",
  "nodeonly": "El lloc s'ha de mapejar com a àrea en lloc de com a node.",
  "website": "Pàgina web",
  "operator": "Operador",
  "email": "Correu electrònic",
  "phone": "Telèfon",
  "fax": "Fax",
  "mobile": "Mòbil",
  "coords": "Coordenades",
  "address": "Adreça",
  "reservation_required": "Es requereix reserva prèvia!",
  "no_reservation_required": "No requereix reserva prèvia!",
  "likely_untagged_features": "Possibles característiques absents",
  "noname": "L'objecte no té l'etiqueta <b>name</b>.",
  "notoilet": "Falta l'etiqueta <b>toilets</b>",
  "noshower": "Falta l'etiqueta <b>shower</b>",
  "notents": "Falta l'etiqueta <b>tents</b>",
  "no_unavailable": "Etiqueta explicitament amb <b>no</b> si no està disponible",
  "tag_tents": "indica si es permeten tendes o no",
  "nocaravans": "Falta l'etiqueta <b>caravans</b>",
  "tag_caravans": "indica si es permeten caravanes o no",
  "nocontact": "Sense informació de contacte (lloc web, telèfon, email)",
  "no_bugs_found": ["Sembla que no s'han trobat errors!", "El lloc sembla estar correctament etiquetat."],
  "backcountry": "zona d'acampada remota",
  "group_only": "sols acampada en grup",
  "nudist": "càmping nudista",
  "standard": "zona d'acampada",
  "camping": "zona d'acampada exclusiva per a tendes",
  "caravan": "lloc de caravanes",
  "attribution": 'Dades del mapa &copy; OpenStreetMap contributors',
  "esri_attribution": 'Imatges aèries &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">ESRI World Imagery</a>',
  "mapstyle": "OSM (ca)",
  "reception": "recepció",
  "fire-extinguisher": "extintor",
  "power-supply": "presa de corrent",
  "toilets": "lavabos",
  "shower": "dutxes",
  "drinking_water": "aigua potable",
  "sanitary_dump_station": "estació de descàrrega sanitària",
  "sink": "pica de cuina",
  "kitchen": "cuina",
  "capacity_persons": "capacitat (persones)",
  "capacity_tents": "capacitat (tendes)",
  "capacity_caravans": "capacitat (caravanes)",
  "capacity": "L'etiqueta <b>capacity</b> és ambigua. En lloc seu, fes servir <b>capacity:caravans</b>, <b>capacity:tents</b> o <b>capacity:persons</b>.",
  "maxtents": "L'etiqueta <b>maxtents</b> està obsoleta. En lloc seu, fes servir <b>capacity:tents</b>.",
  "invalidsiterel": "Més d'un objecte càmping en la relació",
  "uselesssiterel": "Relació tipus Site innecessària",
  "site_inside": "Lloc ubicat dins d'un altre objecte etiquetat com a<b>tourism&nbsp;=&nbsp;camp_site</b>",
  "site_contains": "El lloc conté altres objectes etiquetats com a <b>tourism&nbsp;=&nbsp;camp_site</b>",
  "add_review": 'Afegeix una ressenya',
  "reviews": 'Ressenyes',
  "default_reviewer_name": 'Anònim',
  "loading_reviews": 'Càrregant, siusplau esperi...',
  "no_reviews_yet": 'Encara no hi ha ressenyes.',
  "powered_by": 'desenvolupat per',
  "enable_javascript": 'Siusplau habilita Javascript per a veure el mapa!'
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
      "text": "tendes permeses",
    },
    "no": {
      "icon": "no-tent.svg",
      "text": "no es permeten tendes",
    }
  },
  "caravans": {
    "yes": {
      "icon": "caravan.svg",
      "text": "caravanes permeses",
    },
    "no": {
      "icon": "no-caravan.svg",
      "text": "no es permeten caravanes",
    }
  },
  "motorhome": {
    "yes": {
      "icon": "motorhome.svg",
      "text": "autocaravanes permeses"
    },
    "no": {
      "icon": "no-motorhome.svg",
      "text": "no es permeten autocaravanes"
    }
  },
  "static_caravans": {
    "yes": {
      "icon": "static_caravans.svg",
      "text": "lloguer de caravanes fixes",
    }
  },
  "cabins": {
    "yes": {
      "icon": "cabins.svg",
      "text": "lloguer de cabanyes",
    }
  },
  "permanent_camping": {
    "yes": {
      "icon": "permanent.svg",
      "text": "parcel·les disponibles per a residents permanents",
    },
    "only": {
      "icon": "permanent.svg",
      "text": "sols residents permanents"
    }
  },
  "toilets": {
    "yes": {
      "icon": "toilet.svg",
      "text": "lloc amb lavabos",
    },
    "no": {
      "icon": "no-toilet.svg",
      "text": "lloc sense lavabos",
    }
  },
  "shower": {
    "yes": {
      "icon": "shower.svg",
      "text": "lloc amb dutxes",
    },
    "no": {
      "icon": "no-shower.svg",
      "text": "lloc sense dutxes",
    }
  },
  "drinking_water": {
    "yes": {
      "icon": "drinking_water.svg",
      "text": "lloc amb aigua potable",
    },
    "no": {
      "icon": "no-drinking_water.svg",
      "text": "lloc sense aigua potable",
    }
  },
  "power_supply": {
    "^(?!no).+$": {
      "icon": "power_supply.svg",
      "text": "preses de corrent disponibles",
    },
    "no": {
      "icon": "no-power_supply.svg",
      "text": "no disposa de preses de corrent",
    }
  },
  "sanitary_dump_station": {
    "^(?!no).+$": {
      "icon": "sanitary_dump_station.svg",
      "text": "estació de descàrrega sanitaria disponible",
    }
  },
  "shop": {
    "yes": {
      "icon": "shop.svg",
      "text": "botiga",
    }
  },
  "laundry": {
    "yes": {
      "icon": "laundry.svg",
      "text": "lloc amb bugaderia o rentadora",
    }
  },
  "washing_machine": {
    "yes": {
      "icon": "laundry.svg",
      "text": "lloc amb bugaderia o rentadora",
    }
  },
  "pub": {
    "yes": {
      "icon": "pub.svg",
      "text": "lloc amb bar",
    }
  },
  "bar": {
    "yes": {
      "icon": "bar.svg",
      "text": "lloc amb pub",
    }
  },
  "restaurant": {
    "yes": {
      "icon": "restaurant.svg",
      "text": "lloc amb restaurant",
    }
  },
  "fast_food": {
    "yes": {
      "icon": "fast_food.svg",
      "text": "lloc amb restaurant de menjar ràpid",
    }
  },
  "telephone": {
    "yes": {
      "icon": "telephone.svg",
      "text": "lloc amb telèfon públic",
    }
  },
  "post_box": {
    "yes": {
      "icon": "post_box.svg",
      "text": "lloc amb bústia de correus",
    }
  },
  "playground": {
    "yes": {
      "icon": "playground.svg",
      "text": "Parc infantil disponible",
    }
  },
  "internet_access": {
    "yes": {
      "icon": "wifi.svg",
      "text": "accés a Internet",
    },
    "no": {
      "icon": "no-wifi.svg",
      "text": "sense accés a Internet",
    },
    "wifi": {
      "icon": "wifi.svg",
      "text": "accés a Internet wifi",
    },
    "wlan": {
      "icon": "wifi.svg",
      "text": "accés a Internet wifi",
    }
  },
  "bbq": {
    "yes": {
      "icon": "bbq.svg",
      "text": "zona de barbacoa disponible",
    }
  },
  "picnic_table": {
    "yes": {
      "icon": "picnic_table.svg",
      "text": "taula(es) de pícnic disponible(s)",
    }
  },
  "kitchen": {
    "yes": {
      "icon": "kitchen.svg",
      "text": "cuina pública disponible",
    }
  },
  "fridge": {
    "yes": {
      "icon": "fridge.svg",
      "text": "frigorífic públic disponible",
    }
  },
  "sink": {
    "yes": {
      "icon": "sink.svg",
      "text": "pica de cuina disponible",
    }
  },
  "dog": {
    "yes": {
      "icon": "dog.svg",
      "text": "Gossos permesos"
    },
    "no": {
      "icon": "no-dog.svg",
      "text": "Gossos no permesos"
    },
    "leashed": {
      "icon": "dog-leashed.svg",
      "text": "Només gossos amb corretja"
    }
  },
  "motor_vehicle": {
    "yes": {
      "icon": "motor_vehicle.svg",
      "text": "vehícles a motor permesos",
    },
    "no": {
      "icon": "no-motor_vehicle.svg",
      "text": "vehícles a motor no permesos",
    }
  },
  "openfire": {
    "yes": {
      "icon": "firepit.svg",
      "text": "foc a l'aire lliure permés",
    },
    "no": {
      "icon": "no-firepit.svg",
      "text": "prohibit fer foc a l'aire lliure",
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
      "text": "camp de mini-golf"
    }
  },
  "swimming_pool": {
    "yes": {
      "icon": "swimming_pool.svg",
      "text": "piscina"
    }
  },
  "golf_course": {
    "yes": {
      "icon": "sport-golf.svg",
      "text": "camp de golf"
    }
  },
  "fee": {
    "^(?!no).+$": {
      "icon": "fee.svg",
      "text": "El càmping és de pagament"
    },
    "no": {
      "icon": "nofee.svg",
      "text": "El càmping és gratuït"
    }
  }
};

var camp_pitches = {
  "generic": {
    "icon": "../feature-icons/pitch-green.svg",
    "text": "parcel·la d'acampada genèrica"
  },
  "permanent": {
    "icon": "../feature-icons/pitch-blue.svg",
      "text": "parcel·la per a residents permanents"
  },
  "tents": {
    "icon": "../feature-icons/pitch-red.svg",
    "text": "parcel·la d'acampada per a tendes"
  }
}

var sport_facilities = {
  "swimming": {
    "icon": "swimming_pool.svg",
    "text": "piscina",
  },
  "golf": {
    "icon": "sport-golf.svg",
    "text": "camp de golf",
  },
  "tennis": {
    "icon": "sport-tennis.svg",
    "text": "pista de tennis",
  },
  "soccer": {
    "icon": "sport-soccer.svg",
    "text": "camp de futbol",
  },
  "archery": {
    "icon": "sport-archery.svg",
    "text": "camp de tir amb arc"
  },
  "baseball": {
    "icon": "sport-baseball.svg",
    "text": "camp de beisbol"
  },
  "basketball": {
    "icon": "sport-basketball.svg",
    "text": "pista de bàsquet"
  },
  "beachvolleyball": {
    "icon": "sport-beachvolleyball.svg",
    "text": "camp de volei-platja"
  },
  "equestrian": {
    "icon": "sport-equestrian.svg",
    "text": "pista d'equitació"
  },
  "table_tennis": {
    "icon": "sport-table_tennis.svg",
    "text": "taula de tennis taula"
  },
  "volleyball": {
    "icon": "sport-volleyball.svg",
    "text": "camp de voleibol"
  }
};

if (typeof window === 'undefined') {
  exports.facilities = facilities;
  exports.l10n = l10n;
  exports.sport_facilities = sport_facilities;
}
