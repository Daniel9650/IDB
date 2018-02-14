import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Nav.js';
import Topics from './components/Topics.js';
import Movies from './components/Movies.js';
import Music from './components/Music.js';
import Home from './components/Home.js';
import Books from './components/Books.js';
import About from './components/About.js';
import Minions from './components/movies/Minions.js';
import MazeRunner from './components/movies/MazeRunner.js';
import Jumanji from './components/movies/Jumanji.js';
import Synergy from './components/music/Synergy.js';
import BabyBlue from './components/music/BabyBlue.js';
import DriveMyCar from './components/music/DriveMyCar.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Navigation/>
       <Switch>
         <Route path="/topics" component ={Topics} />
         <Route path="/movies/minions" component={Minions} />
         <Route path="/movies/maze-runner" component={MazeRunner} />
         <Route path="/movies/jumanji" component={Jumanji} />
         <Route path="/movies" component ={Movies} />
         <Route path="/music/baby-blue" component ={BabyBlue} />
         <Route path="/music/drive-my-car" component ={DriveMyCar} />
         <Route path="/music/synergy" component ={Synergy} />
         <Route path="/music" component ={Music} />
         <Route path="/books" component ={Books} />
         <Route path="/about" component ={About} />
         <Route path="/" component ={Home} />

       </Switch>
      </div>
    );
  }
}

export default App;
