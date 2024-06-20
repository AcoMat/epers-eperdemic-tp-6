import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import { OGCMapTile } from 'ol/source';

import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON.js';
import VectorLayer from 'ol/layer/Vector';

function MapComponent() {
    const mapRef = useRef(null);

    const osmLayer = new TileLayer({
        source: new OGCMapTile({
            url: 'https://maps.gnosis.earth/ogcapi/collections/blueMarble/map/tiles/WebMercatorQuad',
          }),
    })

    useEffect(() => {    
    const mapObject = new Map({
        target: mapRef.current,
        layers: [osmLayer, vectorLayer],
        view: new View({
            center: [0, 0],
            zoom: 0,
          }),
      });

      return () => {
        mapObject.setTarget(null);
      };
    }, []);

    //

    const geojsonObject = {
      'type': 'FeatureCollection',
      'crs': {
        'type': 'name',
        'properties': {
          'name': 'EPSG:3857',
        },
      },
      'features': [
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Point',
            'coordinates': [0, 0],
          },
        },
        {
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              [
                [-5e6, -1e6],
                [-3e6, -1e6],
                [-4e6, 1e6],
                [-5e6, -1e6],
              ],
            ],
          },
        },
      ]
    };

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    //

    return (
        <div style={{height:'80vh',width:'100%'}} ref={mapRef} id="map" />
      );
}

export default MapComponent;