import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const useLocation = () => {
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(({state}) => {
        setHasLocationPermission(state === 'granted')
      });
  }, []);

  useEffect(() => {
    let interval;
    if (hasLocationPermission) {
      interval = setInterval(setActualLocation, 2000);
    } else {
      console.log("Can't get location");
    }
    return () => {
      clearInterval(interval);
    };
  }, [hasLocationPermission]);

  const setActualLocation = () => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      console.log(coords);
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
    });
  };

  return { location, isLocationEnabled: hasLocationPermission};
};

export default useLocation;
