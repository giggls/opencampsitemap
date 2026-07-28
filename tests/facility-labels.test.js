const assert = require('node:assert/strict');
const test = require('node:test');
const siteFeature = require('../js/site-feature.js');

const languages = ['en', 'de', 'fr', 'es', 'ru'];

function escapeHTML(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function campsiteFeature(properties) {
  return {
    id: 'node/1',
    geometry: {
      coordinates: [-115.8677092, 43.8067184]
    },
    properties: Object.assign({
      tourism: 'camp_site',
      category: 'standard',
      name: 'Test campsite'
    }, properties)
  };
}

test('renders localized facility labels for every supported language', function () {
  const feature = campsiteFeature({
    tents: 'yes',
    caravans: 'yes',
    motorhome: 'yes',
    toilets: 'yes',
    drinking_water: 'yes',
    picnic_table: 'yes',
    dog: 'leashed',
    openfire: 'yes',
    fee: 'yes',
    power_supply: 'yes',
    'power_supply:maxcurrent': '16;32',
    sport: 'tennis'
  });

  languages.forEach(function (lang) {
    const locale = require('../l10n/' + lang + '.js');
    const html = siteFeature.f2html(feature, lang, '/' + lang + '/node/1');
    const expectedLabels = [
      locale.facilities.tents.yes.text,
      locale.facilities.caravans.yes.text,
      locale.facilities.motorhome.yes.text,
      locale.facilities.toilets.yes.text,
      locale.facilities.drinking_water.yes.text,
      locale.facilities.picnic_table.yes.text,
      locale.facilities.dog.leashed.text,
      locale.facilities.openfire.yes.text,
      locale.facilities.fee['^(?!no).+$'].text,
      locale.facilities.power_supply['^(?!no).+$'].text + ' (max. 16A, 32A)',
      locale.sport_facilities.tennis.text
    ];

    assert.match(html, /data-facility-labels/);
    assert.match(html, new RegExp('>' + locale.l10n.facilities_heading + '<'));
    assert.match(html, new RegExp('>' + locale.l10n.show_facility_labels + '<'));
    assert.equal(
      (html.match(/class="site-facility-item"/g) || []).length,
      expectedLabels.length
    );
    expectedLabels.forEach(function (label) {
      assert.ok(
        html.includes(escapeHTML(label)),
        lang + ' is missing label: ' + label
      );
    });
    const facilitySection = html.match(/<section class="site-facilities".*?<\/section>/s)[0];
    assert.doesNotMatch(facilitySection, /title="/);
  });
});

test('renders every facility and sport definition in every supported language', function () {
  const english = require('../l10n/en.js');

  languages.forEach(function (lang) {
    const locale = require('../l10n/' + lang + '.js');

    assert.deepEqual(
      Object.keys(locale.facilities),
      Object.keys(english.facilities)
    );
    assert.deepEqual(
      Object.keys(locale.sport_facilities),
      Object.keys(english.sport_facilities)
    );

    Object.keys(english.facilities).forEach(function (sourceKey) {
      assert.deepEqual(
        Object.keys(locale.facilities[sourceKey]),
        Object.keys(english.facilities[sourceKey])
      );

      Object.keys(english.facilities[sourceKey]).forEach(function (sourceValue) {
        const matchingValue = sourceValue == '^(?!no).+$'
          ? 'yes'
          : sourceValue;
        const html = siteFeature.f2html(
          campsiteFeature({ [sourceKey]: matchingValue }),
          lang,
          '/' + lang + '/node/1'
        );
        const expectedText = locale.facilities[sourceKey][sourceValue].text;

        assert.equal(
          (html.match(/class="site-facility-item"/g) || []).length,
          1,
          lang + ' rendered an unexpected number of icons for '
            + sourceKey + '=' + matchingValue
        );
        assert.ok(
          html.includes(escapeHTML(expectedText)),
          lang + ' is missing ' + sourceKey + '=' + matchingValue
        );
      });
    });

    Object.keys(english.sport_facilities).forEach(function (sport) {
      const html = siteFeature.f2html(
        campsiteFeature({ sport: sport }),
        lang,
        '/' + lang + '/node/1'
      );

      assert.ok(
        (html.match(/class="site-facility-item"/g) || []).length >= 1,
        lang + ' did not render an icon for sport=' + sport
      );
      assert.ok(
        html.includes(escapeHTML(locale.sport_facilities[sport].text)),
        lang + ' is missing sport=' + sport
      );
    });
  });
});

test('escapes dynamic facility label content', function () {
  const feature = campsiteFeature({
    power_supply: 'yes',
    'power_supply:maxcurrent': '16"><script>alert(1)</script>'
  });
  const html = siteFeature.f2html(feature, 'en', '/en/node/1');

  assert.doesNotMatch(html, /<script>alert\(1\)<\/script>/);
  assert.match(html, /16&quot;&gt;&lt;script&gt;alert\(1\)&lt;\/script&gt;A/);
});

test('omits the facilities control when a campsite has no facility icons', function () {
  const html = siteFeature.f2html(
    campsiteFeature({}),
    'en',
    '/en/node/1'
  );

  assert.doesNotMatch(html, /data-facility-labels/);
});

test('provides interface copy for every supported language', function () {
  languages.forEach(function (lang) {
    const locale = require('../l10n/' + lang + '.js').l10n;

    [
      'facilities_heading',
      'show_facility_labels',
      'facility_labels_shown',
      'facility_labels_hidden'
    ].forEach(function (key) {
      assert.equal(typeof locale[key], 'string');
      assert.notEqual(locale[key].trim(), '');
    });
  });
});
