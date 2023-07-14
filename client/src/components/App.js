import '../App.css';
import {useState, useEffect} from 'react'
import { Route, Switch } from "react-router-dom"

import NavBar from './NavBar'
import Header from './Header'
import PlayerSearch from './PlayerSearch'
import PlayerList from './PlayerList'
import Rankings from './Rankings'
import DraftSim from './DraftSim'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';


function App() {

  const [players, setPlayers] = useState([])
  const [search, setSearch] = useState("")
  const [remainingPlayers, setRemainingPlayers] = useState([]);

  const location = useLocation()
  console.log(location)

  useEffect(() => {
    fetch('/players')
    .then(response => response.json())
    .then(data => {
      setPlayers(data)
      setRemainingPlayers(data)
    })
  }, [])

  // console.log(players)


  function searchPlayer(e) {
    setSearch(e.target.value)
  }

  const filterPlayer = players.filter(player => {
    if (search==="") {
      return true
    }
    return player.name.toLowerCase().includes(search.toLowerCase())
  })

  // useEffect(() => {
  //   fetch('/hotels')
  //   .then(response => response.json())
  //   .then(hotelData => setHotels(hotelData))
  // }, [])

  // useEffect(() => {
  //   if(hotels.length > 0 && hotels[0].id){
  //     setIdToUpdate(hotels[0].id)
  //   }
  // }, [hotels])


  // }

  function App() {
  return (
    <div>
      <h1>Table Example</h1>
      <DraftSim players = {players}/>
    </div>
  );
}

  return (
    <div className="app">
      <div className="header">
        <NavBar/>
        {location.pathname === '/' &&  <Header />}
      
    </div>
      <>
      {/* {JSON.stringify(players)} */}
      </>
      <Switch>
        <Route path="/search">
          <PlayerSearch searchPlayer = {searchPlayer} search={search}/>
          <PlayerList players = {filterPlayer} />
        </Route>
        <Route path="/rankings">
          <Rankings players = {players}/>
        </Route>
        <Route path="/draft_simulator">
          <DraftSim setRemainingPlayers={setRemainingPlayers}  remainingPlayers = {remainingPlayers} players = {players} />
        </Route>
      </Switch>
    </div>
  );
}



      /* <Switch>
        <Route exact path="/">
          <h1>Welcome! Here is the list of hotels available:</h1>
          <HotelList hotels={hotels} deleteHotel={deleteHotel}/>
        </Route>
        <Route path="/add_hotel">
          <NewHotelForm addHotel={addHotel} updatePostFormData={updatePostFormData}/>
        </Route>
        <Route path="/update_hotel">
          <UpdateHotelForm updateHotel={updateHotel} setIdToUpdate={setIdToUpdate} updatePatchFormData={updatePatchFormData} hotels={hotels}/>
        </Route>
      </Switch> */

export default App;
