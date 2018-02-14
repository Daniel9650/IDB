import React, { Component } from 'react';
import { Carousel, ListGroup, ListGroupItem } from 'react-bootstrap';
import books from '../graphics/books.png';
import movies from '../graphics/movies.png';
import music from '../graphics/music.png';

class Home extends Component {
   render () {
      return (
         <div>
            <Carousel>
               <Carousel.Item>
                  <img className="carousel-img" alt="library" src={books} />
                  <Carousel.Caption>
                     View Categorized Books
                  </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                  <img className= "carousel-img" alt="movie theatre" src={movies} />
                  <Carousel.Caption>
                     View Categorized Movies
                  </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                  <img className="carousel-img" alt="recording studio sound board" src={music} />
                  <Carousel.Caption>
                     View Categorized Music
                  </Carousel.Caption>
               </Carousel.Item>
            </Carousel>
            <br></br>
            <h1 className="trending-topics-title">Trending Topics</h1>
            <ListGroup>
               <ListGroupItem>
                  <span className="trending-topics-list-num">1 </span>
                  <span>Topic Name</span>
               </ListGroupItem>
               <ListGroupItem>
                  <span className="trending-topics-list-num">2 </span>
                  <span>Topic Name</span>
               </ListGroupItem>
               <ListGroupItem>
                  <span className="trending-topics-list-num">3 </span>
                  <span>Topic Name</span>
               </ListGroupItem>
               <ListGroupItem>
                  <span className="trending-topics-list-num">4 </span>
                  <span>Topic Name</span>
               </ListGroupItem>
               <ListGroupItem>
                  <span className="trending-topics-list-num">5 </span>
                  <span>Topic Name</span>
               </ListGroupItem>
            </ListGroup>
         </div>
      );
   }
}

export default Home;
