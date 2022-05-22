import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";


// Routes
import {Home, CreateMode, SelectMusicGenre, PrivacyPolicy} from "views";
import {Game} from "components";
import {Footer, NavBar} from "components";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar/>
                <Switch>
                    <Route path="/" exact component={() => <Home/>}/>
                    <Route path="/choose" exact component={() => <SelectMusicGenre/>}/>
                    <Route path="/create/mode" exact component={() => <CreateMode/>}/>
                    <Route path="/play" exact component={() => <Game timePerRound={30} totalRounds={2}/>}/>
                    <Route path="/privacy-policy" exact component={() => <PrivacyPolicy/>}/>
                </Switch>
                <Footer/>
            </Router>
        </div>
    );
}


export default App;