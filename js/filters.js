// Useful filters for UI
//
// It is fairly simple to add more filters using this syntax
//
// if a regular expression is used it has to be defined exactly as in l10n/*.js

var tag_filters = {
  'dog': [ '^(?!no$)(?!leashed$).+$', 'leashed' ],
  'fee': [ 'no' ],
  'power_supply': [ '^(?!no$).+$' ]
}
