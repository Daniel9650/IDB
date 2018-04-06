import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import TopicFilter from './filters/TopicFilter.js';
import CastFilter from './filters/CastFilter.js';
import DirectorFilter from './filters/DirectorFilter.js';
import DateFilter from './filters/DateFilter.js';
import NameFilter from './filters/NameFilter.js';
import Sort from './filters/Sort.js';
import topicDict from '../../data/topic_dictionary.json';

class MovieFilters extends Component {

   constructor(props){
      super(props);

      this.state={
         castFilter: {},
         directorFilter: {},
         topicFilter: {},
         dateFilter: {},
         nameFilter:{},
         sort: 'title_asc'
      }

      this.setCastFilter = this.setCastFilter.bind(this);
      this.setDirectorFilter = this.setDirectorFilter.bind(this);
      this.setTopicFilter = this.setTopicFilter.bind(this);
      this.setDateFilter = this.setDateFilter.bind(this);
      this.combineFilters = this.combineFilters.bind(this);
      this.getTopicID = this.getTopicID.bind(this);
      this.setSort = this.setSort.bind(this);
      this.setNameFilter = this.setNameFilter.bind(this);

   }

   setNameFilter(query){
      var filter = {};
      if(query != null)
         filter = {filter:"movie_name", query:query};
      this.setState({nameFilter: filter}, this.combineFilters);
   }

   setSort(option){
      var sort = "title_asc";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort}, this.combineFilters);
   }

   setCastFilter(option){
      console.log(option);
      var filter = {};
      if(option != null)
         filter = {filter:"cast", query:option.value};
      this.setState({castFilter: filter}, this.combineFilters);
   }

   setDirectorFilter(option){
      console.log(option);
      var filter = {};
      if(option != null)
         filter = {filter:"director", query:option.value};
      this.setState({directorFilter: filter}, this.combineFilters);
   }

   setTopicFilter(option){
      var filter = {};
      if(option != null){
         var id = this.getTopicID(option.value);
         filter = {filter:"topics", query:id};
      }
      this.setState({topicFilter: filter}, this.combineFilters);
   }

   getTopicID(topicName){
      var id = [];
      topicDict.pairs.map(function(pair){
         if(topicName === pair.value){
            id.push(pair.key);
         }
      });
      return id[0];
   }

   setDateFilter(option){
      var filter = {};
      if(option != null)
         filter = {filter:"release_date", query:option};
      this.setState({dateFilter: filter}, this.combineFilters);
   }

   combineFilters(){
      var allFilters = [];
      if(this.state.castFilter.filter != null)
         allFilters.push(this.state.castFilter);
      if(this.state.directorFilter.filter != null)
         allFilters.push(this.state.directorFilter);
      if(this.state.dateFilter.filter != null)
         allFilters.push(this.state.dateFilter);
      if(this.state.topicFilter.filter != null)
         allFilters.push(this.state.topicFilter);
      if(this.state.nameFilter.filter != null)
         allFilters.push(this.state.nameFilter);

      this.props.setFilters(allFilters, this.state.sort);
   }

   render(){
      return(
         <div>
            <Row>
               <Col>
                  <h5>Title:</h5>
                  <NameFilter setFilter={this.setNameFilter} />
               </Col>
            </Row>
            <Row>
               <Col xs="2">
                  <h5>Topic:</h5>
                  <TopicFilter setFilter={this.setTopicFilter} />
               </Col>
               <Col xs="3">
                  <h5>Acting:</h5>
                  <CastFilter setFilter={this.setCastFilter} />
               </Col>
               <Col xs="3">
                  <h5>Directing:</h5>
                  <DirectorFilter setFilter={this.setDirectorFilter} />
               </Col>
               <Col xs="2">
                  <h5>Release Year:</h5>
                  <DateFilter type="movie" setFilter={this.setDateFilter} />
               </Col>
               <Col xs="2">
                  <h5>Sort By:</h5>
                  <Sort setFilter={this.setSort} />
               </Col>
            </Row>
            <hr className="divider" />
         </div>
      );
   }
}

export default MovieFilters;
