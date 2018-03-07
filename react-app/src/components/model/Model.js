import React, { Component } from 'react';
import ThumbnailGrid from './ThumbnailGrid.js';
import data from '../../data/mock.json';

class Model extends Component {

   constructor(props) {
      super(props);
      this.render = this.render.bind(this);
   }

   render() {
      var instances = [];

      if(this.props.type === "Movies")
         instances = data.movies;
      else if(this.props.type === "Books")
         instances = data.books;
      else if(this.props.type === "Music")
         instances = data.music;
      else
         instances = data.topics;

      return (
         <div className="spacing-div">
            <h1 className="model-title">{this.props.type}</h1>
            <hr className="divider"/>
            <ThumbnailGrid
               instances={instances}
               type={this.props.type}
               />
         </div>

      );
   }
}

export default Model;
