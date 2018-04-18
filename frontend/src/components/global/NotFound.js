import React, {Component} from 'react';
import { Container } from 'reactstrap';
import notFound from '../../images/page-not-found.png';

class NotFound extends Component {

   render(){
      return(
         <div className="text-center spacing-div" >
            <img className="error-logo-large" alt="Page Not Found" src={notFound} /> 
         </div>
      );
   }
}

export default NotFound;
