import React from 'react';
import Action from './rows/Action';
import Drama from './rows/Drama';
import "../Page.css";
import Comedy from './rows/Comedy';
import ReactGA from "react-ga";

function Movies() {
    //Pages to be reported/monitored/tracked:
    ReactGA.pageview(window.location.pathname + window.location.search);
    /*Expression inside "pageview" method allows all pages to be reported
    with the full path (i.e. /movies/?lang=en).*/
    return (
        <div className="screen">
            <h3>Action</h3>
            <Action/>
            <h3>Comedy</h3>
            <Comedy/>
            <h3>Drama</h3>
            <Drama/>
        </div>
    )
}

export default Movies
