import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import MapComponent from './components/MapComponents/MapComponent';
import useLocation from './hooks/useLocation';

function App() {
  const [data, setData] = useState();
  const { location } = useLocation()

  useEffect(() => {
    fetchData();
  }, []);

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

  useEffect(() => {
    getDistritos()
  }, [location])

  const getDistritos = async () => {

  }

  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
      </header>
      <main>
        <p>{location.latitude}</p>
        <p>{location.longitude}</p>
        <MapComponent location={location} />
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
