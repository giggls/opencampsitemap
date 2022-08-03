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
      console.warn(gcsr.statusText, gcsr.responseText);
    }
  });
  request.send();
}

function starsForRating(rating) {
  if (rating == 100) {
    return '★★★★★';
  } else if (rating >= 80) {
    return '★★★★☆';
  } else if (rating >= 60) {
    return '★★★☆☆';
  } else if (rating >= 40) {
    return '★★☆☆☆';
  } else if (rating >= 20) {
    return '★☆☆☆☆';
  } else {
    return '☆☆☆☆☆';
  }
}

function htmlForReview(json) {
  var html = '<li><div class="entry">';

  const rating = `<div class="rating">${starsForRating(json.payload.rating)}</div>`;
  const viewOnMangroveURL = `https://mangrove.reviews/list?signature=${json.signature}`;
  const openMangroveLink = `<a class="open_external" href="${viewOnMangroveURL}" target="_blank">🔗</a>`
  html += `<div class="clearfix">${rating}${openMangroveLink}</div>`;

  // Ensure that line breaks are preserved.
  const opinion = json.payload.opinion.replace(/(?:\r\n|\r|\n)/g, '<br>');
  html += `<p>${opinion}</p>`;

  html += '</div></li>';

  return html;
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