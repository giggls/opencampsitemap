all: lang markers favicon.ico leaflet@1.7.1/leaflet.css sidebar-v2/css/leaflet-sidebar.css css/font-awesome.min.css

lang markers:
	$(MAKE) -C $@

.PHONY: all lang markers

leaflet.zip:
	wget http://cdn.leafletjs.com/leaflet/v1.7.1/leaflet.zip

leaflet@1.7.1/leaflet.css: leaflet.zip
	mkdir -p leaflet@1.7.1
	unzip -d leaflet@1.7.1 $<
	touch $@

sidebar-v2/css/leaflet-sidebar.css:
	git clone https://github.com/turbo87/sidebar-v2/

css/font-awesome.min.css: font-awesome-4.7.0/css/font-awesome.min.css
	ln -s ../font-awesome-4.7.0/css/font-awesome.min.css $@
	touch @
	
v4.7.0.zip:
	wget https://github.com/FortAwesome/Font-Awesome/archive/v4.7.0.zip

font-awesome-4.7.0/css/font-awesome.min.css: v4.7.0.zip
	unzip $<
	mv Font-Awesome-4.7.0 font-awesome-4.7.0
	touch $@
	
favicon.ico: favicon.png
	convert favicon.png favicon.ico
favicon.png:
	inkscape favicon.svg --export-type=png -o favicon.png

clean:
	rm -f favicon.png favicon.ico
	make -C lang clean
	make -C markers clean
