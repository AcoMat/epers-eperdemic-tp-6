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
      const response = await fetch('http://localhost:8080/patogeno/todosLosPatogenos')
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
      </footer>
    </div>
  );
}

export default App;
