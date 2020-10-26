/* build "site info" HTML for sidebar from json features */

function genlink(url,text) {
  if(typeof text === "undefined") {
    text=url;
  }
  if ((url.indexOf('http://')!=0) && (url.indexOf('https://')!=0)) {
    url = 'http://'+url;
  }
  return('<a href=\"'+url+'\" target=\"_blank\">'+text+'</a>');
}

function genmailto(mail) {
  return('<a href=\"mailto:'+mail+'\"">'+mail+'</a>');
}

function addr_in_tags(tags) {
  var count = 0;
  for (var key in tags){
    if (key.substring(0, 4) === "addr") {
      count++;
    };
  };
  return(count);
};

function gen_addr(tags,newline) {
  var addr = {};
  var addrlist;
  var formated = "";

  if (addr_in_tags(tags) > 2) {
    if ('addr:housenumber' in tags) {
      addr.houseNumber = tags['addr:housenumber'];
    };
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
    addrlist=(addressFormatter.format(addr,{output: 'array',appendCountry: true}));
    for (var i = 0; i < addrlist.length-1; i++) {
        formated = formated + addrlist[i] + newline;
    }
    formated = formated + addrlist[i].toUpperCase();
    return(formated);
  }
  
  return('');
};

function f2html(fdata) {
  //console.debug('Properties: ' + JSON.stringify(fdata.properties));
  var directlink;
  
  var ihtml = "";
  
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
        if (fdata.properties[f].match(v)) {
          ihtml = ihtml + '<img src=\"cicons/'+facilities[f][v].icon+'\" title=\"'+facilities[f][v]['text']+'\">';
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
        ihtml = ihtml + '<img src=\"cicons/'+sport_facilities[sf].icon+'\" title=\"'+sport_facilities[sf]['text'] +'\">';
      }
    }
  }
  
  // add stars if available
  if ("stars" in fdata.properties) {
    if ((numstars=Number(fdata.properties.stars[0])) != NaN) {
      if (numstars > 0) {
        ihtml = ihtml + '<p>'
        for (i = 0; i < numstars; i++) {
          ihtml = ihtml + '<img src=\"cicons/star.svg\">'
        }
        ihtml = ihtml + '</p>\n'
      };
    };
  };
  
  if (window.location.href.split("/").pop() == fdata.id.split("/").pop()) {
    directlink = window.location.href;
  } else {
    var id = fdata.id.split("/");
    directlink = window.location.href+"/"+id[id.length-2]+"/"+id[id.length-1];
  }
  
  if ("name" in fdata.properties) {
    ihtml = ihtml + '<h2><a href="' + directlink +'">'+ fdata.properties.name;
    if ("ref" in fdata.properties) {
      ihtml = ihtml + ' ('+fdata.properties.ref+')';
    }
    ihtml = ihtml + '</a></h2>\n';
    if ("alt_name" in fdata.properties) {
      ihtml = ihtml + '<h3>' + fdata.properties.alt_name + '</h3>\n';
    }
    if ("operator" in fdata.properties) {
      ihtml = ihtml + '<p><b>'+l10n.operator+': </b>' + fdata.properties.operator + '</p>\n';
    }
  } else {
    if ("operator" in fdata.properties) {
      ihtml = ihtml + '<h2><a href="' + directlink +'">'+ fdata.properties.operator;
    } else {
      ihtml = ihtml + '<h2><a href="' + directlink +'">'+ l10n.unnamed_campsite;
    }
    if ("ref" in fdata.properties) {
      ihtml = ihtml + ' ('+fdata.properties.ref+')';
    }
    ihtml = ihtml + '</a></h2>\n';
  }
    
  if ("website" in fdata.properties) {
    ihtml = ihtml + "<p><b>"+ l10n.website +": </b>" + genlink(fdata.properties.website) + "</p>";
  }
  
  ihtml += '<p>'
  if ("email" in fdata.properties) {
    ihtml = ihtml + '<b>'+l10n.email+': </b>' + genmailto(fdata.properties['email'])+ '<br />';
  }

  if ("phone" in fdata.properties) {
    ihtml = ihtml + '<b>'+l10n.phone+': </b>' + fdata.properties['phone']+ '<br />';
  }

  if ("fax" in fdata.properties) {
    ihtml = ihtml + '<b>'+l10n.fax+': </b>' + fdata.properties['fax']+ '<br />';
  }
  
  ihtml += '</p>'

  ihtml += '<p>'
  if ("capacity" in fdata.properties) {
    ihtml = ihtml + '<b>'+l10n.capacity+': </b>' + fdata.properties['capacity']+ '<br />';
  }

  if ("maxtents" in fdata.properties) {
    ihtml = ihtml + '<b>'+l10n.maxtents+': </b>' + fdata.properties['maxtents']+ '<br />';
  }
  ihtml += '</p>'

  addr=gen_addr(fdata.properties,'<br />');
  
  if (addr != "") {
    ihtml += "<p><b>"+l10n.address+':</b><br />'+addr+"</p>"
  }

  if ("reservation" in fdata.properties) {
    if (fdata.properties['reservation'] == "required") {
      ihtml = ihtml + "<p><b>"+l10n.reservation_required+"</b></p>";
    }
    if (fdata.properties['reservation'] == "no") {
      ihtml = ihtml + "<p><b>"+l10n.no_reservation_required+"</b></p>";
    }
  }
  
  /* show description in desired language */
  if ('description:'+lang in fdata.properties) {
    ihtml += '<div class="infobox">' + fdata.properties['description:'+lang] + '</div>';
  } else {
    if ('description' in fdata.properties) {
      ihtml += '<div class="infobox">' + fdata.properties['description'] + '</div>';
    }
  }
  
  document.getElementById('info content').innerHTML=ihtml;
}

