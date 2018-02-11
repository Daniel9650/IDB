import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Navigation from './components/Nav.js';
import Topics from './components/Topics.js';
import Movies from './components/Movies.js';
import Music from './components/Music.js';
import Home from './components/Home.js';
import Books from './components/Books.js';
import About from './components/About.js';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Navigation/>
       <Switch>
         <Route path="/home" component ={Home} />
         <Route path="/topics" component ={Topics} />
         <Route path="/movies" component ={Movies} />
         <Route path="/music" component ={Music} />
         <Route path="/books" component ={Books} />
         <Route path="/about" component ={About} />

       </Switch>
      </div>
    );
  }
}

export default App;
