import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Watchscreen from "./pages/watchscreen/Watchscreen";
import Home from './pages/home/Home';
import Series from "./pages/series/Series";
import Movies from "./pages/movies/Movies"
import Footer from "./footer/Footer";
import HomeHeader from "./pages/home/rows/Header";
import MoviesHeader from "./pages/movies/rows/Header";
import SeriesHeader from "./pages/series/rows/Header";
import ReactGA from "react-ga";

function App() {
  ReactGA.initialize("UA-172987750-2");
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/watch">
            <Watchscreen />
          </Route>
          <Route exact path="/">
            <HomeHeader />
            <Home />
            <Footer />
          </Route>
          <Route exact path="/series">
            <SeriesHeader />
              <Series />
            <Footer />
          </Route>
          <Route exact path="/movies">
            <MoviesHeader />
              <Movies />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
