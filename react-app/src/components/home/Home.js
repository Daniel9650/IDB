import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import CarouselMod from './CarouselMod.js';


class Home extends Component {
   render () {
      return (
          <div className="home-spacing-div">
            <CarouselMod />
          </div>
        );
         }

}

export default Home;
