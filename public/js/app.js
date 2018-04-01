// funcion para añadir un marcador en el mapa con tu ubicacion
function addMarkersToMap(map) {
	if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = position.coords;
                console.log(coords)
                let lati = coords.latitude;
                let lngt = coords.longitude

  map.setCenter({lat:lati, lng:lngt});
  map.setZoom(14);
  var myMarker = new H.map.Marker({lat:lati, lng:lngt});
  map.addObject(myMarker);
});
}
}

//Inicializando el mapa
var platform = new H.service.Platform({
  app_id: 'DemoAppId01082013GAL',
  app_code: 'AJKnXv84fjrb0KIHawS0Tg',
  useCIT: true,
  useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

//dandole valores por default al mapa
var map = new H.Map(document.getElementById('map'),
  defaultLayers.normal.map,{
  center: {lat:50, lng:5},
  zoom: 1
});

//interacciones
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
var ui = H.ui.UI.createDefault(map, defaultLayers);

// usando el mapa con el marcador
addMarkersToMap(map);