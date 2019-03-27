/*Skript für Adlerweg; */

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

const div2 = document.getElementById("map2");
const breite2 = div.getAttribute("data2-lat");
const laenge2 = div.getAttribute("data2-lng");
const titel2 = div.getAttribute("data2-title");

//console.log("Breite=",breite,"Länge=",laenge,"Title=",titel);

//  Karte initialisieren
let karte = L.map("map");
//console.log(karte);
 
// auf Ausschnitt zoomen
karte.setView(
    [breite,laenge],
    13
);

// open street map einbauen
L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png").addTo(karte);

//Positionsmarker hinzufügen
let pin = L.marker(
    [breite,laenge]
).addTo(karte);

//Popup zum Pin hängen
pin.bindPopup(titel).openPopup();
pin.bindPopup(titel2).openPopup();