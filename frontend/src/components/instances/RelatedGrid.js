import React, { Component } from 'react';
import { Container, Row, CardDeck } from 'reactstrap';
import RelatedCard from './RelatedCard.js';
import Pagination from '../model/Pagination.js';

class CardGrid extends Component {

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
    	};
   }

   setPage(pageNum) {
      this.setState({currentPage: pageNum, isLoaded: false}, this.fetchData);
   }

   fetchData(){
      var request_type = "";
      if(this.props.request_type === "Music")
         request_type = "songs";
      else {
         request_type = this.props.request_type.toLowerCase();
      }
      if(this.props.request_type != "Topics")
         request_type = "similar_" + request_type;

     fetch("http://api.poptopic.org/" + this.props.caller_type + "/"+this.props.id+"/"+ request_type + "?page=" + this.state.currentPage)
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
            <div>
               <CardDeck name={deckname}>
                  {this.createCards(data)}
               </CardDeck>

               <Pagination
                  totalPages={data.total_pages}
                  onClick={this.setPage}
                  currentPage={this.state.currentPage}
               />
            </div>
         );
      }
   }
}

export default CardGrid;
