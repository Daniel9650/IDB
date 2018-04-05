import React, { Component } from 'react';
import { Container, Row, ButtonGroup, Button } from 'reactstrap';
import CardGrid from './CardGrid.js';


class Model extends Component {

   constructor(props) {
      super(props);
      this.render = this.render.bind(this);
   }


   render() {
      var name = this.props.type + " Title";
      return (
         <Container className="spacing-div">
            <h1 name={name} className="general-title">{this.props.type}</h1>
            <hr className="divider"/>
            <CardGrid
               type={this.props.type}
               pageNum={this.props.pageNum}
               />

         </Container>

      );
   }
}

export default Model;
