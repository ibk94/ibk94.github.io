//console.log("Breite=",breite,"Länge=",laenge,"Title=",titel);

//  Karte initialisieren
let karte = L.map("map");

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
const layerControl = L.control.layers({
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
    [47.267222, 11.392778], 15
)

//console.log(AWS);

//Livedaten vom Server ziehen

async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            //console.log("Layer",layer);
            const date = new Date(layer.feature.properties.date);
            console.log("Datum:", date);
            return `<h4>${layer.feature.properties.name}</h4>
            Höhe (m): ${layer.feature.geometry.coordinates[2]}<br>
            Temperatur: ${layer.feature.properties.LT} °C <br>
            Datum: ${date.toLocaleDateString("de-AT")}
            ${date.toLocaleTimeString("de-AT")} <br>
            Windgeschwindigkeit: ${layer.feature.properties.WG ? layer.feature.properties.WG + `km/h`: `keine Daten`}
            <hr>
            <footer>Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a></footer>
            `;
        })
        .addTo(awsTirol);
    // awsTirol.addTo(karte);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");
    //Windrichtungen einrichten

    const windLayer = L.featureGroup();
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = "black";
                if (feature.properties.WG > 20) {
                    color = "red";
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style= "color: ${color}; transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    //windLayer.addTo(karte);

    // Temperatur Layer


    const temperaturLayer = L.featureGroup();
    const farbPalette = [
        [0, "blue"],
        [1, "yellow"],
        [5, "orange"],
        [10, "red"],
    ]

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                let color = "red";
                for (let i = 0; i < farbPalette.length; i++) {
                    console.log(farbPalette[i], feature.properties.LT);
                    if (feature.properties.LT < farbPalette[i][0]) {
                        color = farbPalette[i][1];
                        break;
                    }
                }


                //let color = "blue";
                //if (feature.properties.LT > 0) {
                //    color = "red";
                // }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class= "temperaturLabel" style="background-color: ${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(temperaturLayer);
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    temperaturLayer.addTo(karte);
}

loadStations();

