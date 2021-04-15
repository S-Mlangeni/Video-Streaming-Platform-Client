import React from 'react';
import "./Watchscreen.css";
import ReactGA from "react-ga";

function Watchscreen() {
    //Pages to be reported/monitored/tracked:
    ReactGA.pageview(window.location.pathname + window.location.search);
    /*Expression inside "pageview" method allows all pages to be reported
    with the full path (i.e. /movies/?lang=en).*/
    const path = sessionStorage.getItem("path");
    const thumbnail = sessionStorage.getItem("thumbnail");
    console.log("Video file is running...")
    return (
        <div className="frame">
            <video autoPlay poster={thumbnail} controls controlsList="nodownload">
                <source src={`${process.env.REACT_APP_API_ENDPOINT_VID}${path}`} type="video/mp4" />
                <source src="" type="video/webm" />
                Error: Your browser does not support the mp4 or webm videos. 
                Please change the browser.
            </video> {/* Compatible video formats for most browsers */}
        </div>
    )
}

export default Watchscreen
    