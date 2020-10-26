
all: $(addsuffix .png, $(basename $(wildcard *.svg)))

%.png: %.svg
	inkscape $< --export-type=png -o $@

clean:
	rm -f *.png	