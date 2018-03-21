import React, { Component } from 'react';
import { Row } from 'reactstrap';
import TrendingTopic from './TrendingTopic.js';

class TrendingTopicsGrid extends Component {
   constructor(props) {
      super(props);
      this.createTrendingTopic = this.createTrendingTopic.bind(this);
      this.createTrendingTopics = this.createTrendingTopics.bind(this);
      this.count = 0;
   }



   createTrendingTopic(topic){
      this.count++;
      return (
         <TrendingTopic
            image={topic.poster_url}
            topic={topic.topic_name}
            id={topic.topic_id}
            number={this.count}
         />);
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
