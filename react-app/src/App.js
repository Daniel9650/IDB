import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MovieInstance from './components/MovieInstance.js';
import Navigation from './components/Navigation.js';
import Home from './components/Home.js';
import About from './components/about/About.js';

class App extends Component {
  render() {
    return (
      <div>
         <Navigation />
         <About />
      </div>
    );
  }
}

export default App;
