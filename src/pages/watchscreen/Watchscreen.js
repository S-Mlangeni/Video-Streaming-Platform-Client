import React from 'react';
import "./Watchscreen.css";

function Watchscreen() {
    const path = sessionStorage.getItem("path");
    const thumbnail = sessionStorage.getItem("thumbnail");
    console.log("Video file is running...")
    return (
        <div className="frame">
            <video autoPlay poster={thumbnail} controls controlsList="nodownload">
                <source src={`${process.env.REACT_APP_API_ENDPOINT}${path}`} type="video/mp4" />
                <source src="" type="video/webm" />
                Error: Your browser does not support the mp4 or webm videos. 
                Please change the browser.
            </video> {/* Compatible video formats for most browsers */}
        </div>
    )
}

export default Watchscreen
    