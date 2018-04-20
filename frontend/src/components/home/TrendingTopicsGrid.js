import React, { Component } from 'react';
import { Row, Container } from 'reactstrap';
import Loading from '../global/Loading.js';
import CardMod from '../model/CardMod.js';
import APIError from '../global/APIError.js';
import NotFound from '../global/NotFound.js';
import $ from "jquery";

class TrendingTopicsGrid extends Component {
   constructor(props) {
      super(props);
      this.createTrendingTopic = this.createTrendingTopic.bind(this);
      this.createTrendingTopics = this.createTrendingTopics.bind(this);
      this.count = 0;

      this.state = {
         error: null,
         isLoaded: false,
         data: [],
         load_attempts: 0
    	};
      this.request_data = this.request_data.bind(this);
   }
   componentDidMount() {
    this.request_data(5);
   }

   request_data(max_attempts){
     $.ajax({
        url: "http://api.poptopic.org/topics?items_per_page=100",
        method: "GET",
        success: (data, textStatus, jqXHR)=>{
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error: (jqXHR, textStatus, errorThrown)=>{
          if(this.state.load_attempts >= max_attempts){
            this.setState({
              isLoaded: true,
              error: errorThrown
            });
          }
          else{
            this.setState({load_attempts: this.state.load_attempts + 1});
            this.request_data(max_attempts);
          }
        },
        timeout: 2000
      });
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
       if(error === "NOT FOUND"){
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
