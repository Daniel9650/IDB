import React, { Component } from 'react';
import { CardDeck } from 'reactstrap';
import CardMod from '../model/CardMod.js';
import Loading from '../global/Loading.js';
import APIError from '../global/APIError.js';
import Pagination from '../model/Pagination.js';
import SearchBar from '../search/SearchBar.js';

class SearchResults extends Component {

   constructor(props){
      super(props);
      this.state = {
      	isOpen: false,
         error: null,
         isLoaded: false,
         data: [],
         currentPage: this.props.pageNum
    	};

      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
      this.fetchData = this.fetchData.bind(this);
      this.setPage = this.setPage.bind(this);
   }

   setPage(pageNum){
      this.setState({currentPage: pageNum, isLoaded: false}, this.fetchData);

   }

   componentDidMount(){
      this.fetchData();
   }

   fetchData(){
        fetch("http://api.poptopic.org/all?q=" + this.props.query +"&page=" + this.state.currentPage)
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

   createCard(instance) {
      var name = "";
      var id = "";
      var actors = [];
      var director = "";
      var authors = [];
      var album = "";
      var artists = [];
      var type = instance.instance_type.charAt(0).toUpperCase() + instance.instance_type.slice(1);

      if (type === "Movies") {
         name= instance.movie_name;
         id= instance.movie_id;
         actors = instance.cast;
         director = instance.director;
      }
      else if (type === "Songs") {
         type="Music";
         name= instance.song_name;
         id= instance.song_id;
         artists = instance.artists;
         album = instance.album;
      }
      else if (type === "Books") {
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
         type={type}
         date = {instance.release_date}
         actors = {actors}
         director = {director}
         artists = {artists}
         album = {album}
         authors = {authors}
         highlight = {this.props.query}
         description = {instance.description}
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
               <div className="text-center">
               <Pagination
                  totalPages={data.total_pages}
                  onClick={this.setPage}
                  currentPage={this.state.currentPage}
               />
               </div>
            </div>
            );
      }
   }

}

export default SearchResults;
