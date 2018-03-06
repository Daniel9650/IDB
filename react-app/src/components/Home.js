import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';


class Home extends Component {
   render () {
      return (
          <div>
            <Jumbotron className="jumbo">
              <h1 >Write the Next Bestselled!</h1>
              <p >This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.</p>
              <hr />
              <p>It uses utility classes for typgraphy and spacing to space content out within the larger container.</p>
              <p>
                <Button color="primary">Learn More</Button>
              </p>
            </Jumbotron>
          </div>
        );
         }

}

export default Home;
