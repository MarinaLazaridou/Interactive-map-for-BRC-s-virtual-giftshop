// This is a JavaScript document

//
// Author: Marina Lazaridou
// Subject: Interactive map for BRC's virtual giftshop
// File Format: JavaScript



function initMap() {
  console.log("initMap");

  // Create the map

  // If in need of a base map, uncomment the following section
  // Add basemaps layers
  // var mapboxStreet = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFyaW5hbGEiLCJhIjoiY2p0aDVvMm02MDd6bzQ0bnpqdjY3OHFrdCJ9.cY-gQZWm5ZYnCDy9lKHYLg', {
  //       tileSize: 512,
  //       zoomOffset: -1,
  //       attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  //   });

  // Set the map properties
  var map = L.map('map', {
    center: [54.41892996865827, -3.4716796874999996],
    zoom: 6,
    minZoom: 1,
    maxZoom: 18
    // layers: [mapboxStreet]
  });

  // mapboxStreet.addTo(map);


  // Add scale bar
  L.control.scale({position: 'bottomright'}).addTo(map);

  // Add BRC logo
  var mapControlsContainer = document.getElementsByClassName("leaflet-control")[0];
  var logoContainer = document.getElementById("logoContainer");
  mapControlsContainer.appendChild(logoContainer);

  // Style the region layer
  function styleRegionsPolygons(feature) {
    return {
      fillColor: '#d0011b',
      weight: 0.3,
      opacity: 1,
      fillOpacity: 0.8,
      color: '#f7f7f7',
      dashArray: '5',
    };
  }

  // Highlight region and grey out the rest
  function highlightFeature (e) {
    regionsPolyLayer.setStyle({
      fillColor: '#d7d8d7',
      weight: 0.1,
      opacity: 1,
      fillOpacity: 1,
      color: 'black',
      dashArray: ''
    });

    var layer = e.target;
		layer.setStyle({
  		weight: 3,
  		color: '#651713',
      fillColor: '#651713',
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
    regionsPolyLayer.setStyle({
      fillColor: '#d0011b',
      weight: 0.2,
      opacity: 1,
      fillOpacity: 0.8,
      color: '#f7f7f7',
      dashArray: ''
    });
  }

  // Define the layer
  var regionsPolyLayer = L.geoJSON(IL_Regions, {
    style: styleRegionsPolygons,
    onEachFeature: onEachFeature
  });

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    })
  }

  // Zoom to region on click
  function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
  }

  // Add title
  var mapTitleContainer = document.getElementsByClassName("leaflet-control")[1];
  var mapTitle = document.getElementById("mapTitle");
  mapTitleContainer.appendChild(mapTitle);

  // Add labels as popups and set their content
  var popUpLocSW = new L.LatLng(50.42951794712287, -4.482421875);
  var popUpLocWales = new L.LatLng(52.43926935464697, -3.6090087890625004);
  var popUpLocSE = new L.LatLng(50.875311142200765, -1.1865234375);
  var popUpLocLDN = new L.LatLng(51.51216124955515, -0.1318359375);
  var popUpLocMid = new L.LatLng(52.63889682030036, -1.0574340820312498);
  var popUpLocNorth = new L.LatLng(54.401346982784176, -1.93084716796875);
  var popUpLocScot = new L.LatLng(56.81892067431724, -3.812255859375);
  var popUpLocNIRL = new L.LatLng(54.74364976592378, -6.800537109375);

  var popUpSW = new L.Popup({closeOnClick: false, offset: {x: 50, y: 30}});
  var popUpWales = new L.Popup({closeOnClick: false, offset: {x: -15, y: 70}});
  var popUpSE = new L.Popup({closeOnClick: false, offset: {x: 20, y: 30}});
  var popUpLDN = new L.Popup({closeOnClick: false, offset: {x: 30, y: 17}});
  var popUpMid = new L.Popup({closeOnClick: false, offset: {x: 0, y: 35}});
  var popUpNorth = new L.Popup({closeOnClick: false, offset: {x: 0, y: 45}});
  var popUpScot = new L.Popup({closeOnClick: false, offset: {x: 0, y: 40}});
  var popUpNIRL = new L.Popup({closeOnClick: false, offset: {x: 0, y: 65}});

  popUpSW.setLatLng(popUpLocSW).addTo(map);
  popUpSW.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/share-your-kindness-with-the-south-west-and-the-channel-islands" target="_blank">the South West <br/> and the <br/> Channel Islands</a>').addTo(map);

  popUpWales.setLatLng(popUpLocWales).addTo(map);
  popUpWales.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/share-your-kindness-with-the-wales" target="_blank">Wales</a>').addTo(map);

  popUpSE.setLatLng(popUpLocSE).addTo(map);
  popUpSE.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/copy-of-share-your-kindness-with-london" target="_blank">the <br/> South East</a>').addTo(map);

  popUpLDN.setLatLng(popUpLocLDN).addTo(map);
  popUpLDN.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/a-gift-of-kindness-for-london" target="_blank">London</a>').addTo(map);

  popUpMid.setLatLng(popUpLocMid).addTo(map);
  popUpMid.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/copy-of-share-your-kindness-with-the-midlands" target="_blank">Midlands</a>').addTo(map);

  popUpNorth.setLatLng(popUpLocNorth).addTo(map);
  popUpNorth.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/share-your-kindness-with-north-england" target="_blank">North England</a>').addTo(map);

  popUpScot.setLatLng(popUpLocScot).addTo(map);
  popUpScot.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/share-your-kindness-with-scotland" target="_blank">Scotland</a>').addTo(map);

  popUpNIRL.setLatLng(popUpLocNIRL).addTo(map);
  popUpNIRL.setContent('<a href="https://giftshop.redcross.org.uk/collections/support-local/products/share-your-kindness-with-northern-ireland-and-the-isle-of-man" target="_blank">Northern Ireland <br/> and the <br/> Isle of Man</a>').addTo(map);

  // Add layer on map
  regionsPolyLayer.addTo(map);
}

// End of script
