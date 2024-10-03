
all: m_standard_warn.svg m_nudist_warn.svg m_backcountry_warn.svg m_camping_warn.svg m_caravan_warn.svg m_group_only_warn.svg \
	m_standard_warn_sel.svg m_nudist_warn_sel.svg m_backcountry_warn_sel.svg m_camping_warn_sel.svg m_caravan_warn_sel.svg m_group_only_warn_sel.svg \
	m_private_standard.svg m_private_nudist.svg m_private_backcountry.svg m_private_camping.svg m_private_caravan.svg m_private_group_only.svg \
	m_private_standard_sel.svg m_private_nudist_sel.svg m_private_backcountry_sel.svg m_private_camping_sel.svg m_private_caravan_sel.svg m_private_group_only_sel.svg \
	l_private_standard.svg l_private_nudist.svg l_private_backcountry.svg l_private_camping.svg l_private_caravan.svg l_private_group_only.svg \
	m_private_standard_warn.svg m_private_nudist_warn.svg m_private_backcountry_warn.svg m_private_camping_warn.svg m_private_caravan_warn.svg m_private_group_only_warn.svg \
	m_private_standard_warn_sel.svg m_private_nudist_warn_sel.svg m_private_backcountry_warn_sel.svg m_private_camping_warn_sel.svg m_private_caravan_warn_sel.svg m_private_group_only_warn_sel.svg

# generate grey icons for private sites and selected ones
m_private_standard.svg: m_standard.svg
	sed -e 's/fill:#000080/fill:#666666/g' -e 's/fill:#5050ff/fill:#000000/g' $< >$@

l_private_standard.svg: l_standard.svg
	sed -e 's/fill:#000080/fill:#666666/g' -e 's/fill:#5050ff/fill:#000000/g' $< >$@

m_private_standard_sel.svg: m_standard_sel.svg
	sed -e 's/fill:#000080/fill:#666666/g' -e 's/fill:#5050ff/fill:#000000/g' $< >$@

m_private_nudist.svg: m_nudist.svg
	sed -e 's/fill:#68228b/fill:#666666/g' $< >$@

l_private_nudist.svg: l_nudist.svg
	sed -e 's/fill:#68228b/fill:#666666/g' $< >$@

m_private_nudist_sel.svg: m_nudist_sel.svg
	sed -e 's/fill:#68228b/fill:#666666/g' $< >$@

m_private_backcountry.svg: m_backcountry.svg
	sed -e 's/fill:#225500/fill:#666666/g' $< >$@

l_private_backcountry.svg: l_backcountry.svg
	sed -e 's/fill:#225500/fill:#666666/g' $< >$@

m_private_backcountry_sel.svg: m_backcountry_sel.svg
	sed -e 's/fill:#225500/fill:#666666/g' $< >$@

m_private_camping.svg: m_camping.svg
	sed -e 's/fill:#000080/fill:#666666/g' $< >$@

l_private_camping.svg: l_camping.svg
	sed -e 's/fill:#000080/fill:#666666/g' $< >$@

m_private_camping_sel.svg: m_camping_sel.svg
	sed -e 's/fill:#000080/fill:#666666/g' $< >$@

m_private_caravan.svg: m_caravan.svg
	sed -e 's/fill:#000080/fill:#666666/g' $< >$@

l_private_caravan.svg: l_caravan.svg
	sed -e 's/fill:#000080/fill:#666666/g' $< >$@

m_private_caravan_sel.svg: m_caravan_sel.svg
	sed -e 's/fill:#000080/fill:#666666/g' $< >$@

m_private_group_only.svg: m_group_only.svg
	sed -e 's/fill:#552200/fill:#666666/g' $< >$@

l_private_group_only.svg: l_group_only.svg
	sed -e 's/fill:#552200/fill:#666666/g' $< >$@
	
m_private_group_only_sel.svg: m_group_only_sel.svg
	sed -e 's/fill:#552200/fill:#666666/g' $< >$@


# Generate _warn and _warn_sel markers
m_standard_warn.svg: m_standard.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_standard_warn_sel.svg: m_standard_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@

m_private_standard_warn.svg: m_private_standard.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_private_standard_warn_sel.svg: m_private_standard_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@


m_nudist_warn.svg: m_nudist.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_nudist_warn_sel.svg: m_nudist_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@

m_private_nudist_warn.svg: m_private_nudist.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_private_nudist_warn_sel.svg: m_private_nudist_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@


m_backcountry_warn.svg: m_backcountry.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_backcountry_warn_sel.svg: m_backcountry_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@

m_private_backcountry_warn.svg: m_private_backcountry.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_private_backcountry_warn_sel.svg: m_private_backcountry_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@


m_camping_warn.svg: m_camping.svg warn.svg
	./genwarn.sh warn.svg $< >$@
	
m_camping_warn_sel.svg: m_camping_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@

m_private_camping_warn.svg: m_private_camping.svg warn.svg
	./genwarn.sh warn.svg $< >$@
	
m_private_camping_warn_sel.svg: m_private_camping_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@


m_caravan_warn.svg: m_caravan.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_caravan_warn_sel.svg: m_caravan_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@

m_private_caravan_warn.svg: m_private_caravan.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_private_caravan_warn_sel.svg: m_private_caravan_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@


m_group_only_warn.svg: m_group_only.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_group_only_warn_sel.svg: m_group_only_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@

m_private_group_only_warn.svg: m_private_group_only.svg warn.svg
	./genwarn.sh warn.svg $< >$@

m_private_group_only_warn_sel.svg: m_private_group_only_sel.svg warn_sel.svg
	./genwarn.sh warn_sel.svg $< >$@


clean:
	rm -f *_warn.svg *_warn_sel.svg ?_private*.svg
