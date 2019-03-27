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
 
// auf Ausschnitt zoomen
karte.setView(
    [47.2, 11.2],
    8
);

// open street map einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionsmarker hinzufügen
let pin1 = L.marker(
    [breite1,laenge1]
).addTo(karte);
pin1.bindPopup(titel1).openPopup();

//Positionsmarker hinzufügen
let pin2 = L.marker(
    [breite2,laenge2]
).addTo(karte);
pin2.bindPopup(titel2).openPopup();
//Popup zum Pin hängen


const blick1 = {
    kunde: "Wilder Kaiser",
    standort: "Gruttenhütte",
    seehoehe: 1640,
    lat: 47.55564,
    lng: 12.31861 
};


const blick2 = {
    kunde: "Bergbahn Scheffau",
    standort: "Brandstadl",
    seehoehe: 1640,
    lat: 47.4912,
    lng: 12.248 
};


const blick3 = {
    kunde: "Lechtal Tourismus",
    standort: "Sonnalm Jöchelspitze",
    seehoehe: 1786,
    lat: 47.275325,
    lng: 10.364524
};


const adlerblicke = [
    blick1,
    blick2,
    blick3
] ;
for (let blick of adlerblicke) {
let blickpin = L.marker(
    [blick.lat, blick.lng]
).addTo(karte)
blickpin.bindPopup(
    `<h1>Standort: ${blick.standort}</h1>
        <p>Höhe: ${blick.seehoehe} m</p>
        <em>Kunde: ${blick.kunde} </em>`
);
}