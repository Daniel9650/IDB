import React, {Component} from 'react';
import { Container } from 'reactstrap';

class NotFound extends Component {

   render(){
      return(
         <div className="spacing-div" >
            <Container>
               <h1 className="big-title">404</h1>
               <h1 className="big-text">Page Not Found</h1>
            </Container>
         </div>
      );
   }
}

export default NotFound;
