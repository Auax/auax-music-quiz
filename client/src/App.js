import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Routes
import { Home, SelectMusicGenre, GenrePage, Play } from "views";
import { Footer, NavBar } from "components";

function App() {
    return (
        <div className="App">
            <Router>
                <NavBar />
                <Switch>
                    <Route path="/" exact component={() => <Home />} />
                    <Route path="/play" exact component={() => <SelectMusicGenre />} />
                    <Route path="/play/genre" exact component={() => <GenrePage />} />
                    <Route path="/play/:mode" exact component={() => <Play />} />
                </Switch>
                <Footer />
            </Router>
        </div>
    );
}


export default App;