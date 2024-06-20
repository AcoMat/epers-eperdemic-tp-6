import React, { useState, useEffect, useRef } from "react";
import { Map, View } from "ol";
import "ol/ol.css";
import { fromLonLat } from 'ol/proj'
import Attribution from "ol/control/Attribution";
import {TileJSON} from "ol/source";
import { Tile } from "ol/layer";
import { defaults } from "ol/control/defaults";
import Units, { METERS_PER_UNIT } from 'ol/proj/Units';

const geojsonObject = {
  type: "FeatureCollection",
  crs: {
    type: "name",
    properties: {
      name: "EPSG:3857",
    },
  },
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0, 0],
      },
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-5e6, -1e6],
            [-3e6, -1e6],
            [-4e6, 1e6],
            [-5e6, -1e6],
          ],
        ],
      },
    },
  ],
};

function MapComponent({ location, onRadiusChange }) {
  const mapRef = useRef(null);

  useEffect(() => {

    const attribution = new Attribution({
      collapsible: false,
    });

    const source = new TileJSON({
      url: `https://api.maptiler.com/maps/streets-v2/tiles.json?key=LQcHgRB6jDrmpJaRaBFZ`, // source URL
      tileSize: 512,
      crossOrigin: 'anonymous'
    });

    const map = new Map({
      layers: [
        new Tile({
          source: source
        })
      ],
      controls: defaults({attribution: false}).extend([attribution]),
      target: 'map',
      view: new View({
        minZoom: 1,
        maxZoom: 21,
        constrainResolution: true,
        center: fromLonLat([location.longitude, location.latitude]), // starting position [lng, lat]
        zoom: 18 // starting zoom
      })
    });

    map.getView().on("change:resolution", (event) => {measureDistance(map)})

    measureDistance(map)
    
    return () => { 
      map.getView().on("change:resolution", null)
      map.setTarget(null) 
    }
  }, [location])

  const measureDistance = (map) => {
    const view = map.getView()
    const currentZoomLevel = view.getZoom();
    const metersPerPixel = 6371000 / Math.pow(2, currentZoomLevel); 
    onRadiusChange(metersPerPixel * 10)
  }

  return (
    <div style={{ height: "80vh", width: "100%" }} ref={mapRef} id="map" />
  );
}

export default MapComponent;
