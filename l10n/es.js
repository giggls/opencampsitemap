// a poor mans l10n :)

var l10n = {
    "hints": "Indicaciones de los mapeadores",
    "edit_in_josm":  "Editar en JOSM",
    "edit_in_id": "Editar en iD",
    "unnamed_campsite": "Camping sin nombre",
    "nodeonly": "El sitio debe mapearse como área en vez de nodo.",
    "website": "Sitio web",
    "operator": "Operador",
    "email": "Correo Electrónico",
    "phone": "Teléfono",
    "fax": "Fax",
    "address": "Dirección",
    "reservation_required": "Se requiere reserva previa",
    "no_reservation_required": "Sin reserva previa",
    "likely_untagged_features": "Posible ausencia de características",
    "noname": "La etiqueta <b>name</b> no existe",
    "notoilet": "La etiqueta <b>toilets</b> no existe",
    "noshower": "La etiqueta <b>shower</b> no existe",
    "notents": "La etiqueta <b>tents</b> no existe",
    "no_unavailable": "Usa explícitamente el atributo <b>no</b> si no está disponible",
    "tag_tents": "Indica si las tiendas están permitidas o no",
    "nocaravans": "La etiqueta <b>caravans</b> no existe",
    "tag_caravans": "Indica si las caravanas están permitidas o no",
    "nocontact": "Sin información de contacto (sitio web, teléfono, correo electrónico)",
    "no_bugs_found": ["Parece que no se encontraron errores!","El sitio parece estar etiquetado correctamente."],
    "backcountry": "acampada libre",
    "group_only": "solo acampada para grupos",
    "nudist": "camping nudista",
    "standard": "camping",
    "camping": "camping de solo tiendas",
    "caravan": "lugar de caravanas",
    "attribution": 'Datos del mapa &copy; colaboradores de OpenStreetMap',
    "esri_attribution": 'Imágenes aéreas &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">ESRI World Imagery</a>',
    "mapstyle": "OSM (es)",
    "reception": "recepción",
    "fire-extinguisher": "extintor",
    "power-supply": "toma de corriente",
    "capacity_persons": "número de personas",
    "capacity_tents": "número de tiendas de campaña",
    "capacity_caravans": "número de caravanas",
    "capacity": 'La etiqueta <b>capacity</b> es ambigua. Usa <b>capacity:caravans</b>, <b>capacity:tents</b> or <b>capacity:persons</b> preferiblemente.',
    "maxtents": 'La etiqueta <b>maxtents</b> está obsoleta. Usa <b>capacity:tents</b> preferiblemente.',
    "invalidsiterel": 'Más de un objeto camping en la relación',
    "uselesssiterel": 'Relación tipo Site innecesaria'
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
           "text": "tiendas permitidas",
         },
        "no": {
           "icon": "no-tent.svg",
           "text": "no se permiten tiendas",
         }
    },
    "caravans": {
        "yes": {
           "icon": "caravan.svg",
           "text": "caravanas permitidas",
         },
        "no": {
           "icon": "no-caravan.svg",
           "text": "no se permiten caravanas",
         }
    },
    "static_caravans": {
        "yes": {
           "icon": "static_caravans.svg",
           "text": "alquiler de caravanas fijas",
         }
    },
    "cabins": {
        "yes": {
           "icon": "cabins.svg",
           "text": "alquiler de cabañas",
         }
    },
    "permanent_camping": {
        "yes": {
           "icon": "permanent.svg",
           "text": "parcelas disponibles para residentes permanentes",
         },
         "only": {
           "icon": "permanent.svg",
           "text": "solo residentes permanentes"
         }
    },
    "toilets": {
        "yes": {
           "icon": "toilet.svg",
           "text": "sitio con baños",
         },
        "no": {
           "icon": "no-toilet.svg",
           "text": "sitio sin baños",
         }
    },
    "shower": {
        "yes": {
           "icon": "shower.svg",
           "text": "sitio con duchas",
         },
        "no": {
           "icon": "no-shower.svg",
           "text": "sitio sin duchas",
         }
    },
    "drinking_water": {
        "yes": {
           "icon": "drinking_water.svg",
           "text": "sitio con agua potable",
         },
        "no": {
           "icon": "no-drinking_water.svg",
           "text": "sitio sin agua potable",
         }
    },
    "power_supply": {
        "^(?!no).+$": {
           "icon": "power_supply.svg",
           "text": "fuente de alimentación eléctrica disponible",
         },
        "no": {
           "icon": "no-power_supply.svg",
           "text": "sin fuente de alimentación eléctrica",
         }
    },
    "sanitary_dump_station": {
        "^(?!no).+$": {
           "icon": "sanitary_dump_station.svg",
           "text": "sitio con estación de descarga sanitaria (váter químico)",
         }
    },
    "shop": {
        "yes": {
           "icon": "shop.svg",
           "text": "tienda",
         }
    },
    "laundry": {
        "yes": {
           "icon": "laundry.svg",
           "text": "lavandería o lavadora en el sitio",
         }
    },
    "washing_machine": {
        "yes": {
           "icon": "laundry.svg",
           "text": "lavandería o lavadora en el sitio",
         }
    },
    "pub": {
        "yes": {
           "icon": "pub.svg",
           "text": "sitio con pub",
         }
    },
    "bar": {
        "yes": {
           "icon": "bar.svg",
           "text": "sitio con bar",
         }
    },
    "restaurant": {
        "yes": {
           "icon": "restaurant.svg",
           "text": "restaurante",
         }
    },
    "fast_food": {
        "yes": {
           "icon": "fast_food.svg",
           "text": "restaurante de comida rápida",
         }
    },
    "telephone": {
        "yes": {
           "icon": "telephone.svg",
           "text": "teléfono público",
         }
    },
    "post_box": {
        "yes": {
           "icon": "post_box.svg",
           "text": "buzón de correo",
         }
    },
    "playground": {
        "yes": {
           "icon": "playground.svg",
           "text": "parque infantil",
         }
    },
    "internet_access": {
        "yes": {
           "icon": "wifi.svg",
           "text": "acceso a internet",
         },
        "wifi": {
           "icon": "wifi.svg",
           "text": "wifi internet inalámbrico",
         },
        "wlan": {
           "icon": "wifi.svg",
           "text": "wifi internet inalámbrico",
         }
    },
    "bbq": {
        "yes": {
           "icon": "bbq.svg",
           "text": "barbacoa",
         }
    },
    "dog": {
        "yes": {
           "icon": "dog.svg",
           "text": "perros permitidos"
         },
        "no": {
           "icon": "no-dog.svg",
           "text": "no se admiten perros"
         },
        "leashed": {
           "icon": "dog-leashed.svg",
           "text": "perros solo con correa"
         }
    },
    "motor_vehicle": {
        "yes": {
           "icon": "motor_vehicle.svg",
           "text": "vehículos a motor permitidos",
         },
        "no": {
           "icon": "no-motor_vehicle.svg",
           "text": "vehículos a motor no permitidos",
         }
    },
    "openfire": {
        "yes": {
           "icon": "firepit.svg",
           "text": "fuego al aire libre permitido",
         },
        "no": {
           "icon": "no-firepit.svg",
           "text": "prohibido el fuego al aire libre",
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
           "text": "campo de mini-golf"
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
           "text": "campo de golf"
         }
    }
};

