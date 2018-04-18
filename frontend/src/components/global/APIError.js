import React, { Component } from 'react';
import ohNo from '../../images/oh-no.png';

class APIError extends Component {
  constructor(props){
    super(props);
  }


   render(){
     switch(this.props.size){
        case "small":
          return(
             <div className="text-center">
                <img className="error-logo-small" alt="API Error" src={ohNo} />
                <h5 className="api-error-small-text">We encountered a problem :(</h5>
                <h5 className="api-error-small-text">Please try refreshing the page.</h5>
             </div>
          );

        case "medium":
          return(
             <div className="text-center">
                <img className="error-logo-medium" alt="API Error" src={ohNo} />
                <h3 className="api-error-medium-text">We encountered a problem :(</h3>
                <h3 className="api-error-medium-text">Please try refreshing the page.</h3>
             </div>
          );

        default:
          return(
             <div className="text-center spacing-div">
                <img className="error-logo-large" alt="API Error" src={ohNo} />
                <h1 className="api-error-large-text">We encountered a problem :(</h1>
                <h1 className="api-error-large-text">Please try refreshing the page.</h1>
             </div>
          );
    }
   }
}

export default APIError;
