import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';
import CardMod from './CardMod.js';
import PageMod from './PageMod.js';
import Loading from '../global/Loading.js';
import APIError from '../global/APIError.js';

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
           fetch("http://api.poptopic.org/movies?page=" + this.props.pageNum)
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
         fetch("http://api.poptopic.org/books?page=" + this.props.pageNum)
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
         fetch("http://api.poptopic.org/songs?page=" + this.props.pageNum)
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
         fetch("http://api.poptopic.org/topics?page=" + this.props.pageNum)
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
      var actors = [];
      var director = "";
      var author = "";
      var album = "";
      var artists = [];

      if (this.props.type === "Movies") {
         name= instance.movie_name;
         id= instance.movie_id;
         actors = instance.actors;
         director = instance.director;
      }
      else if (this.props.type === "Music") {
         name= instance.song_name;
         id= instance.song_id;
         artists = instance.artists;
         album = instance.album;
      }
      else if (this.props.type === "Books") {
         name= instance.book_name;
         id= instance.book_id;
         author = instance.author;
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
         date = {instance.release_date}
         actors = {actors}
         director = {director}
         artists = {artists}
         album = {album}
         author = {author}
         />;
   }

   createCards(instances) {
      return instances.objects.map(this.createCard);
   }

   render(props) {
      const { error, isLoaded, data } = this.state;

      if (error) {
        return <APIError />;
      }
      else if (!isLoaded) {
        return <Loading />;
      }
      else {
         return (
            <div>
               <CardDeck>

                  {this.createCards(data)}

               </CardDeck>
               <PageMod
                  totalPages={data.total_pages}
                  type={this.props.type}
                  currentPage={this.props.pageNum}
               />
            </div>
            );
      }
   }
}

export default CardGrid;
