/*Skript für Adlerweg; */

const div = document.getElementById("map");
const breite1 = div.getAttribute("data-lat1");
const laenge1 = div.getAttribute("data-lng1");
const titel1 = div.getAttribute("data-title1");
const breite2 = div.getAttribute("data-lat2");
const laenge2 = div.getAttribute("data-lng2");
const titel2 = div.getAttribute("data-title2");

//console.log("Breite=",breite,"Länge=",laenge,"Title=",titel);

//  Karte initialisieren
let karte = L.map("map");
//console.log(karte);

const kartenlayer = {
    osm: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href= "https://www.basemap.at">basemap.at</a>'
    }),
};



// open street map einbauen
//L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png",{
// subdomains :["a","b","c"],
// attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
//}).addTo(karte);
//eine Karte muss zumindest in die Karte
kartenlayer.geolandbasemap.addTo(karte);
// SChleife zum Öffnen der Karten
L.control.layers({
    "Geoland Basemap" : kartenlayer.geolandbasemap,
    "Geoland Basempa Grau": kartenlayer.bmapgrau,
    "OpenStreetMap" : kartenlayer.osm,
    "Geoland Basemap Overlay" : kartenlayer.bmapoverlay,
    "Basemap High DPI" : kartenlayer.bmaphidpi,
    "Geoland Basemap Orthofoto" : kartenlayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände" : kartenlayer.bmapgelaende,
    "Geoland Basemap Oberfläche" : kartenlayer.bmapoberflaeche,
}).addTo(karte);

//verschiedene Karten einladen
//kartenlayer.osm.addTo(karte)
//kartenlayer.geolandbasemap.addTo(karte);
//kartenlayer.bmapoverlay.addTo(karte);
//kartenlayer.bmapgrau.addTo(karte);
//kartenlayer.bmaphidpi.addTo(karte);
//kartenlayer.bmaporthofoto30cm.addTo(karte);
//kartenlayer.bmapgelaende.addTo(karte);
//kartenlayer.bmapoberflaeche.addTo(karte);

//Positionsmarker hinzufügen
let pin1 = L.marker(
    [breite1, laenge1]
).addTo(karte);
pin1.bindPopup(titel1).openPopup();

//Positionsmarker hinzufügen
let pin2 = L.marker(
    [breite2, laenge2]
).addTo(karte);
pin2.bindPopup(titel2).openPopup();
//Popup zum Pin hängen


let blickeGruppe = L.featureGroup().addTo(karte)

for (let blick of ADLERBLICKE) {
    let blickpin = L.marker(
        [blick.lat, blick.lng]
    ).addTo(blickeGruppe)
    blickpin.bindPopup(
        `<h1>Standort: ${blick.standort}</h1>
        <p>Höhe: ${blick.seehoehe} m</p>
        <em>Kunde: ${blick.kunde} </em>`
    );
}
//console.log(blickeGruppe.getBounds());
karte.fitBounds(blickeGruppe.getBounds());
// Zoome der Karte durch Blcikegruppe definieren