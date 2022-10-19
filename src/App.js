import './App.css';
import Navbar from './components/Navbar'
import Content from './components/Content'
import Footer from './components/Footer'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { fetchStandings } from './redux/actions/standingsActions';
import { fetchStats } from './redux/actions/canadiensActions';
import { fetchPlayerStats } from './redux/actions/playerActions';
import { crawlPlayers } from 'nhl-api-crawler';
import { crawlEvents } from 'nhl-api-crawler'

async function testing() {  
  const events = await crawlEvents('2018-12-05', '2018-12-06');
  console.log(events);
  // const players = await crawlPlayers('20182019', '20182019');
  // console.log(players)
}

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
      dispatch(fetchStandings());
      dispatch(fetchStats());
      dispatch(fetchPlayerStats());
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
