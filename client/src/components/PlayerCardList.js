import React from "react"
import PlayerCard from "./PlayerCard"


function PlayerCardList({ editPlayer, deletePrediction, predictions}) {
    return (
        <div className="background">
            
            <h1 className="title">Who Should Go #1 Overall In Your 2023 Fantasy Football Draft? </h1>
             <div className="flex-container">
            {predictions.map((prediction) => {
                return <PlayerCard deletePrediction={deletePrediction} editPlayer={editPlayer} key={prediction.name} prediction={prediction}/>
            })}
        </div>
        </div>)
        
}

export default PlayerCardList