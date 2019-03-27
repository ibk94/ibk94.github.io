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
    [breite1,laenge1],
    11
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

