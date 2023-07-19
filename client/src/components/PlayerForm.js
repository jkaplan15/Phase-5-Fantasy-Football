import React from "react"

function PlayerForm({addPlayer, playerDetails}) {
    return (
        <div className="new-player-form">
            <h2 className="form-title">Someone Else?</h2>
            <form onSubmit={addPlayer}>
            <input onChange={playerDetails}type="text" name="name" placeholder="Player name" />
            <input onChange={playerDetails}type="text" name="image" placeholder="Image URL" />
            <input onChange={playerDetails}type="text" name="reason" placeholder="Reason" />
            <button type="submit">Add Player</button>
            </form>
        </div>
    )
}

export default PlayerForm