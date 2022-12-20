
all: $(addsuffix .png, $(basename $(wildcard *.svg)))

%.png: %.svg
	inkscape $< --export-type=png -o $@ 2>/dev/null

clean:
	rm -f *.png	