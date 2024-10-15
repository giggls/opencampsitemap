/* build "site info" HTML for sidebar from json features */

const l10ndefs = {};

// stuff only needed when used from nodejs
if (typeof window === 'undefined') {

  const glob = require("glob");

  exports.f2html = function (fdata, lang, siteURL) {
    return f2html(fdata, lang, siteURL);
  };
  exports.f2bugInfo = function (fdata, lang) {
    return f2bugInfo(fdata, lang);
  };
  
  let languages = glob.sync("templates/index.??.html").map(f => f.substr(16,2));
  languages.forEach(lang => {
    l10ndefs[lang] = require(`../l10n/${lang}.js`);
  });
  
  var addressFormatter = require('@fragaria/address-formatter');
}


// Hashtags with which the changesets in iD are getting pre-populated.
let hashtags = ['#OpenCampingMap'];

function genlink(url, text) {
  if (typeof text === "undefined") {
    text = url;
  }
  if ((url.indexOf('http://') != 0) && (url.indexOf('https://') != 0)) {
    url = 'http://' + url;
  }
  return ('<a href=\"' + url + '\" target=\"_blank\">' + text + '</a>');
}

function genmailto(mail) {
  return ('<a href=\"mailto:' + mail + '\"">' + mail + '</a>');
}

