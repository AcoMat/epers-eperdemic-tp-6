import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { Map, View } from "ol";
import "ol/ol.css";
import { fromLonLat, transform } from "ol/proj";
import Attribution from "ol/control/Attribution";
import { TileJSON } from "ol/source";
import { Tile } from "ol/layer";
import { defaults } from "ol/control/defaults";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import mapLocationToPoints from "../../utils/mapLocationToPoints";
import mapDistrictToPoints from "../../utils/mapDistrictToPoints";
import mapUserToPoint from "../../utils/mapUserToPoint";
import { Fab } from "@mui/material";
import { AdjustRounded } from "@mui/icons-material";
import mapFriendsToPoints from "../../utils/mapFriendsToPoints";
import mapScrapToPoints from "../../utils/mapScrapToPoints";

const arePropsEquals = (oldProps, newProps) => {
  return (
    oldProps.userLocation.longitude === newProps.userLocation.longitude &&
    oldProps.userLocation.latitude === newProps.userLocation.latitude &&
    oldProps.onRadiusChange === newProps.onRadiusChange &&
    oldProps.onLocationChanged === newProps.onLocationChanged &&
    oldProps.locations === newProps.location &&
    oldProps.districts === newProps.district
  );
};

const MapComponent = memo(
  ({
    locations,
    districts,
    userLocation,
    onRadiusChange,
    onLocationChanged,
    friends,
    scraps,
    onScrapPress
  }) => {
    const mapRef = useRef(null);
    const goCenter = useRef(null);
    const reloadFeatures = useRef(null);
    const goTo = useRef(null);
    const [center, setCenter] = useState(userLocation);
    const [radius, setRadius] = useState(0);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onLocationChanged({
          latitude: center[1] || 0,
          longitude: center[0] || 0,
        });
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }, [center, onLocationChanged]);

    useEffect(() => {
      const timeout = setTimeout(() => {
        onRadiusChange(radius);
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    }, [radius, onRadiusChange]);

    const changeCentralPosition = useCallback((map) => {
      const center = map.getView().getCenter();
      const latLonCoord = transform(center, "EPSG:3857", "EPSG:4326");
      setCenter(latLonCoord);
    }, []);

    const measureDistance = useCallback((map) => {
      const view = map.getView();
      const currentZoomLevel = view.getZoom();
      const metersPerPixel = 6371000 / Math.pow(2, currentZoomLevel);
      setRadius(metersPerPixel * 10);
    }, []);

    const processClick = useCallback((event, map) => {
      map.forEachFeatureAtPixel(event.pixel, (feature, layer) => {
        if(feature.values_.name === "scrap") {
          onScrapPress(feature.values_.id)
        }
      })
    }, [])

    const goToUser = () => {
      goCenter.current(userLocation)
    }

    useEffect(() => {
      const scrapPoints = mapScrapToPoints(scraps);
      const userPoint = mapUserToPoint(userLocation);
      const locationPoints = mapLocationToPoints(locations);
      const districtPoints = mapDistrictToPoints(districts);

      const vectorSource = new VectorSource({
        features: [userPoint, ...scrapPoints, ...locationPoints, ...districtPoints],
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
        crossOrigin: "anonymous",
      });

      const map = new Map({
        layers: [
          new Tile({
            source: source,
          }),
          vectorLayer,
        ],
        controls: defaults({ attribution: false }).extend([attribution]),
        target: "map",
        view: new View({
          minZoom: 15,
          maxZoom: 25,
          constrainResolution: true,
          center: fromLonLat([userLocation.longitude, userLocation.latitude]), // starting position [lng, lat]
          zoom: 18, // starting zoom
        }),
      });

      map.getView().on("change:resolution", (event) => {
        measureDistance(map);
      });
      map.getView().on("change:center", (event) => {
        changeCentralPosition(map);
      });
      map.on('click', (event) => {
        processClick(event, map)
      })
      goCenter.current = ({ longitude, latitude }) => {
        map.getView().setCenter(fromLonLat([longitude, latitude]));
      };
      reloadFeatures.current = (features) => {
        vectorLayer.getSource().clear();
        vectorLayer.getSource().addFeatures(features);
      };

      measureDistance(map);

      return () => {
        map.getView().on("change:resolution", null);
        map.getView().on("change:center", null);
        map.on('click', null);
        map.setTarget(null);
        goCenter.current = null;
        goTo.current = null;
        reloadFeatures.current = null;
      };
    }, [measureDistance, changeCentralPosition]);

    useEffect(() => {
      const features = [
        mapUserToPoint(userLocation),
        ...mapScrapToPoints(scraps),
        ...mapLocationToPoints(locations),
        ...mapDistrictToPoints(districts),
        ...mapFriendsToPoints(friends)
      ];
      reloadFeatures.current(features);
    }, [userLocation, districts, locations, friends, scraps]);

    useEffect(() => {
      goCenter.current(userLocation);
    }, [userLocation]);

    return (
      <div style={{ height: "100%", width: "100%", position: "relative" }}>
        <div style={{ height: "100%", width: "100%" }} ref={mapRef} id="map" />
        <Fab
          color="primary"
          onClick={goToUser}
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            marginBottom: "24px",
            marginLeft: "24px",
          }}
          variant="circular"
        >
          <AdjustRounded />
        </Fab>
      </div>
    );
  },
  arePropsEquals
);

export default MapComponent;
