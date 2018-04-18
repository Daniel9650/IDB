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

class CardGrid extends Component {

   constructor(props) {
      super(props);
      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
      this.count = 0;
      this.fetchData = this.fetchData.bind(this);
      this.setFilters = this.setFilters.bind(this);
      this.setPage = this.setPage.bind(this);

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
         currentPage: this.props.pageNum
    	};

   }

   setFilters(filters, sort, isPreLoading = false){
      console.log("PreLoading: "+isPreLoading);
      if(!isPreLoading){
        this.setState({filters: filters, sort: sort, currentPage: 1}, this.fetchData);
      }
      else{
        this.setState({filters: filters, sort: sort}, this.fetchData);
      }
   }

   fetchData(){
      var stringQuery = "";
      if(this.state.filters.length !== 0){
         var filters = this.state.filters.map(function(filter){
            return "filter=" + filter.filter + "&q=" + filter.query;
         });
      stringQuery = filters.join("&");
      }
      stringQuery = "sort=" + this.state.sort + "&" + stringQuery;

        fetch("http://api.poptopic.org/" + this.state.queryType + "?" + stringQuery + "&page=" + this.state.currentPage)
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

   setPage(pageNum) {
      this.setState({currentPage: pageNum, isLoaded: false}, this.fetchData);
   }

   addFilters(){
      if(this.props.type === "Movies")
         return <MovieFilters currentFilters={this.state.filters} setFilters={this.setFilters}/>;
      else if(this.props.type === "Music")
         return <MusicFilters currentFilters={this.state.filters} setFilters={this.setFilters}/>;
      else if(this.props.type === "Books")
         return <BookFilters currentFilters={this.state.filters} setFilters={this.setFilters}/>;
      else
         return <TopicsFilters currentFilters={this.state.filters} setFilters={this.setFilters}/>;
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
      const { error, isLoaded, data } = this.state;

      if (error) {
        const status = error.response ? error.response.status : 500
        if(status === 404){
          return <NotFound />;
        }
        else{
          return(
            <APIError size="medium"/>
            );
        }
      }
      else if (!isLoaded) {
        return (
          <Loading size="medium"/>
          );
      }
      else if(data.num_results < 1){
        return (
          <div>
            {this.addFilters()}
            <NoResults size="medium" />)
          </div>
        );
      }
      else {
         return (
            <div>
                  {this.addFilters()}

               <CardDeck>

                  {this.createCards(data)}

               </CardDeck>

               <div className="text-center">
                  <Pagination
                     totalPages={data.total_pages}
                     type={this.props.type}
                     onClick={this.setPage}
                     currentPage={this.state.currentPage}
                  />
               </div>
            </div>
            );
      }
   }
}

export default CardGrid;
