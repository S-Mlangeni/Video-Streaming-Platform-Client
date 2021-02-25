import React from 'react';
import Action from './rows/Action';
import Drama from './rows/Drama';
import "../Page.css";
import Comedy from './rows/Comedy';
import Horror from './rows/Horror';

function Movies() {
    return (
        <div className="screen">
            <h3>Action</h3>
            <Action/>
            <h3>Comedy</h3>
            <Comedy/>
            <h3>Drama</h3>
            <Drama/>
            <h3>Horror</h3>
            <Horror/>
        </div>
    )
}

export default Movies
