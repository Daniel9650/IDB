import React, { Component } from 'react';
import { CardDeck, Row, Col } from 'reactstrap';
import CardMod from '../model/CardMod.js';
import Loading from '../global/Loading.js';
import APIError from '../global/APIError.js';
import Pagination from '../model/Pagination.js';
import NoResults from '../global/NoResults.js';
import Sort from '../model/filters/Sort.js';
import $ from "jquery";

class SearchResults extends Component {

   constructor(props){
      super(props);
      this.state = {
      	isOpen: false,
         error: null,
         isLoaded: false,
         data: [],
         currentPage: this.props.pageNum,
         sort: "relevance",
         isPreLoading: false,
         sortSent: false
    	};

      this.createCard = this.createCard.bind(this);
      this.createCards = this.createCards.bind(this);
      this.fetchData = this.fetchData.bind(this);
      this.setPage = this.setPage.bind(this);
      this.setSort = this.setSort.bind(this);
   }

   setPage(pageNum){
      this.setState({currentPage: pageNum, isLoaded: false}, this.fetchData);

   }

   componentDidMount(){
     console.log(this.state.sort);
      this.fetchData(5);
   }

   fetchData(max_attempts){
      $.ajax({
        url: "http://api.poptopic.org/all?q=" + this.props.query +"&page=" + this.state.currentPage + "&sort=" + this.state.sort,
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
        timeout: 3000
      });
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
      var relatedMedia = 0;
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
         relatedMedia= instance.similar_books.length + instance.similar_songs.length + instance.similar_movies.length;
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
         relatedMedia = {relatedMedia}
         />;
   }

   setSort(option, isPreLoading = false){
     console.log(option);
      var sort = "relevance";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort, isPreLoading: isPreLoading, sortSent: true}, this.fetchData);
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
      else if(data.num_results < 1){
        return <NoResults size="large"/>;
      }
      else {
        var sortOptions = [
          {value: 'relevance', label: 'Relevance'},
          {value: 'type', label: 'Media Type'},
          {value: 'title_asc', label: 'Title A-Z'},
          {value: 'title_desc', label: 'Title Z-A'}
        ];
         return (
           <div>
           <Row>
             <Col>
                <h1 className="search-title">Search Results for "{this.props.query}"</h1>
            </Col>
            <Col xs="3">
               <h5 className="filter-label">Sort By:</h5>
               <Sort setFilter={this.setSort} options={sortOptions}/>
            </Col>

          </Row>
          <hr className = "divider"/>

           <Row>
            <Col>
              <div>
                 <CardDeck>
                    {this.createCards(data)}
                 </CardDeck>
                 <div className="text-center">
                   <Pagination
                      totalPages={data.total_pages}
                      onClick={this.setPage}
                      currentPage={this.state.currentPage}
                      changeURL={true}
                   />
                 </div>
              </div>
            </Col>
          </Row>
          </div>
            );
      }
   }

}

export default SearchResults;
