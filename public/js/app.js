if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const coords = position.coords;
                console.log(coords)
                let lati = coords.latitude;
                let lngt = coords.longitude


                var iconUrl = 'descarga.png';

                var iconOptions = {
                // The icon's size in pixel:
                size: new H.math.Size(80, 34),
                // The anchorage point in pixel,
                // defaults to bottom-center
                anchor: new H.math.Point(14, 34)
                };

                var markerOptions = {
                icon: new H.map.Icon(iconUrl, iconOptions)
                };


// funcion para añadir un marcador en el mapa con tu ubicacion
function addMarkersToMap(map) {
 map.setCenter({lat:lati, lng:lngt});
  map.setZoom(14);
  var myMarker = new H.map.Marker({lat:lati, lng:lngt},markerOptions);
  map.addObject(myMarker);
}





$('#btn').on('click', function(event) {
alert('holaa')
//lamando a la funcion que mostrara la ruta en el mapa
calculateRouteFromAtoB(platform);

})

$('#btn2').on('click', function(event) {
alert('holaa2')

                var uno = lati+','+lngt;
var tipo = 'restaurant'
var tipo2='coffee-tea'


$.ajax({
  url: 'https://places.demo.api.here.com/places/v1/discover/search',
  type: 'GET',
  data: {
    at: uno,
    q: tipo,tipo2,
    app_id: 'DemoAppId01082013GAL',
  app_code: 'AJKnXv84fjrb0KIHawS0Tg',
  },
  beforeSend: function(xhr){
    xhr.setRequestHeader('Accept', 'application/json');
  },
  success: function (data) {
    console.log(data.results.items);
    for (var i = 0; i < data.results.items.length; i++) {
      console.log(data.results.items[i])
      var div = $('<div>'+ data.results.items[i].title +'<br>'+ data.results.items[i].vicinity+'</div>')
      $('#places').append(div);
    }
  }
});


})





function calculateRouteFromAtoB (platform) {



  var poin1 = '52.5160,13.3779';
  var poin2 = '52.5206,13.3862';

  var router = platform.getRoutingService(),
    routeRequestParams = {
      mode: 'fastest;car',
      representation: 'display',
      routeattributes : 'waypoints,summary,shape,legs',
      maneuverattributes: 'direction,action',
      waypoint0: poin1, // punto 1
      waypoint1: poin2  // punto 2
    };


  router.calculateRoute(
    routeRequestParams,
    onSuccess,
    onError
  );
}


function onSuccess(result) {
  var route = result.response.route[0];
  addRouteShapeToMap(route);

}

function onError(error) {
  alert('Ooops!');
}


function addRouteShapeToMap(route){
  var lineString = new H.geo.LineString(),
    routeShape = route.shape,
    polyline;

  routeShape.forEach(function(point) {
    var parts = point.split(',');
    lineString.pushLatLngAlt(parts[0], parts[1]);
  });

  polyline = new H.map.Polyline(lineString, {
    style: {
      lineWidth: 4,
      strokeColor: 'rgba(0, 128, 255, 0.7)'
    }
  });
  // añadiendo la linea al mapa
  map.addObject(polyline);
  // zoom al lugar
  map.setViewBounds(polyline.getBounds(), true);
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

});
}
