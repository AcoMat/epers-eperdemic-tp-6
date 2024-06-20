import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import uselocation from './hooks/useLocation'
import MapComponent from './components/MapComponents/MapComponent';
import useLocation from './hooks/useLocation';

function App() {
  const [data, setData] = useState();

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

  const {location} = useLocation()  

  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
      </header>
      <main>
        <p>{location.latitude}</p>
        <p>{location.longitude}</p>
        <MapComponent></MapComponent>
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default App;
