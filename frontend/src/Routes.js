import {Route, Switch} from "react-router-dom";
import {CreateMode, Home, NotFoundPage, PrivacyPolicy, SelectMusicGenre} from "views";
import {Game} from "./components";


const Routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={() => <Home/>}/>
            <Route path="/choose" exact component={() => <SelectMusicGenre/>}/>
            <Route path="/create/mode" exact component={() => <CreateMode/>}/>
            <Route path="/play" exact component={() => <Game timePerRound={30} totalRounds={2}/>}/>

            <Route path="/privacy-policy" exact component={() => <PrivacyPolicy/>}/>
            <Route path="/sitemap" exact component={() => <PrivacyPolicy/>}/>
            <Route component={() => <NotFoundPage/>}/>
        </Switch>
    )
}

export default Routes;