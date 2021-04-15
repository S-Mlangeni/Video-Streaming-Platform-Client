import React, {useEffect, useState} from 'react'
import "./Header.css";
import {Navlinks} from "./Header-style";
import {NavLink, useHistory} from "react-router-dom";
import {FaSearch} from "react-icons/fa";
import ReactGA from "react-ga";

function Navbar() {
    const [Active, setActive] = useState(false);
    const [Duration, setDuration] = useState("0.5s");
    
    useEffect(() => {
        const ScrollAndClick = () => {
            setActive(false);
            setDuration("0s")
        }
        window.addEventListener("scroll", ScrollAndClick);
        
        if (Active) {
            window.addEventListener("click", ScrollAndClick);
        }
        return () => {
            window.removeEventListener("scroll", ScrollAndClick);
            window.removeEventListener("click", ScrollAndClick)
        }
    }, [Active])

    const redirect = useHistory();

    const SearchButtonHandler = (e) => {
        e.preventDefault();
        ReactGA.event({
            category: "Search button",
            action: "No action as button is disabled"
        })
    }

    return (
        <nav className="navbar">
            <div className="title" onClick={() => {redirect.push("/")}}></div>
            <div className="navbar-right">
                <form className="search-bar">
                    <input type="textbox" placeholder="Search" />
                    <button onClick={SearchButtonHandler}><FaSearch/></button>
                </form>
                <div className="navitems">
                    <Navlinks className="navlinks" slide={Active ? "translateX(-100%)" : "translateX(0%)"} duration={Duration}>
                        <li><NavLink to="/" exact activeClassName="link">Home</NavLink></li>
                        <li><NavLink to="/movies" exact activeClassName="link">Movies</NavLink></li>
                        <li><NavLink to="/series" exact activeClassName="link">Series</NavLink></li>
                    </Navlinks>
                    <div className="burgermenu" onClick={() => {setActive(!Active); setDuration("0.5s")}} >
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
