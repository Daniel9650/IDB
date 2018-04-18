import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import MultiFilter from './filters/MultiFilter.js';
import NameFilter from './filters/NameFilter.js';
import GeneralFilter from './filters/GeneralFilter.js';
import Sort from './filters/Sort.js';
import topicSuggestions from '../../data/topicSuggestions.js';

class BookFilters extends Component {

   constructor(props){
      super(props);

      this.state={
         authorFilter: {},
         topicFilters: [],
         dateFilter: {},
         nameFilter: {},
         sort: 'title_asc',
         isPreLoading: false
      }

      this.setAuthorFilter = this.setAuthorFilter.bind(this);
      this.setTopicFilter = this.setTopicFilter.bind(this);
      this.setDateFilter = this.setDateFilter.bind(this);
      this.combineFilters = this.combineFilters.bind(this);
      this.setSort = this.setSort.bind(this);
      this.setNameFilter = this.setNameFilter.bind(this);

   }

   setSort(option, isPreLoading = false){
      var sort = "title_asc";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setAuthorFilter(option, isPreLoading = false){
      console.log(option);
      var filter = {};
      if(option != null)
         filter = {filter:"authors", query:option.value};
      this.setState({authorFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setTopicFilter(option, isPreLoading = false){
      var filters = [];

      if(option != null){
          for(var i = 0; i < option.length; i++){
            filters.push({filter:"topics", query:option[i].value});
          }
      }
      this.setState({topicFilters: filters, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setDateFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"release_date", query:option.value};
      this.setState({dateFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setNameFilter(query, isPreLoading = false){
      var filter = {};
      if(query != null)
         filter = {filter:"book_name", query:query};
      this.setState({nameFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }
   combineFilters(){
      var allFilters = [];
      if(this.state.authorFilter.filter != null)
         allFilters.push(this.state.authorFilter);
      if(this.state.dateFilter.filter != null)
         allFilters.push(this.state.dateFilter);
      if(this.state.topicFilters.length != 0){
         for(var i = 0; i < this.state.topicFilters.length; i++)
           allFilters.push(this.state.topicFilters[i]);
      }
      if(this.state.nameFilter.filter != null)
         allFilters.push(this.state.nameFilter);

      this.props.setFilters(allFilters, this.state.sort, this.state.isPreLoading);
      this.setState({isPreLoading: false});
   }

   render(){
     var sortOptions = [
           {value: 'title_asc', label: 'Title A-Z'},
           {value: 'title_desc', label: 'Title Z-A'},
           {value: 'release_year_desc', label: 'Year 2018-1900'},
           {value: 'release_year_asc', label: 'Year 1900--2018'}
      ];
      return(
         <div>
            <Row>
               <Col xs="7">
                  <h5 className="filter-label">Title:</h5>
                  <NameFilter setFilter={this.setNameFilter} />
               </Col>
               <Col xs="5">
                  <h5 className="filter-label">Topic:</h5>
                  <MultiFilter setFilter={this.setTopicFilter} options={topicSuggestions} arg="topic"/>
               </Col>
            </Row>
            <Row>

               <Col xs="5">
                  <h5 className="filter-label">Author:</h5>
                  <GeneralFilter setFilter={this.setAuthorFilter} arg="author" apiCall="authors"/>
               </Col>
               <Col xs="5">
                  <h5 className="filter-label">Release Year:</h5>
                  <GeneralFilter setFilter={this.setDateFilter} arg="year" apiCall="book_years"/>
               </Col>
               <Col xs="2">
                  <h5 className="filter-label">Sort By:</h5>
                  <Sort setFilter={this.setSort} options={sortOptions}/>
               </Col>

            </Row>
            <hr className="divider" />
         </div>

      );
   }
}

export default BookFilters;
