import React, { Component } from 'react';
import { Container, CardDeck } from 'reactstrap';
import Pagination from '../model/Pagination.js';
import CardMod from '../model/CardMod.js';
import Loading from '../global/Loading.js';
import NotFound from '../global/NotFound.js';
import APIError from '../global/APIError.js';
import $ from "jquery";

class RelatedGrid extends Component {

   constructor(props) {
      super(props);
      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
      this.count = 0;
      this.fetchData = this.fetchData.bind(this);
      this.setPage = this.setPage.bind(this);

      this.state = {
      	isOpen: false,
         error: null,
         isLoaded: false,
         data: [],
         currentPage: 1,
         load_attempts: 0
    	};
   }

   setPage(pageNum) {
      this.setState({currentPage: pageNum, isLoaded: false, load_attempts:0}, ()=>{this.fetchData(5)});
   }

   fetchData(max_attempts){
      var request_type = "";
      if(this.props.request_type === "Music")
         request_type = "songs";
      else {
         request_type = this.props.request_type.toLowerCase();
      }
      if(this.props.request_type !== "Topics")
         request_type = "similar_" + request_type;
      var stringURL = "http://api.poptopic.org/" + this.props.caller_type + "/"+this.props.id+"/"+ request_type + "?page=" + this.state.currentPage;

      $.ajax({
        url: stringURL,
        method: "GET",
        success: (data, textStatus, jqXHR)=>{
          console.log("success");
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error: (jqXHR, textStatus, errorThrown)=>{
          console.log("in error" + max_attempts);
          if(this.state.load_attempts >= max_attempts){
            this.setState({
              isLoaded: true,
              error: errorThrown
            });
          }
          else{
            this.setState({load_attempts: this.state.load_attempts + 1});
            this.fetchData(max_attempts);
          }
        },
        timeout: 1500
      });
   }

   componentDidMount() {
      this.fetchData(5);
   }

   createCard(instance) {
     var name = "";
     var id = "";
     var actors = [];
     var director = "";
     var authors = [];
     var album = "";
     var artists = [];
     var relatedMedia = 0;
     if (this.props.request_type === "Movies") {
        name= instance.movie_name;
        id= instance.movie_id;
        actors = instance.cast;
        director = instance.director;
     }
     else if (this.props.request_type === "Music") {
        name= instance.song_name;
        id= instance.song_id;
        artists = instance.artists;
        album = instance.album;
     }
     else if (this.props.request_type === "Books") {
        name= instance.book_name;
        id= instance.book_id;
        authors = instance.authors;
     }
     else {
        name= instance.topic_name;
        id= instance.topic_id;
        relatedMedia = instance.similar_books.length + instance.similar_movies.length + instance.similar_songs.length;
     }

     this.count ++;
     return <CardMod
        image={instance.poster_url}
        title={name}
        topics={instance.topics}
        id= {id}
        number={this.count}
        type={this.props.request_type}
        date = {instance.release_date}
        actors = {actors}
        director = {director}
        artists = {artists}
        album = {album}
        authors = {authors}
        relatedMedia = {relatedMedia}
        />;
   }

   createCards(instances) {
      return instances.objects.map(this.createCard);
   }

   render(props) {
      const { error, isLoaded, data } = this.state;

      if (error) {
        const status = error.response ? error.response.status : 500
        if(status === 404){
          return <NotFound />;
        }
        else{
          return(
            <div className="text-center">
            <APIError size="small"/>
            </div>
            );
        }
      }
      else if (!isLoaded) {
        return (
          <div className="text-center">
          <Loading size="small"/>
          </div>
          );
      }
      else {
         var deckname = this.props.type + " Deck";
         return (
            <div>
               <CardDeck name={deckname}>
                  {this.createCards(data)}
               </CardDeck>
               <div className="text-center">
               <Pagination
                  totalPages={data.total_pages}
                  onClick={this.setPage}
                  currentPage={this.state.currentPage}
                  changeURL={false}
               />
               </div>
            </div>
         );
      }
   }
}

export default RelatedGrid;
