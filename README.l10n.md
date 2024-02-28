# How l10 works

I usually do not add l10n in other languages than English and German. 
Instead I just add english to the appropriate language file.  If you want
the translations for your language to be updated please send pull requests.

If you want to fix this for one of the other supported languages check the
following files (with xx replaced by your langage):

* l10n/xx.js
* templates/index.xx.html
* templates/noscript.xx.html

# How to add an additional language

Lets say we want to add Zulu language as an example
(Zulu langage code is "zu"):

1. Add a flag icon named **zu.svg** into the lang directory (25/25 px)
   (The flag of South Africa should be your best bet in this case :)
2. Modify the existing templates/index.html.* files to also show your icon.
   In Zulu this would be:
   `<li class="flags"><a href="javascript:openURL('zu');"><img src="lang/zu.png" title="zulu"></a></li>`
3. Copy templates/index.en.html to templates/index.zu.html and
   templates/noscript.de.html to noscript/index.zu.html.
   Translate both files into Zulu language
4. Change the lang variable inside templates/index.zu.html to "zu"
5. Copy l10n/en.js to l10n/zu.js and translate into Zulu language
6. Make sure l10n/zu.js is included from index.zu.html
