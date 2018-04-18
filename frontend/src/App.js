import React, { Component } from 'react';

import './App.css';
import 'font-awesome/css/font-awesome.min.css';
import MovieInstance from './components/instances/MovieInstance.js';
import MusicInstance from './components/instances/MusicInstance.js';
import BookInstance from './components/instances/BookInstance.js';
import TopicInstance from './components/instances/TopicInstance.js';
import Navigation from './components/global/Navigation.js';
import Home from './components/home/Home.js';
import About from './components/about/About.js';
import Model from './components/model/Model.js';
import SearchPage from './components/search/SearchPage.js';
import Footer from './components/global/Footer.js';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom'
import NotFound from './components/global/NotFound.js';

class App extends Component {
  render() {
    return (
      <div>
         <Navigation />
         <BrowserRouter>
         <div>
         <Route exact path='/movies' render={()=>{return <Model type="Movies"/>}} />
         <Route path='/movies/:id' component={MovieInstance} />
         <Route exact path='/books' render={()=>{return <Model type="Books"/>}} />
         <Route path='/books/:id' component={BookInstance} />
         <Route exact path='/music' render={()=>{return <Model type="Music"/>}} />
         <Route path='/music/:id' component={MusicInstance} />
         <Route exact path='/topics' render={()=>{return <Model type="Topics"/>}} />
         <Route path='/topics/:id' component={TopicInstance} />
         <Route path='/about' component={About}/>
         <Route path='/home' component={Home}/>
         <Route path='/search' component={SearchPage} />
         <Route exact path='/' component={Home} />
         <Route exact path="/help" render={()=>{return <NotFound/>}} />
         </div>
         </BrowserRouter>
         <Footer />
      </div>
    );
  }
}



export default App;
