import React, { Component } from 'react';
import loadingSymbol from '../../loading.png';

class Loading extends Component {
   constructor(props){
     super(props);
   }

   render(){
      switch(this.props.size){
        case "medium":
          return(
             <div className="text-center">
                <img className="loading-icon-medium" alt="loading symbol" src={loadingSymbol} />
             </div>
          );

        case "small":
          return(
             <div className="text-center">
                <img className="loading-icon-small" alt="loading symbol" src={loadingSymbol} />
             </div>
          );

        default:
          return(
             <div className="text-center">
                <img className="loading-icon-large" alt="loading symbol" src={loadingSymbol} />
             </div>
          );
      }
   }
}

export default Loading;