/* build "bugs info" HTML for sidebar from json features */
function f2bugInfo(featureData) {
  var ok = true;
  var contact= ["website","phone","email"];
  // check for these tags (case insensitive) and show them as hint if available
  var info = [new RegExp('^fixme(:.+)*$', "i"),new RegExp('^note(:.+)*$', "i"),new RegExp('^comment(:.+)*$', "i")];
  
  var osmlink = '<p><b>OSM ID: </b>'+ genlink(featureData.id,featureData.id.split('/')[4]) + '</p>\n';
  var bhtml = osmlink;
  
  
  var first = true;
  var found = false;
  for (var f in featureData.properties) {
    for (var i = 0; i < info.length ; i++) {
      if (info[i].test(f)) {
        found = true;
      }
    }
    if (found) {
      if (first) {
        first = false;
        bhtml = bhtml + "<h2>"+l10n.hints+":</h2>\n";
      }
      bhtml = bhtml + "<p><b>" + f + ":</b><br />\n"
      bhtml = bhtml + featureData.properties[f]+"</p>"
      ok = false;      
    }
    found=false;
  }
  
  bhtml = bhtml + "<h2>"+l10n.likely_untagged_features+":</h2>\n<ul>\n";
  
  if (featureData.id.indexOf('node') >0) {
    ok = false;
    bhtml = bhtml + "<li>"+l10n.nodeonly+"</li>";
  }
  
  if (!("name" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>"+l10n.noname+"</li>";
  }
  
  if (!("toilets" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>"+l10n.notoilet+"<br />("+l10n.no_unavailable+").</li>";
  }

  if (!("shower" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>"+l10n.noshower+"<br />("+l10n.no_unavailable+").</li>";
  }

  if (!("tents" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>"+l10n.notents+"<br />("+l10n.tag_tents+").</li>";
  }
  
  if (!("caravans" in featureData.properties)) {
    if ("category" in featureData.properties) {
      if (featureData.properties['category'] != 'caravan') {
        ok = false;
        bhtml = bhtml + "<li>"+l10n.nocaravans+"<br />("+l10n.tag_caravans+").</li>";
      }
    }
  }
  
  // check if any contact information is available
  var cinfo = false;
  for (var i = 0; i < contact.length ; i++) {
    if (contact[i] in featureData.properties) {
      cinfo = true;
      break;
    }
  }
  
  if (cinfo == false) {
    ok = false;
    bhtml = bhtml + "<li>"+l10n.nocontact+"</li>";
  }
  
  bhtml = bhtml + "</ul>";
  if (ok) {
    bhtml = osmlink + '<p><b>'+l10n.no_bugs_found[0]+"</p><p>"+l10n.no_bugs_found[1]+'</b></p>';
  }
  
  // in any case add two OSM edit buttons
  bhtml += '<button id=\"josm\">'+l10n.edit_in_josm+'</button>\n';
  bhtml += '<button id=\"id\">'+l10n.edit_in_id+'</button>';
  document.getElementById('bugs content').innerHTML=bhtml;
  document.getElementById('josm').addEventListener('click', function() {
    editInJOSM(featureData);
  });
  document.getElementById('id').addEventListener('click', function() {
    editInID(featureData);
  });
}

// functions to call OSM editor

function editInJOSM(fdata) {
  // increment to calculate bounding box on point objects
  var inc=0.005;

  var bbox;
  
  // create remote url of this form
  // http://127.0.0.1:8111/load_and_zoom?left=8.19&right=8.20&top=48.605&bottom=48.590&select=node413602999
  // ref: https://wiki.openstreetmap.org/wiki/JOSM/RemoteControl
  
  if ("bbox" in fdata) {
    bbox=fdata['bbox'];
  } else {
    if (fdata.geometry['coordinates'].length != 2) return;
    bbox=[fdata.geometry['coordinates'][0]-inc,fdata.geometry['coordinates'][1]-inc,
    fdata.geometry['coordinates'][0]+inc,fdata.geometry['coordinates'][1]+inc];
  }
  var osm_id=fdata['id'].split('/');
  var url="http://127.0.0.1:8111/load_and_zoom?left=" + bbox[0] + '&right=' +
          bbox[2] + '&top='+ bbox[3] + '&bottom=' + bbox[1];
  url += '&select='+osm_id[osm_id.length-2]+osm_id[osm_id.length-1];
  
  // call remote control command, ignore response        
  var request = new XMLHttpRequest();
  request.open("GET",url);
  request.send();
}

function editInID(fdata) {
  var osm_id=fdata['id'].split('/');  
  var url = "https://www.openstreetmap.org/edit?editor=id&lon="+fdata.geometry['coordinates'][0];
  url += "&lat="+fdata.geometry['coordinates'][1]+"&zoom="+map.getZoom()+"&"+osm_id[osm_id.length-2]+"="+osm_id[osm_id.length-1];;
  var win = window.open(url, '_blank');
}
