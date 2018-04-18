import React, { Component } from 'react';
import { Container } from 'reactstrap';
import loadingSymbol from '../../images/loading.png';

class Loading extends Component {
   constructor(props){
     super(props);
   }

   render(){
      switch(this.props.size){
        case "medium":
          return(

             <Container className="text-center">
                <img className="loading-icon-medium" alt="loading symbol" src={loadingSymbol} />
             </Container>
          );

        case "small":
          return(
             <Container className="text-center">
                <img className="loading-icon-small" alt="loading symbol" src={loadingSymbol} />
             </Container>
          );

        default:
          return(
             <Container className="text-center">
                <img className="loading-icon-large" alt="loading symbol" src={loadingSymbol} />
             </Container>
          );
      }
   }
}

export default Loading;
