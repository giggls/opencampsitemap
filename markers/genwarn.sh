#!/bin/bash

IFS="
"

path=$(xmlstarlet sel -N ns=http://www.w3.org/2000/svg -t -c "//ns:path" $1 |sed -e 's/^<//' -e 's;/>$;;')

xmlstarlet ed -N ns=http://www.w3.org/2000/svg --subnode "//ns:svg" --type elem -n $path $2
