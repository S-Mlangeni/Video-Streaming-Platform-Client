import React from 'react';
import Action from './rows/Action';
import "../Page.css";
import Animation from './rows/Animation';
import Comedy from './rows/Comedy';
import Documentaries from './rows/Documentaries';

function Series() {
    return (
        <div className="screen"> 
            <h3>Action</h3>
            <Action/>
            <h3>Animation</h3>
            <Animation/>
            <h3>Comedy</h3>
            <Comedy/>
            <h3>Documentaries</h3>
            <Documentaries/>
        </div>
    )
}

export default Series
