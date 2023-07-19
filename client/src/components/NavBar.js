import {NavLink} from "react-router-dom"

function NavBar(){
    return (
        <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/rankings">Rankings</NavLink>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/draft_simulator">Draft Simulator</NavLink>
                <NavLink to="/playercard">#1 Overall</NavLink>
                <NavLink to="/predictions">Predictions</NavLink>
                {/* <NavLink to="/login">Login</NavLink> */}
        </nav>
    )
}

export default NavBar;