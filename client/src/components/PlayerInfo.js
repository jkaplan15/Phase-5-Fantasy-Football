
function PlayerInfo({player}){


    return (
        <div className="player-item">
            <h3 className="player-name">{player.name}: {player.position} {player.rank_position} (injury risk: {player.injury_risk})</h3>
        </div>
    )}   


export default PlayerInfo