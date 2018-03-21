import React, { Component } from 'react';
import { Container } from 'reactstrap';
import CarouselMod from './CarouselMod.js';
import TrendingTopicsGrid from './TrendingTopicsGrid.js';
import trending_topics from '../../data/topics.json';


class Home extends Component {
   render () {

      return (
          <div className="home-spacing-div">
            <CarouselMod />
            <br />
            <Container>
               <h1 className="home-sub">Trending Topics</h1>
               <TrendingTopicsGrid
                  data={trending_topics.trending}
               />
            </Container>
          </div>
        );
         }

}

export default Home;
