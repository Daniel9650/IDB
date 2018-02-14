import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import iloveyou from '../graphics/iloveyou.jpg';
import penguin from '../graphics/penguin.jpg';
import youchoose from '../graphics/youchoose.jpg';

class Books extends Component {
   render () {
      return (
         <div>
            <br></br>
            <h1 className="model-title"> Movies </h1>
            <hr className="model-rule"/>
            <Grid>
               <Row>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/books/penguins-crime-wave" src={penguin} >
                        <h3>The Penguins Crime Wave</h3>
                        <p>Topics: Action, Juvenile Fiction</p>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/books/i-only-say-this" src={iloveyou} >
                        <h3>I Only Say This Because I Love You</h3>
                        <p>Topics: Family, Family & Relationships</p>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/books/mayhem-at-magic-school" src={youchoose} >
                        <h3>Mayhem at Magic School</h3>
                        <p>Topics: Adventure, Juvenile Fiction</p>
                     </Thumbnail>
                  </Col>
               </Row>
            </Grid>
         </div>
      );
   }
}

export default Books;
