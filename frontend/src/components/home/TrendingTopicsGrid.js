import React, { Component } from 'react';
import { Row } from 'reactstrap';
import TrendingTopic from './TrendingTopic.js';

class TrendingTopicsGrid extends Component {
   constructor(props) {
      super(props);
      this.createTrendingTopic = this.createTrendingTopic.bind(this);
      this.createTrendingTopics = this.createTrendingTopics.bind(this);
      this.count = 0;

      this.state = {
         error: null,
         isLoaded: false,
         data: []
    	};
   }
   componentDidMount() {
     fetch("http://api.poptopic.org/topics?items_per_page=3")
     .then(res => res.json())
     .then(
      (result) => {
         this.setState({
           isLoaded: true,
           data: result
         });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
         this.setState({
           isLoaded: true,
           error
         });
      }
     )
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
      return topics.objects.map(this.createTrendingTopic);
   }

   render(){
      const { error, isLoaded, data } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      }
      else if (!isLoaded) {
        return <div>Loading...</div>;
      }
      else {
      return (
         <Row>
            {this.createTrendingTopics(data)}
         </Row>
      );
   }
}
}

export default TrendingTopicsGrid;
