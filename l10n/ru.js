// a poor mans l10n :)

var l10n = {
  "hints": "Подсказки от картографов",
  "edit_in_josm": "Редактировать в JOSM",
  "edit_in_id": "Редактировать в iD",
  "unnamed_campsite": "Территория без названия",
  'nodeonly': "Территория должна обозначаться как область (area), а не точка (node).",
  "website": "Сайт",
  "operator": "Оператор",
  "email": "Электронная почта",
  "phone": "Телефон",
  "fax": "Факс",
  "mobile": "Мобильный телефон",
  "coords": "Координаты",
  "address": "Адрес",
  "reservation_required": "Требуется предварительное бронирование!",
  "no_reservation_required": "Нет предварительного бронирования!",
  "likely_untagged_features": "Похоже указаны не все подробности",
  "noname": "объект без тега <b>имя</b> (name).",
  "notoilet": "тег <b>туалеты</b> (toilets) не указан",
  "noshower": "тег <b>душ</b> (shower) не указан",
  "notents": "тег <b>палатки</b> (tents) не указан",
  "no_unavailable": "явно указан тег <b>нет</b> (no), если недоступно",
  "tag_tents": "тег если палатки разрешены/запрещены",
  "nocaravans": "тег <b>трейлеры</b> (caravans) не указан",
  "tag_caravans": "тег если трейлеры разрешены/запрещены",
  "nocontact": "Не указано контактной информации (сайт, телефон, электронная почта)",
  "no_bugs_found": ["Явных ошибок не обнаружено!", "Кемпинг похоже обозначен полностью."],
  "backcountry": "кемпинг без удобств",
  "group_only": "кемпинг только для групп",
  "nudist": "нудистский кемпинг",
  "standard": "кемпинг",
  "camping": "кемпинг только с палатками",
  "caravan": "кемпинг для трейлеров",
  "attribution": 'Данные карты &copy; участники OpenStreetMap',
  "esri_attribution": 'Аэрофотоснимки &copy; <a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer" target="_blank">ESRI World Imagery</a>',
  "mapstyle": "OSM",
  "reception": "ресепшн",
  "fire-extinguisher": "огнетушитель",
  "power-supply": "электричество",
  "toilets": "туалеты",
  "shower": "душ",
  "drinking_water": "Питьевая вода",
  "sanitary_dump_station": "Место для слива из туалетных резервуаров",
  "sink": "кухонная раковина",
  "kitchen": "кухня",
  "capacity_persons": "вместимость (люди)",
  "capacity_tents": "вместимость (палатки)",
  "capacity_caravans": "вместимость (караван)",
  "capacity": 'Тэг <b>вместимость</b> многозначный. Используйте <b>capacity:caravans</b>, <b>capacity:tents</b> или <b>capacity:persons</b> вместо него.',
  "maxtents": 'Тэг <b>maxtents</b> устарел. Используйте <b>capacity:tents</b> вместо него.',
  "invalidsiterel": 'More than one campsite object in relation',
  "uselesssiterel": 'Site-relation not needed',
  "site_inside": 'Site located inside other object tagged <b>tourism&nbsp;=&nbsp;camp_site</b>',
  "site_contains": 'Site contains other objects tagged <b>tourism&nbsp;=&nbsp;camp_site</b>',
  "add_review": 'Добавить отзыв',
  "reviews": 'отзывы',
  "default_reviewer_name": 'Анонинмно',
  "loading_reviews": 'Загрузка, подождите пожалуйста...',
  "no_reviews_yet": 'Пока что отзывов нет.',
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
      "text": "палатки разрешены на территории",
    },
    "no": {
      "icon": "no-tent.svg",
      "text": "палатки запрещены на территории",
    }
  },
  "caravans": {
    "yes": {
      "icon": "caravan.svg",
      "text": "трейлеры разрешены на территории",
    },
    "no": {
      "icon": "no-caravan.svg",
      "text": "трейлеры запрещены на территории",
    }
  },
  "motorhome": {
    "yes": {
      "icon": "motorhome.svg",
      "text": "Дома на колесах разрешены на территории"
    },
    "no": {
      "icon": "no-motorhome.svg",
      "text": "Дома на колесах запрещены на территории"
    }
  },
  "static_caravans": {
    "yes": {
      "icon": "static_caravans.svg",
      "text": "неподвижные трейлеры в аренду",
    }
  },
  "cabins": {
    "yes": {
      "icon": "cabins.svg",
      "text": "домики в аренду",
    }
  },
  "permanent_camping": {
    "yes": {
      "icon": "permanent.svg",
      "text": "доступны площадки для постоянных жителей",
    },
    "only": {
      "icon": "permanent.svg",
      "text": "только постоянные жители"
    }
  },
  "toilets": {
    "yes": {
      "icon": "toilet.svg",
      "text": "туалеты на территории",
    },
    "no": {
      "icon": "no-toilet.svg",
      "text": "на территории нет туалетов",
    }
  },
  "shower": {
    "yes": {
      "icon": "shower.svg",
      "text": "душ на территории",
    },
    "no": {
      "icon": "no-shower.svg",
      "text": "на территории нет душа",
    }
  },
  "drinking_water": {
    "yes": {
      "icon": "drinking_water.svg",
      "text": "питьевая вода на территории",
    },
    "no": {
      "icon": "no-drinking_water.svg",
      "text": "на территории нет питьевой воды",
    }
  },
  "power_supply": {
    "^(?!no).+$": {
      "icon": "power_supply.svg",
      "text": "доступно подключение к электросети",
    },
    "no": {
      "icon": "no-power_supply.svg",
      "text": "нет подключения к электросети",
    }
  },
  "sanitary_dump_station": {
    "^(?!no).+$": {
      "icon": "sanitary_dump_station.svg",
      "text": "есть место для слива из туалетных резервуаров.",
    }
  },
  "shop": {
    "yes": {
      "icon": "shop.svg",
      "text": "магазин на территории",
    }
  },
  "laundry": {
    "yes": {
      "icon": "laundry.svg",
      "text": "прачечная или стиральная машина на территории",
    }
  },
  "washing_machine": {
    "yes": {
      "icon": "laundry.svg",
      "text": "прачечная или стиральная машина на территории",
    }
  },
  "pub": {
    "yes": {
      "icon": "pub.svg",
      "text": "паб на территории",
    }
  },
  "bar": {
    "yes": {
      "icon": "bar.svg",
      "text": "бар на территории",
    }
  },
  "restaurant": {
    "yes": {
      "icon": "restaurant.svg",
      "text": "ресторан на территории",
    }
  },
  "fast_food": {
    "yes": {
      "icon": "fast_food.svg",
      "text": "ресторан быстрого питания на территории",
    }
  },
  "telephone": {
    "yes": {
      "icon": "telephone.svg",
      "text": "общественный телефон на территории",
    }
  },
  "post_box": {
    "yes": {
      "icon": "post_box.svg",
      "text": "почтовый ящик на территории",
    }
  },
  "playground": {
    "yes": {
      "icon": "playground.svg",
      "text": "детская площадка на территории",
    }
  },
  "internet_access": {
    "yes": {
      "icon": "wifi.svg",
      "text": "доступ в Интернет",
    },
    "no": {
      "icon": "no-wifi.svg",
      "text": "нет доступ в Интернет",
    },
    "wifi": {
      "icon": "wifi.svg",
      "text": "беспроводной доступ в Интернет",
    },
    "wlan": {
      "icon": "wifi.svg",
      "text": "беспроводной доступ в Интернет",
    }
  },
  "bbq": {
    "yes": {
      "icon": "bbq.svg",
      "text": "барбекю на территории",
    }
  },
  "picnic_table": {
    "yes": {
      "icon": "picnic_table.svg",
      "text": "доступны столы для пикника",
    }
  },
  "kitchen": {
    "yes": {
      "icon": "kitchen.svg",
      "text": "доступна общественная кухня",
    }
  },
  "fridge": {
    "yes": {
      "icon": "fridge.svg",
      "text": "доступен общественный холодильник",
    }
  },
  "sink": {
    "yes": {
      "icon": "sink.svg",
      "text": "доступна раковина на кухне",
    }
  },
  "dog": {
    "yes": {
      "icon": "dog.svg",
      "text": "собаки разрешены"
    },
    "no": {
      "icon": "no-dog.svg",
      "text": "собаки запрещены"
    },
    "leashed": {
      "icon": "dog-leashed.svg",
      "text": "собаки разрешены только на поводке"
    }
  },
  "motor_vehicle": {
    "yes": {
      "icon": "motor_vehicle.svg",
      "text": "автомобили разрешены к въезду на территорию",
    },
    "no": {
      "icon": "no-motor_vehicle.svg",
      "text": "автомобили запрещены на территории",
    }
  },
  "openfire": {
    "yes": {
      "icon": "firepit.svg",
      "text": "открытый огонь разрешён",
    },
    "no": {
      "icon": "no-firepit.svg",
      "text": "открытый огонь запрещён",
    }
  },
  "sauna": {
    "yes": {
      "icon": "sauna.svg",
      "text": "сауна",
    }
  },
  "miniature_golf": {
    "yes": {
      "icon": "miniature_golf.svg",
      "text": "минигольф"
    }
  },
  "swimming_pool": {
    "yes": {
      "icon": "swimming_pool.svg",
      "text": "плавательный бассейн"
    }
  },
  "golf_course": {
    "yes": {
      "icon": "sport-golf.svg",
      "text": "площадка для гольфа"
    }
  }
};

