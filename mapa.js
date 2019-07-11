// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 10
const MAP_CENTER = [-33.5544, -70.6535]

// Se definen los iconos a utilizar
var greenIcon = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

var blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)



function MostrarDato(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties) {
      let dato_a_mostrar = `<p>
        <h5>Estación: ${feature.properties.Name}</h5><br/>
        <span><b>Sensor</b>: ${feature.properties.sensor_mp}</span><br/>
      </p>`
      layer.bindPopup(dato_a_mostrar);    
    }
  }
  
   d3.json('./Datos/Equipos.json')
    .then((geojson) => {
      L.geoJSON(geojson, {
        onEachFeature: MostrarDato,
        pointToLayer: function (geoJsonPoint,latlng){
         switch (geoJsonPoint.properties.sensor_mp){
           case 'PM2005':
           return L.marker(latlng,{icon: redIcon})
           case 'PMS3003':
           return L.marker(latlng,{icon: greenIcon})
           case 'PPD42':
           return L.marker(latlng,{icon: blueIcon})
         }
        }
      }).addTo(map)
    }

)

 

