import React, { Component } from 'react';
import { Col } from 'reactstrap';

let Bio = function statelessFunctionComponentClass(props) {
   var image = require('../../images/' + props.image);
   var name = props.name;
   var role = props.role;
   var commits = props.commits;
   var issues = props.issues;
   var tests = props.tests;

      return (
         <Col className= 'col-center'>
            <img className='headshot center-block' src={image} />
            <h4 className='about-name'>{props.name}</h4>
            <p>{props.role}</p>
            <p>Commits: {commits}</p>
            <p>Issues: {issues}</p>
            <p>Unit Tests: {tests}</p>
         </Col>
      );
}

export default Bio;
