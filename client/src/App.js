import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Routes
import Navigation from "./components/premade/Navigation";
import Home from "./components/Home";
import Footer from "./components/premade/Footer";
import PlayLobby from "./components/SelectGenre";
import GenrePage from "./components/GenrePage";
import Play from "./components/Play";

function App() {
    return (
        <div className="App">
            <Router>
                <Navigation/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/play" exact component={() => <PlayLobby/>}/>
                    <Route path="/play/genre" exact component={() => <GenrePage/>}/>
                    <Route path="/play/:gamemode" exact component={() => <Play/>}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}


export default App;