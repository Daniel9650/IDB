import React, { Component } from 'react';
import { Container, CardDeck } from 'reactstrap';
import CardMod from './CardMod.js';
import Loading from '../global/Loading.js';
import APIError from '../global/APIError.js';
import NotFound from '../global/NotFound.js';
import NoResults from '../global/NoResults.js';
import MovieFilters from './MovieFilters.js';
import MusicFilters from './MusicFilters.js';
import BookFilters from './BookFilters.js';
import TopicsFilters from './TopicFilters.js';
import Pagination from './Pagination.js';
import $ from "jquery";

class CardGrid extends Component {

   constructor(props) {
      super(props);
      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
      this.count = 0;
      this.fetchData = this.fetchData.bind(this);
      this.setFilters = this.setFilters.bind(this);
      this.setPage = this.setPage.bind(this);
      this.setError = this.setError.bind(this);

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
         queryType: qType,
         currentPage: this.props.pageNum,
         load_attempts: 0
    	};

   }

   setFilters(filters, sort, isPreLoading = false){
      console.log("PreLoading: "+isPreLoading);
      if(!isPreLoading){
        this.setState({filters: filters, sort: sort, currentPage: 1, load_attempts: 0}, function(){this.fetchData(5)});
      }
      else{
        this.setState({filters: filters, sort: sort, load_attempts: 0}, function(){this.fetchData(5)});
      }
   }

   fetchData(max_attempts){
      this.setState({error: null, isLoaded: false});
      var stringQuery = "";
      if(this.state.filters.length !== 0){
         var filters = this.state.filters.map(function(filter){
            return "filter=" + filter.filter + "&q=" + filter.query;
         });
      stringQuery = filters.join("&");
      }
      stringQuery = "sort=" + this.state.sort + "&" + stringQuery;

      var stringURL = "http://api.poptopic.org/" + this.state.queryType + "?" + stringQuery + "&page=" + this.state.currentPage;

      $.ajax({
        url: stringURL,
        method: "GET",
        success: (data, textStatus, jqXHR) => {
          console.log("success");
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error: (jqXHR, textStatus, errorThrown) =>{
          console.log("Cardgrid in error" + (this.state.load_attempts + 1));
          console.log("Cardgrid url:"+ stringURL);
          console.log("status: " + textStatus);
          if(this.state.load_attempts >= max_attempts){
            console.log(errorThrown);
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
        timeout: 3000
      });
   }

   setError(){
    this.setState({isLoaded: true, error: new Error("failed to load generalFilter")});
   }

   setPage(pageNum) {
      this.setState({currentPage: pageNum, isLoaded: false}, this.fetchData);
   }

   addFilters(){
      if(this.props.type === "Movies")
         return <MovieFilters currentFilters={this.state.filters} setError={this.setError} setFilters={this.setFilters}/>;
      else if(this.props.type === "Music")
         return <MusicFilters currentFilters={this.state.filters} setError={this.setError} setFilters={this.setFilters}/>;
      else if(this.props.type === "Books")
         return <BookFilters currentFilters={this.state.filters} setError={this.setError} setFilters={this.setFilters}/>;
      else
         return <TopicsFilters currentFilters={this.state.filters} setError={this.setError} setFilters={this.setFilters}/>;
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
         relatedMedia = instance.similar_books.length + instance.similar_movies.length + instance.similar_songs.length;

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
         relatedMedia = {relatedMedia}
         />;
   }

   createCards(instances) {
      return instances.objects.map(this.createCard);
   }

   render(props) {
      var render_list = [];
      const { error, isLoaded, data } = this.state;
      render_list.push(this.addFilters());


      if (error) {
        const status = error.response ? error.response.status : 500
        if(status === 404){
          render_list.push(<NotFound />);
        }
        else{
          render_list.push(<APIError size="medium"/>);
        }
      }
      else if (!isLoaded) {
        render_list.push (<Loading size="medium"/>);
      }
      else if(data.num_results < 1){
        render_list.push(
          <div>
            <NoResults size="medium" />
          </div>
        );
      }
      else {
         render_list.push(
            <div>
               <CardDeck>
                   {this.createCards(data)}
               </CardDeck>
               <div className="text-center">
                  <Pagination
                     totalPages={data.total_pages}
                     type={this.props.type}
                     onClick={this.setPage}
                     currentPage={this.state.currentPage}
                     changeURL={true}
                  />
               </div>
            </div>
            );
      }

      return(render_list);
   }
}

export default CardGrid;
