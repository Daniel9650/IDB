import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CarouselMod from './CarouselMod.js';
import TrendingTopicsGrid from './TrendingTopicsGrid.js';


class Home extends Component {
   render () {

      return (
          <div className="home-spacing-div">
            <CarouselMod />
            <br />
            <Container>
               <h1 name="trending-topics" className="home-sub">Popular Topics</h1>
               <TrendingTopicsGrid/>
            </Container>
          </div>
        );
         }

}

export default Home;
