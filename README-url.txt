How OpenCampingMap URI can look like:

Reference given area using default language:
https://opencampingmap.org/#zoom/lon/lat/baselayer/overlay_layers/categories

Reference given area using specific language:
https://opencampingmap.org/<lang>/#zoom/lon/lat/baselayer/overlay_layers/categories

Reference specific site using default language:
https://opencampingmap.org/node|way|relation/[0-9]+
Reference specific site using specific language:
https://opencampingmap.org/<lang>/node|way|relation/[0-9]+

Languages use ISO 639 language codes if supported.
See also README.l10n.md


Examples for liks with different features enabled:

* Show only backcountry campsites.
* Baselayer and Overlays are taken from local storage or set to default values
* Use German language
https://opencampingmap.org/de/#12/48.9918/8.4655///backcountry

* Show only backcountry and standard campsites
* Baselayer and Overlays are taken from local storage or set to default values
* Use German language
https://opencampingmap.org/de/#12/48.9918/8.4655///backcountry,standard

* Show only backcountry campsites
* Show camping and hiking overlay
* Default locale (selected from browser)
* Use TOPO base Layer
https://opencampingmap.org/#12/48.9918/8.4655/TOPO/camping,hiking/backcountry

* Show only backcountry campsites.
* Baselayer and Overlays are taken from local storage or set to default values
* Default locale (selected from browser)
* Show default zoom
https://opencampingmap.org/#/////backcountry

* Show only group_only campsites public and private
* Show TOPO basemap
* Show camping and hiking overlay
* Default locale (selected from browser)
* Show area around Sigmaringen
https://opencampingmap.org/#15/48.0767/9.1422/TOPO/camping,hiking/group_only,private_group_only

Currenty available base layers are:

"OSM (en)"
"OSM (de)"
"OSM (fr)"
"OSM (es)"
"OSM"
"TOPO"
"World Imagery"


Currenty available overlays are:

camping (detailes highzoom rendering of sites)
hiking (hiking trails from https://hiking.waymarkedtrails.org/)
cycling (cycle routes from https://cycling.waymarkedtrails.org/)


Currenty available categories (with OSM tags):

Name		Description			OSM tags (tourism = 'caravan_site' or tourism = 'camp_site' are always required)

nudist		Nudist camp site		nudism = 'yes', 'obligatory', 'customary' or 'designated'
group_only	Group only or scout camp site	group_only = 'yes' or scout = 'yes'
backcountry	Backcountry camp site		backcountry = 'yes'
camping		Tent only camp site		tents = 'yes' and neither caravans = 'yes' nor motorhome = 'yes'
caravan		Caravan site			tents = 'no' or tourism = 'caravan_site' without tents tag
standard	Standard default camp site	None of the above tags

With access=private:						
private_nudist          Nudist camp site                nudism = 'yes', 'obligatory', 'customary' or 'designated'
private_group_only      Group only or scout camp site   group_only = 'yes' or scout = 'yes'
private_backcountry     Backcountry camp site           backcountry = 'yes'
private_camping         Tent only camp site             tents = 'yes' and neither caravans = 'yes' nor motorhome = 'yes'
private_caravan         Caravan site                    tents = 'no' or tourism = 'caravan_site' without tents tag
private_standard        Standard default camp site      None of the above tags
