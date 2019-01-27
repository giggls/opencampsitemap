/* build "site info" HTML for sidebar from json features */

function genlink(url,text) {
  if(typeof text === "undefined") {
    text=url;
  }
  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    url = 'http://'+url;
  }
  return('<a href=\"'+url+'\" target=\"_blank\">'+text+'</a>');
}

function genmailto(mail) {
  return('<a href=\"mailto:'+mail+'\"">'+mail+'</a>');
}

function f2html(fdata) {
  console.debug('Properties: ' + JSON.stringify(fdata.properties));
  
  var ihtml = "";
  
  // add stars if available
  if ("stars" in fdata.properties) {
    if ((numstars=Number(fdata.properties.stars)) != NaN) {
      if (numstars > 0) {
        ihtml = ihtml + '<p>'
        for (i = 0; i < numstars; i++) {
          ihtml = ihtml + '<img src=\"icons/star.svg\">'
        }
        ihtml = ihtml + '</p>\n'
      }
    }
  }
  
  // special handling of swimming_pool
  var swimming_pool = false;
  
  // generate facility icons
  for (var f in facilities) {
    if (f in fdata.properties) {
      if (fdata.properties[f] in facilities[f]) {
        ihtml = ihtml + '<img src=\"icons/'+facilities[f][fdata.properties[f]].icon+'\" title=\"'+facilities[f][fdata.properties[f]].text+'\">';
        if (f == "swimming_pool") {
          swimming_pool = true;
        }
      }
    }
  }
  
  if ('sport' in fdata.properties) {
    // sport facility icons
    for (var sf in sport_facilities) {
      // prevent double rendering of swimming_pool
      if ((sf == "swimming") && (swimming_pool == true)) continue;
      if (fdata.properties['sport'].indexOf(sf) > -1) {
        ihtml = ihtml + '<img src=\"icons/'+sport_facilities[sf].icon+'\" title=\"'+sport_facilities[sf].text +'\">';
      };
    };
  };
  
  if ("name" in fdata.properties) {
    ihtml = ihtml + '<h2>' + fdata.properties.name + '</h2>\n';
  } else {
    if ("operator" in fdata.properties) {
      ihtml = ihtml + '<h2>' + fdata.properties.operator + '</h2>\n';  
    } else {
      ihtml = ihtml + '<h2>' + "Unnamed campsite" + '</h2>\n';
    }
  };
    
  if ("website" in fdata.properties) {
    ihtml = ihtml + "<p><b>Website: </b>" + genlink(fdata.properties.website) + "</p>";
  };
  
  ihtml += '<p>'
  if ("email" in fdata.properties) {
    ihtml = ihtml + '<b>Email: </b>' + genmailto(fdata.properties['email'])+ '<br />';
  };

  if ("contact:email" in fdata.properties) {
    ihtml = ihtml + '<b>Email: </b>' + genmailto(fdata.properties['contact:email'])+ '<br />';
  };

  if ("phone" in fdata.properties) {
    ihtml = ihtml + '<b>Phone: </b>' + fdata.properties['phone']+ '<br />';
  };

  if ("contact:phone" in fdata.properties) {
    ihtml = ihtml + '<b>Phone: </b>' + fdata.properties['contact:phone']+ '<br />';
  };

  if ("fax" in fdata.properties) {
    ihtml = ihtml + '<b>Fax: </b>' + fdata.properties['fax']+ '<br />';
  };

  if ("contact:fax" in fdata.properties) {
    ihtml = ihtml + '<b>Fax: </b>' + fdata.properties['contact:fax']+ '<br />';
  };
  
  ihtml += '</p>'
  if ("reservation" in fdata.properties) {
    if (fdata.properties['reservation'] == "required") {
      ihtml = ihtml + "<p><b>Advance reservation required!</b></p>";
    };
  };
  
  return(ihtml);
}

/* build "bugs info" HTML for sidebar from json features */
function f2bugInfo(featureData) {
  var ok = true;
  
  var osmlink = '<p><b>OSM ID: </b>'+ genlink(featureData.id,featureData.id.split('/')[4]) + '</p>\n';
  bhtml = osmlink + "<h2>Likely untagged features:</h2>\n<ul>\n";
  var contact= ["website","contact:phone","phone","contact:email","email","contact:website"];
  
  if (!("name" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>Object has no <b>name</b> tag.</li>";
  }
  
  if (!("toilets" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>toilets are missing<br />(explicitely tag with <b>no</b> if unavailable).</li>";
  }

  if (!("shower" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>shower is missing<br />(explicitely tag with <b>no</b> if unavailable).</li>";
  }

  if (!("tents" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>tag <b>tents</b> is missing<br />(tag if tents are allowed/not allowed).</li>";
  }

  if (!("caravans" in featureData.properties)) {
    ok = false;
    bhtml = bhtml + "<li>tag <b>caravans</b> is missing<br />(tag if caravans are allowed/not allowed).</li>";
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
    bhtml = bhtml + "<li>No contact information given (website, phone, email)</li>";
  }
  
  bhtml = bhtml + "</ul>";
  if (ok) {
    bhtml = osmlink + '<p><b>No apparent bugs found!<p>Site seems to be decently tagged.</b></p></p>';
  }
  return(bhtml);
}
