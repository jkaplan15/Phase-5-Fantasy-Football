import {NavLink} from "react-router-dom"

function NavBar(){
    return (
        <nav>
            <div className = "nav-bar">
                <NavLink to="/">Home</NavLink>
            </div>
            <div>
                <NavLink to="/rankings">Rankings</NavLink>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/draft_simulator">Draft Simulator</NavLink>
                <NavLink to="/login">Predictions</NavLink>
                <NavLink to="/login">Login</NavLink>
            </div>
        </nav>
    )
}

export default NavBar;