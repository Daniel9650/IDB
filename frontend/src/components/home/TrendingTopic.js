import React from 'react';
import { Button, Col } from 'reactstrap';

//TODO: want to go to topics/id not home/id
let TrendingTopic = function(props) {
   var image = props.image;
   var topic = props.topic;
   var id = '/topics/' + props.id;
   var name = "trending" + props.number;

   return (
      <Col className="col-center">
         <img className="trending-img" src={image}/>
         <h3 className="trending-title" >{topic}</h3>
         <Button name={name} className="trending-btn" href={id}>See More</Button>
      </Col>
   );

}

export default TrendingTopic;
