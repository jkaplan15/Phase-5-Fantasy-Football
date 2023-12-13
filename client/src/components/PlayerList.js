import PlayerInfo from './PlayerInfo'

function PlayerList({players}){

    return (
        <div className="background">
            <h1 className="title"></h1>
             <div className="flex-container">
                {players.map((player) => {
                return <PlayerInfo key={player.id} player={player}/>
            })}
            </div>
        </div>
)}

export default PlayerList