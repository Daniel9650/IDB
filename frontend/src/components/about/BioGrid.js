import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import Bio from './Bio.js';

class BioGrid extends Component {
   constructor(props) {
      super(props)
      this.createBio = this.createBio.bind(this);
      this.createBios = this.createBios.bind(this);
      this.mems = [
         {name: 'Kylie Sanderson', image: 'kylie.jpg', role: 'React Developer and Designer', tests: '10'},
         {name: 'Gerlou Shyy', image:'gerlou.jpg', role: 'API Specialist', tests: '18'},
         {name: 'Drew Dearing', image:'drew.png', role: 'Server Manager and Frontend Developer', tests:'5'},
         {name: 'Daniel Olmos', image: 'olmos.jpg', role: 'Python Developer and Database Designer', tests: '10' },
         {name: 'Daniel Talamas', image:'talamas.jpg', role: 'Python Developer', tests: '9'}
      ];
   }
   createBio(member) {
      var index = -1
      if(member.name === "kyliesanderson")
         index = 0;
      else if(member.name === "gerlou")
         index = 1;
      else if(member.name === "drewdearing")
         index = 2;
      else if(member.name === "Daniel9650")
         index = 3;
      else if(member.name === "dtalamas")
         index = 4;
      return <Bio
         name = {this.mems[index].name}
         image = {this.mems[index].image}
         role = {this.mems[index].role}
         commits={member.commits}
         issues={member.issues}
         tests={this.mems[index].tests}
         />;
   }

   createBios(members) {
      return members.map(this.createBio);
   }

   render() {
      return (
         <Row>
               {this.createBios(this.props.data.users)}
         </Row>
      );
   }

}

export default BioGrid;
