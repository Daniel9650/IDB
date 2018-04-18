import React, { Component } from 'react';
import { Row } from 'reactstrap';
import about from '../../data/about-info.json';
import Logo from './Logo.js';

class LogoGrid extends Component {

   createLogo(logo) {
      return <Logo
         image={logo.image}
         link={logo.link}
         name={logo.name}
         />;
   }

   createLogos(logos) {
      return logos.map(this.createLogo);
   }

   render() {
      return (
         <Row>
               {this.createLogos(about.logos)}
         </Row>
      );
   }

}

export default LogoGrid;
