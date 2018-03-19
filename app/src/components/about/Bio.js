import React, { Component } from 'react';
import { Col } from 'reactstrap';

let Bio = function statelessFunctionComponentClass(props) {
   var image = require('../../images/' + props.image);

   return (
      <Col className= 'col-center'>
         <img className='headshot center-block' src={image} />
         <h4 className='about-name'>{props.name}</h4>
         <p>{props.role}</p>
         <p>Commits: {props.commits}</p>
         <p>Issues: {props.issues}</p>
         <p>Unit Tests: {props.tests}</p>
      </Col>
   );
}

export default Bio;
