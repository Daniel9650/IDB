import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieInstance from './components/movie/MovieInstance.js';
import Navigation from './components/Navigation.js';
import Home from './components/home/Home.js';
import About from './components/about/About.js';
import Model from './components/model/Model.js';
import { Router, Route, Link, IndexRoute } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
         <Navigation />
         <Route exact path='/movies' render={()=><Model type="Movies" />} />
         <Route path='/movies/:id' component={MovieInstance} />
         <Route path='/books' render={()=><Model type="Books" />} />
         <Route path='/music' render={()=><Model type="Music" />} />
         <Route path='/topics' render={()=><Model type="Topics" />} />
         <Route path='/about' component={About}/>
         <Route path='/home' component={Home}/>
         <Route exact path='/' component={Home} />
      </div>
    );
  }
}



export default App;