var camp_pitches = {
  "generic": {
    "icon": "../feature-icons/pitch-green.svg",
    "text": "обычное место для кемпинга"
  },
  "permanent": {
    "icon": "../feature-icons/pitch-blue.svg",
    "text": "площадка для постоянных жителей"
  },
  "tents": {
    "icon": "../feature-icons/pitch-red.svg",
    "text": "площадка для палаток"
  }
}

var sport_facilities = {
  "swimming": {
    "icon": "swimming_pool.svg",
    "text": "плавательный бассейн",
  },
  "golf": {
    "icon": "sport-golf.svg",
    "text": "площадка для гольфа",
  },
  "tennis": {
    "icon": "sport-tennis.svg",
    "text": "теннисный корт",
  },
  "soccer": {
    "icon": "sport-soccer.svg",
    "text": "футбольное поле",
  },
  "archery": {
    "icon": "sport-archery.svg",
    "text": "стрельба из лука"
  },
  "baseball": {
    "icon": "sport-baseball.svg",
    "text": "бейсбольное поле"
  },
  "basketball": {
    "icon": "sport-basketball.svg",
    "text": "баскетбольная площадка"
  },
  "beachvolleyball": {
    "icon": "sport-beachvolleyball.svg",
    "text": "пляжный волейбол"
  },
  "equestrian": {
    "icon": "sport-equestrian.svg",
    "text": "манеж для верховой езды"
  },
  "table_tennis": {
    "icon": "sport-table_tennis.svg",
    "text": "настольный теннис"
  },
  "volleyball": {
    "icon": "sport-volleyball.svg",
    "text": "волейбольное поле"
  }
};

if (typeof window === 'undefined') {
  exports.facilities = facilities;
  exports.l10n = l10n;
  exports.sport_facilities = sport_facilities;
}