var camp_pitches = {
  "generic": {
        "icon": "feature-icons/pitch-green.svg",
        "text": "parcela común"
  },
  "permanent": {
        "icon": "feature-icons/pitch-blue.svg",
        "text": "parcela para residentes permanentes"
  },
 "tents": {
        "icon": "feature-icons/pitch-red.svg",
        "text": "parcela para la tienda"
  }
}

var sport_facilities = {
    "swimming": {
        "icon": "swimming_pool.svg",
        "text": "piscina",
    },
    "golf": {
        "icon": "sport-golf.svg",
        "text": "campo de golf",
    },
    "tennis": {
        "icon": "sport-tennis.svg",
        "text": "campo de tenis",
    },
    "soccer": {
        "icon": "sport-soccer.svg",
        "text": "campo de fútbol",
    },
    "archery": {
        "icon": "sport-archery.svg",
        "text": "campo de tiro con arco"
    },
    "baseball": {
        "icon": "sport-baseball.svg",
        "text": "campo de béisbol"
    },
    "basketball": {
        "icon": "sport-basketball.svg",
        "text": "cancha de baloncesto"
    },
    "beachvolleyball": {
        "icon": "sport-beachvolleyball.svg",
        "text": "campo de voley-playa"
    },
    "equestrian": {
        "icon": "sport-equestrian.svg",
        "text": "pista de equitación"
    },
    "table_tennis": {
        "icon": "sport-table_tennis.svg",
        "text": "mesas de ping-pong"
    },
    "volleyball": {
        "icon": "sport-volleyball.svg",
        "text": "campo de voleibol"
    }
};
