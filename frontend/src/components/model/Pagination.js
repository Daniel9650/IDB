import React, { Component } from 'react';
import { Button, ButtonGroup } from 'reactstrap';
import { withRouter } from "react-router-dom";

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
      this.createPrevious = this.createPrevious.bind(this);
      this.createNext = this.createNext.bind(this);
   }

   handlePageChange(num){
      console.log("hhi");
      this.setState({currentPage: num}, this.props.onClick(num));
      if(this.props.changeURL){
         var args = new URLSearchParams(this.props.location.search);
         args.set("page", num);
         this.props.history.push('?'+args.toString());
      }
   }

   createButton(num){
      if(num === this.state.currentPage){
         return (
            <Button
            className="page-button-active"
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
               className="page-button"
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

   createPrevious(){
      if(this.state.currentPage - 1  === 0)
         return null;
      else{
         return(
            <Button
               className="page-button"
               onClick={this.handlePageChange.bind(this, this.state.currentPage - 1)}
            >
               Prev
            </Button>
         );
      }
   }

   createNext(){
      if(this.state.currentPage + 1 > this.state.totalPages)
         return null;
      else{
         return(
            <Button
               className="page-button"
               onClick={this.handlePageChange.bind(this, this.state.currentPage + 1)}
            >
               Next
            </Button>
         );
      }
   }

   componentWillReceiveProps(nextProps) {
      if (nextProps.currentPage !== this.state.currentPage) {
         this.setState({ currentPage: nextProps.currentPage });
         var args = new URLSearchParams(this.props.location.search);
         args.delete("page");
         this.props.history.push('?'+args.toString());
      }
      if (nextProps.totalPages !== this.state.totalPages) {
         this.setState({ totalPages: nextProps.totalPages });
      }
   }


   render(){
      var pageList = Array(this.props.totalPages).fill().map((e, i)=>i+1)
      return(
         <ButtonGroup className="page-button-bar">
            {this.createPrevious()}
            {this.createButtons(pageList)}
            {this.createNext()}
         </ButtonGroup>
      );

   }

}

export default withRouter(Pagination);
