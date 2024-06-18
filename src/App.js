import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';

import MapComponent from './components/MapComponents/MapComponent';

function App() {
  const [data, setData] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
      const result = await response.json();
      setData(result)
      console.log(result)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <Header></Header>
      </header>
      <main>
        <MapComponent></MapComponent>
      </main>
      <footer>
        {data ? data.name : ("cargando")}
      </footer>
    </div>
  );
}

export default App;
