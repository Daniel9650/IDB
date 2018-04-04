import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

class PageMod extends Component {

   constructor(props) {
      super(props);
      this.render = this.render.bind(this);
      this.createPagination = this.createPagination.bind(this);
      this.createItem = this.createItem.bind(this);
   }

   createItem(num){
      var pageRef= "/" + this.props.type.toLowerCase() + "&page=" + num;
      if(num === this.props.currentPage)
         return(
            <PaginationItem active>
               <PaginationLink href={pageRef}>
                  {num}
               </PaginationLink>
            </PaginationItem>
         );
      else
         return(
            <PaginationItem>
               <PaginationLink href={pageRef}>
                  {num}
               </PaginationLink>
            </PaginationItem>
         );
   }

   createPagination(pages){
      return pages.map(this.createItem);
   }

   createPrev(){
      var prevLink = "/" + this.props.type.toLowerCase() + "&page=" + (this.props.currentPage-1);
      if(this.props.currentPage-1 === 0)
         return (
            <PaginationItem disabled>
               <PaginationLink previous />
            </PaginationItem>
         );
      else
         return (
            <PaginationItem>
               <PaginationLink previous href={prevLink} />
            </PaginationItem>
         );
   }

   createNext(){
      var bigger = parseInt(this.props.currentPage) + 1;
      console.log(bigger);
      var nextLink = "/" + this.props.type.toLowerCase() + "&page=" + bigger;
      if(bigger === this.props.totalPages+1){
         return (
            <PaginationItem disabled>
               <PaginationLink next />
            </PaginationItem>
         );
      }
      else
         return (
            <PaginationItem>
               <PaginationLink next href={nextLink} />
            </PaginationItem>
         );
   }

   render() {
      var pages = Array(this.props.totalPages).fill().map((e, i)=>i+1);
      return (
         <Pagination>
            {this.createPrev()}
            {this.createPagination(pages)}
            {this.createNext()}
         </Pagination>
      );
   }
}

export default PageMod;
