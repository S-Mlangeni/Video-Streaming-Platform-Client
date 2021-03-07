import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import "../../../header/Header.css";
import {FaPlay, FaInfoCircle} from "react-icons/fa";
import {HeaderDescription, Head, Loader} from "../../../header/Header-style";
import Navbar from '../../../header/Navbar';

function Header() {
    const [Toggle, setToggle] = useState(false);
    const [Data, setData] = useState([]);
    const [Path, setPath] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const AbortFetch = new AbortController(); /* Stops/pauses the fetch function when the
        the component is unexpectedly unmounted/removed from the DOM/browser-interface during fast
        switching of pages/Dom-components. */
        const GetData = async () => {
            const data_rough = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/series-banner-api`, {AbortFetch});
            const data_jsonformat = await data_rough.json();
            //console.log(data_jsonformat);
            setData(data_jsonformat);
        }
        GetData();
    }, []); /* useEffect prevents looping between the set state and initial state (useState line)
    as the "[]" (no dependency) makes it run the inside code only when the function is called
    (i.e. when the page loads in this case) */ 

    useEffect(() => {
        if (Data.length !== 0) {
            setLoading(false)
        }
    }, [Data])
    
    const redirect = useHistory();

    useEffect(() => {
        if (Path && Thumbnail !== "") {
            sessionStorage.setItem("path", Path);
            sessionStorage.setItem("thumbnail", Thumbnail);
            redirect.push("/watch")
        }
    }, [Path]); /* Since useState is asynchronous, useEffect needs to be used to return
    the correct value of "Path" once the initial state is updated. Otherwise, "Path" will
    be blank/incorrect on the first click */

    return (
        <div className="header_wrapper">
            {Data.map((banner_content) => {
                return (
                    <Head key="header" image={banner_content.image}>
                        <Navbar/>
                        <div className="bottom-panel">
                            <div className="buttons">
                                <button title="Play" onClick={() => {setPath(banner_content.path); setThumbnail(banner_content.image)}}><FaPlay/></button>
                                <button title="Details and Description" onClick={() => {setToggle(!Toggle)}}><FaInfoCircle/></button>
                            </div>
                            <HeaderDescription display={Toggle ? "flex" : "none"}>
                                <h3>Description</h3>
                                <p>Not available on demo.
                                </p>
                                <h3>Episodes</h3>
                                <div>
                                    <p>Currently unavailable.</p>
                                </div>
                            </HeaderDescription>
                        </div>
                    </Head>
                )
            })}
            <Loader display={Loading ? "block" : "none"}></Loader>
        </div>
    )
}

export default Header
