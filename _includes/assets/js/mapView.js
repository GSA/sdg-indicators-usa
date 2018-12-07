var mapView = function () {

  "use strict";

  this.initialise = function(geoData, geoCodeRegEx) {
    $('.map').show();
    $('#map').sdgMap({
      geoData: geoData,
      geoCodeRegEx: geoCodeRegEx,
      serviceUrl: 'http://brock.tips/geojson-us-states/us-states.geo.json',
      nameProperty: 'NAME',
      idProperty: 'STUSPS',
      width: 710,
      height: 350,
      projectionFunc: d3.geoAlbersUsa,
    });
  }
};
