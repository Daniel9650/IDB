import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';
import CardMod from './CardMod.js';


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
      if(this.props.type === "Movies"){
           fetch("http://api.poptopic.org/movies/")
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
      else if(this.props.type === "Books"){
         fetch("http://api.poptopic.org/books/")
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
      else if(this.props.type === "Music"){
         fetch("http://api.poptopic.org/songs/")
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
         fetch("http://api.poptopic.org/topics/")
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
      var id = "";
      if (this.props.type === "Movies") {
         name= instance.movie_name;
         id= instance.movie_id;
      }
      else if (this.props.type === "Music") {
         name= instance.song_name;
         id= instance.song_id;
      }
      else if (this.props.type === "Books") {
         name= instance.book_name;
         id= instance.book_id;
      }
      else {
         name= instance.topic_name;
         id= instance.topic_id;
      }

      this.count ++;
      return <CardMod
         image={instance.poster_url}
         title={name}
         topics={instance.topics}
         id= {id}
         number={this.count}
         type={this.props.type}
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
         return (
               <CardDeck>

                  {this.createCards(data)}

               </CardDeck>
            );
      }
   }
}

export default CardGrid;
