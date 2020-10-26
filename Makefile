all: lang markers favicon.ico

lang markers:
	$(MAKE) -C $@

.PHONY: all lang markers

favicon.ico: favicon.png
	convert favicon.png favicon.ico
favicon.png:
	inkscape favicon.svg --export-type=png -o favicon.png

clean:
	rm -f favicon.png favicon.ico
	make -C lang clean
	make -C markers clean