//Farbpalette Wetter online
//<svg id="www" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 562 76"><style>.st0{opacity:.95}.st1{fill:#00537f}.st2{fill:none}.st3{enable-background:new}.st4{fill:#fff}.st5{fill:#646664}.st6{fill:#8c8a8c}.st7{fill:#b4b2b4}.st8{fill:#cccecc}.st9{fill:#e4e6e4}.st10{fill:#772d76}.st11{fill:#b123b0}.st12{fill:#d219d1}.st13{fill:#f0f}.st14{fill:#ff94ff}.st15{fill:#3800d1}.st16{fill:#325afe}.st17{fill:#2695ff}.st18{fill:#00cdff}.st19{fill:#007800}.st20{fill:#009d00}.st21{fill:#00bc02}.st22{fill:#00e200}.st23{fill:#0f0}.st24{fill:#fcff00}.st25{fill:#fdf200}.st26{fill:#fde100}.st27{fill:#ffd100}.st28{fill:#ffbd00}.st29{fill:#ffad00}.st30{fill:#ff9c00}.st31{fill:#ff7800}.st32{fill:red}.st33{fill:#f30102}.st34{fill:#d20000}.st35{fill:#c10000}.st36{fill:#b10000}.st37{fill:#a10000}.st38{fill:#900000}.st39{fill:#770100}.st40{fill:#5f0100}.st41{fill:#460101}.st42{fill:#2e0203}.st43{fill:#00fffe}</style><g id="Bild_xA0_150_1_"><path class="st0 st1" d="M4 0C1.79 0 0 1.79 0 4v68c0 2.21 1.79 4 4 4h558V0H4z" id="Abgerundetes_Rechteck_1_Kopie_2_9_"/><path class="st2" d="M481 48h40.25v20.25H481z"/><g class="st3"><path class="st4" d="M491.52 58.96c0 .24-.04.42-.11.56s-.17.2-.3.2h-1.57v2.92c0 .06-.01.11-.04.15s-.08.07-.16.1-.17.05-.29.06a5.036 5.036 0 0 1-.89 0c-.12-.01-.21-.04-.28-.06s-.12-.06-.14-.1a.241.241 0 0 1-.04-.15v-2.92h-5.69c-.09 0-.16-.01-.21-.03s-.11-.06-.15-.12a.524.524 0 0 1-.1-.25c-.02-.11-.03-.25-.03-.42 0-.14 0-.26.01-.37s.02-.21.04-.3.05-.17.09-.26c.04-.08.08-.17.13-.26l4.96-8.44c.04-.06.09-.11.16-.15s.16-.08.27-.11.24-.05.4-.06c.16-.01.35-.02.57-.02.24 0 .45.01.63.03s.32.04.43.07.19.07.25.11c.06.05.09.1.09.17v8.87h1.57c.12 0 .22.06.3.19.06.14.1.34.1.59zm-3.83-8.39h-.02l-4.47 7.63h4.49v-7.63zm14.85 5.36c0 1.07-.08 2.04-.25 2.92s-.45 1.64-.84 2.27c-.39.63-.9 1.12-1.53 1.47-.63.35-1.41.52-2.33.52-.87 0-1.61-.16-2.21-.47s-1.08-.77-1.45-1.38c-.37-.6-.62-1.35-.78-2.23-.15-.88-.23-1.9-.23-3.04 0-1.06.09-2.03.26-2.92.17-.88.45-1.64.84-2.28.39-.63.89-1.12 1.53-1.47.63-.35 1.4-.52 2.32-.52.88 0 1.62.16 2.22.47s1.08.77 1.44 1.38c.37.6.62 1.35.78 2.23.15.89.23 1.91.23 3.05zm-1.89.13c0-.69-.03-1.32-.08-1.87s-.12-1.04-.22-1.46-.22-.79-.38-1.09c-.15-.3-.34-.56-.55-.75-.21-.2-.46-.34-.74-.43s-.59-.13-.93-.13c-.61 0-1.1.14-1.48.43s-.68.68-.9 1.18-.37 1.09-.45 1.76-.12 1.4-.12 2.17c0 1.04.05 1.92.16 2.65s.28 1.32.51 1.78.53.79.89 1 .8.31 1.32.31c.4 0 .75-.06 1.06-.19.3-.13.56-.31.78-.55.22-.24.4-.53.54-.87s.26-.71.34-1.12.14-.85.18-1.33c.05-.48.07-.97.07-1.49z"/></g><path class="st2" d="M415.25 47.75h40.25V68h-40.25z"/><g class="st3"><path class="st4" d="M425.07 58.69c0 .64-.11 1.21-.33 1.72-.22.51-.54.95-.96 1.32-.42.37-.93.65-1.54.84-.61.2-1.3.3-2.06.3-.47 0-.9-.04-1.31-.11-.4-.08-.76-.17-1.08-.27-.32-.1-.58-.21-.78-.32-.21-.11-.34-.19-.39-.24a.789.789 0 0 1-.12-.15c-.03-.05-.05-.11-.08-.18s-.04-.16-.05-.26c-.01-.1-.02-.23-.02-.38 0-.26.03-.44.08-.54s.12-.15.22-.15c.07 0 .2.06.39.17.2.11.45.24.75.37s.66.26 1.07.37.86.17 1.36.17c.48 0 .91-.06 1.28-.18s.68-.29.93-.52c.25-.22.44-.49.56-.79s.19-.64.19-.99c0-.39-.08-.75-.24-1.06-.16-.32-.39-.59-.7-.82s-.68-.4-1.13-.53c-.45-.12-.96-.18-1.53-.18h-1.36c-.06 0-.12-.01-.17-.04-.06-.02-.1-.07-.14-.12s-.07-.13-.1-.23c-.03-.09-.04-.21-.04-.37 0-.14.01-.25.03-.34s.05-.16.09-.21.08-.09.13-.12.11-.04.17-.04h1.21c.47 0 .9-.06 1.27-.18.38-.12.7-.3.96-.53.26-.23.46-.5.6-.82s.21-.68.21-1.07c0-.29-.05-.56-.14-.82-.09-.26-.23-.49-.42-.68s-.42-.35-.71-.46c-.29-.11-.62-.17-1-.17-.42 0-.8.06-1.14.19a7.262 7.262 0 0 0-1.61.8c-.18.13-.3.19-.38.19-.05 0-.09-.01-.13-.03s-.07-.05-.1-.11a.606.606 0 0 1-.05-.23c-.01-.1-.02-.22-.02-.38 0-.11 0-.2.01-.29.01-.08.02-.15.04-.21s.05-.12.08-.17.08-.11.15-.18.21-.17.41-.29.46-.26.77-.38c.3-.13.65-.23 1.05-.32s.82-.13 1.28-.13c.64 0 1.21.08 1.7.25.49.17.89.4 1.22.7s.57.66.73 1.08c.16.42.24.88.24 1.39 0 .44-.06.84-.17 1.22-.12.38-.28.71-.5 1s-.49.54-.82.74c-.32.2-.69.34-1.12.42v.02c.48.05.92.17 1.32.36.4.19.74.43 1.03.71s.51.62.67 1c.16.41.24.82.24 1.26zm11.72-3.01c0 1.07-.08 2.04-.25 2.92s-.45 1.64-.84 2.27c-.39.63-.9 1.12-1.53 1.47-.63.35-1.41.52-2.33.52-.87 0-1.61-.16-2.21-.47s-1.08-.77-1.45-1.38c-.37-.6-.62-1.35-.78-2.23-.15-.88-.23-1.9-.23-3.04 0-1.06.09-2.03.26-2.92.17-.88.45-1.64.84-2.28.39-.63.89-1.12 1.53-1.47.63-.35 1.4-.52 2.32-.52.88 0 1.62.16 2.22.47s1.08.77 1.44 1.38c.37.6.62 1.35.78 2.23.15.89.23 1.91.23 3.05zm-1.89.13c0-.69-.03-1.32-.08-1.87s-.12-1.04-.22-1.46-.22-.79-.38-1.09c-.15-.3-.34-.56-.55-.75-.21-.2-.46-.34-.74-.43s-.59-.13-.93-.13c-.61 0-1.1.14-1.48.43s-.68.68-.9 1.18-.37 1.09-.45 1.76-.12 1.4-.12 2.17c0 1.04.05 1.92.16 2.65s.28 1.32.51 1.78.53.79.89 1 .8.31 1.32.31c.4 0 .75-.06 1.06-.19.3-.13.56-.31.78-.55.22-.24.4-.53.54-.87s.26-.71.34-1.12.14-.85.18-1.33c.05-.48.07-.97.07-1.49z"/></g><path class="st2" d="M346.75 47.75H387V68h-40.25z"/><g class="st3"><path class="st4" d="M356.68 61.87c0 .13-.01.24-.03.34s-.04.18-.07.25-.08.12-.13.15-.11.05-.18.05h-7.68c-.1 0-.19-.01-.26-.04a.516.516 0 0 1-.19-.12c-.05-.06-.09-.14-.12-.25s-.04-.24-.04-.4c0-.14.01-.27.02-.38s.04-.2.07-.29c.04-.08.08-.16.14-.25.06-.08.13-.17.22-.26l2.78-2.86c.64-.66 1.16-1.25 1.54-1.77.39-.52.69-1 .9-1.43s.35-.82.42-1.17.1-.68.1-.99-.05-.6-.16-.88c-.1-.28-.25-.52-.45-.72-.2-.21-.44-.37-.74-.49s-.64-.18-1.02-.18c-.45 0-.86.06-1.21.18-.36.12-.67.25-.94.4s-.5.28-.68.4c-.18.12-.32.18-.41.18a.23.23 0 0 1-.14-.04c-.04-.03-.07-.08-.1-.14s-.05-.15-.06-.26a4.202 4.202 0 0 1-.01-.67.878.878 0 0 1 .11-.36c.03-.05.09-.11.17-.19.09-.08.23-.18.45-.31.21-.13.48-.26.79-.38.32-.13.67-.23 1.05-.32s.79-.13 1.21-.13c.67 0 1.26.09 1.77.28.51.19.92.45 1.26.78.33.33.58.71.75 1.15.16.44.25.9.25 1.4 0 .44-.04.89-.12 1.33-.08.44-.25.92-.5 1.43-.25.51-.62 1.08-1.1 1.71-.48.63-1.12 1.35-1.91 2.16l-2.2 2.3h6.05c.06 0 .11.02.17.05.05.03.1.08.14.14s.07.14.09.24c-.01.12 0 .23 0 .36zm11.61-6.19c0 1.07-.08 2.04-.25 2.92s-.45 1.64-.84 2.27c-.39.63-.9 1.12-1.53 1.47-.63.35-1.41.52-2.33.52-.87 0-1.61-.16-2.21-.47s-1.08-.77-1.45-1.38c-.37-.6-.62-1.35-.78-2.23-.15-.88-.23-1.9-.23-3.04 0-1.06.09-2.03.26-2.92.17-.88.45-1.64.84-2.28.39-.63.89-1.12 1.53-1.47.63-.35 1.4-.52 2.32-.52.88 0 1.62.16 2.22.47s1.08.77 1.44 1.38c.37.6.62 1.35.78 2.23.15.89.23 1.91.23 3.05zm-1.89.13c0-.69-.03-1.32-.08-1.87s-.12-1.04-.22-1.46-.22-.79-.38-1.09c-.15-.3-.34-.56-.55-.75-.21-.2-.46-.34-.74-.43s-.59-.13-.93-.13c-.61 0-1.1.14-1.48.43s-.68.68-.9 1.18-.37 1.09-.45 1.76-.12 1.4-.12 2.17c0 1.04.05 1.92.16 2.65s.28 1.32.51 1.78.53.79.89 1 .8.31 1.32.31c.4 0 .75-.06 1.06-.19.3-.13.56-.31.78-.55.22-.24.4-.53.54-.87s.26-.71.34-1.12.14-.85.18-1.33c.05-.48.07-.97.07-1.49z"/></g><path class="st2" d="M278.75 47.75H319V68h-40.25z"/><g class="st3"><path class="st4" d="M288.71 61.94c0 .14-.01.25-.03.34s-.05.17-.09.23-.08.1-.12.12c-.05.02-.1.04-.15.04h-7.26a.23.23 0 0 1-.14-.04.679.679 0 0 1-.12-.12c-.04-.06-.07-.13-.09-.23s-.03-.21-.03-.34.01-.24.03-.33.05-.17.08-.23.07-.11.12-.14.1-.05.16-.05h2.9V50.61l-2.69 1.6c-.14.07-.25.11-.33.13s-.15 0-.2-.05c-.05-.05-.08-.12-.1-.23-.02-.11-.03-.24-.03-.41 0-.12.01-.23.02-.31s.03-.16.05-.21.05-.11.09-.15.09-.09.16-.13l3.2-2.05c.03-.02.06-.04.11-.05s.1-.03.16-.04.14-.02.23-.03h.32c.17 0 .32.01.43.02s.2.03.27.06c.06.02.11.06.13.1.02.04.03.08.03.12v12.21h2.51c.06 0 .11.02.16.05.05.03.09.08.12.14.03.06.06.14.08.23.01.09.02.2.02.33zm11.58-6.26c0 1.07-.08 2.04-.25 2.92s-.45 1.64-.84 2.27c-.39.63-.9 1.12-1.53 1.47-.63.35-1.41.52-2.33.52-.87 0-1.61-.16-2.21-.47s-1.08-.77-1.45-1.38c-.37-.6-.62-1.35-.78-2.23-.15-.88-.23-1.9-.23-3.04 0-1.06.09-2.03.26-2.92.17-.88.45-1.64.84-2.28.39-.63.89-1.12 1.53-1.47.63-.35 1.4-.52 2.32-.52.88 0 1.62.16 2.22.47s1.08.77 1.44 1.38c.37.6.62 1.35.78 2.23.15.89.23 1.91.23 3.05zm-1.89.13c0-.69-.03-1.32-.08-1.87s-.12-1.04-.22-1.46-.22-.79-.38-1.09c-.15-.3-.34-.56-.55-.75-.21-.2-.46-.34-.74-.43s-.59-.13-.93-.13c-.61 0-1.1.14-1.48.43s-.68.68-.9 1.18-.37 1.09-.45 1.76-.12 1.4-.12 2.17c0 1.04.05 1.92.16 2.65s.28 1.32.51 1.78.53.79.89 1 .8.31 1.32.31c.4 0 .75-.06 1.06-.19.3-.13.56-.31.78-.55.22-.24.4-.53.54-.87s.26-.71.34-1.12.14-.85.18-1.33c.05-.48.07-.97.07-1.49z"/></g><path class="st2" d="M214.75 47.75H255V68h-40.25z"/><path class="st3 st4" d="M225.14 55.68c0 1.07-.08 2.04-.25 2.92-.17.88-.45 1.64-.84 2.27s-.9 1.12-1.53 1.47c-.63.35-1.41.52-2.33.52-.87 0-1.61-.16-2.21-.47s-1.08-.77-1.44-1.38c-.37-.6-.62-1.35-.78-2.23-.15-.88-.23-1.9-.23-3.04 0-1.06.09-2.03.26-2.92.17-.88.45-1.64.84-2.28.39-.63.9-1.12 1.53-1.47.63-.35 1.4-.52 2.32-.52.88 0 1.62.16 2.22.47s1.08.77 1.44 1.38c.37.6.62 1.35.78 2.23.14.89.22 1.91.22 3.05zm-1.89.13c0-.69-.03-1.32-.08-1.87s-.12-1.04-.22-1.46-.22-.79-.38-1.09c-.15-.3-.34-.56-.55-.75-.21-.2-.46-.34-.74-.43s-.59-.13-.93-.13c-.61 0-1.1.14-1.48.43-.38.29-.68.68-.9 1.18s-.37 1.09-.45 1.76-.12 1.4-.12 2.17c0 1.04.05 1.92.16 2.65s.28 1.32.51 1.78.53.79.89 1 .8.31 1.32.31c.4 0 .75-.06 1.06-.19.3-.13.57-.31.78-.55.22-.24.4-.53.54-.87s.26-.71.34-1.12.15-.85.18-1.33c.05-.48.07-.97.07-1.49z"/><path class="st2" d="M137 47.75h40.25V68H137z"/><g class="st3"><path class="st4" d="M142.99 57.24c0 .28-.03.47-.1.58s-.16.16-.28.16h-4.49c-.13 0-.23-.06-.29-.17-.06-.11-.1-.3-.1-.58s.03-.46.1-.57.16-.16.29-.16h4.49c.06 0 .11.01.16.03s.09.06.12.12.06.14.08.23c.01.11.02.23.02.36zm10.7 4.7c0 .14-.01.25-.03.34s-.05.17-.09.23-.08.1-.12.12c-.05.02-.1.04-.15.04h-7.26a.23.23 0 0 1-.14-.04.679.679 0 0 1-.12-.12c-.04-.06-.07-.13-.09-.23s-.03-.21-.03-.34.01-.24.03-.33.05-.17.08-.23.07-.11.12-.14c.05-.03.1-.05.16-.05h2.9V50.61l-2.69 1.6c-.14.07-.25.11-.33.13-.08.01-.15 0-.2-.05s-.08-.12-.1-.23-.03-.24-.03-.41c0-.12.01-.23.02-.31s.03-.16.05-.21.05-.11.09-.15.09-.09.16-.13l3.2-2.05c.03-.02.06-.04.11-.05s.1-.03.16-.04.14-.02.23-.03h.32c.17 0 .31.01.43.02.11.01.2.03.27.06.06.02.11.06.13.1.02.04.03.08.03.12v12.21h2.51c.06 0 .11.02.16.05s.09.08.12.14c.03.06.06.14.08.23.01.09.02.2.02.33zm11.58-6.26c0 1.07-.08 2.04-.25 2.92-.17.88-.45 1.64-.84 2.27s-.9 1.12-1.53 1.47c-.63.35-1.41.52-2.33.52-.87 0-1.61-.16-2.21-.47s-1.08-.77-1.44-1.38c-.37-.6-.62-1.35-.78-2.23-.15-.88-.23-1.9-.23-3.04 0-1.06.09-2.03.26-2.92.17-.88.45-1.64.84-2.28.39-.63.9-1.12 1.53-1.47.63-.35 1.4-.52 2.32-.52.88 0 1.62.16 2.22.47s1.08.77 1.44 1.38c.37.6.62 1.35.78 2.23.15.89.22 1.91.22 3.05zm-1.89.13c0-.69-.03-1.32-.08-1.87s-.12-1.04-.22-1.46-.22-.79-.38-1.09c-.15-.3-.34-.56-.55-.75-.21-.2-.46-.34-.74-.43s-.58-.13-.93-.13c-.61 0-1.1.14-1.48.43-.38.29-.68.68-.9 1.18s-.37 1.09-.45 1.76-.12 1.4-.12 2.17c0 1.04.05 1.92.16 2.65s.28 1.32.51 1.78.53.79.89 1 .8.31 1.32.31c.4 0 .75-.06 1.06-.19s.57-.31.78-.55c.22-.24.4-.53.54-.87s.26-.71.34-1.12.14-.85.18-1.33c.06-.48.07-.97.07-1.49z"/></g><path class="st2" d="M68.75 47.75H109V68H68.75z"/><g class="st3"><path class="st4" d="M74.74 57.24c0 .28-.03.47-.1.58s-.16.16-.28.16h-4.49c-.13 0-.23-.06-.29-.17-.06-.11-.1-.3-.1-.58s.03-.46.1-.57.16-.16.29-.16h4.49c.06 0 .11.01.16.03s.09.06.12.12.06.14.08.23c.01.11.02.23.02.36zm10.67 4.63c0 .13-.01.24-.03.34s-.04.18-.08.25c-.03.07-.08.12-.13.15s-.11.05-.18.05h-7.68c-.1 0-.19-.01-.26-.04-.08-.03-.14-.07-.19-.12s-.09-.14-.12-.25c-.03-.11-.04-.24-.04-.4 0-.14.01-.27.02-.38s.04-.2.07-.29c.04-.08.08-.16.14-.25.06-.08.13-.17.22-.26l2.78-2.86c.64-.66 1.16-1.25 1.54-1.77.39-.52.69-1 .9-1.43s.35-.82.42-1.17.1-.68.1-.99-.05-.6-.16-.88c-.1-.28-.25-.52-.45-.72s-.44-.37-.74-.49-.64-.18-1.02-.18c-.45 0-.86.06-1.21.18s-.67.25-.94.4c-.27.14-.5.28-.68.4-.18.12-.32.18-.4.18a.23.23 0 0 1-.14-.04c-.04-.03-.07-.08-.1-.14s-.05-.15-.06-.26a4.202 4.202 0 0 1-.01-.67.878.878 0 0 1 .11-.36c.03-.05.09-.11.17-.19.09-.08.23-.18.45-.31.21-.13.48-.26.79-.38.32-.13.67-.23 1.05-.32s.79-.13 1.21-.13c.67 0 1.26.09 1.77.28.5.19.92.45 1.26.78s.58.71.75 1.15c.16.44.25.9.25 1.4 0 .44-.04.89-.12 1.33-.08.44-.25.92-.5 1.43-.25.51-.62 1.08-1.1 1.71-.48.63-1.12 1.35-1.91 2.16l-2.2 2.3h6.05c.06 0 .11.02.17.05.05.03.1.08.14.14.04.06.07.14.09.24-.01.12 0 .23 0 .36zm11.61-6.19c0 1.07-.08 2.04-.25 2.92-.17.88-.45 1.64-.84 2.27s-.9 1.12-1.53 1.47c-.63.35-1.41.52-2.33.52-.87 0-1.61-.16-2.21-.47s-1.08-.77-1.44-1.38c-.37-.6-.62-1.35-.78-2.23-.15-.88-.23-1.9-.23-3.04 0-1.06.09-2.03.26-2.92.17-.88.45-1.64.84-2.28.39-.63.9-1.12 1.53-1.47.63-.35 1.4-.52 2.32-.52.88 0 1.62.16 2.22.47s1.08.77 1.44 1.38c.37.6.62 1.35.78 2.23.15.89.22 1.91.22 3.05zm-1.89.13c0-.69-.03-1.32-.08-1.87s-.12-1.04-.22-1.46-.22-.79-.38-1.09c-.15-.3-.34-.56-.55-.75-.21-.2-.46-.34-.74-.43s-.58-.13-.93-.13c-.61 0-1.1.14-1.48.43-.38.29-.68.68-.9 1.18s-.37 1.09-.45 1.76c-.08.67-.12 1.4-.12 2.17 0 1.04.05 1.92.16 2.65s.28 1.32.51 1.78.53.79.89 1 .8.31 1.32.31c.4 0 .75-.06 1.06-.19s.57-.31.78-.55c.22-.24.4-.53.54-.87s.26-.71.34-1.12.14-.85.18-1.33c.06-.48.07-.97.07-1.49z"/></g><g id="Ebene_1_Kopie_Kopie_Kopie"><path class="st5" d="M20.04 34.02h10.03v-14H20.04c-2.21 0-4 1.79-4 4v6c0 2.21 1.79 4 4 4z"/><path class="st6" d="M29.67 20.02H43.7v14H29.67z"/><path class="st7" d="M43.3 20.02h14.03v14H43.3z"/><path class="st8" d="M56.93 20.02h14.03v14H56.93z"/><path class="st9" d="M70.56 20.02h14.03v14H70.56z"/><path class="st10" d="M84.2 20.02h14.03v14H84.2z"/><path class="st11" d="M97.83 20.02h14.03v14H97.83z"/><path class="st12" d="M111.46 20.02h14.03v14h-14.03z"/><path class="st13" d="M125.09 20.02h14.03v14h-14.03z"/><path class="st14" d="M138.72 20.02h14.03v14h-14.03z"/><path class="st15" d="M152.35 20.02h14.03v14h-14.03z"/><path class="st16" d="M165.98 20.02h14.03v14h-14.03z"/><path class="st17" d="M179.61 20.02h14.03v14h-14.03z"/><path class="st18" d="M193.24 20.02h14.03v14h-14.03z"/><path class="st19" d="M220.5 20.02h14.03v14H220.5z"/><path class="st20" d="M234.13 20.02h14.03v14h-14.03z"/><path class="st21" d="M247.76 20.02h14.03v14h-14.03z"/><path class="st22" d="M261.39 20.02h14.03v14h-14.03z"/><path class="st23" d="M275.03 20.02h14.03v14h-14.03z"/><path class="st24" d="M288.66 20.02h14.03v14h-14.03z"/><path class="st25" d="M302.29 20.02h14.03v14h-14.03z"/><path class="st26" d="M315.92 20.02h14.03v14h-14.03z"/><path class="st27" d="M329.55 20.02h14.03v14h-14.03z"/><path class="st28" d="M343.18 20.02h14.03v14h-14.03z"/><path class="st29" d="M356.81 20.02h14.03v14h-14.03z"/><path class="st30" d="M370.44 20.02h14.03v14h-14.03z"/><path class="st31" d="M384.07 20.02h14.03v14h-14.03z"/><path class="st32" d="M397.7 20.02h14.03v14H397.7z"/><path class="st33" d="M411.33 20.02h14.03v14h-14.03z"/><path class="st34" d="M424.96 20.02h14.03v14h-14.03z"/><path class="st35" d="M438.59 20.02h14.03v14h-14.03z"/><path class="st36" d="M452.22 20.02h14.03v14h-14.03z"/><path class="st37" d="M465.85 20.02h14.03v14h-14.03z"/><path class="st38" d="M479.49 20.02h14.03v14h-14.03z"/><path class="st39" d="M493.12 20.02h14.03v14h-14.03z"/><path class="st40" d="M506.75 20.02h14.03v14h-14.03z"/><path class="st41" d="M520.38 20.02h14.03v14h-14.03z"/><path class="st42" d="M534 34h10c2.21 0 4-1.79 4-4v-6c0-2.21-1.79-4-4-4h-10v14z"/><path class="st43" d="M206.87 20.02h14.03v14h-14.03z"/></g></g></svg>