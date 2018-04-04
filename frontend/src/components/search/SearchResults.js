import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import CardMod from '../model/CardMod.js';
import Loading from '../global/Loading.js';
import APIError from '../global/APIError.js';
import PageMod from '../model/PageMod.js';

class SearchResults extends Component {

   constructor(props){
      super(props);
      this.state = {
      	isOpen: false,
         error: null,
         isLoaded: false,
         data: []
    	};

      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
   }

   componentDidMount(){
      if(this.props.type === "Movies"){
           fetch("http://api.poptopic.org/movies?items_per_page=3&filter=movie_name&q=" + this.props.query +"&page=" + this.props.pageNum)
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
           fetch("http://api.poptopic.org/songs?items_per_page=3&filter=song_name&q=" + this.props.query +"&page=" + this.props.pageNum)
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
           fetch("http://api.poptopic.org/books?items_per_page=3&filter=book_name&q=" + this.props.query +"&page=" + this.props.pageNum)
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
         fetch("http://api.poptopic.org/topics?items_per_page=3&filter=topic_name&q=" + this.props.query +"&page=" + this.props.pageNum)
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

   render(){
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
               
            </div>
            );
      }
   }

}

export default SearchResults;
