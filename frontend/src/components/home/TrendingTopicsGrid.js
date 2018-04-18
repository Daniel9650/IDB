import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import Loading from '../global/Loading.js';
import CardMod from '../model/CardMod.js';
import APIError from '../global/APIError.js';
import NotFound from '../global/NotFound.js';

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
     fetch("http://api.poptopic.org/topics?items_per_page=100")
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
         <CardMod
            image={topic.poster_url}
            title={topic.topic_name}
            id={topic.topic_id}
            number={this.count}
            relatedMedia={topic.similar_books.length + topic.similar_songs.length + topic.similar_movies.length}
            type="Topics"
         />);
   }

   createTrendingTopics(topics){
      //Find top 3 popular Topics
      var ordered = topics.objects.sort(function(topicA, topicB){
        var topicAMedia = topicA.similar_books.length + topicA.similar_songs.length + topicA.similar_movies.length;
        var topicBMedia = topicB.similar_books.length + topicB.similar_songs.length + topicB.similar_movies.length;
        return topicBMedia - topicAMedia;
      });
      ordered = ordered.slice(0, 3);
      return ordered.map(this.createTrendingTopic);
   }

   render(){
     const { error, isLoaded, data } = this.state;

     if (error) {
       const status = error.response ? error.response.status : 500
       if(status === 404){
         return <NotFound />;
       }
       else{
         return(
           <APIError size="small"/>
           );
       }
     }
     else if (!isLoaded) {
       return (
         <Loading size="small"/>
         );
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
