import React, { useCallback, useEffect, useState } from 'react'
import MapComponent from '../components/MapComponents/MapComponent';
import { getMapItems } from '../api/api';
import useLocation from '../hooks/useLocation';
import GeolocationDenied from '../pages/GeolocationDenied'
import Loading from '../components/Loading/Loading';
import useFriends from '../hooks/useFriends'

const MapPage = () => {
    const { location, isLocationEnabled, isLoading } = useLocation();
    const [radiusInMeters, setRadiusInMeters] = useState(0);
    const [viewingLocationCenter, setViewingLocationCenter] = useState({longitude: 0, latitude: 0})
    const [mapItems, setMapItems] = useState({districts: [], locations: []})
    const {locations, districts} = mapItems
    const { friends } = useFriends()
    const friendsWithLocation = friends.filter(friend => !!friend.location)
    console.log(friends)
    console.log(friendsWithLocation)

    useEffect(() => {
      if (isLocationEnabled) {
        fetchMapItems();
      }
    }, [isLocationEnabled, radiusInMeters, viewingLocationCenter])
  
    const optimizedSetRadiusInMeters = useCallback((radius) => {
      setRadiusInMeters(radius)
    }, [])
  
    const optimizedLocationChanged = useCallback((newLocation) => {
      setViewingLocationCenter(newLocation)
    }, [])
  
    useEffect(() => {
      fetchMapItems()
    }, [radiusInMeters, viewingLocationCenter])
  
    const fetchMapItems = async () => {
      try {
        const mapItems = await getMapItems(viewingLocationCenter, radiusInMeters * 3)
        const locations = mapItems.map(district => district.ubicaciones).flat(1)
        setMapItems({districts: mapItems, locations: locations})
      } catch (error) {
        console.log(error)
       }
    }

    if (!isLocationEnabled) {
      return <GeolocationDenied />;
    }

    if(isLoading) {
      return <Loading />
    }

  return ( 
    <MapComponent 
      districts={districts} 
      locations={locations} 
      onLocationChanged={optimizedLocationChanged} 
      onRadiusChange={optimizedSetRadiusInMeters} 
      userLocation ={location}
      friends={friendsWithLocation}
    />
  )
}

export default MapPage