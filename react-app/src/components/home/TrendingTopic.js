import React from 'react';
import { Button, Col } from 'reactstrap';

//TODO: want to go to topics/id not home/id
let TrendingTopic = function(props) {
   var image = require('../../images/' + props.image);
   var topic = props.topic;
   var id = props.id;

   return (
      <Col className="col-center">
         <img className="trending-img" src={image}/>
         <h3 className="trending-title" >{topic}</h3>
         <Button className="trending-btn" href={id}>Click Here</Button>
      </Col>
   );

}

export default TrendingTopic;
