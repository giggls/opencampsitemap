#!/usr/bin/env node
/*

Googleable server side "frontend" code for OpenCampingMap

Prerequisites:

npm install accept-language-parser express @fragaria/address-formatter argparse glob

*/

// static files and directories containing static files
const staticstuff = [
'css','markers','cicons','geocoder',
'sidebar-v2','leaflet','l10n','js',
'lang','leaflet-plugins','fonts',
'feature-icons','other-icons','favicon.ico'
];

// nodejs buildins
const glob = require("glob");
const fs = require('fs');
const http = require('http');
const process = require('process');

// OpenCampingMap root directory
process.chdir(__dirname);

// our stuff
const sf = require('./js/site-feature.js');

// stuff installed via npm
const langparser = require('accept-language-parser');
const express = require('express');
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  description: 'OpenCampingMap http Server'
});

parser.add_argument('-p', '--port', { help: 'port to listen at', default: 54445 });
parser.add_argument('-b', '--base', { help: 'base path prefix', default: "" });
parser.add_argument('-u', '--url', { help: 'url to fetch campsite json from', default: "http://127.0.0.1/getcampsites" });
parser.add_argument('-d', '--durl', { help: 'url to fetch import date json from', default: "http://127.0.0.1/getimportdate" });

args=parser.parse_args()

const app = express();
const router = express.Router();

// create list of available map languages
const languages = glob.sync("templates/index.??.html").map(f => f.substr(16,2));
const l10ndefs = {};
languages.forEach(lang => {
  l10ndefs[lang] = require(`./l10n/${lang}.js`);
});

// This is currently redundant fron campmap.js :(
const categories = ["standard", "caravan", "camping", "nudist", "group_only", "backcountry"];
const private_values = ['private', 'members','permanent'];

// deliver OpenCampingMap main website in requested language
function deliver_map(req,res,date,lang) {
  let data = fs.readFileSync('templates/index.'+lang+'.html', 'utf8');
  // a poor mans template engine :)
  data = data.replace('href="/"','href="'+args.base+'/"');
  data = data.replace('<!-- %DEFAULTCAT% -->','<link rel="stylesheet" href="css/cat/standard-hidesb.css" />');
  data = data.replace('<!-- %NOSCRIPT% -->',fs.readFileSync('templates/noscript.'+lang+'.html', 'utf8'));
  data = data.replace('<!-- %IMPORTDATE% -->',date);
  res.send(data);
}

function deliver_robots(req,res) {
  let data = fs.readFileSync('templates/robots.txt', 'utf8');
  const proxyHost = req.headers["x-forwarded-host"];
  const proxyProto = req.headers['x-forwarded-proto'];
  const host = proxyHost ? proxyHost : req.headers.host;
  const proto = proxyProto ? proxyProto : 'http';
  // a poor mans template engine :)
  data = data.replace('%BASEURL%',proto + '://' + host);
  res.type('text/plain');
  res.send(data);
}

function deliver_site(req,res,f,date,lang) {
  let private = false;
  
  if ('access' in f.properties) {
    if (private_values.indexOf(f.properties['access']) >= 0) {
      private = true;
    };
  };
  
  if ('permanent_camping' in f.properties) {
    if (f.properties['permanent_camping'] == 'only') {
      private = true;
    };
  };
  
  let cat;
  if (categories.indexOf(f.properties["category"]) >= 0) {
    cat = f.properties["category"];
  } else {
    cat = "standard";
  }
  
  let imghtml;
  if (private) {
    imghtml='<img src=\"markers/l_private_' + cat + '.svg\"> ' + l10ndefs[lang].l10n[cat];
  } else {
    imghtml = '<img src=\"markers/l_' + cat + '.svg\"> ' + l10ndefs[lang].l10n[cat];
  }
    
  let data = fs.readFileSync('templates/index.'+lang+'.html', 'utf8');
  // a poor mans template engine :)
  data = data.replace('href="/"','href="'+args.base+'/"');
  data = data.replace('<!-- %DEFAULTCAT% -->','<link rel="stylesheet" href="css/cat/'+f.properties.category+ '.css" />');
  data = data.replace('<!-- %SITECAT% -->',imghtml);
  data = data.replace('<!-- %SITEINFO% -->',sf.f2html(f,lang,req.url));
  // TODO: Should probably add reviews here also
  data = data.replace('<!-- %SITEBUGS% -->',sf.f2bugInfo(f,lang,""));
  data = data.replace('<!-- %NOSCRIPT% -->',"<h2>"+l10ndefs[lang].l10n['enable_javascript']+"</h2>");
  data = data.replace('<!-- %IMPORTDATE% -->',date);
  res.send(data);
}

