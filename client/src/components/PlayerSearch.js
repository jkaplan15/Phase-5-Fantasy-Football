
function PlayerSearch({searchPlayer, search}) {

    return (
        <div className="search">
            <input onChange= {searchPlayer} className= "search-bar" value={search}/>

        </div>
    )
}


export default PlayerSearch