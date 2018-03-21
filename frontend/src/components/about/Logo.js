import React, { Component } from 'react';
import { Col } from 'reactstrap';

let Logo = function statelessFunctionComponentClass(props) {
   var image = require('../../images/logos/' + props.image);
   var link = props.link;
   var name = props.name;

      return (
         <Col>
            <a name={name} href={link}>
               <img className='about-logo center-block' src={image}/>
            </a>
         </Col>
      );
}

export default Logo;
