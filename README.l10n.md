# How to add an additional language

Lets say we want to add Zulu language as an example
(Zulu langage code is "zu"):

1. Add a flag icon named <b>zu.png</b> into the lang directory (25/25 px)
   (The flag of South Africa should be your best bet in this case :)
2. Modify the existing index.html.* files to also show your icon.
   In Zulu this would be:
   `<li class="flags"><a href="javascript:openURL('zu');"><img src="lang/zu.png" title="zulu"></a></li>`
3. Copy index.html.en to index.html.zu and translate into Zulu language
4. Change the lang variable inside index.html.zu to "zu"
5. Copy l10n/en.js to l10n/zu.js and translate into Zulu language
6. Make sure l10n/zu.js is included from index.html.zu


