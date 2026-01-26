/*
{name::String
points::Vector of [lat::Float, lon::Float]
visible::Bool
color::String
customColor::String (hex)
}
*/
let routesData = [];
let routesPolylines = [];

const colors = ['red','blue','green','orange','purple','black'];

// MARK: Retrieve routes from localStorage and display
function loadRoutes(){
    setHtmlForRouteControls();
    restoreRoutesFromStorage();
    setHtmlForRouteData(routesData);
}

function setHtmlForRouteControls(){
    document.getElementById("route controls").innerHTML = `
    <hr>
    <div class="route-controls">
    <button onClick="importRoute()" title="${l10n.import_route}">${l10n.import_route}</button>
    <button onClick="deleteAllRoutes()" title="${l10n.delete_all_routes}">${l10n.delete_all_routes}</button>
    </div>
    `;
}

function restoreRoutesFromStorage(){
  let routes_data = localStorage.getItem("routes");
  if (routes_data == null) {
    localStorage.setItem("routes",JSON.stringify([]));
  }
  routesData = JSON.parse(localStorage.getItem("routes"));
  for (let route of routesData){
    let polyline = route2Polyline(route);
    polyline.addTo(map);
    routesPolylines.push(polyline);
  }
}

function setHtmlForRouteData(routesData){
    routesHtml = routesData.map(route2html).join("\n");
    document.getElementById("loaded routes").innerHTML = routesHtml;
    document.querySelectorAll('.route-entry').forEach((entry, index) => {
        entry.style.setProperty('--routecolor', routesData[index].color);
    });
}

// MARK: Build HTML string for a route entry
function route2html(route, index){
    return `
    <div class="route-entry">
        <div class="route-header">
            <h3>${route.name || "Unnamed"}</h3>
            <div class="route-actions">
                <button title="${l10n.center_route}" onClick="centerRoute(event, ${index})"><i class="fa fa-map-pin"></i></button>
                <button  title="${l10n.toggle_visibility}" onClick="updateRouteVisibility(event, ${index})"><i class="fa ${route.visible ? 'fa-eye' : 'fa-eye-slash'}"></i></button>
                <button title="${l10n.delete_route}" onClick="deleteRoute(${index})"><i class="fa fa-trash"></i></button>
            </div>
        </div>
        ${colorpickerHtml(index, route)}
    </div>
    `;
}

function colorpickerHtml(index, route){
    let selectedColor = route.color
    let swatchHtml = colors.map(color => {
        return `<span
            class="color-swatch ${color === selectedColor ? 'selected' : ''}"
            style="background-color: ${color};"
            onClick="updateRouteColor(event, ${index}, '${color}')"
            ></span>`;
    }).join("\n");
    let isCustomColor = !colors.includes(selectedColor);

    return `
    <div class="color-picker">
        ${swatchHtml}
        <input type="color"
        class="color-swatch ${isCustomColor ? 'selected' : ''}"
        value="${route.customColor}"
        title="${l10n.custom_color}"
        onClick="updateRouteColor(event, ${index}, this.value)"
        onInput="updateRouteColor(event, ${index}, this.value)"
        />
    </div>
    `;
}

// MARK: Event handlers for each route entry
function centerRoute(event, index){
    let route = routesPolylines[index];
    let bounds = route.getBounds();
    map.fitBounds(bounds, { maxZoom: 16 });

    // make route visible if not already
    if (!routesData[index].visible){
        let centerButton = event.target ? event.target.closest('button') : null;
        if (!centerButton) return;
        let actionsContainer = centerButton.closest('.route-actions')
        let visibilityIcon = actionsContainer.querySelector('.fa-eye-slash');
        updateRouteVisibilityByIcon(visibilityIcon, index);
    }
}

function updateRouteVisibility(event, index){
    let button = event.target ? event.target.closest('button') : null;
    if (!button) return;
    let icon = button.querySelector('i');
    updateRouteVisibilityByIcon(icon, index);
}

