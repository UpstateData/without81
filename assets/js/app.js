// Empty array to hold origin and destination locations.
var locations = [];

// Route 81 LinkIDs.
var LinkIDs = [4305966, 3964892, 34222430, 14689841, 29658617, 16808971, 1791178, 9915231, 712160, 1431028141117045, 43179443, 32891652, 58099009, 30606615, 63397487, 6277076, 3577250, 37998013];

// Route control point for Southbound 81 segment between E. Fayette & E. Water Streets
var routeControlPoint = [{
  lat: 43.04798,
  lng: -76.14263,
  weight: 6,
  radius: 0.2
}];

// Set up alternate sets of directions.
var dir_with = MQ.routing.directions().on('success', function (data) {
  renderRouteNarrative(data, '#narrative-with');
});

var dir_without = MQ.routing.directions().on('success', function (data) {
  renderRouteNarrative(data, '#narrative-without');
});

// Variables to hold route layers for alternate routes.
var layer_with, layer_without;

// Map display options.
var options = {
  center: [43.0501, -76.1491],
  zoom: 12,
  scrollWheelZoom: false
};

$(document).ready(function () {

  // Display maps
  var map_with = L.map('map-with', options).addLayer(MQ.mapLayer());
  var map_without = L.map('map-without', options).addLayer(MQ.mapLayer());

  $("#origin, #destination").autocomplete({
    source: landmarks,
    minLength: 2
  });

  $('#route').click(function () {

    // If a route later exists, remove it before displaying a new one.
    removeLayers(map_with, map_without);

    // Get the origin and destination entered by the user.
    var origin = $('#origin').val() || $('#origin').attr('placeholder');
    var destination = $('#destination').val() || $('#destination').attr('placeholder');
    locations.push(origin);
    locations.push(destination);

    // Directions with 81 as option.
    dir_with.route({
      locations
    });
    layer_with = MQ.routing.routeLayer({
      directions: dir_with,
      fitBounds: true
    });

    // Directions without 81 as option.
    dir_without.route({
      locations,
      options: {
        mustAvoidLinkIds: LinkIDs,
        routeControlPointCollection: routeControlPoint
      }
    });
    layer_without = MQ.routing.routeLayer({
      directions: dir_without,
      fitBounds: true
    });

    // Display both sets of directions.
    map_with.addLayer(layer_with);
    map_without.addLayer(layer_without);

    // Reset locations array.
    locations = [];

  });

  $('#home').click(function () {
    removeLayers(map_with, map_without);
  });

});

// Method to render the specific steps of a route.
function renderRouteNarrative(data, id) {

  var legs = data.route.legs;
  if (legs && legs.length) {

    // Display duration components.
    var details = {
      time: data.route.time,
      distance: data.route.distance,
      fuelUsed: data.route.fuelUsed,
      maneuvers: data.route.legs[0].maneuvers
    }
    content = Handlebars.templates.details({
      Details: details
    });

    $(id).find('.content').append(content);
  }
}

// Method to remove route layers from map.
function removeLayers(map_with, map_without) {
  if (layer_with || layer_without) {
    $('.content').empty();
    map_with.removeLayer(layer_with);
    map_without.removeLayer(layer_without);
  }
  return;
}

// Helper methods for handlebars.
Handlebars.registerHelper('getMinutes', function (num) {
  return Math.round(num / 60);
});
Handlebars.registerHelper('roundNumber', function (num) {
  return Math.round(num);
});

// A list of landmarks in CNY for autocomplete.
var landmarks = [
  'Carrier Dome, 900 Irving Ave, Syracuse, NY 13244',
  'Hancock International Airport, 1000 Col Eileen Collins Blvd, Syracuse, NY 13212',
  'Carousel Mall, 9090 Destiny USA Dr, Syracuse, NY 13204',
  'Destiny USA, 9090 Destiny USA Dr, Syracuse, NY 13204',
  'Museum of Science and Technology (MOST), 500 S Franklin St, Syracuse, NY 13202',
  'Rosamond Gifford Zoo, One Conservation Pl, Syracuse, NY 13204',
  'Everson Museum of Art, 401 Harrison St, Syracuse, NY 13202',
  'Erie Canal Museum, 318 Erie Blvd E, Syracuse, NY 13202',
  'NBT Bank Stadium, 1 Tex Simone Dr, Syracuse, NY 13208',
  'Syracuse Chiefs Stadium, 1 Tex Simone Dr, Syracuse, NY 13208',
  'Oncenter War Memorial Arena, 800 S State St, Syracuse, NY 13202',
  'Landmark Theatre, 362 S Salina St, Syracuse, NY 13202',
  'Onondaga Lake Park, 6851 Onondaga Lake Pkwy, Liverpool, NY 13088',
  'Palace Theatre, 2384 James St, Syracuse, NY 13206',
  'Oakwood Cemetery, 940 Comstock Ave, Syracuse, NY 13210',
  'Clinton Square, 161 W Genesee St, Syracuse, NY 13202',
  'NYS Fair, 581 State Fair Blvd, Syracuse, NY 13209',
  'State Fair, 581 State Fair Blvd, Syracuse, NY 13209',
  'Empire Expo Center, 581 State Fair Blvd, Syracuse, NY 13209',
  'Thornden Park, Thornden Park Drive,, Syracuse, NY 13210',
  'Elmwood Park, Glenwood Ave, Syracuse, NY 13207',
  'Cathedral of the Immaculate Conception, 259 E Onondaga St, Syracuse, NY 13202',
  'Syracuse Coworks, 201 E Jefferson Street, Syracuse, NY 13202',
  'The Tech Garden, 235 Harrison St, Syracuse, NY 13202',
  'Regional Transportation Center, 1 Walsh Cir, Syracuse, NY 13208',
  'Amtrak Station, 1 Walsh Cir, Syracuse, NY 13208'
];