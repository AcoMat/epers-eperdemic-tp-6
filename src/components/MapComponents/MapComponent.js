import React, { useState, useEffect, useRef } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import 'ol/ol.css';
import { OGCMapTile } from 'ol/source';

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
        layers: [osmLayer],
        view: new View({
            center: [0, 0],
            zoom: 0,
          }),
      });

      return () => {
        mapObject.setTarget(null);
      };
    }, []);

    return (
        <div style={{height:'80vh',width:'100%'}} ref={mapRef} id="map" />
      );
}

export default MapComponent;