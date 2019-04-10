
//console.log("Breite=",breite,"Länge=",laenge,"Title=",titel);

//  Karte initialisieren
let karte = L.map("map");

const kartenlayer= {
    
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
}

//eine Karte muss zumindest in die Karte
kartenlayer.geolandbasemap.addTo(karte);
// SChleife zum Öffnen der Karten
L.control.layers({
    "Geoland Basemap": kartenlayer.geolandbasemap,
    "Geoland Basempa Grau": kartenlayer.bmapgrau,
    "OpenStreetMap": kartenlayer.osm,
    "Geoland Basemap Overlay": kartenlayer.bmapoverlay,
    "Basemap High DPI": kartenlayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenlayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenlayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenlayer.bmapoberflaeche,
    "Stamen Toner": kartenlayer.stamen_toner,
    "Stamen Terrain": kartenlayer.stamen_terrain,
    "Stamen Watercoler": kartenlayer.stamen_watercolor
}).addTo(karte);

karte.setView(
      [47.267222,11.392778],13
)

//let positionsMarker = L.marker([47,11]).addTo(karte);

//karte.locate({
   // setView : true,
    // maxZoom : 18,
    //watch : true,
//});

console.log(SPORT)


for ( let statte of SPORT){
    console.log(statte)
    let positionsMarker = L.marker (
        [statte.lat, statte.lng]
    ).addTo(karte);
    positionsMarker.bindPopup(
        `<h3>${statte.name}</h3>
        <p>${statte.typ}</p>`
    )
}

// piktogramm einbinden bzw definiteren
let piktogramm = L.Icon({
    iconUrl : `icons/icon_${statte.icon}_schwarz_auf_weis_250px.png`
});

// Marker zeichen
let positionsMarker = L.marker(
    [statte.lat, statte.lng], {
        icon :piktogramm
    }
).addTo(karte);