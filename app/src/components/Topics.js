import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import action from '../graphics/action.jpg';
import adventure from '../graphics/adventure.jpg';
import animation from '../graphics/animation.png';
import comedy from '../graphics/comedy.jpg';
import family from '../graphics/family.jpg';
import fantasy from '../graphics/fantasy.jpg';
import mystery from '../graphics/mystery.jpg';
import relationships from '../graphics/relationships.jpg';
import sciencefiction from '../graphics/sciencefiction.jpg';
import thriller from '../graphics/thriller.jpg';


class Topics extends Component {
   render () {
      return (
         <div>
            <br></br>
            <h1 className="model-title"> Topics </h1>
            <hr className="model-rule"/>
            <Grid>
               <Row>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/action" src={action} >
                        <h3>Action</h3>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/mystery" src={mystery} >
                        <h3>Mystery</h3>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/science-fiction" src={sciencefiction} >
                        <h3>Science Fiction</h3>
                     </Thumbnail>
                  </Col>
               </Row>
               <Row>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/thriller" src={thriller} >
                        <h3>Thriller</h3>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/family" src={family} >
                        <h3>Family</h3>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/animation" src={animation} >
                        <h3>Animation</h3>
                     </Thumbnail>
                  </Col>
               </Row>
               <Row>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/adventure" src={adventure} >
                        <h3>Adventure</h3>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/comedy" src={comedy} >
                        <h3>Comedy</h3>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/fantasy" src={fantasy} >
                        <h3>Fantasy</h3>
                     </Thumbnail>
                  </Col>
               </Row>
               <Row>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/topics/family-and-relationships" src={relationships} >
                        <h3>Family and Relationships</h3>
                     </Thumbnail>
                  </Col>
               </Row>
            </Grid>
         </div>
      );
   }
}

export default Topics;
