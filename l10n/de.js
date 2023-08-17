// a poor mans l10n :)

var l10n = {
  "hints": "Hinweise von Mappern",
  "edit_in_josm": "In JOSM editieren",
  "edit_in_id": "In iD editieren",
  "unnamed_campsite": "Unbenannter Campingplatz",
  'nodeonly': "Platz sollte als Fläche kartiert werden, nicht als Punkt.",
  "website": "Webseite",
  "operator": "Betreiber",
  "email": "E-Mail",
  "phone": "Telefon",
  "fax": "Fax",
  "mobile": "Mobil",
  "coords": "Koordinaten",
  "address": "Adresse",
  "reservation_required": "Vorreservierung erforderlich!",
  "no_reservation_required": "Vorreservierung nicht möglich!",
  "likely_untagged_features": "Wahrscheinlich fehlende Eigenschaften",
  "noname": "Objekt besitzt kein <b>name</b> tag..",
  "notoilet": "Tag <b>toilets</b> fehlt",
  "noshower": "Tag <b>shower</b> fehlt",
  "notents": "Tag <b>tents</b> fehlt",
  "no_unavailable": "mit <b>no</b> taggen wenn nicht vorhanden",
  "tag_tents": "sind Zelte erlaubt oder nicht?",
  "nocaravans": "Tag <b>caravans</b> fehlt",
  "tag_caravans": "sind Wohnwagen erlaubt oder nicht?",
  "nocontact": "Kontaktinformationen (Webseite, Telefonnummer, E-Mail) fehlen",
  "no_bugs_found": ["Keine offensichtlichen Fehler gefunden!", "Platz scheint ordentlich erfasst zu sein."],
  "backcountry": "Wildnis-Zeltplatz",
  "group_only": "Gruppen-Zeltplatz",
  "nudist": "FKK Campingplatz",
  "standard": "Campingplatz",
  "camping": "Zeltplatz",
  "caravan": "Wohnmobilabstellpl.",
  "attribution": 'Kartendaten &copy; OpenStreetMap Mitwirkende',
  "esri_attribution": 'Luftbilder &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">ESRI World Imagery</a>',
  "mapstyle": "OSM (de)",
  "reception": "Rezeption",
  "fire-extinguisher": "Feuerlöscher",
  "power-supply": "Stromanschluß",
  "toilets": "Toiletten",
  "shower": "Dusche",
  "drinking_water": "Trinkwasser",
  "sanitary_dump_station": "Sanitäre Entsorgungsstation",
  "sink": "Spühlbecken",
  "kitchen": "Küche",
  "capacity_persons": "Kapazität (Personen)",
  "capacity_tents": "Kapazität (Zelte)",
  "capacity_caravans": "Kapazität (Wohnwagen/Wohnmobile)",
  "capacity": 'Der Tag <b>capacity</b> ist mehrdeutig. Stattdessen sollte <b>capacity:caravans</b>, <b>capacity:tents</b> oder <b>capacity:persons</b> verwendet werden.',
  "maxtents": 'Der Tag <b>maxtents</b> is veraltet. Stattdessen sollte <b>capacity:tents</b> verwendet werden.',
  "invalidsiterel": 'Mehr als ein Campingplatz-Objekt in Site-Relation',
  "uselesssiterel": 'Nicht benötigte Site-Relation',
  "site_inside": 'Platz liegt innerhalb eines Objekts, das mit <b>tourism&nbsp;=&nbsp;camp_site</b> getaggt wurde',
  "site_contains": 'Platz enthält weitere Objekte, die mit <b>tourism&nbsp;=&nbsp;camp_site</b> getaggt wurden',
  "add_review": 'Bewertung hinzufügen',
  "reviews": 'Bewertungen',
  "default_reviewer_name": 'Anonym',
  "loading_reviews": 'Laden, bitte warten...',
  "no_reviews_yet": 'Noch keine Bewertungen vorhanden.',
  "powered_by": 'unterstützt durch',
  "enable_javascript": 'Bitte Javascript einschalten um Platz auf der Karte anzuzeigen!'
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
      "text": "Zelte erlaubt"
    },
    "no": {
      "icon": "no-tent.svg",
      "text": "Zelte verboten"
    }
  },
  "caravans": {
    "yes": {
      "icon": "caravan.svg",
      "text": "Wohnwagen erlaubt"
    },
    "no": {
      "icon": "no-caravan.svg",
      "text": "Wohnwagen verboten"
    }
  },
  "motorhome": {
    "yes": {
      "icon": "motorhome.svg",
      "text": "Wohnmobile erlaubt"
    },
    "no": {
      "icon": "no-motorhome.svg",
      "text": "Wohnmobile verboten"
    }
  },  
  "static_caravans": {
    "yes": {
      "icon": "static_caravans.svg",
      "text": "Vermietung ortsfester Wohnwagen"
    }
  },
  "cabins": {
    "yes": {
      "icon": "cabins.svg",
      "text": "Vermietung von Hütten"
    }
  },
  "permanent_camping": {
    "yes": {
      "icon": "permanent.svg",
      "text": "Stellplätze für Dauercamper vorhanden"
    },
    "only": {
      "icon": "permanent.svg",
      "text": "Nur Stellplätze für Dauercamper"
    }
  },
  "toilets": {
    "yes": {
      "icon": "toilet.svg",
      "text": "Toiletten vorhanden"
    },
    "no": {
      "icon": "no-toilet.svg",
      "text": "Keine Toiletten vorhanden"
    }
  },
  "shower": {
    "yes": {
      "icon": "shower.svg",
      "text": "Duschen vorhanden"
    },
    "no": {
      "icon": "no-shower.svg",
      "text": "Keine Duschen vorhanden"
    }
  },
  "drinking_water": {
    "yes": {
      "icon": "drinking_water.svg",
      "text": "Trinkwasser vor Ort"
    },
    "no": {
      "icon": "no-drinking_water.svg",
      "text": "Kein Trinkwasser vor Ort"
    }
  },
  "power_supply": {
    "^(?!no).+$": {
      "icon": "power_supply.svg",
      "text": "Stromanschluss vorhanden"
    },
    "no": {
      "icon": "no-power_supply.svg",
      "text": "Kein Stromanschluss vorhanden"
    }
  },
  "sanitary_dump_station": {
    "^(?!no).+$": {
      "icon": "sanitary_dump_station.svg",
      "text": "Sanitäre Entsorgungsstation verfügbar"
    }
  },
  "shop": {
    "yes": {
      "icon": "shop.svg",
      "text": "Einkaufsmöglichkeit vor Ort"
    }
  },
  "laundry": {
    "yes": {
      "icon": "laundry.svg",
      "text": "Wäscherei oder Waschmaschine vorhanden"
    }
  },
  "washing_machine": {
    "yes": {
      "icon": "laundry.svg",
      "text": "Wäscherei oder Waschmaschine vorhanden"
    }
  },
  "pub": {
    "yes": {
      "icon": "pub.svg",
      "text": "Gaststätte vor Ort"
    }
  },
  "bar": {
    "yes": {
      "icon": "bar.svg",
      "text": "Bar vor Ort"
    }
  },
  "restaurant": {
    "yes": {
      "icon": "restaurant.svg",
      "text": "Restaurant vor Ort"
    }
  },
  "fast_food": {
    "yes": {
      "icon": "fast_food.svg",
      "text": "Schnellimbiss vor Ort"
    }
  },
  "telephone": {
    "yes": {
      "icon": "telephone.svg",
      "text": "Öffentl. Fernsprecher vor Ort"
    }
  },
  "post_box": {
    "yes": {
      "icon": "post_box.svg",
      "text": "Briefkasten vor Ort"
    }
  },
  "playground": {
    "yes": {
      "icon": "playground.svg",
      "text": "Spielplatz vor Ort"
    }
  },
  "internet_access": {
    "yes": {
      "icon": "wifi.svg",
      "text": "Internetzugang"
    },
    "no": {
      "icon": "no-wifi.svg",
      "text": "Kein Internetzugang"
    },
    "wifi": {
      "icon": "wifi.svg",
      "text": "Internetzugang per WLAN"
    },
    "wlan": {
      "icon": "wifi.svg",
      "text": "Internetzugang per WLAN"
    }
  },
  "bbq": {
    "yes": {
      "icon": "bbq.svg",
      "text": "Grill vor Ort"
    }
  },
  "picnic_table": {
    "yes": {
      "icon": "picnic_table.svg",
      "text": "Sitztisch verfügbar",
    }
  },
  "kitchen": {
    "yes": {
      "icon": "kitchen.svg",
      "text": "Küche verfügbar",
    }
  },
  "fridge": {
    "yes": {
      "icon": "fridge.svg",
      "text": "Kühlschrank verfügbar",
    }
  },
  "sink": {
    "yes": {
      "icon": "sink.svg",
      "text": "Spüle verfügbar",
    }
  },
  "dog": {
    "yes": {
      "icon": "dog.svg",
      "text": "Hunde erlaubt"
    },
    "no": {
      "icon": "no-dog.svg",
      "text": "Hunde verboten"
    },
    "leashed": {
      "icon": "dog-leashed.svg",
      "text": "Hunde nur angeleint"
    }
  },
  "motor_vehicle": {
    "yes": {
      "icon": "motor_vehicle.svg",
      "text": "Zufahrt mit Kfz erlaubt"
    },
    "no": {
      "icon": "no-motor_vehicle.svg",
      "text": "Zufahrt mit Kfz verboten"
    }
  },
  "openfire": {
    "yes": {
      "icon": "firepit.svg",
      "text": "Offenes Feuer erlaubt"
    },
    "no": {
      "icon": "no-firepit.svg",
      "text": "Offenes Feuer verboten"
    }
  },
  "sauna": {
    "yes": {
      "icon": "sauna.svg",
      "text": "Sauna"
    }
  },
  "miniature_golf": {
    "yes": {
      "icon": "miniature_golf.svg",
      "text": "Minigolf Anlage"
    }
  },
  "swimming_pool": {
    "yes": {
      "icon": "swimming_pool.svg",
      "text": "Schwimmbecken"
    }
  },
  "golf_course": {
    "yes": {
      "icon": "sport-golf.svg",
      "text": "Golfplatz"
    }
  }
};

