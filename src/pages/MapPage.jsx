import React, { useCallback, useEffect, useState } from 'react'
import MapComponent from '../components/MapComponents/MapComponent';
import { getMapItems } from '../api/api';
import useLocation from '../hooks/useLocation';

const MapPage = () => {
    const [data, setData] = useState();
    const { location } = useLocation()
    const [radiusInMeters, setRadiusInMeters] = useState(0);
    const [viewingLocationCenter, setViewingLocationCenter] = useState({longitude: 0, latitude: 0})
    const [mapItems, setMapItems] = useState({districts: [], locations: []})
    const {locations, districts} = mapItems
    
    useEffect(() => {
      fetchData();
    }, []);
  
    useEffect(() => {
      
    }, [radiusInMeters, viewingLocationCenter])
  
    const optimizedSetRadiusInMeters = useCallback((radius) => {
      setRadiusInMeters(radius)
    }, [])
  
    const optimizedLocationChanged = useCallback((newLocation) => {
      setViewingLocationCenter(newLocation)
    }, [])
  
    useEffect(() => {
      fetchMapItems()
    }, [radiusInMeters, viewingLocationCenter])
  
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/patogeno/todosLosPatogenos')
        const result = await response.json();
        setData(result)
<<<<<<< Updated upstream
        console.log(result)
=======
>>>>>>> Stashed changes
      } catch (error) {
        console.error(error);
      }
    };
  
    const fetchMapItems = async () => {
      try {
<<<<<<< Updated upstream
        console.log(viewingLocationCenter, radiusInMeters)
=======
>>>>>>> Stashed changes
        const mapItems = await getMapItems(viewingLocationCenter, radiusInMeters * 3)
        const locations = mapItems.map(district => district.ubicaciones).flat(1)
        setMapItems({districts: mapItems, locations: locations})
      } catch (error) {
        console.log(error)
       }
    }

  return (
    <MapComponent districts={districts} locations={locations} onLocationChanged={optimizedLocationChanged} onRadiusChange={optimizedSetRadiusInMeters} userLocation ={location} />
  )
}

export default MapPage