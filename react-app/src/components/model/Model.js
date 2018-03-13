import React, { Component } from 'react';

import { Container } from 'reactstrap';
import data from '../../data/mock.json';
import CardGrid from './CardGrid.js';

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
         <Container className="spacing-div">
            <h1 className="model-title">{this.props.type}</h1>
            <hr className="divider"/>
            <CardGrid
               instances={instances}
               type={this.props.type}
               />
         </Container>

      );
   }
}

export default Model;
