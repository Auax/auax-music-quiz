import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import {Footer, NavBar} from "./components";
import Routes from "./Routes";

// Sitemap

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Routes/>
                <Footer/>
            </Router>
        </div>
    );
}


export default App;