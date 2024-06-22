import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MapComponent from './components/MapComponents/MapComponent';
import useLocation from './hooks/useLocation';
import { getMapItems } from './api/api';

function App() {
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
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  };

  const fetchMapItems = async () => {
    try {
      console.log(viewingLocationCenter, radiusInMeters)
      const mapItems = await getMapItems(viewingLocationCenter, radiusInMeters * 3)
      const locations = mapItems.map(district => district.ubicaciones).flat(1)
      setMapItems({districts: mapItems, locations: locations})
    } catch (error) {
      console.log(error)
     }
  }

  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
      </header>
      <main>
        <p>{location.latitude}</p>
        <p>{location.longitude}</p>
        <MapComponent districts={districts} locations={locations} onLocationChanged={optimizedLocationChanged} onRadiusChange={optimizedSetRadiusInMeters} userLocation ={location} />
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
