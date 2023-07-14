import PlayerInfo from './PlayerInfo'

function Rankings({players}){
    return (
        <div className="background">
        <div className='raking-group'>
            <h1 className="title">WR</h1>
             <div className="flex-container">
              {players.map((player) => {
                if (player.position==='WR') {
                    return (
                  
                        <div>{player.rank_position}. {player.name}</div>
               
                    )
                }
               
            })}
            </div>
            </div>
            <div className='raking-group'>
        <h1 className="title">RB</h1>
        <div className="flex-container">
              {players.map((player) => {
                if (player.position==='RB') {
                    return (
                        <>
                        <div>{player.rank_position}. {player.name}</div>
                        </>
                    )
                }
               
            })}
        </div>
        </div>
        <div className='raking-group'>
        <h1 className="title">QB</h1>
        <div className="flex-container">
              {players.map((player) => {
                if (player.position==='QB') {
                    return (
                        <>
                        <div>{player.rank_position}. {player.name}</div>
                        </>
                    )
                }
               
            })}
        </div>
        </div>
        <div className='raking-group'>
        <h1 className="title">TE</h1>
        <div className="flex-container">
              {players.map((player) => {
                if (player.position==='TE') {
                    return (
                        <>
                        <div>{player.rank_position}. {player.name}</div>
                        </>
                    )
                }
               
            })}
        </div>
        </div>
        </div>
)}

export default Rankings