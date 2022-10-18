import './App.css';
import Navbar from './components/Navbar'
import Content from './components/Content'
import Footer from './components/Footer'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchStandings } from './redux/actions/standingsActions';
import { fetchStats } from './redux/actions/canadiensActions';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchStandings());
      dispatch(fetchStats());
    }, []);

  return (
    <div className="App">
      <Navbar />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
