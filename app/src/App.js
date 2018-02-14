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
import PenguinsCrimeWave from './components/books/PenguinsCrimeWave.js';
import IOnlySayThis from './components/books/IOnlySayThis.js';
import MayhemAtMagicSchool from './components/books/MayhemAtMagicSchool.js';
import Action from './components/topics/Action.js';
import Mystery from './components/topics/Mystery.js';
import ScienceFiction from './components/topics/ScienceFiction.js';
import Thriller from './components/topics/Thriller.js';
import Family from './components/topics/Family.js';
import FamilyAndRelationships from './components/topics/FamilyAndRelationships.js';
import Animation from './components/topics/Animation.js';
import Adventure from './components/topics/Adventure.js';
import Comedy from './components/topics/Comedy.js';
import Fantasy from './components/topics/Fantasy.js';
import JuvenileFiction from './components/topics/JuvenileFiction.js';



import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Navigation/>
       <Switch>
         <Route path="/topics/action" component ={Action} />
         <Route path="/topics/mystery" component ={Mystery} />
         <Route path="/topics/science-fiction" component ={ScienceFiction} />
         <Route path="/topics/thriller" component ={Thriller} />
         <Route path="/topics/family" component ={Family} />
         <Route path="/topics/family-and-relationships" component ={FamilyAndRelationships} />
         <Route path="/topics/animation" component ={Animation} />
         <Route path="/topics/adventure" component ={Adventure} />
         <Route path="/topics/comedy" component ={Comedy} />
         <Route path="/topics/fantasy" component ={Fantasy} />
         <Route path="/topics/juvenile-fiction" component ={JuvenileFiction} />
         <Route path="/topics" component ={Topics} />
         <Route path="/movies/minions" component={Minions} />
         <Route path="/movies/maze-runner" component={MazeRunner} />
         <Route path="/movies/jumanji" component={Jumanji} />
         <Route path="/movies" component ={Movies} />
         <Route path="/music/baby-blue" component ={BabyBlue} />
         <Route path="/music/drive-my-car" component ={DriveMyCar} />
         <Route path="/music/synergy" component ={Synergy} />
         <Route path="/music" component ={Music} />
         <Route path="/books/penguins-crime-wave" component ={PenguinsCrimeWave} />
         <Route path="/books/i-only-say-this" component ={IOnlySayThis} />
         <Route path="/books/mayhem-at-magic-school" component ={MayhemAtMagicSchool} />
         <Route path="/books" component ={Books} />
         <Route path="/about" component ={About} />
         <Route path="/" component ={Home} />

       </Switch>
      </div>
    );
  }
}

export default App;
