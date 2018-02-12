import React, { Component } from 'react';
import { Carousel, ListGroup, ListGroupItem } from 'react-bootstrap';
import books from '../graphics/books.jpg';
import movies from '../graphics/movies.jpg';
import music from '../graphics/music.jpeg';

class Home extends Component {
   render () {
      return (
         <div>
            <Carousel>
               <Carousel.Item>
                  <img className="carousel-img" alt="library" src={books} />
                  <Carousel.Caption>
                     View our categorized books
                  </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                  <img className= "carousel-img" alt="movie theatre" src={movies} />
                  <Carousel.Caption>
                     View our categorized movies
                  </Carousel.Caption>
               </Carousel.Item>
               <Carousel.Item>
                  <img className="carousel-img" alt="recording studio sound board" src={music} />
                  <Carousel.Caption>
                  View our categorized music
                  </Carousel.Caption>
               </Carousel.Item>
            </Carousel>

         </div>
      );
   }
}

export default Home;
