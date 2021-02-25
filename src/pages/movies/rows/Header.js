import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import "../../../header/Header.css";
import { Link } from "react-router-dom";
import {FaSearch, FaPlay, FaInfoCircle} from "react-icons/fa";
import {HeaderDescription, Head, Navlinks} from "../../../header/Header-style";

function Header() {
    const [Toggle, setToggle] = useState(false);
    const [Data, setData] = useState([]);
    const [Path, setPath] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [Active, setActive] = useState(false);
    const [Duration, setDuration] = useState("0.5s");

    useEffect(() => {
        const AbortFetch = new AbortController(); /* Stops/pauses the fetch function when the
        the component is unexpectedly unmounted/removed from the DOM/browser-interface during fast
        switching of pages/Dom-components. */
        const GetData = async () => {
            const data_rough = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/movies-banner-api`, {AbortFetch});
            const data_jsonformat = await data_rough.json();
            console.log(data_jsonformat);
            setData(data_jsonformat);
        }
        GetData();
    }, []); /* useEffect prevents looping between the set state and initial state (useState line)
    as the "[]" (no dependency) makes it run the inside code only when the function is called
    (i.e. when the page loads in this case) */ 

    const redirect = useHistory();

    useEffect(() => {
        if (Path && Thumbnail != "") {
            sessionStorage.setItem("path", Path);
            sessionStorage.setItem("thumbnail", Thumbnail);
            redirect.push("/watch")
        }
    }, [Path]); /* Since useState is asynchronous, useEffect needs to be used to return
    the correct value of "Path" once the initial state is updated. Otherwise, "Path" will
    be blank/incorrect on the first click */

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

    return (
        <div>
            {Data.map((banner_content) => {
                return (
                    <Head key="header" image={banner_content.image}>
                        <nav className="navbar">
                            <h1>WeMe</h1>
                            <div className="navbar-right">
                                <form className="search-bar">
                                    <input type="textbox" placeholder="Search" />
                                    <button onClick={(e) => {e.preventDefault()}}><FaSearch/></button>
                                </form>
                                <div className="navitems">
                                    <Navlinks className="navlinks" slide={Active ? "translateX(-100%)" : "translateX(0%)"} duration={Duration}>
                                        <li><Link to="/">Home</Link></li>
                                        <li><Link to="/movies">Movies</Link></li>
                                        <li><Link to="/series">Series</Link></li>
                                    </Navlinks>
                                    <div className="burgermenu" onClick={() => {setActive(!Active); setDuration("0.5s")}} >
                                        <div></div>
                                        <div></div>
                                        <div></div>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <div className="bottom-panel">
                            <div className="buttons">
                                <button title="Play" onClick={() => {setPath(banner_content.path); setThumbnail(banner_content.image)}}><FaPlay/></button>
                                <button title="Details and Description" onClick={() => {setToggle(!Toggle)}}><FaInfoCircle/></button>
                            </div>
                            <HeaderDescription display={Toggle ? "flex" : "none"}>
                                <h3>Description</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a dui vitae purus semper dignissim. In finibus scelerisque ipsum eget efficitur. 
                                    Aenean eu erat faucibus, mattis mi in, feugiat sem. Cras viverra dolor vel ante lobortis luctus. Integer laoreet pellentesque ipsum nec facilisis. 
                                    Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer a vulputate enim. Quisque sit amet ligula eget mauris cursus tristique. 
                                    Suspendisse nec eros sit amet quam vehicula ornare. In pretium nisl eu mi auctor efficitur. In ullamcorper tempus dapibus. Pellentesque ac 
                                    pellentesque diam. Nulla dictum purus sed mollis dignissim. Pellentesque ac massa vel sapien malesuada maximus at et erat. Praesent orci enim, 
                                    volutpat nec consequat vel, pulvinar quis velit. Nam vehicula imperdiet nulla, tincidunt suscipit metus vestibulum vel.
                                </p>
                            </HeaderDescription>
                        </div>
                    </Head>
                )
            })}
        </div>
    )
}

export default Header