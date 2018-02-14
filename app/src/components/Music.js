import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import synergy from '../graphics/synergy.jpg';
import rubbersoul from '../graphics/rubbersoul.jpg';
import babyblue from '../graphics/babyblue.jpg';

class Music extends Component {
   render () {
      return (
         <div>
            <br></br>
            <h1 className="model-title"> Music </h1>
            <hr className="model-rule"/>
            <Grid>
               <Row>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/music/baby-blue" src={babyblue} >
                        <h3>Baby Blue</h3>
                        <p>Topics: Action</p>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/music/drive-my-car" src={rubbersoul} >
                        <h3>Drive My Car</h3>
                        <p>Topics: Family</p>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/music/synergy" src={synergy} >
                        <h3>Synergy</h3>
                        <p>Topics: Adventure</p>
                     </Thumbnail>
                  </Col>
               </Row>
            </Grid>
         </div>
      );
   }
}

export default Music;
