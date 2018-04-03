import React, { Component } from 'react';

class APIError extends Component {

   render(){
      return(
         <div>
            <h1>Sorry, there was a problem!</h1>
            <h2>Try refreshing the page.</h2>
         </div>
      );
   }
}

export default APIError;
