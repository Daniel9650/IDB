import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';

class Pagination extends Component{
   constructor(props){
      super(props);
      this.state = {
         currentPage: this.props.currentPage,
         totalPages: this.props.totalPages
      };

      this.createButtons = this.createButtons.bind(this);
      this.createButton = this.createButton.bind(this);
      this.handlePageChange = this.handlePageChange.bind(this);
   }

   handlePageChange(num){
      this.setState({currentPage: num}, this.props.onClick(num));
   }

   createButton(num){
      if(num === this.state.currentPage){
         return (
            <Button
               active
               onClick={this.handlePageChange.bind(this, num)}
            >
               {num}
            </Button>
         );
      }
      else{
         return (
            <Button
               onClick={this.handlePageChange.bind(this, num)}
            >
               {num}
            </Button>
         );
      }
   }

   createButtons(pages){
      return pages.map(this.createButton);
   }

   render(){
      var pageList = Array(this.props.totalPages).fill().map((e, i)=>i+1)
      return(
         <ButtonGroup>
            {this.createButtons(pageList)}
         </ButtonGroup>
      );

   }

}

export default Pagination;
