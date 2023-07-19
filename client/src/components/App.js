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
import PlayerForm from './PlayerForm'
import PlayerCardList from './PlayerCardList'


function App() {

  const [players, setPlayers] = useState([])
  const [search, setSearch] = useState("")
  const [remainingPlayers, setRemainingPlayers] = useState([]);
  const [predictions, setPredictions] = useState([])
  const [formData, setNewPlayer] = useState({
    name: "",
    image: "",
    reason: ""
  })

  const location = useLocation()
  // console.log(location)

  useEffect(() => {
    fetch('/players')
    .then(response => response.json())
    .then(data => {
      setPlayers(data)
      setRemainingPlayers(data)
    })
  }, [])

  // console.log(players)

  useEffect(() => {
    fetch('/predictions')
    .then(response => response.json())
    .then(data => {
      setPredictions(data)
    })
  }, [])


  function playerDetails(e) {
    setNewPlayer({...formData, [e.target.name]: e.target.value})
  }

  function addPlayer(e) {
    e.preventDefault();
    console.log(formData)
    fetch('/predictions', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to add player.");
      }
      return response.json();
    })
    .then(newPrediction => {
      setPredictions([...predictions, newPrediction]);
    })
    .catch(error => {
      console.error("Error adding player:", error);
      // Handle the error appropriately, such as displaying an error message.
    });
  }

  function editPlayer(e, form, id) {
    e.preventDefault()
    fetch(`/predictions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({reason: form })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to edit player.");
      }
      return response.json();
    })
    .then(updatedPrediction => {
      setPredictions(predictions => {
        return predictions.map(prediction => {
          if(prediction.id === updatedPrediction.id){
            return updatedPrediction
          }
          else{
            return prediction
          }
        })
      })
    })
    
  }

  function deletePrediction(id) {
    fetch(`/predictions/${id}`, {
      method: "DELETE"
    })
    .then(() => setPredictions(predictions => {
      return predictions.filter(prediction => {
        return prediction.id !== id
      })
    }))
  }


  function searchPlayer(e) {
    setSearch(e.target.value)
  }

  const filterPlayer = players.filter(player => {
    if (search==="") {
      return true
    }
    return player.name.toLowerCase().includes(search.toLowerCase())
  })


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
          <Route path="/predictions">
          <PlayerForm playerDetails={playerDetails} addPlayer={addPlayer}/>
          </Route>
        <Route path="/playercard">
          <PlayerCardList deletePrediction={deletePrediction} editPlayer={editPlayer} predictions = {predictions}/>
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
