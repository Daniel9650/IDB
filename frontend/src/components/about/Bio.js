import React, { Component } from 'react';
import { Col } from 'reactstrap';

class Bio extends Component{

  constructor(props){
    super(props);
  }

  render(){
     var image = require('../../images/headshots/' + this.props.image);
     return (
        <Col className= 'col-center'>
           <img className='headshot center-block' alt="headshot" src={image} />
           <h4 className='about-name'>{this.props.name}</h4>
           <p>{this.props.role}</p>
           <p>Commits: {this.props.commits}</p>
           <p>Issues: {this.props.issues}</p>
           <p>Unit Tests: {this.props.tests}</p>
        </Col>
     );
  }
}

export default Bio;
