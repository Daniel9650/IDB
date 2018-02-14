import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail} from 'react-bootstrap';

import mazerunner from '../graphics/mazerunner.jpg';
import minions from '../graphics/minions.jpg';
import jumanji from '../graphics/jumanji.jpg'

class Movies extends Component {
   render () {
      return (
         <div>
            <br></br>
            <h1 className="model-title"> Movies </h1>
            <hr className="model-rule"/>
            <Grid>
               <Row>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/movies/maze-runner" src={mazerunner} >
                        <h3>Maze Runner</h3>
                        <p>Topics: Action, Mystery, Science Fiction, Thriller</p>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/movies/minions" src={minions} >
                        <h3>Minions</h3>
                        <p>Topics: Family, Animation, Adventure, Comedy</p>
                     </Thumbnail>
                  </Col>
                  <Col xs={6} md={4}>
                     <Thumbnail href= "/movies/jumanji" src={jumanji} >
                        <h3>Jumanji</h3>
                        <p>Topics: Adventure, Fantasy, Family</p>
                     </Thumbnail>
                  </Col>
               </Row>
            </Grid>
         </div>
      );
   }
}

export default Movies;
