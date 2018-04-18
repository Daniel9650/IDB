import React, {Component} from 'react';
import { Container } from 'reactstrap';
import noResults from '../../images/no-results.png';

class NoResults extends Component {
  constructor(props){
    super(props);
  }

   render(){
     switch(this.props.size){
       case "medium":
          return(
             <div className="text-center" >
                <img className="error-logo-medium" alt="No Results" src={noResults} />
             </div>
          );
        default:
          return(
             <div className="text-center" >
                <img className="error-logo-large" alt="No Results" src={noResults} />
             </div>
          );
    }
   }
}

export default NoResults;
