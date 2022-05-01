import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

// Routes
import {Home, SelectMusicGenre, GenrePage, Play} from "views";
import {Game} from "components";
import {Footer, NavBar} from "components";
import LoginCallback from "./api/auth";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/play" exact component={() => <SelectMusicGenre/>}/>
                    <Route path="/play/genre" exact component={() => <GenrePage/>}/>
                    <Route path="/play/:mode" exact component={() => <Game timePerRound={30}/>}/>
                    <Route path="/login/callback" exact component={() => <LoginCallback/>}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}


export default App;