// Useful filters for UI
//
// It is fairly simple to add more filters using this syntax
//
// if a regular expression is used it has to be defined exactly as in l10n/*.js

var tag_filters = {
  'dog': [ '^(?!no$)(?!leashed$).+$', 'leashed' ],
  'fee': [ 'no' ],
  'power_supply': [ '^(?!no$).+$' ],
  'cabins_or_caravans': [ 'yes' ]
}

// keys to use for the filters above matches if one of
// keys matches with values above
var tag_filter_keys = {
  'dog': [ 'dog' ],
  'fee': [ 'fee'],
  'power_supply': [ 'power_supply' ],
  'cabins_or_caravans': [ 'cabins' , 'static_caravans' ]
}
