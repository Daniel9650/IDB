import React, { Component } from 'react';
import loadingSymbol from '../loading.png';

class Loading extends Component {

   render(){
      return(
         <img className="loading-icon" src={loadingSymbol} />
      );
   }
}

export default Loading;
