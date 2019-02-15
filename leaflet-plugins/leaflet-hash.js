/*

Extended Version of https://github.com/mlevans/leaflet-hash

* Add layer to hash (base+overlay support)
* Add support for optional aux values to be evaluated by
  an external function

*/

(function(window) {
	var HAS_HASHCHANGE = (function() {
		var doc_mode = window.documentMode;
		return ('onhashchange' in window) &&
			(doc_mode === undefined || doc_mode > 7);
	})();

	L.Hash = function(map,baseMaps,overlayMaps,auxf,auxval) {
		this.onHashChange = L.Util.bind(this.onHashChange, this);

		if (map) {
			this.init(map,baseMaps,overlayMaps,auxf,auxval);
		}
		
	};
	
	// for some strange reason this is not part of leaflet itself
	L.Hash.switchLayer = function (destLayer) {
		for (var base in this.baseMaps) {
			if (map.hasLayer(this.baseMaps[base]) && this.baseMaps[base] != destLayer) {
				map.removeLayer(this.baseMaps[base]);
			}
 		}
 		map.addLayer(destLayer);
	};


	L.Hash.parseHash = function(hash) {
		if(hash.indexOf('#') === 0) {
			hash = hash.substr(1);
		}
		var args = hash.split("/");
		if (args.length >= 3) {
			var zoom = parseInt(args[0], 10),
			lat = parseFloat(args[1]),
			lon = parseFloat(args[2]),
			bslayer = args[3],
			ollayer = args[4];
			aux = args.slice(5);
			if (args.length < 6) {
			  aux = this.aux;
			}
			if (args.length < 5) {
			  ollayer = "0";
			}
			if (args.length < 4) {
			  bslayer = "0";
			}
			if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
				return false;
			} else {
				return {
					center: new L.LatLng(lat, lon),
					zoom: zoom,
					bslayer: bslayer,
					ollayer: ollayer,
					aux: aux
				};
			}
		} else {
			return false;
		}
	};

	L.Hash.formatHash = function(map) {
		var center = map.getCenter(),
		    zoom = map.getZoom(),
		    precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

		var l = [zoom,
			center.lat.toFixed(precision),
			center.lng.toFixed(precision),
			this.bslayer,
			this.ollayer]
		if (typeof this.auxf === "function") {
			for (var i = 0; i < this.aux.length; i++){
				l.push(this.aux[i]);
			}
		}
		return "#" + l.join("/");
	},
	
	L.Hash.prototype = {
		map: null,
		lastHash: null,
		baseMaps: null,
		overlayMaps: null,

		parseHash: L.Hash.parseHash,
		formatHash: L.Hash.formatHash,
		switchLayer: L.Hash.switchLayer,
		
		updateAUX: function(aux) {
			this.aux = aux;
			this.onMapMove(this.map);
		},

		init: function(map,baseMaps,overlayMaps,auxf,auxval) {
			this.map = map;
			this.baseMaps = baseMaps;
			this.overlayMaps = overlayMaps;
			this.bslayer = 0;
			this.ollayer = 0;
			this.aux = auxval;
			this.auxf = auxf;

			// reset the hash
			this.lastHash = null;
			this.onHashChange();

			if (!this.isListening) {
				this.startListening();
			}
		},

		removeFrom: function(map) {
			if (this.changeTimeout) {
				clearTimeout(this.changeTimeout);
			}

			if (this.isListening) {
				this.stopListening();
			}

			this.map = null;
		},

		onMapMove: function() {
			// bail if we're moving the map (updating from a hash),
			// or if the map is not yet loaded

			if (this.movingMap || !this.map._loaded) {
				return false;
			}

			var hash = this.formatHash(this.map);
			if (this.lastHash != hash) {
				location.replace(hash);
				this.lastHash = hash;
			}
		},
		
		// Layer switcher events
		baseLayerChange: function() {
			var i = 0;
			for (var base in this.baseMaps) {
				if (map.hasLayer(this.baseMaps[base])) {
					break;
				}
				i++;
			}
			this.bslayer=i;
			this.onMapMove();
		},
		
		overlayChange: function() {
			var layer=0;
			var i = 0;
			for (var ovl in this.overlayMaps) {
				if (map.hasLayer(this.overlayMaps[ovl])) {
					layer += Math.pow(2,i);
				}
				i++;
                        }
                        this.ollayer=layer;
                        this.onMapMove();
                },
                
		movingMap: false,
		update: function() {
			var hash = location.hash;
			if (hash === this.lastHash) {
				return;
			}
			var parsed = this.parseHash(hash);
			if (parsed) {
				this.movingMap = true;

				this.map.setView(parsed.center, parsed.zoom);

				this.movingMap = false;
				
				// activate requested layers

				// base layers
				this.bslayer = parsed.bslayer;
				var i = 0;
				for (var key in this.baseMaps) {
					if (i == parsed.bslayer) {
						this.switchLayer(this.baseMaps[key]);
						break;
					}
					i++;
				};
				
				// overlays
				this.ollayer = parsed.ollayer;
				var bstr = parseInt('f'+this.ollayer, 16).toString(2);
				var i = bstr.length-1;
				for (var key in this.overlayMaps) {
					if (bstr[i] == 1) {
						this.map.addLayer(this.overlayMaps[key]);
					} else {
						this.map.removeLayer(this.overlayMaps[key]);
					}
					i--;
				}

				if (typeof this.auxf === "function") {
					// overwrite default value of this.aux
					this.aux = parsed.aux;
					this.auxf(this.aux);
					this.onMapMove(this.map);
				}
			} else {
				if (typeof this.auxf === "function") {
					this.auxf(this.aux);
				}
				this.onMapMove(this.map);
			}
		},

		// defer hash change updates every 100ms
		changeDefer: 100,
		changeTimeout: null,
		onHashChange: function() {
			// throttle calls to update() so that they only happen every
			// `changeDefer` ms
			if (!this.changeTimeout) {
				var that = this;
				this.changeTimeout = setTimeout(function() {
					that.update();
					that.changeTimeout = null;
				}, this.changeDefer);
			}
		},

		isListening: false,
		hashChangeInterval: null,
		startListening: function() {
			this.map.on("moveend", this.onMapMove, this);

			if (HAS_HASHCHANGE) {
				L.DomEvent.addListener(window, "hashchange", this.onHashChange);
			} else {
				clearInterval(this.hashChangeInterval);
				this.hashChangeInterval = setInterval(this.onHashChange, 50);
			}
			
			this.map.on("baselayerchange", this.baseLayerChange, this);
			this.map.on("overlayadd", this.overlayChange, this);
			this.map.on("overlayremove", this.overlayChange, this);
			
			this.isListening = true;
		},

		stopListening: function() {
			this.map.off("moveend", this.onMapMove, this);

			if (HAS_HASHCHANGE) {
				L.DomEvent.removeListener(window, "hashchange", this.onHashChange);
			} else {
				clearInterval(this.hashChangeInterval);
			}
			this.isListening = false;
		}
	};
	L.hash = function(map) {
		return new L.Hash(map);
	};
	L.Map.prototype.addHash = function() {
		this._hash = L.hash(this);
	};
	L.Map.prototype.removeHash = function() {
		this._hash.removeFrom();
	};
})(window);
