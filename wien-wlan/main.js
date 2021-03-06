/* Wien OGD Beispiele */

let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

karte.addControl(new L.Control.Fullscreen());

karte.setView([48.208333, 16.373056], 12);




// https://github.com/Norkart/Leaflet-MiniMap
new L.Control.MiniMap(
    L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
    }), {
        zoomLevelOffset: -4,
        toggleDisplay: true
    }
).addTo(karte);

// die Implementierung der Karte startet hier

// EInbau und umbennenung aller Punkte von Sehensuerdigkeiten zu wlan

const urlwlan = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:WLANWIENATOGD&srsName=EPSG:4326&outputFormat=json"

function makeWlan(feature, latlng) {
    const wlanicon = L.icon({
        iconUrl: "http://www.data.wien.gv.at/icons/wlanwienatogd.svg",
        iconSize: [15, 15]
    });
    const wlanmarker = L.marker(latlng, {
        icon: wlanicon
    });
    wlanmarker.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.ADRESSE}</p>
        <hr>
        <footer><a target= "blank", href ="${feature.properties.WEITERE_INFORMATIONEN}">Weblink</a><//footer>
        `);
    return wlanmarker;
}

async function loadwlan(urlwlan) {
    const wlanClusterGruppe = L.markerClusterGroup();
    const response = await fetch(urlwlan);
    const wlanData = await response.json();
    const geoJson = L.geoJson(wlanData, {
        pointToLayer: makeWlan
    });
    wlanClusterGruppe.addLayer(geoJson);
    karte.addLayer(wlanClusterGruppe);
    layerControl.addOverlay(wlanClusterGruppe, "Public Wlan-Standorte");

    const wlanFeld = new L.Control.Search({
        layer: wlanClusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false
    });
    karte.addControl(wlanFeld);
}
loadwlan(urlwlan)


const url = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD &srsName=EPSG:4326&outputFormat=json"

function makeMarker(feature, latlng) {
    const fotoicon = L.icon({
        iconUrl: "http://www.data.wien.gv.at/icons/sehenswuerdigogd.svg",
        iconSize: [15, 15]
    });
    const sightmarker = L.marker(latlng, {
        icon: fotoicon
    });
    sightmarker.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.BEMERKUNG}</p>
        <hr>
        <footer><a target= "blank", href ="${feature.properties.WEITERE_INF}">Weblink</a><//footer>
        `);
    return sightmarker;
}

async function loadSights(url) {
    const sehenswuerdigkeitenClusterGruppe = L.markerClusterGroup();
    const response = await fetch(url);
    const sightsData = await response.json();
    const geoJson = L.geoJson(sightsData, {
        pointToLayer: makeMarker
    });
    sehenswuerdigkeitenClusterGruppe.addLayer(geoJson);
    karte.addLayer(sehenswuerdigkeitenClusterGruppe);
    layerControl.addOverlay(sehenswuerdigkeitenClusterGruppe, "Sehenswürdigkeiten");


}
loadSights(url)

const wege = "https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERLINIEOGD &srsName=EPSG:4326&outputFormat=json"

function linenPopup (feature, layer){
    const popup = 
    ` <h3>${feature.properties.NAME}</h3>`;
    layer.bindPopup(popup);
}


async function loadWege(wegeUrl) {
    const antwort = await fetch (wegeUrl);
    const wegeData = await antwort.json();
    const wegeJson = L.geoJson(wegeData, {
        style: function() {
            return {
                color: "green"
            };
        },
        onEachFeature: linenPopup
    });
    karte.addLayer(wegeJson);
    layerControl.addOverlay(wegeJson, "Spazierwege");
}
loadWege(wege);




const Massstab = L.control.scale({
    imperial: false,
    metric: true

});
Massstab.addTo(karte);