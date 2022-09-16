LEAFLET_VERSION = 1.7.1

all: lang markers other-icons/favicon.ico leaflet sidebar-v2/css/leaflet-sidebar.css fonts

lang markers:
	$(MAKE) -C $@

.PHONY: all lang markers

leaflet.zip:
	wget http://cdn.leafletjs.com/leaflet/v$(LEAFLET_VERSION)/leaflet.zip

leaflet@$(LEAFLET_VERSION)/leaflet.css: leaflet.zip
	mkdir -p leaflet@$(LEAFLET_VERSION)
	unzip -d leaflet@$(LEAFLET_VERSION) $<
	touch $@

leaflet: leaflet@$(LEAFLET_VERSION)/leaflet.css
	ln -sf leaflet@$(LEAFLET_VERSION) leaflet

sidebar-v2/css/leaflet-sidebar.css:
	git clone https://github.com/turbo87/sidebar-v2/

v4.7.0.zip:
	wget https://github.com/FortAwesome/Font-Awesome/archive/v4.7.0.zip

font-awesome-4.7.0/css/font-awesome.min.css: v4.7.0.zip
	unzip $<
	mv Font-Awesome-4.7.0 font-awesome-4.7.0
	touch $@

fonts: font-awesome-4.7.0/css/font-awesome.min.css
	ln -s font-awesome-4.7.0/fonts fonts

other-icons/favicon.ico: other-icons/favicon.png
	convert other-icons/favicon.png other-icons/favicon.ico
other-icons/favicon.png:
	inkscape other-icons/favicon.svg --export-type=png -o other-icons/favicon.png 2>/dev/null

clean:
	rm -f other-icons/favicon.png other-icons/favicon.ico
	rm -rf Font-Awesome*
	rm -f fonts leaflet
	make -C lang clean
	make -C markers clean

mrproper:
	rm *.zip
