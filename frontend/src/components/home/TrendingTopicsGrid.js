import React, { Component } from 'react';
import { Row } from 'reactstrap';
import TrendingTopic from './TrendingTopic.js';

class TrendingTopicsGrid extends Component {
   constructor(props) {
      super(props);

   }

   createTrendingTopic(topic){
      return <TrendingTopic
         image={topic.poster_url}
         topic={topic.topic_name}
         id={topic.topic_id}
      />
   }

   createTrendingTopics(topics){
      return topics.map(this.createTrendingTopic);
   }

   render(){
      return (
         <Row>
            {this.createTrendingTopics(this.props.data)}
         </Row>
      );
   }
}

export default TrendingTopicsGrid;
