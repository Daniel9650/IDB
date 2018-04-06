import React, { Component } from 'react';
import loadingSymbol from '../../loading.png';

class Loading extends Component {

   render(){
      return(
         <div className="text-center">
            <img className="loading-icon" src={loadingSymbol} />
         </div>
      );
   }
}

export default Loading;
