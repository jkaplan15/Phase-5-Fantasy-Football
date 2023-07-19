import React, {useState} from "react"

function PlayerCard({editPlayer, deletePrediction, prediction}) {

    const [toggle, setToggle] = useState(true)
    const [click, setClick] = useState(true)
    const [form, setForm] = useState("")

    console.log(form)

    function togglePlayer() {
        setToggle(toggle => !toggle)
    }

    function clickLink() {
        setClick(click)
    }

    return (
        <div className="player-item">
            <h2 className="player-name">{prediction.name}</h2>
            {toggle ? <img onMouseEnter={togglePlayer} src = {prediction.image} alt = {prediction.name}/> 
            :
            <div onMouseLeave={togglePlayer} className="card-back">
            { prediction.position ? 
            <>
            <h3>Position: {prediction.position}</h3>
            <h3>Rush Yards: {prediction.rushyards}</h3>
            <h3>Receptions: {prediction.receptions}</h3>
            <h3>Receiving Yards: {prediction.receivingyards}</h3>
            <h3>2022 Finish: {prediction.finish}</h3>
            <h3><a className="link" href= {prediction.expertanalysis} target="_blank">See what the experts say: </a></h3>
            </> : <h3>Reason For Going #1: {prediction.reason}</h3>}
            </div> 
    }    

        { !prediction.position &&
              <div className="btn-group">
              <button onClick={() => deletePrediction(prediction.id)}>DELETE</button>
              <form onSubmit={(e) => editPlayer(e, form, prediction.id)}>
              <input value={form} onChange={(e)=> setForm(e.target.value)}type="text" name="reason" placeholder="Reason" />
              <button type="submit">Edit</button>
              </form>
          </div>
         }
  
  
        </div>)
}


export default PlayerCard
