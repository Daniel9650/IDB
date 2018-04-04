import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';
import CardMod from './CardMod.js';
import PageMod from './PageMod.js';
import Loading from '../global/Loading.js';
import APIError from '../global/APIError.js';
import MovieFilters from './MovieFilters.js';
import MusicFilters from './MusicFilters.js';
import BookFilters from './BookFilters.js';
import TopicFilters from './TopicFilters.js';

class CardGrid extends Component {

   constructor(props) {
      super(props);
      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
      this.count = 0;
      this.fetchData = this.fetchData.bind(this);
      this.setFilters = this.setFilters.bind(this);

      var qType = "";
      if(this.props.type === "Music")
         qType = "songs";
      else
         qType= this.props.type.toLowerCase();

      this.state = {
      	isOpen: false,
         error: null,
         isLoaded: false,
         data: [],
         sort: 'title_asc',
         filters: [],
         type: this.props.type,
         queryType: qType
    	};

   }

   setFilters(filters, sort){

      this.setState({filters: filters, sort: sort}, this.fetchData);
   }

   fetchData(){
      var filters = this.state.filters.map(function(filter){
         return "filter=" + filter.filter + "&q=" + filter.query;
      });
      var stringQuery = filters.join("&");
      stringQuery = "sort=" + this.state.sort + "&" + stringQuery;

        fetch("http://api.poptopic.org/" + this.state.queryType + "?" + stringQuery + "&page=" + this.props.pageNum)
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
   componentDidMount() {
      this.fetchData();
   }

   addFilters(){
      if(this.props.type === "Movies")
         return <MovieFilters setFilters={this.setFilters}/>;
      else if(this.props.type === "Music")
         return <MusicFilters setFilters={this.setFilters}/>;
      else if(this.props.type === "Books")
         return <BookFilters setFilters={this.setFilters}/>;
      else
         return <TopicFilters />;
   }

   createCard(instance) {
      var name = "";
      var id = "";
      var actors = [];
      var director = "";
      var authors = [];
      var album = "";
      var artists = [];
      if (this.props.type === "Movies") {
         name= instance.movie_name;
         id= instance.movie_id;
         actors = instance.cast;
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
         authors = instance.authors;
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
         authors = {authors}
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
                  {this.addFilters()}
               
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
