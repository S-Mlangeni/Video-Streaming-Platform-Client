import React, {useState, useEffect, useRef} from 'react';
import {useHistory} from "react-router-dom";
import "../../Rows.css";
import {FaArrowLeft, FaArrowRight, FaPlay, FaInfoCircle} from "react-icons/fa";
import {View, Slide, DescriptionPanel, LeftArrow, RightArrow} from "../../Row-styles";

require('dotenv').config();

function Action() {
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
    
    const SlideMargin = 3;// px
    const [Count, setCount] = useState(SlidesPerView)
    const SlidesViewed = Count;
    const [DisplayWidth, setDisplayWidth] = useState(0);
    const [Toggle, setToggle] = useState(false);
    const ElementDetails = useRef();

    useEffect(() => {
        const AbortFetch = new AbortController(); /* Stops/pauses the fetch function when the
        the component is unexpectedly unmounted/removed from the DOM/browser-interface during fast
        switching of pages/Dom-components. */
        const GetData = async () => {
            const data_rough = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/movies-action-api`, {AbortFetch});
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
    
    useEffect(()=> {
        setDisplayWidth(ElementDetails.current.getBoundingClientRect().width)
    }, [Count, WindowWidth]);

    useEffect(() => {
        const WindowResize = () => {
            setWindowWidth(window.innerWidth);
        };
        if (SlidesViewed < SlidesPerView) {
            setCount(SlidesViewed + 1);
        } else if (SlidesViewed > SlidesPerView) {
            setCount(SlidesViewed - 1);
        };
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
                                    <button title="Details and Description" onClick={() => {setThumbnail(content.image); setToggle(!Toggle)}}><FaInfoCircle /></button>
                                </div> 
                            </Slide>
                            /* "key" property needs to be attached to the parent element for each 
                            list item to identify them uniquely */
                        )
                    })}
                </View>
                <DescriptionPanel img={Thumbnail} display={Toggle ? "flex" : "none"}>
                    <h3>Description</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean a dui vitae purus semper dignissim. In finibus scelerisque ipsum eget efficitur. 
                        Aenean eu erat faucibus, mattis mi in, feugiat sem. Cras viverra dolor vel ante lobortis luctus. Integer laoreet pellentesque ipsum nec facilisis. 
                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Integer a vulputate enim. Quisque sit amet ligula eget mauris cursus tristique. 
                        Suspendisse nec eros sit amet quam vehicula ornare. In pretium nisl eu mi auctor efficitur. In ullamcorper tempus dapibus. Pellentesque ac 
                        pellentesque diam. Nulla dictum purus sed mollis dignissim. Pellentesque ac massa vel sapien malesuada maximus at et erat. Praesent orci enim, 
                        volutpat nec consequat vel, pulvinar quis velit. Nam vehicula imperdiet nulla, tincidunt suscipit metus vestibulum vel.
                    </p>
                </DescriptionPanel>
            </div>
            <RightArrow className="arrows" visibility={SlidesViewed < Data.length ? "visible" : "hidden"} onClick={() => {(Data.length - SlidesViewed) > 0 && setCount(SlidesViewed + 1);}}><FaArrowRight /></RightArrow>
        </div>
    )
}

export default Action