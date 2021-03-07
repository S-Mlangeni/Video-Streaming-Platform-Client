import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from "react-router-dom";
import "../../Rows.css";
import {FaArrowLeft, FaArrowRight, FaPlay, FaInfoCircle} from "react-icons/fa";
import {View, Slide, DescriptionPanel, LeftArrow, RightArrow, Episodes, Loader} from "../../Row-styles";

require('dotenv').config();

function Trending() {
    const [Data, setData] = useState([]);
    const [Path, setPath] = useState("");
    const [Thumbnail, setThumbnail] = useState("");
    const [WindowWidth, setWindowWidth] = useState(window.innerWidth);
    
    if (WindowWidth <= 480) {
        var SlidesPerView = 2;
    } else if (WindowWidth <= 768) {
        var SlidesPerView = 3;
    } else if (WindowWidth <= 1200) {
        var SlidesPerView = 4;
    } else {
        var SlidesPerView = 5;
    }
    
    const SlideMargin = 4;// px
    const [Count, setCount] = useState(SlidesPerView)
    const SlidesViewed = Count;
    const [DisplayWidth, setDisplayWidth] = useState(0);
    const [Toggle, setToggle] = useState(false);
    const ElementDetails = useRef();
    const [Tag, setTag] = useState("");
    const [Loading, setLoading] = useState(true);

    useEffect(() => {
        const AbortFetch = new AbortController(); /* Stops/pauses the fetch function when the
        the component is unexpectedly unmounted/removed from the DOM/browser-interface during fast
        switching of pages/Dom-components. */
        const GetData = async () => {
            const data_rough = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/home-trending-api`, {AbortFetch});
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
        if (Path && Thumbnail != "") {
            sessionStorage.setItem("path", Path);
            sessionStorage.setItem("thumbnail", Thumbnail);
            redirect.push("/watch")
        }
    }, [Path]); /* Since useState is asynchronous, useEffect needs to be used to return
    the correct value of "Path" once the initial state is updated. Otherwise, "Path" will
    be blank/incorrect on the first click */
    
    useEffect(()=> {
        setDisplayWidth(ElementDetails.current.getBoundingClientRect().width)
    }, [Count, WindowWidth]);

    useEffect(() => {
        if (SlidesViewed !== SlidesPerView) {
            setCount(SlidesPerView);
        }
        const WindowResize = () => {
            setWindowWidth(window.innerWidth)
        }
        window.addEventListener("resize", WindowResize);
        return (()=>{
            window.removeEventListener("resize", WindowResize)
        })
    }, [WindowWidth])

    return (
        <div className="main">
            <LeftArrow className="arrows" visibility={SlidesViewed > SlidesPerView ? "visible" : "hidden"} onClick={() => {(SlidesViewed) > SlidesPerView && setCount(SlidesViewed - 1);}}><FaArrowLeft /></LeftArrow>
            <div className="display-screen" ref={ElementDetails}>
                <View move={`translateX(${-(DisplayWidth/SlidesPerView) * (SlidesViewed - SlidesPerView)}px)`}>
                    {Data.map((content) => {
                        return (
                            <Slide key={content.title} image={content.image} width={`${(DisplayWidth/SlidesPerView)-SlideMargin*2}px`} margin={`${SlideMargin}px`}>
                                <div className="slide-banner">
                                    <button title="Play" onClick={() => {setPath(content.path); setThumbnail(content.image)}}><FaPlay /></button>
                                    <button title="Details and Description" onClick={() => {setThumbnail(content.image); setToggle(!Toggle); setTag(content.tag)}}><FaInfoCircle /></button>
                                </div> 
                            </Slide>
                            /* "key" property needs to be attached to the parent element for each 
                            list item to identify them uniquely */
                        )
                    })}
                </View>
                <Loader display={Loading ? "block" : "none"}></Loader>
                <DescriptionPanel img={Thumbnail} display={Toggle ? "flex" : "none"}>
                    <h3>Description</h3>
                    <p>Not available on demo.
                    </p>
                    <Episodes display={Tag === "series" ? "block" : "none"}>
                        <h3>Episodes</h3>
                        <div>
                            <p>Currently unavailable.</p>
                        </div>
                    </Episodes>
                </DescriptionPanel>
            </div>
            <RightArrow className="arrows" visibility={SlidesViewed < Data.length ? "visible" : "hidden"} onClick={() => {(Data.length - SlidesViewed) > 0 && setCount(SlidesViewed + 1);}}><FaArrowRight /></RightArrow>
        </div>
    )
}

export default Trending
