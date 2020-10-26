

all: m_standard_warn.png m_nudist_warn.png m_backcountry_warn.png m_camping_warn.png m_caravan_warn.png m_group_only_warn.png $(addsuffix .png, $(basename $(wildcard *.svg)))

%.png: %.svg m_standard_warn.svg m_nudist_warn.svg m_backcountry_warn.svg m_camping_warn.svg m_caravan_warn.svg m_group_only_warn.svg
	inkscape $< --export-type=png -o $@

m_standard_warn.svg: m_standard.svg warn.svg
	./genwarn.sh $< >$@
m_nudist_warn.svg: m_nudist.svg warn.svg
	./genwarn.sh $< >$@
m_backcountry_warn.svg: m_backcountry.svg warn.svg
	./genwarn.sh $< >$@
m_camping_warn.svg: m_camping.svg warn.svg
	./genwarn.sh $< >$@
m_caravan_warn.svg: m_caravan.svg warn.svg
	./genwarn.sh $< >$@
m_group_only_warn.svg: m_group_only.svg warn.svg
	./genwarn.sh $< >$@

m_private_standard_warn.svg: m_private_standard.svg warn.svg
	./genwarn.sh $< >$@
m_private_nudist_warn.svg: m_private_nudist.svg warn.svg
	./genwarn.sh $< >$@
m_private_backcountry_warn.svg: m_private_backcountry.svg warn.svg
	./genwarn.sh $< >$@
m_private_camping_warn.svg: m_private_camping.svg warn.svg
	./genwarn.sh $< >$@
m_private_caravan_warn.svg: m_private_caravan.svg warn.svg
	./genwarn.sh $< >$@
m_private_group_only_warn.svg: m_private_group_only.svg warn.svg
	./genwarn.sh $< >$@

clean:
	rm -f *.png *_warn.svg
