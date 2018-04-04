import React, { Component } from 'react';
import Select from 'react-select';
import AuthorFilter from './AuthorFilter.js';
import TopicFilter from './TopicFilter.js';
import topicDict from '../../data/topic_dictionary.json';

class MovieFilters extends Component {

   constructor(props){
      super(props);

      this.state={
         castFilter: {},
         directorFilter: {},
         topicFilter: {},
         dateFilter: {},
         sort: 'title_asc'
      }

      this.setCastFilter = this.setCastFilter.bind(this);
      this.setDirectorFilter = this.setDirectorFilter.bind(this);
      this.setTopicFilter = this.setTopicFilter.bind(this);
      this.setDateFilter = this.setDateFilter.bind(this);
      this.combineFilters = this.combineFilters.bind(this);
      this.getTopicID = this.getTopicID.bind(this);

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

      this.props.setFilters(allFilters, this.state.sort);
   }

   render(){
      return(
         <div>
            <TopicFilter setFilter={this.setTopicFilter} />
         </div>
      );
   }
}

export default MovieFilters;