// handle "contact:*" tags
function gencontact(tags) {
  const url_prefixes = {
    'facebook': 'https://fb.com/',
    'instagram': 'https://instagram.com/',
    'twitter': 'https://twitter.com'
  }

  let formated = "";
  let ignore = ['street','housenumber','postcode','city','country','pobox'];
  
  // mobile phone
  if ("mobile" in tags) {
    formated += phoneNumberHTML(l10n.mobile,tags['mobile']);
  }

  for (const key in tags) {
    if (key.substring(0, 8) === "contact:") {
      let contact = key.substring(8);
      if (ignore.indexOf(contact) == -1)  {
        let cname = contact.substring(0, 1).toUpperCase() + contact.substring(1);
        let linkurl = tags[key];
        let linktext;
        let link;
        if (contact in url_prefixes) {
          if (tags[key].substring(0, 4) == 'http') {
            linktext = tags[key].replace(/http[s]?:\/\/[^\/]+\//gi, '');
            linktext = linktext.split("?")[0];
            linktext = linktext.replace(/\/$/,'');
          } else {
            linkurl = url_prefixes[contact]+tags[key];
            linktext = tags[key];
          }
          link = genlink(linkurl,linktext);
        } else {
          if (tags[key].substring(0, 4) == 'http') {
            link = genlink(linkurl,linktext);
          } else {
            link = tags[key];
          }
        }
        formated += `<b>${cname}:</b> ${link}<br />\n`
      }
    };
  };
  
  return (formated);
}

function addr_in_tags(tags) {
  var count = 0;
  for (var key in tags) {
    if (key.substring(0, 4) === "addr") {
      count++;
    };
  };
  return (count);
};

function gen_addr(tags, newline) {
  var addr = {};
  var addrlist;
  var formated = "";

  if (addr_in_tags(tags) > 2) {
    if ('addr:housenumber' in tags) {
      addr.houseNumber = tags['addr:housenumber'];
    };
    if ('addr:place' in tags) {
      addr.road = tags['addr:place'];
    }
    if ('addr:street' in tags) {
      addr.road = tags['addr:street'];
    };
    if ('addr:city' in tags) {
      addr.city = tags['addr:city'];
    }
    if ('addr:postcode' in tags) {
      addr.postcode = tags['addr:postcode'];
    } else {
      addr.postcode = '';
    };
    if ('addr:country' in tags) {
      addr.countryCode = tags['addr:country'].toUpperCase();
    };
    addrlist = addressFormatter.format(addr, { output: 'array', appendCountry: true });
    for (var i = 0; i < addrlist.length - 1; i++) {
      formated = formated + addrlist[i] + newline;
    }
    formated = formated + addrlist[i].toUpperCase();
    return (formated);
  }

  return ('');
};

function phoneNumberHTML(name,tagValue) {
  // According to the wiki, the tag might contain multiple phone numbers, separated by a semicolon.
  const phoneNumbers = tagValue.split(';');
  const phoneNumberLinks = phoneNumbers
    .map((number) => `<a href="tel:${number}">${number}</a>`)
    .join(', ');

  return `<b>${name}:</b> ${phoneNumberLinks}<br />\n`;
}

function f2html(fdata, lang, siteURL) {
  if (typeof window === 'undefined') {
    facilities = l10ndefs[lang].facilities;
    sport_facilities  = l10ndefs[lang].sport_facilities;
    l10n = l10ndefs[lang].l10n;
  }

  // console.debug('Properties: ' + JSON.stringify(fdata.properties));
  var directlink;

  var ihtml = "<p>";

  // special handling of laundry/washing_machine
  var laundry = false;

  // special handling of golf_course (leisure=golf_course or sport=golf)
  var golf_course = false;

  // special handling of swimming_pool (leisure=swimming_pool or sport=swimming)
  var swimming_pool = false;

  // generate facility icons
  for (var f in facilities) {

    if (f in fdata.properties) {
      // prevent double rendering of washing_machine/laundry icon
      if ((f == "laundry") || (f == "washing_machine")) {
        if (laundry) continue;
        laundry = true;
      }

      // look up potential matching value (regex)
      for (v in facilities[f]) {
        // break after match has occured
        if (f == "toilets") {
          ihtml = ihtml + '<p></p>';
        }
        if (fdata.properties[f].match(v)) {
          if (f == "power_supply") {
            if (typeof fdata.properties['power_supply:maxcurrent'] === "undefined") {
              ihtml = ihtml + '<img src=\"cicons/' + facilities[f][v].icon + '\" title=\"' + facilities[f][v]['text'] + '\">';
            } else {
              let amps=fdata.properties['power_supply:maxcurrent'].replace(";","A, ");
              ihtml = ihtml + '<img src=\"cicons/' + facilities[f][v].icon + '\" title=\"' + facilities[f][v]['text'] + " (max. " + amps + "A)" + '\">';
            }
          } else {
            ihtml = ihtml + '<img src=\"cicons/' + facilities[f][v].icon + '\" title=\"' + facilities[f][v]['text'] + '\">';
          }
          break;
        };
      }
      if (f == "swimming_pool") {
        swimming_pool = true;
      }
      if (f == "golf_course") {
        golf_course = true;
      }
    }
  }

  if ('sport' in fdata.properties) {
    // sport facility icons
    for (var sf in sport_facilities) {
      // prevent double rendering of swimming_pool and golf
      if ((sf == "swimming") && (swimming_pool == true)) continue;
      if ((sf == "golf") && (golf_course == true)) continue;
      if (fdata.properties['sport'].indexOf(sf) > -1) {
        ihtml = ihtml + '<img src=\"cicons/' + sport_facilities[sf].icon + '\" title=\"' + sport_facilities[sf]['text'] + '\">';
      }
    }
  }

  ihtml = ihtml + '</p>\n';

  // add stars if available
  if ("stars" in fdata.properties) {
    if ((numstars = Number(fdata.properties.stars[0])) != NaN) {
      if (numstars > 0) {
        ihtml = ihtml + '<p>'
        for (i = 0; i < numstars; i++) {
          ihtml = ihtml + '<img src=\"cicons/star.svg\">'
        }
        ihtml = ihtml + '</p>\n'
      };
    };
  };

  const latlon = fdata.geometry.coordinates[1].toFixed(7) + "," + fdata.geometry.coordinates[0].toFixed(7);
  const geolink = '<a href="geo:' + latlon + '">' + latlon +'</a>';
  if ("name" in fdata.properties) {
    ihtml = ihtml + '<h2><a href="' + siteURL + '" id="site_name">' + fdata.properties.name;
    if ("ref" in fdata.properties) {
      ihtml = ihtml + ' (' + fdata.properties.ref + ')';
    }
    ihtml = ihtml + '</a></h2>\n';
    if ("alt_name" in fdata.properties) {
      ihtml = ihtml + '<h3>' + fdata.properties.alt_name + '</h3>\n';
    }
    if ("operator" in fdata.properties) {
      ihtml = ihtml + '<p><b>' + l10n.operator + ': </b>' + fdata.properties.operator + '</p>\n';
    }
  } else {
    if ("operator" in fdata.properties) {
      ihtml = ihtml + '<h2><a href="" id="site_name">' + fdata.properties.operator;
    } else {
      ihtml = ihtml + '<h2><a href="" id="site_name">' + l10n.unnamed_campsite;
    }
    if ("ref" in fdata.properties) {
      ihtml = ihtml + ' (' + fdata.properties.ref + ')';
    }
    ihtml = ihtml + '</a></h2>\n';
  }
  
  if ("website" in fdata.properties) {
    ihtml = ihtml + "<p><b>" + l10n.website + ": </b>" + genlink(fdata.properties.website) + "</p>\n";
  }

  ihtml += '<p>\n';
  if ("email" in fdata.properties) {
    ihtml = ihtml + '<b>' + l10n.email + ': </b>' + genmailto(fdata.properties['email']) + '<br />\n';
  }

  if ("phone" in fdata.properties) {
    ihtml += phoneNumberHTML(l10n.phone,fdata.properties['phone']);
  }

  if ("fax" in fdata.properties) {
    ihtml = ihtml + '<b>' + l10n.fax + ': </b>' + fdata.properties['fax'] + '<br />\n';
  }
  ihtml += gencontact(fdata.properties);
  ihtml = ihtml + '<b>' + l10n.coords + ': </b>' + geolink + '<br />\n';

  ihtml += '</p>\n'

  addr = gen_addr(fdata.properties, '<br />\n');

  if (addr != "") {
    ihtml += "<p>\n<b>" + l10n.address + ':</b><br />\n' + addr + "\n</p>\n"
  }

  if ("reservation" in fdata.properties) {
    if (fdata.properties['reservation'] == "required") {
      ihtml = ihtml + "<p><b>" + l10n.reservation_required + "</b></p>\n";
    }
    if (fdata.properties['reservation'] == "no") {
      ihtml = ihtml + "<p><b>" + l10n.no_reservation_required + "</b></p>\n";
    }
  }

  /* show description in desired language */
  if ('description:' + lang in fdata.properties) {
    ihtml += '<div class="infobox">' + fdata.properties['description:' + lang] + '</div>';
  } else {
    if ('description' in fdata.properties) {
      ihtml += '<div class="infobox">' + fdata.properties['description'] + '</div>';
    }
  }

  // 'maxtents' is deprecated for 'capacity:tents' but we will still support it for now
  if ('maxtents' in fdata.properties) {
    if (!('capacity:tents' in fdata.properties)) {
      fdata.properties['capacity:tents'] = fdata.properties['maxtents'];
    }
  }

  // plain 'capacity' tag is inconsistent in the database on tourism=camp_site
  // because the meaning might be persons, tents caravans or whatever
  // on tourism=caravan_site we assume capacity equals capacity:pitches
  if ((fdata.properties['tourism']=='caravan_site') &&('capacity' in fdata.properties)) {
    fdata.properties['capacity:pitches'] = fdata.properties['capacity']
    delete  fdata.properties['capacity']
  }

  /*
    table  for number of persons, tents, caravans or pitches
    we assume that we have either:
    (capacity:tents or capacity:caravans) or capacity:pitches are given.

    If capacity:tents or capacity:caravans is available capacity:pitches is ignored.

  */
  if (('capacity:caravans' in fdata.properties) || ('capacity:tents' in fdata.properties)
     || ('capacity:persons' in fdata.properties) || ('capacity:pitches' in fdata.properties)) {
    ihtml = ihtml + '<table><tr>'
    var padding = 0;

    if ('capacity:caravans' in fdata.properties) {
      ihtml = ihtml + '<td style="padding: ' + padding + 'px;"><img src="other-icons/caravan.svg" title="' + l10n.capacity_caravans + '" style="vertical-align:middle"><br><b>' + fdata.properties['capacity:caravans'] + '</b>';
      padding = 20;
    }
    if ('capacity:tents' in fdata.properties) {
      ihtml = ihtml + '<td style="padding: ' + padding + 'px;"><img src="other-icons/tent.svg" title="' + l10n.capacity_tents + '" style="vertical-align:middle"><br><b>' + fdata.properties['capacity:tents'] + '</b>';
      if (padding == 20) {
        padding = 0;
      } else {
        padding = 20;
      }
    }

    if (('capacity:pitches' in fdata.properties) && !(('capacity:caravans' in fdata.properties) || ('capacity:tents' in fdata.properties))) {
      ihtml = ihtml + '<td style="padding: ' + padding + 'px;"><img src="other-icons/caravan+tent.svg" title="' + l10n.capacity_caravans + '" style="vertical-align:middle"><br><b>' + fdata.properties['capacity:pitches'] + '</b>';
      padding = 20;
    }

    if ('capacity:persons' in fdata.properties) {
      ihtml = ihtml + '<td style="padding: ' + padding + 'px;"><img src="other-icons/persons.svg" title="' + l10n.capacity_persons + '" style="vertical-align:middle"><br><b>' + fdata.properties['capacity:persons'] + '</b>';
    }
    ihtml = ihtml + '</table>\n'
  }

  return ihtml
}

/* build "bugs info" HTML for sidebar from json features */
function f2bugInfo(featureData,lang) {
  var ok = true;
  var contact = ["website", "phone", "email"];
  // check for these tags (case insensitive) and show them as hint if available
  var info = [new RegExp('^fixme(:.+)*$', "i"), new RegExp('^note(:.+)*$', "i"), new RegExp('^comment(:.+)*$', "i")];

  var osmlink = '<p><b>OSM ID: </b>' + genlink(featureData.id, featureData.id.split('/')[4]);

  var sitelink = '';

  if ("site_relation" in featureData.properties) {
    sitelink = genlink("https://www.openstreetmap.org/relation/" + featureData.properties['site_relation'], featureData.properties['site_relation']);
    osmlink = osmlink + ' (relation type=site ' + sitelink + ')';
  }
  osmlink = osmlink + '</p>\n';

  var bhtml = osmlink;

  var first = true;
  var found = false;
  for (var f in featureData.properties) {
    for (var i = 0; i < info.length; i++) {
      if (info[i].test(f)) {
        found = true;
      }
    }
    if (found) {
      if (first) {
        first = false;
        bhtml = bhtml + "<h2>" + l10n.hints + ":</h2>\n";
      }
      bhtml = bhtml + "<p><b>" + f + ":</b><br />\n"
      bhtml = bhtml + featureData.properties[f] + "</p>\n"
      ok = false;
    }
    found = false;
  }

  bhtml = bhtml + "<ul>\n";

  // do not complain about "nodelonly" if there is a site relation
  if (!("site_relation" in featureData.properties)) {
    if (featureData.id.indexOf('node') > 0) {
      ok = false;
      bhtml = bhtml + "<li>" + l10n.nodeonly + "</li>";
    }
  }

  // All objects in site relation are inside tourism = camp_site polygon
  if (featureData.properties['site_relation_state'] == 'useless') {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.uselesssiterel + " " + sitelink + "</li>";
  }

  // site relation has more than one member object tagged tourism = camp_site
  if (featureData.properties['site_relation_state'] == 'invalid') {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.invalidsiterel + " " + sitelink + "</li>";
  }

  // site contains one or more additional objects tagged tourism = camp_site
  if ("contains_sites" in featureData.properties) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.site_contains + ":</li > ";
    featureData.properties['contains_sites'].split(' ').forEach(o => {
      bhtml = bhtml + '<a href="' + o + '">' + o + '</a><br />\n'
    });
  }

  // site is part of one or more larger objects tagged tourism = camp_site
  if ("inside_sites" in featureData.properties) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.site_inside + ":</li > ";
    featureData.properties['inside_sites'].split(' ').forEach(o => {
      bhtml = bhtml + '<a href="' + o + '">' + o + '</a><br />\n'
    });
  }

  bhtml = bhtml + "</ul>";


  bhtml = bhtml + "<h2>" + l10n.likely_untagged_features + ":</h2>\n<ul>\n";

  if (!("name" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.noname + "</li>";
  }

  if (!("toilets" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.notoilet + "<br />(" + l10n.no_unavailable + ").</li>\n";
  }

  if (!("shower" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.noshower + "<br />(" + l10n.no_unavailable + ").</li>\n";
  }

  if (featureData.properties['category'] != 'caravan') {
    if (!("tents" in featureData.properties)) {
      ok = false;
      bhtml = bhtml + "<li>" + l10n.notents + "<br />(" + l10n.tag_tents + ").</li>\n";
    }

    if (!("caravans" in featureData.properties)) {
      ok = false;
      bhtml = bhtml + "<li>" + l10n.nocaravans + "<br />(" + l10n.tag_caravans + ").</li>\n";
    }
  }

  // check if any contact information is available
  var cinfo = false;
  for (var i = 0; i < contact.length; i++) {
    if (contact[i] in featureData.properties) {
      cinfo = true;
      break;
    }
  }

  if (cinfo == false) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.nocontact + "</li>";
  }

  if ("capacity" in featureData.properties) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.capacity + "</li>";
  }

  if ("maxtents" in featureData.properties) {
    ok = false;
    bhtml = bhtml + "<li>" + l10n.maxtents + "</li>";
  }

  bhtml = bhtml + "</ul>";
  if (ok) {
    bhtml = osmlink + '<p><b>' + l10n.no_bugs_found[0] + "</p>\n<p>" + l10n.no_bugs_found[1] + '</b></p>\n';
  }

  bhtml += '<div id="editbuttons">\n'  
  bhtml += '<button id=\"josm\">' + l10n.edit_in_josm + '</button>\n';
  bhtml += '<button id=\"id\">' + l10n.edit_in_id + '</button>\n';
  bhtml += '</div>\n'
  
  return bhtml
}

