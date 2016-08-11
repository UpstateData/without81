// Empty array to hold origin and destination locations.
var locations = [];

// Set up alternate sets of directions.
var dir_with = MQ.routing.directions().on('success', function(data) {
  renderRouteNarrative(data, '#narrative-with');
});

var dir_without = MQ.routing.directions().on('success', function(data) {
  renderRouteNarrative(data, '#narrative-without');
});

// Variables to hold route layers for alternate routes.
var layer_with, layer_without;

// Map display options.
var options = {
      center: [ 43.0501, -76.1491 ],
      zoom: 13,
      scrollWheelZoom: false
};

$(document).ready(function() {

    // Display maps
    var map_with = L.map('map-with', options).addLayer(MQ.mapLayer());
    var map_without = L.map('map-without', options).addLayer(MQ.mapLayer());

  $('#route').click(function() {

    // If a route later exists, remove it before displaying a new one.
    removeLayers(map_with, map_without);

    // Get the origin and destinate entered by the user.
    var origin = $('#origin').val() || $('#origin').attr('placeholder');
    var destination = $('#destination').val() || $('#destination').attr('placeholder');
    locations.push(origin);
    locations.push(destination);

    // Directions WITH 81 as option.
    dir_with.route({locations, options: { routeType: 'fastest'}});
    layer_with = MQ.routing.routeLayer({
      directions: dir_with,
      fitBounds: true
    });

    // Directiond WITHOUT 81 as option.
    dir_without.route({locations, options: { routeType: 'fastest', routeControlPointCollection: [{lat:43.03474,lng:-76.14298,weight:10,radius:1}] }});
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

  $('#home').click(function() {
    removeLayers(map_with, map_without);
  });

});

// Method to render the specific steps of a route.
function renderRouteNarrative(data, id) {

  var legs = data.route.legs;
  if (legs && legs.length) {

    // For logging of locations entered by user.
    var summary = {
      id: id,
      locations: data.route.locations,
      time: data.route.time,
      distance: data.route.distance,
      fuelUsed: data.route.fuelUsed
    }
    _LTracker.push(summary);

    // Display duratsion components.
    var details = {
      time: data.route.time,
      distance: data.route.distance,
      fuelUsed: data.route.fuelUsed,
      maneuvers: data.route.legs[0].maneuvers
    }
    content = Handlebars.templates.details({ Details : details });

  $(id).find('.content').append(content);
}
}

// Method to remove route layers from map.
function removeLayers(map_with, map_without) {
  if(layer_with || layer_without) {
    $('.content').empty();
    map_with.removeLayer(layer_with);
    map_without.removeLayer(layer_without);
    }
    return;
}

Handlebars.registerHelper('getMinutes', function(num) {
  return Math.round(num/60);
});

Handlebars.registerHelper('roundNumber', function(num) {
  return Math.round(num);
});