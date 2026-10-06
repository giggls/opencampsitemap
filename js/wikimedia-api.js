// stuff only needed when used from nodejs
if (typeof window === 'undefined') {

  exports.fetchCommonsImages = function (titles, opts = {}) {
    return fetchCommonsImages(titles, opts = {});
  };
}

/**
 * Fetches image URLs and metadata from Wikimedia Commons.
 *
 * @param {string|string[]} titles - e.g. "File:Ascheberg RV stopover.jpg"
 *                                   or "Category:Oetzmühle" (also arrays)
 * @param {Object}   [opts]
 * @param {number}   [opts.thumbWidth=330]  - width for the thumbnail URL
 * @param {number}   [opts.limit=200]       - max files fetched per category
 * @param {boolean}  [opts.recursive=false] - descend into sub-categories
 * @param {number}   [opts.depth=1]         - recursion depth if recursive
 * @returns {Promise<Array<Object>>} list of image info objects
 */
async function fetchCommonsImages(titles, opts = {}) {
  const {
    thumbWidth = 330,
    limit = 200,
    recursive = false,
    depth = 1,
  } = opts;

  const API = 'https://commons.wikimedia.org/w/api.php';

  // ---------- low level API call (CORS-enabled, JSON) ----------
  async function api(params) {
    const url = new URL(API);
    const qs = {
      format: 'json',
      formatversion: '2',
      origin: '*',          // required for CORS from a browser
      ...params,
    };
    Object.entries(qs).forEach(([k, v]) => url.searchParams.set(k, v));

    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) throw new Error(`Commons API ${res.status} ${res.statusText}`);
    const json = await res.json();
    if (json.error) throw new Error(`Commons API: ${json.error.info}`);
    return json;
  }

  // ---------- expand a category into file titles ----------
  async function expandCategory(category, level) {
    const files = [];
    const subcats = [];
    let cont;

    do {
      const data = await api({
        action: 'query',
        list: 'categorymembers',
        cmtitle: category,
        cmtype: 'file|subcat',
        cmlimit: 'max',
        ...(cont ? { cmcontinue: cont } : {}),
      });

      for (const m of data?.query?.categorymembers ?? []) {
        if (m.ns === 6) files.push(m.title);        // ns 6 = File:
        else if (m.ns === 14) subcats.push(m.title); // ns 14 = Category:
      }
      cont = data?.continue?.cmcontinue;
    } while (cont && files.length < limit);

    if (recursive && level < depth) {
      for (const sub of subcats) {
        if (files.length >= limit) break;
        files.push(...(await expandCategory(sub, level + 1)));
      }
    }
    return files.slice(0, limit);
  }

  // ---------- resolve input to a flat list of File: titles ----------
  const input = Array.isArray(titles) ? titles : [titles];
  const fileTitles = [];

  for (const t of input) {
    const title = t.trim();
    if (/^category:/i.test(title)) {
      fileTitles.push(...(await expandCategory(title, 0)));
    } else if (/^file:/i.test(title)) {
      fileTitles.push(title);
    } else {
      // bare file name -> assume File: namespace
      fileTitles.push(`File:${title}`);
    }
  }

  const unique = [...new Set(fileTitles)];
  if (!unique.length) return [];

  // ---------- fetch imageinfo in batches of 50 (API limit) ----------
  const results = [];

  for (let i = 0; i < unique.length; i += 50) {
    const batch = unique.slice(i, i + 50);

    const data = await api({
      action: 'query',
      titles: batch.join('|'),
      prop: 'imageinfo',
      iiprop: 'url|size|mime|extmetadata|user|timestamp|canonicaltitle',
      iiurlwidth: String(thumbWidth),
      iiextmetadatafilter:
        'DateTimeOriginal|ImageDescription|Artist|Credit|LicenseShortName|' +
        'License|LicenseUrl|Attribution|ObjectName|GPSLatitude|GPSLongitude',
    });

    for (const page of data?.query?.pages ?? []) {
      if (page.missing) {
        results.push({ title: page.title, missing: true });
        continue;
      }
      const ii = page.imageinfo?.[0];
      if (!ii) continue;
      const em = ii.extmetadata ?? {};
      const val = (k) => em[k]?.value ?? null;
      const strip = (html) =>
        html ? String(html).replace(/<[^>]*>/g, '').trim() : null;

      results.push({
        title: page.title,
        pageid: page.pageid,
        descriptionUrl: ii.descriptionurl,
        url: ii.url,                       // full-resolution file
        thumbUrl: ii.thumburl ?? null,     // scaled to thumbWidth
        thumbWidth: ii.thumbwidth ?? null,
        thumbHeight: ii.thumbheight ?? null,
        width: ii.width,
        height: ii.height,
        size: ii.size,
        mime: ii.mime,
        uploader: ii.user,
        timestamp: ii.timestamp,
        dateOriginal: strip(val('DateTimeOriginal')),
        description: strip(val('ImageDescription')),
        objectName: strip(val('ObjectName')),
        author: strip(val('Artist')),
        credit: strip(val('Credit')),
        license: val('LicenseShortName'),
        licenseUrl: val('LicenseUrl'),
        lat: val('GPSLatitude') ? Number(val('GPSLatitude')) : null,
        lon: val('GPSLongitude') ? Number(val('GPSLongitude')) : null
      });
    }
  }

  return results;
}