// get prefered language from accept-language header
function findlang(req) {
  let preflang = 'en';
  let langs = req.headers["accept-language"];
  if (langs) {
    let parsedlang = langparser.parse(langs);
    // find best supporded language
    parsedlang.every(lang => {
      if (languages.indexOf(lang.code) != -1) {
        preflang = lang.code;
        return false;
      }
      return true;
    });
  }
  return preflang
}

// enable static files and directories
staticstuff.forEach(ss => {
  app.use(args.base+'/'+ss, express.static(ss));
});

// robots.txt
router.get('/robots.txt', (req,res) => {
  deliver_robots(req,res);
});

// if root location is requested redirect to best available language root
// (english if unsupported)
router.get('/', (req,res) => {
  res.redirect(301, args.base+'/'+findlang(req)+'/');
});

// /node, /way and /relation links without language prefix are also redirected to best available language
router.get('/node/[0-9]+$/', (req,res) => {
  res.redirect(301, args.base+'/'+findlang(req)+req.path);
});

router.get('/way/[0-9]+$/', (req,res) => {
  res.redirect(301, args.base+'/'+findlang(req)+req.path);
});

router.get('/relation/[0-9]+$/', (req,res) => {
  res.redirect(301, args.base+'/'+findlang(req)+req.path);
});

// define root, node, way and relation locations for all available languages
languages.forEach(lang => {
  // backward compatibility to old URL scheme 
  // permanent redirect to new scheme
  router.get('/index.html.'+lang, (req,res) => {
    res.redirect(308, args.base+'/'+lang+'/');
  });
  router.get('/'+lang, (req,res) => {
    const date_req = http.get(args.durl, date_res => {
      date_res.on('data', dd => {
        if (date_res.statusCode != 200) {
          console.error("error receiving data from osmpoidb\n");
          process.exit(1);
        } else {
          let djdata = JSON.parse(dd);
          deliver_map(req,res,djdata.importdate,lang);
        }
      });
    });
  });
  ['node','way','relation'].forEach(type => {
    router.get('/'+lang+'/'+type+'/'+'[0-9]+$', (req,res) => {
      let ulist=req.url.split("/");
      let id = ulist[3];
      let type = ulist[2];
      let qoptions;
      const creq = http.get(`${args.url}?osm_id=${id}&osm_type=${type}`, cres => {
        cres.on('data', d => {
            if (cres.statusCode != 200) {
              console.error("error receiving data from osmpoidb\n");
              process.exit(1);
            } else {
              let jdata = JSON.parse(d);
              if (jdata.features.length == 0) {
                res.send(`<html><body><h1>Campsite Object not found: ${req.url} </h1></body></html>\n`);
              } else {
                const date_req = http.get(args.durl, date_res => {
                  date_res.on('data', dd => {
                    if (date_res.statusCode != 200) {
                      console.error("error receiving data from osmpoidb\n");
                      process.exit(1);
                    } else {
                      let djdata = JSON.parse(dd);
                      deliver_site(req,res,jdata.features[0],djdata.importdate,lang);
                    }
                  });
                });
              }
            }
        });
      });
      creq.end();
    });
  });
});

app.use(args.base+'/', router);

// if we do not serve / as args.base in frontend proxy redirects to args.base here
if (args.base != "") {
  let root_router = express.Router();
  app.use('/', root_router);
  root_router.get('/', (req,res) => {
    res.redirect(301, args.base);
  });
}

app.listen(args.port);