// functions to call OSM editor

function editInJOSM(fdata) {
  // increment to calculate bounding box on point objects
  var inc = 0.005;

  var bbox;

  // create remote url of this form
  // http://127.0.0.1:8111/load_and_zoom?left=8.19&right=8.20&top=48.605&bottom=48.590&select=node413602999
  // ref: https://wiki.openstreetmap.org/wiki/JOSM/RemoteControl

  if ("bbox" in fdata) {
    bbox = fdata['bbox'];
  } else {
    if (fdata.geometry['coordinates'].length != 2) return;
    bbox = [fdata.geometry['coordinates'][0] - inc, fdata.geometry['coordinates'][1] - inc,
    fdata.geometry['coordinates'][0] + inc, fdata.geometry['coordinates'][1] + inc];
  }
  var osm_id = fdata['id'].split('/');
  var url = "http://127.0.0.1:8111/load_and_zoom?left=" + bbox[0] + '&right=' +
    bbox[2] + '&top=' + bbox[3] + '&bottom=' + bbox[1];
  url += '&select=' + osm_id[osm_id.length - 2] + osm_id[osm_id.length - 1];

  let encodedWhiteSpace = encodeURIComponent(' ');
  url += `&changeset_hashtags=${hashtags.map(tag => encodeURIComponent(tag)).join(encodedWhiteSpace)}`;

  // call remote control command, ignore response        
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.send();
}

function editInID(fdata) {
  let osm_id = fdata['id'].split('/');
  let osmObjectType = osm_id[osm_id.length - 2];
  let osmObjectId = osm_id[osm_id.length - 1];

  // Parameters for the URL's query (after the '?')
  let queryParameters = [
    'editor=id',
    `${osmObjectType}=${osmObjectId}`
  ];

  // Parameters for the "hash portion" of the URL (after the `#`)
  let hashURLParameters = [
    `map=${map.getZoom()}/${fdata.geometry['coordinates'][1]}/${fdata.geometry['coordinates'][0]}`,
    `hashtags=${hashtags.map(tag => encodeURIComponent(tag)).join(',')}`
  ];

  let url = `https://www.openstreetmap.org/edit?${queryParameters.join('&')}/#${hashURLParameters.join('&')}`;

  var win = window.open(url, '_blank');
}


