import React, { Component } from 'react';
import { Col } from 'reactstrap';

class Logo extends Component {
  constructor(props){
    super(props);
  }

  render(){
     var image = require('../../images/logos/' + this.props.image);
     var link = this.props.link;
     var name = this.props.name;

      return (
         <Col>
            <a name={name} href={link}>
               <img className='about-logo center-block' alt="logo" src={image}/>
            </a>
         </Col>
      );
    }
}

export default Logo;
