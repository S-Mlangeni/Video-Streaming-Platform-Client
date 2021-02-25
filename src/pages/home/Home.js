import React from 'react';
import Recommended from './rows/Recommended';
import Trending from './rows/Trending';
import "../Page.css";
import New from './rows/New';


function Home() {
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