var camp_pitches = {
  "generic": {
    "icon": "feature-icons/pitch-green.svg",
    "text": "Gewöhnlicher Stellplatz"
  },
  "permanent": {
    "icon": "feature-icons/pitch-blue.svg",
    "text": "Stellplatz für Dauercamper"
  },
  "tents": {
    "icon": "feature-icons/pitch-red.svg",
    "text": "Stellplatz für Zelte"
  }
}

var sport_facilities = {
  "swimming": {
    "icon": "swimming_pool.svg",
    "text": "Schwimmbecken"
  },
  "golf": {
    "icon": "sport-golf.svg",
    "text": "Golfplatz"
  },
  "tennis": {
    "icon": "sport-tennis.svg",
    "text": "Tennisplatz"
  },
  "soccer": {
    "icon": "sport-soccer.svg",
    "text": "Fußballplatz"
  },
  "archery": {
    "icon": "sport-archery.svg",
    "text": "Bogensport Anlage"
  },
  "baseball": {
    "icon": "sport-baseball.svg",
    "text": "Baseballfeld"
  },
  "basketball": {
    "icon": "sport-basketball.svg",
    "text": "Basketballfeld"
  },
  "beachvolleyball": {
    "icon": "sport-beachvolleyball.svg",
    "text": "Beachvolleyballfeld"
  },
  "equestrian": {
    "icon": "sport-equestrian.svg",
    "text": "Reitsportanlage"
  },
  "table_tennis": {
    "icon": "sport-table_tennis.svg",
    "text": "Tischtennisplatte"
  },
  "volleyball": {
    "icon": "sport-volleyball.svg",
    "text": "Volleyballfeld"
  }
};

if (typeof window === 'undefined') {
  exports.facilities = facilities;
  exports.l10n = l10n;
  exports.sport_facilities = sport_facilities;
}
