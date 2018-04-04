import React, { Component } from 'react';

import './App.css';
import MovieInstance from './components/instances/MovieInstance.js';
import MusicInstance from './components/instances/MusicInstance.js';
import BookInstance from './components/instances/BookInstance.js';
import TopicInstance from './components/instances/TopicInstance.js';
import NotFound from './components/global/NotFound.js';
import Navigation from './components/global/Navigation.js';
import Home from './components/home/Home.js';
import About from './components/about/About.js';
import Model from './components/model/Model.js';
import SearchPage from './components/search/SearchPage.js';
import { Router, Route, Link, IndexRoute } from 'react-router';

class App extends Component {
  render() {
    return (
      <div>
         <Navigation />
         <Route exact path='/movies' component={MovieModel} />
         <Route exact path='/movies&page=:pageNum' component={MovieModel} />
         <Route path='/movies/:id' component={MovieInstance} />
         <Route exact path='/books' component={BooksModel} />
         <Route exact path='/books&page=:pageNum' component={BooksModel} />
         <Route path='/books/:id' component={BookInstance} />
         <Route exact path='/music' component={MusicModel} />
         <Route exact path='/music&page=:pageNum' component={MusicModel} />
         <Route path='/music/:id' component={MusicInstance} />
         <Route exact path='/topics' component={TopicModel} />
         <Route exact path='/topics&page=:pageNum' component={TopicModel} />
         <Route path='/topics/:id' component={TopicInstance} />
         <Route path='/about' component={About}/>
         <Route path='/home' component={Home}/>
         <Route path='/search&q=:query' component={SearchPage} />
         <Route exact path='/' component={Home} />
      </div>
    );
  }
}

let MovieModel = (props)=> {
   console.log(props);
   var page = 1;
   if(props.match.params.pageNum != null)
      page = props.match.params.pageNum;
   return (
      <Model
         type="Movies"
         pageNum={page}
         />
   );
};

let BooksModel = (props)=> {
   console.log(props);
   var page = 1;
   if(props.match.params.pageNum != null)
      page = props.match.params.pageNum;
   return (
      <Model
         type="Books"
         pageNum={page}
         />
   );
};

let MusicModel = (props)=> {
   console.log(props);
   var page = 1;
   if(props.match.params.pageNum != null)
      page = props.match.params.pageNum;
   return (
      <Model
         type="Music"
         pageNum={page}
         />
   );
};
let TopicModel = (props)=> {
   console.log(props);
   var page = 1;
   if(props.match.params.pageNum != null)
      page = props.match.params.pageNum;
   return (
      <Model
         type="Topics"
         pageNum={page}
         />
   );
};


export default App;
