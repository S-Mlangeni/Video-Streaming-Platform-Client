import React from 'react';
import "../Page.css";
import Comedy from './rows/Comedy';
import Drama from './rows/Drama';
import Reality from './rows/Reality';
import ReactGA from "react-ga";

function Series() {
    //Pages to be reported/monitored/tracked:
    ReactGA.pageview(window.location.pathname + window.location.search);
    /*Expression inside "pageview" method allows all pages to be reported
    with the full path (i.e. /movies/?lang=en).*/
    return (
        <div className="screen"> 
            <h3>Comedy</h3>
            <Comedy/>
            <h3>Drama</h3>
            <Drama/>
            <h3>Reality</h3>
            <Reality/>
        </div>
    )
}

export default Series
