import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Map, View } from "ol";
import "ol/ol.css";
import { fromLonLat, transform } from 'ol/proj'
import Attribution from "ol/control/Attribution";
import {TileJSON} from "ol/source";
import { Tile } from "ol/layer";
import { defaults } from "ol/control/defaults";
import Feature from 'ol/Feature.js';
import { Point } from "ol/geom";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";

const arePropsEquals = (oldProps, newProps) => {
  return oldProps.userLocation.longitude === newProps.userLocation.longitude
          && oldProps.userLocation.latitude === newProps.userLocation.latitude
          && oldProps.onRadiusChange === newProps.onRadiusChange
          && oldProps.onLocationChanged === newProps.onLocationChanged
}

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

const MapComponent = memo(({ userLocation, onRadiusChange, onLocationChanged }) => {
  const mapRef = useRef(null);
  const [center, setCenter] = useState(userLocation)

  useEffect(() => {
    const timeout = setTimeout(() => {
      onLocationChanged(center)
    }, 500)
    return () => { clearTimeout(timeout) }
  }, [center, onLocationChanged])

  const changeCentralPosition = useCallback((map) => {
    const center = map.getView().getCenter()
    const latLonCoord = transform(center, 'EPSG:3857', 'EPSG:4326')
    setCenter(latLonCoord)
  }, [])

  const measureDistance = useCallback((map) => {
    const view = map.getView()
    const currentZoomLevel = view.getZoom();
    const metersPerPixel = 6371000 / Math.pow(2, currentZoomLevel); 
    onRadiusChange(metersPerPixel * 10)
  }, [onRadiusChange])

  useEffect(() => {

    const iconFeature = new Feature({
      geometry: new Point(fromLonLat([userLocation.longitude, userLocation.latitude])),
      name: 'User',
      population: 4000,
      rainfall: 500,
    });

    const vectorSource = new VectorSource({
      features: [iconFeature],
    });

    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

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
        }),
        vectorLayer
      ],
      controls: defaults({attribution: false}).extend([attribution]),
      target: 'map',
      view: new View({
        minZoom: 15,
        maxZoom: 20,
        constrainResolution: true,
        center: fromLonLat([userLocation.longitude, userLocation.latitude]), // starting position [lng, lat]
        zoom: 18 // starting zoom
      })
    });

    map.getView().on("change:resolution", (event) => {measureDistance(map)})
    map.getView().on("change:center", (event) => {changeCentralPosition(map)})

    measureDistance(map)

    return () => { 
      map.getView().on("change:resolution", null)
      map.getView().on("change:center", null)
      map.setTarget(null) 
    }
  }, [userLocation, measureDistance, changeCentralPosition])

  return (
    <div style={{ height: "80vh", width: "100%" }} ref={mapRef} id="map" />
  );
}, arePropsEquals);

export default MapComponent;
