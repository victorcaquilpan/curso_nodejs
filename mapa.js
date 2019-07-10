// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 10
const MAP_CENTER = [-33.5544, -70.6535]

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
  

  var greenIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });


  // Se agrega data al Mapa
  /* d3.json('./Datos/Equipos.json')
    .then((geojson) => {
      L.geoJSON(geojson, {
        onEachFeature: MostrarDato
      }).addTo(map)
    }

) */

   d3.json('./Datos/Equipos.json')
    .then((geojson) => {
      L.geoJSON(geojson, {
        onEachFeature: MostrarDato
      }).addTo(map)
    }

)

 /* --------------------------------  */

 /*
L.circle([-33.5544, -70.6535],{
    color:'red',
}).addTo(map)
.bindPopup('Prueba')


  L.marker([-33.4544, -70.6535], {icon: greenIcon}).addTo(map);

L.geoJSON(equipos, {
    style: function(feature) {
        switch (feature.properties.sensor_mp) {
            case 'PMS3003' : return {icon:greenIcon}
            
           // case 'PPD42': return {color: "#ff1010"};
           // case 'PMS3003':return {color: "#0000ff"};
           // case 'PM2005': return {color: "#0000ff"};
        }
    }
}).addTo(map);



*/


