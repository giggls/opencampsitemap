/*
  Integration of Mangrove reviews into OpenCampingMap
*/
// The ID of the DIV that displays the reviews.
const containerId = 'reviews_container';

// URL of the Mangrove UI
const mangroveHomepageURL = 'https://mangrove.reviews/';

// The uncertainty to use when searching for Mangrove reviews.
// See: https://mangrove.reviews/standard#mangrove-core-uri-schemes
const uncertainty = 50;

function loadReviews(featureData) {
  if (!("name" in featureData.properties)) {
    // Only camping places with names can have reviews.
    return;
  }

  showLoading(featureData);

  const coordinate = `${featureData.geometry.coordinates[1]},${featureData.geometry.coordinates[0]}`
  const sub = encodeURIComponent(`geo:${coordinate}?q=${coordinate}&u=${uncertainty}`);

  const q = encodeURIComponent(featureData.properties.name);

  const url = `https://api.mangrove.reviews/reviews?q=${q}&sub=${sub}`;

  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', function (event) {
    if (request.status >= 200 && request.status < 300) {
      const json = JSON.parse(request.responseText);
      displayReviews(featureData, json);
    } else {
      console.warn(request.statusText, request.responseText);
    }
  });
  request.send();
}

function showLoading(featureData) {
  const addReviewButton = htmlForAddReviewButton(featureData);

  document.getElementById(containerId).innerHTML = `${htmlForHeader()}${addReviewButton}<p class="loading_or_no_reviews">${l10n.loading_reviews}</p>`;
}

function htmlForHeader() {
  const mangroveLink = `<a href="${mangroveHomepageURL}" target="_blank">Mangrove</a>`;

  return `<h4 class="clearfix">${l10n.reviews}<span class="powered_by">${l10n.powered_by} ${mangroveLink}</span></h4>`;
}

function htmlForAddReviewButton(featureData) {
  const coordinate = `${featureData.geometry.coordinates[1]},${featureData.geometry.coordinates[0]}`;
  const siteName = featureData.properties.name;
  const geoURI = `geo:${coordinate}?q=${siteName}&u=${uncertainty}`;
  const sub = encodeURIComponent(geoURI);
  const mangroveSearchURL = `https://mangrove.reviews/search?sub=${sub}`;

  return `<div id="review" class="review_button">\n<a href="${mangroveSearchURL}" target="_blank">${l10n.add_review}</a></div>`;
}

function starsForRating(rating) {
  let emptyStar = '☆';
  let fullStar = '★';

  let numberOfFullStars = Math.round(rating / 20);
  let numberOfEmptyStars = 5 - numberOfFullStars;

  return `${fullStar.repeat(numberOfFullStars)}${emptyStar.repeat(numberOfEmptyStars)}`;
}

function htmlForReview(json) {
  var html = '<li><div class="entry">';

  html += `<div class="rating">${starsForRating(json.payload.rating)}</div>`;

  // Trim line breaks from the start and from the end of the string.
  const trimmedOpinion = json.payload.opinion.replace(/^\s+|\s+$/g, '');

  // Convert line breaks to `<br>` elements.
  const opinion = trimmedOpinion.replace(/(?:\r\n|\r|\n)/g, '<br>');
  html += `<p>${opinion}</p>`;

  const viewOnMangroveURL = `https://mangrove.reviews/list?signature=${json.signature}`;
  const meta = metaStringForPayload(json.payload);
  html += `<div class="meta clearfix"><a href="${viewOnMangroveURL}" target="_blank">${meta}</a></div>`;

  html += '</div></li>';

  return html;
}

function metaStringForPayload(payloadJSON) {
  const date = new Date(payloadJSON.iat * 1000);
  const dateAsString = date.toLocaleDateString();

  const name = nameForMetadata(payloadJSON.metadata);

  if (name.length > 0) {
    return `${name}, ${dateAsString}`;
  } else {
    return dateAsString;
  }
}

function nameForMetadata(metadataJSON) {
  const nickname = metadataJSON.nickname || '';
  const givenName = metadataJSON.given_name || '';
  const familyName = metadataJSON.family_name || '';
  const fullname = `${givenName} ${familyName}`.trim();

  if (fullname.length > 0 && nickname.length > 0) {
    // Both fullname and nickname are present.
    return `${nickname} (${fullname})`;
  } else if (nickname.length > 0) {
    // Only the nickname is present.
    return nickname;
  } else if (fullname.length > 0) {
    // Only the fullname is present.
    return fullname;
  } else {
    return l10n.default_reviewer_name;
  }
}

function displayReviews(featureData, json) {
  var html = htmlForHeader();

  html += htmlForAddReviewButton(featureData);

  if (json.reviews.length == 0) {
    html += `<p class="loading_or_no_reviews">${l10n.no_reviews_yet}</p>`;
  } else {
    html += `<ul>${json.reviews.map(htmlForReview)}</ul>`;
  }

  document.getElementById(containerId).innerHTML = html;
}