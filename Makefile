favicon.ico: favicon.png
	convert favicon.png favicon.ico
favicon.png:
	inkscape favicon.svg --export-type=png -o favicon.png

clean:
	rm favicon.png favicon.ico