import React from 'react';
import "../Page.css";
import Comedy from './rows/Comedy';
import Drama from './rows/Drama';
import Reality from './rows/Reality';

function Series() {
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