function updateRouteVisibilityByIcon(icon, index){
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');

    routesData[index].visible = !routesData[index].visible;
    routesPolylines[index].setStyle({ opacity: routesData[index].visible ? 1.0 : 0.0 });

    updateRoutesStorage(routesData);
}

function deleteRoute(index){
    routesData.splice(index, 1);
    routesPolylines[index].remove();
    routesPolylines.splice(index, 1);

    updateRoutesStorage(routesData);
    setHtmlForRouteData(routesData);
}

function updateRouteColor(event, index, color){
    let clickedSwatch = event.target ? event.target.closest('.color-swatch') : null;
    if (!clickedSwatch) return;

    // unselect previous swatch
    let picker = clickedSwatch.closest('.color-picker');
    let prev = picker.querySelector('.color-swatch.selected');
    if (prev && prev !== clickedSwatch) prev.classList.remove('selected');

    clickedSwatch.classList.add('selected');

    // update background color
    let routeEntry = clickedSwatch.closest('.route-entry');
    routeEntry.style.setProperty('--routecolor', color);

    routesData[index].color = color;
    if (!colors.includes(color)){
        routesData[index].customColor = color;
    }
    routesPolylines[index].setStyle({ color: color })
    updateRoutesStorage(routesData);
}

// MARK: Handler for control buttons
function importRoute(){
    let input = document.createElement('input');
    input.type = 'file';
    input.accept = '.gpx,application/gpx+xml,text/xml,application/xml';
    input.addEventListener('change', (ev) => {
        let file = ev.target.files && ev.target.files[0];
        if (!file) return;
        let reader = new FileReader();
        reader.onload = () => {
            try {
                let text = reader.result;
                let route = parseGpxToRoute(text, file.name);
                if (route && route.points && route.points.length) {
                    appendRoute(route);
                } else {
                    alert('No track/route points found in GPX file.');
                }
            } catch (err) {
                console.error(err);
                alert('Failed to parse GPX file.');
            }
        };
        reader.readAsText(file);
    });
    input.click();
}

function parseGpxToRoute(gpxText, filename) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(gpxText, 'application/xml');
    let trackPoints = Array.from(doc.querySelectorAll('trkpt'));
    let routePoints = Array.from(doc.querySelectorAll('rtept'));
    let source = trackPoints.length ? trackPoints : routePoints;
    let points = source.map(pt => {
        let lat = parseFloat(pt.getAttribute('lat'));
        let lon = parseFloat(pt.getAttribute('lon'));
        return [lat, lon];
    }).filter(p => Number.isFinite(p[0]) && Number.isFinite(p[1]));
    let nameElement = doc.querySelector('metadata > name') || doc.querySelector('trk > name') || doc.querySelector('rte > name');
    let name = nameElement ? nameElement.textContent.trim() : filename.replace(/\.gpx$/i, '');
    let used_colors = routesData.map(r => r.color);
    let color = colors.find(c => !used_colors.includes(c)) || colors[routesData.length % colors.length];

    return { name: name || 'Imported Route', points, visible: true, color: color, customColor: '#FF0000' };
}

function appendRoute(route){
    routesData.push(route);
    let polyline = route2Polyline(route);
    polyline.addTo(map);
    routesPolylines.push(polyline);

    updateRoutesStorage(routesData);
    setHtmlForRouteData(routesData);
}

function deleteAllRoutes(){
    routesData = [];
    routesPolylines.forEach(polyline => polyline.remove());
    routesPolylines = [];

    updateRoutesStorage(routesData);
    setHtmlForRouteData(routesData);
}

function updateRoutesStorage(routesData){
    localStorage.setItem("routes",JSON.stringify(routesData));
}

function route2Polyline(route){
    return L.polyline(route.points, {color: route.color, opacity: route.visible ? 1.0 : 0.0 });
}