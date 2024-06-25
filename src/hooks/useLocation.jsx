import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/AuthContextProvider";

const useLocation = () => {
  const { user, setUserLocation } = useContext(AuthContext)
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [location, setLocation] = useState({ latitude: 0.0, longitude: 0.0 });
  const [isLoading, setisLoading] = useState(true) 

  useEffect(() => {
    if(isLoading || !user) return;
    setUserLocation(location)
  }, [isLoading, location, user])

  useEffect(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(({state}) => {
        setHasLocationPermission(state === 'granted')
      });
  }, []);

  const setActualLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      if(coords.latitude === location.latitude && coords.longitude === location.longitude) return;
      setLocation({ latitude: coords.latitude, longitude: coords.longitude });
      setisLoading(false)
    });
  }, [setLocation, location])

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
  }, [hasLocationPermission, setActualLocation]);

  return { location, isLocationEnabled: hasLocationPermission, isLoading};
};

export default useLocation;
