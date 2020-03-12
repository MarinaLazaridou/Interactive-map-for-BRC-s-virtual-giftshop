
// Author: Marina Lazaridou
// Subject: Interactive map for BRC's virtual giftshop
// File Format: JavaScript



function initMap() {
  console.log("initMap");

  // Create the map

  // If in need of a base map, uncomment the following section
  // Add basemap layer
  // var mapboxStreet = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyaW5hbGEiLCJhIjoiY2p0aDVvMm02MDd6bzQ0bnpqdjY3OHFrdCJ9.cY-gQZWm5ZYnCDy9lKHYLg', {
  //       tileSize: 512,
  //       zoomOffset: -1,
  //       attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  // Set the map properties
  var map = L.map('map', {
    center: [54.41892996865827, -3.4716796874999996],
    zoom: 6,
    minZoom: 6,
    maxZoom: 8
    // layers: [mapboxStreet] //For base map
  });

  // mapboxStreet.addTo(map); // Add base map


  // Add scale bar
  L.control.scale({position: 'bottomright'}).addTo(map);

  // Add title
  var mapTitleContainer = document.getElementsByClassName("leaflet-control")[1];
  var mapTitle = document.getElementById("mapTitle");
  mapTitleContainer.appendChild(mapTitle);

  // Style the regions
  function styleRegionsPolygons(feature) {
    return {
      fillColor: '#d7d8d7',
      weight: 0.6,
      opacity: 1,
      fillOpacity: 1,
      color: 'white',
      dashArray: ''
    }
  }

  // Highlight region on hover
  function highlightFeature (e) {
    var layer = e.target;
		layer.setStyle({
  		weight: 2.5,
      color: 'white',
      fillColor: '#d0011b',
  		dashArray: '',
  		fillOpacity: 1
		})

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		};
	}

  // Reset style after Highlight
  function resetHighlight(e) {
    regionsPolyLayer.resetStyle(e.target);
  }

  // Open URL on click
  function openURL(e) {
    window.open(e.target.feature.properties.url)
  }

  // Define the layer from IL_Simplified_WGS84.js
  var regionsPolyLayer = L.geoJSON(IL_Regions, {
    style: styleRegionsPolygons,
    onEachFeature: onEachFeature
  });

  // Set events for each feature of the layer
  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: openURL
    })
  }

  // Style and define Ireland from Ireland_WGS84.js
  function styleIreland(feature) {
    return {
      weight: 0.6,
      fillColor: '#d7d8d7',
      fillOpacity: 0.6,
      opacity: 1,
      color: 'white',
      dashArray: '1',
    };
  }

  var irelandLayer = L.geoJSON(ireland, {
    style: styleIreland,
    interactive: false
  });

  // Add labels on regions from Region_Points.js
  var pointLayer = L.geoJSON(regionPoints, {
    pointToLayer: function (feature, latlng) {
      if (feature.properties.name == 'North England') {
        label = 'North England'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
      else if (feature.properties.name == 'Scotland') {
        label = 'Scotland'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
      else if (feature.properties.name == 'Midlands') {
        label = 'Midlands'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
      else if (feature.properties.name == 'South East') {
        label = 'South East'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
      else if (feature.properties.name == 'South West and the Channel Islands') {
        label = 'South West </br> and the </br> Channel Islands'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
      else if (feature.properties.name == 'Northern Ireland and the Isle of Man') {
        label = 'Northern Ireland </br> and the </br> Isle of Man'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
      else if (feature.properties.name == 'London') {
        label = 'London'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
      else {
        label = 'Wales'
        return new L.CircleMarker (latlng, {radius: 1})
        .bindTooltip(label, {
          permanent: true,
          direction: "center",
          className: "labels"
        })
        .openTooltip();
      }
    }
  }).addTo(map);

  // Add layers on the map
  regionsPolyLayer.addTo(map);
  irelandLayer.addTo(map);

}

// End of script
