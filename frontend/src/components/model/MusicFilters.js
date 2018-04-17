import React, { Component } from 'react';
import Select from 'react-select';
import { Col, Row } from 'reactstrap';
import TopicFilter from './filters/TopicFilter.js';
import ArtistFilter from './filters/ArtistFilter.js';
import AlbumFilter from './filters/AlbumFilter.js';
import DateFilter from './filters/DateFilter.js';
import NameFilter from './filters/NameFilter.js';
import Sort from './filters/Sort.js';

import topicDict from '../../data/topic_dictionary.json';

class MusicFilters extends Component {

   constructor(props){
      super(props);

      this.state={
         artistFilter: {},
         albumFilter: {},
         topicFilters: [],
         dateFilter: {},
         nameFilter: {},
         sort: 'title_asc',
         isPreLoading: false
      }

      this.setArtistFilter = this.setArtistFilter.bind(this);
      this.setAlbumFilter = this.setAlbumFilter.bind(this);
      this.setTopicFilter = this.setTopicFilter.bind(this);
      this.setDateFilter = this.setDateFilter.bind(this);
      this.combineFilters = this.combineFilters.bind(this);
      this.getTopicID = this.getTopicID.bind(this);
      this.setSort = this.setSort.bind(this);
      this.setNameFilter = this.setNameFilter.bind(this);

   }

   setNameFilter(query, isPreLoading = false){
      var filter = {};
      if(query != null)
         filter = {filter:"song_name", query:query};
      this.setState({nameFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }


   setSort(option, isPreLoading = false){
      var sort = "title_asc";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setArtistFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"artists", query:option.value};
      this.setState({artistFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setAlbumFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"album", query:option.value};
      this.setState({albumFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setTopicFilter(option, isPreLoading = false){
      var filters = [];
      if(option != null){
          for(var i = 0; i < option.length; i++){
            var id = this.getTopicID(option[i].value);
            filters.push({filter:"topics", query:id});
          }
      }
      this.setState({topicFilters: filters, isPreLoading: isPreLoading}, this.combineFilters);
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

   setDateFilter(option, isPreLoading = false){
      var filter = {};
      if(option != null)
         filter = {filter:"release_date", query:option.value};
      this.setState({dateFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }

   combineFilters(){
      var allFilters = [];
      if(this.state.artistFilter.filter != null)
         allFilters.push(this.state.artistFilter);
      if(this.state.albumFilter.filter != null)
         allFilters.push(this.state.albumFilter);
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
      return(
         <div>
            <Row>
               <Col xs="7">
                  <h5>Song Title:</h5>
                  <NameFilter setFilter={this.setNameFilter} />
               </Col>
               <Col xs="5">
                  <h5 className="filter-label">Topic:</h5>
                  <TopicFilter setFilter={this.setTopicFilter} />
               </Col>
            </Row>
            <Row>

               <Col xs="4">
                  <h5 className="filter-label">Artist:</h5>
                  <ArtistFilter setFilter={this.setArtistFilter} />
               </Col>
               <Col xs="4">
                  <h5 className="filter-label">Album:</h5>
                  <AlbumFilter setFilter={this.setAlbumFilter} />
               </Col>
               <Col xs="2">
                  <h5 className="filter-label">Release Year:</h5>
                  <DateFilter type="song" setFilter={this.setDateFilter} />
               </Col>
               <Col xs="2">
                  <h5 className="filter-label">Sort By:</h5>
                  <Sort setFilter={this.setSort} />
               </Col>
            </Row>
            <hr className="divider"/>
         </div>
      );
   }
}

export default MusicFilters;
