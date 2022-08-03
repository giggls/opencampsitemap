/*
  Integration of Mangrove reviews into OpenCampingMap
*/
// The ID of the DIV that displays the reviews.
const containerId = 'reviews_container';

function loadReviews(featureData) {
  if (!("name" in featureData.properties)) {
    // Only camping places with names can have reviews.
    return;
  }

  const coordinate = `${featureData.geometry.coordinates[1]},${featureData.geometry.coordinates[0]}`
  const uncertainty = 50;
  const sub = encodeURIComponent(`geo:${coordinate}?q=${coordinate}&u=${uncertainty}`);

  const q = encodeURIComponent(featureData.properties.name);

  const url = `https://api.mangrove.reviews/reviews?q=${q}&sub=${sub}`;

  var request = new XMLHttpRequest();
  request.open('GET', url);
  request.addEventListener('load', function (event) {
    if (request.status >= 200 && request.status < 300) {
      const json = JSON.parse(request.responseText);
      displayReviews(json);
    } else {
      console.warn(request.statusText, request.responseText);
    }
  });
  request.send();
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

  // Ensure that line breaks are preserved.
  const opinion = json.payload.opinion.replace(/(?:\r\n|\r|\n)/g, '<br>');
  html += `<p>${opinion}</p>`;

  const viewOnMangroveURL = `https://mangrove.reviews/list?signature=${json.signature}`;
  const dateAsString = dateStringForUnixTimestamp(json.payload.iat);
  html += `<div class="meta clearfix"><a href="${viewOnMangroveURL}" target="_blank">${dateAsString}</a></div>`;

  html += '</div></li>';

  return html;
}

function dateStringForUnixTimestamp(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);

  return date.toLocaleDateString();
}

function displayReviews(json) {
  var html = '<h4>Reviews</h4>';

  if (json.reviews.length == 0) {
    html += '<p>No reviews yet.</p>';
  } else {
    html += `<ul>${json.reviews.map(htmlForReview)}</ul>`;
  }

  document.getElementById(containerId).innerHTML = html;
}