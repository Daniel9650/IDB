import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import bios from '../../data/bios.json';
import Bio from './Bio.js';

class BioGrid extends Component {

   createBio(member) {
      return <Bio
         image={member.image}
         name={member.name}
         role={member.role}
         commits={member.commits}
         issues={member.issues}
         tests={member.tests}
         />;
   }

   createBios(members) {
      return members.map(this.createBio);
   }

   render() {
      return (
         <Container>
            <Row>
                  {this.createBios(bios.members)}

            </Row>
         </Container>
      );
   }

}

export default BioGrid;
