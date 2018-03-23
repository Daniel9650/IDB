import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';
import RelatedCard from './RelatedCard.js';


class CardGrid extends Component {

   constructor(props) {
      super(props);
      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
      this.count = 0;

      this.state = {
      	isOpen: false,
         error: null,
         isLoaded: false,
         data: []
    	};
   }

   componentDidMount() {
      if(this.props.request_type === "Movies"){
           fetch("http://api.poptopic.org/" + this.props.caller_type + "/"+this.props.id+"/similar_movies/")
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
      else if(this.props.request_type === "Books"){
         fetch("http://api.poptopic.org/" + this.props.caller_type + "/"+ this.props.id+"/similar_books/")
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
      else if(this.props.request_type === "Music"){
         fetch("http://api.poptopic.org/" + this.props.caller_type + "/" + this.props.id + "/similar_songs/")
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
      else{
         fetch("http://api.poptopic.org/" + this.props.caller_type + "/"+this.props.id + "/topics/")
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
   }
   createCard(instance) {
      var name = "";
      var instance_id = "";
      if (this.props.request_type === "Movies") {
         name= instance.movie_name;
         instance_id= instance.movie_id;

      }
      else if (this.props.request_type === "Music") {
         name= instance.song_name;
         instance_id= instance.song_id;

      }
      else if (this.props.request_type === "Books") {
         name= instance.book_name;
         instance_id= instance.book_id;

      }
      else {
         name= instance.topic_name;
         instance_id= instance.topic_id;

      }
      console.log(name);
       this.count++;
      return <RelatedCard
         image={instance.poster_url}
         title={name}
         id= {instance_id}
         type={this.props.request_type}
         number={this.count}
         />;
   }

   createCards(instances) {
      return instances.objects.map(this.createCard);
   }

   render(props) {
      const { error, isLoaded, data } = this.state;

      if (error) {
        return <div>Error: {error.message}</div>;
      }
      else if (!isLoaded) {
        return <div>Loading...</div>;
      }
      else {
         var deckname = this.props.type + " Deck";
         return (
               <CardDeck name={deckname}>
                  {this.createCards(data)}
               </CardDeck>
         );
      }
   }
}

export default CardGrid;
