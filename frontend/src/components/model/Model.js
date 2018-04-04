import React, { Component } from 'react';
import PageMod from './PageMod.js';
import { Container, Row } from 'reactstrap';
import CardGrid from './CardGrid.js';
import MovieFilters from './MovieFilters.js';
import MusicFilters from './MusicFilters.js';
import BookFilters from './BookFilters.js';
import TopicFilters from './TopicFilters.js';

class Model extends Component {

   constructor(props) {
      super(props);
      this.render = this.render.bind(this);
   }

   addFilters(){
      if(this.props.type === "Movies")
         return <MovieFilters />;
      else if(this.props.type === "Music")
         return <MusicFilters />;
      else if(this.props.type === "Books")
         return <BookFilters />;
      else
         return <TopicFilters />;
   }

   render() {
      var name = this.props.type + " Title";
      return (
         <Container className="spacing-div">
            <h1 name={name} className="general-title">{this.props.type}</h1>
            <hr className="divider"/>
            <Row>
               {this.addFilters()}
            </Row>
            <hr className="divider" />
            <CardGrid
               type={this.props.type}
               pageNum={this.props.pageNum}
               />

         </Container>

      );
   }
}

export default Model;
