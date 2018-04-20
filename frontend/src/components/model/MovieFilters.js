import React, { Component } from 'react';

import { Row, Col } from 'reactstrap';
import GeneralFilter from './filters/GeneralFilter.js';
import NameFilter from './filters/NameFilter.js';
import MultiFilter from './filters/MultiFilter.js';
import Sort from './filters/Sort.js';
import topicSuggestions from '../../data/topicSuggestions.js';


class MovieFilters extends Component {

   constructor(props){
      super(props);


      this.state={
         castFilter: {},
         directorFilter: {},
         topicFilters: [],
         dateFilter: {},
         nameFilter:{},
         sort: 'title_asc',
         isLoaded: true,
         isPreLoading: false,
         castSent: false,
         directorSent: false,
         topicSent: false,
         dateSent: false,
         nameSent: false,
         sortSent: false
      }

      this.setCurrentFilters(this.props.currentFilters, this.props.currentSort);


      this.setCurrentFilters = this.setCurrentFilters.bind(this);
      this.setCastFilter = this.setCastFilter.bind(this);
      this.setDirectorFilter = this.setDirectorFilter.bind(this);
      this.setTopicFilter = this.setTopicFilter.bind(this);
      this.setDateFilter = this.setDateFilter.bind(this);
      this.combineFilters = this.combineFilters.bind(this);
      this.setSort = this.setSort.bind(this);
      this.setNameFilter = this.setNameFilter.bind(this);
      this.allFiltersSent = this.allFiltersSent.bind(this);

   }

   setCurrentFilters(filters, currentSort){

      var cast = {};
      var director = {};
      var topic = {};
      var date = {};
      var name = {};
      var sort = currentSort;
      for(let i = 0; i < filters.length; i++){
         var filterType = filters[i].filter;
         if(filterType === "cast")
            cast = filters[i];
         else if(filterType === "director")
            director = filters[i];
         else if(filterType === "topics")
            topic = filters[i]
         else if(filterType === "movie_name")
            name = filters[i]
      }

      this.setState({
         castFilter: cast,
         directorFilter: director,
         topicFilter: topic,
         dateFilter: date,
         nameFilter: name,
         sort: sort,
         isLoaded: false,
      }, this.combineFilters);

   }

   componentDidMount(){
      this.setState({isLoaded: true});
   }

   setNameFilter(query, isPreLoading = false){
      var filter = {};
      if(query != null)
         filter = {filter:"movie_name", query:query};
      this.setState({nameFilter: filter, isPreLoading: isPreLoading, nameSent: true}, this.combineFilters);
   }

   setSort(option, isPreLoading = false){
      var sort = "title_asc";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort, isPreLoading: isPreLoading, sortSent: true}, this.combineFilters);
   }

   setCastFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"cast", query:option.value};
      this.setState({castFilter: filter, isPreLoading: isPreLoading, castSent: true}, this.combineFilters);
   }

   setDirectorFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"director", query:option.value};
      this.setState({directorFilter: filter, isPreLoading: isPreLoading, directorSent: true}, this.combineFilters);
   }

   setTopicFilter(option, isPreLoading = false){
      var filters = [];
      if(option != null){
          for(var i = 0; i < option.length; i++){
            filters.push({filter:"topics", query:option[i].value});
          }
      }
      this.setState({topicFilters: filters, isPreLoading: isPreLoading, topicSent: true}, this.combineFilters);
   }

   setDateFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"release_date", query:option.value};
      this.setState({dateFilter: filter, isPreLoading: isPreLoading, dateSent: true}, this.combineFilters);
   }

   combineFilters(){

      if(this.allFiltersSent()){
         var allFilters = [];
         if(this.state.castFilter.filter != null)
            allFilters.push(this.state.castFilter);
         if(this.state.directorFilter.filter != null)
            allFilters.push(this.state.directorFilter);
         if(this.state.dateFilter.filter != null)
            allFilters.push(this.state.dateFilter);
         if(this.state.topicFilters.length !== 0){
             for(var i = 0; i < this.state.topicFilters.length; i++)
               allFilters.push(this.state.topicFilters[i]);
          }
         if(this.state.nameFilter.filter != null)
            allFilters.push(this.state.nameFilter);

         this.props.setFilters(allFilters, this.state.sort, this.state.isPreLoading);
      }

      this.setState({isPreLoading: false});
   }

   allFiltersSent(){
      const { nameSent, sortSent, castSent, directorSent, topicSent, dateSent } = this.state;
      return nameSent && sortSent && castSent && directorSent && topicSent && dateSent;
   }

   render(){
     var sortOptions = [
           {value: 'title_asc', label: 'Title A-Z'},
           {value: 'title_desc', label: 'Title Z-A'},
           {value: 'release_year_desc', label: 'Year 2018-1900'},
           {value: 'release_year_asc', label: 'Year 1900--2018'}
      ];
      if(this.state.isLoaded){
         return(
            <div>
               <Row>
                  <Col xs="7">
                     <h5 className="filter-label">Title:</h5>
                     <NameFilter currentFilter={this.state.nameFilter.query} setFilter={this.setNameFilter} />
                  </Col>
                  <Col xs="5">
                     <h5 className="filter-label">Topic:</h5>
                     <MultiFilter setFilter={this.setTopicFilter} options={topicSuggestions} arg="topic"/>
                  </Col>
               </Row>
               <Row>
                  <Col xs="4">
                     <h5 className="filter-label">Acting:</h5>
                     <GeneralFilter setError={this.props.setError} setFilter={this.setCastFilter} arg="acting" apiCall="actors" />
                  </Col>
                  <Col xs="4">
                     <h5 className="filter-label">Directing:</h5>
                     <GeneralFilter setError={this.props.setError} setFilter={this.setDirectorFilter} arg="director" apiCall="directors"/>
                  </Col>
                  <Col xs="2">
                     <h5 className="filter-label">Release Year:</h5>
                     <GeneralFilter setError={this.props.setError} setFilter={this.setDateFilter} arg="year" apiCall="movie_years"/>
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
}

export default MovieFilters;
