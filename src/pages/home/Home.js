import React from 'react';
import Recommended from './rows/Recommended';
import Trending from './rows/Trending';
import "../Page.css";
import New from './rows/New';
import ReactGA from "react-ga";

function Home() {
    //Pages to be reported/monitored/tracked:
    ReactGA.pageview(window.location.pathname + window.location.search);
    /*Expression inside "pageview" method allows all pages to be reported
    with the full path (i.e. /movies/?lang=en).*/
    return (
        <div className="screen">
            <h3>Brand New</h3>
            <New />
            <h3>Recommended</h3>
            <Recommended />
            <h3>Trending</h3>
            <Trending />
        </div>
    )
}

export default Home
