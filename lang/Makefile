
all: $(addsuffix .png, $(basename $(wildcard *.svg)))

%.png: %.svg
	inkscape $< -e $@

	