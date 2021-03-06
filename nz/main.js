/*Skript für Neuseelandreise; */

//const div = document.getElementById("map");
//const breite1 = div.getAttribute("data-lat1");
//const laenge1 = div.getAttribute("data-lng1");
//const titel1 = div.getAttribute("data-title1");
//const breite2 = div.getAttribute("data-lat2");
//const laenge2 = div.getAttribute("data-lng2");
//const titel2 = div.getAttribute("data-title2");

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

//console.log("Breite=",breite,"Länge=",laenge,"Title=",titel);

//  Karte initialisieren
let karte = L.map("map");
//console.log(karte);

// auf Ausschnitt zoomen
karte.setView(
    [breite, laenge],
    13
);


const kartenlayer = {
    osm: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>'
    }),
};





// open street map einbauen
//L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//eine Karte muss zumindest in die Karte
kartenlayer.osm.addTo(karte);
// SChleife zum Öffnen der Karten
L.control.layers({
    "Stamen Toner": kartenlayer.stamen_toner,
    "OpenStreetMap": kartenlayer.osm,
    "Stamen Terrain": kartenlayer.stamen_terrain,
    "Stamen Watercoler": kartenlayer.stamen_watercolor
}).addTo(karte);

//Positionsmarker hinzufügen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);

//Systeme in Karte einbinden
//karte.fitBounds(blickeGruppe.getBounds());
//Vollbildmodus
karte.addControl(new L.Control.Fullscreen());
//Karte bleibt bei einer Stelle
var hash = new L.Hash(karte);
//Koordinaten werden angezeigt
var coords = new L.Control.Coordinates();
coords.addTo(karte);
karte.on('click', function (e) {
    coords.setCoordinates(e);
});

//Popup zum Pin hängen
pin.bindPopup(titel).openPopup();