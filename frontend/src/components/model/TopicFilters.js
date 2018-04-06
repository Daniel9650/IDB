import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import NameFilter from './filters/NameFilter.js';
import TopicSort from './filters/TopicSort.js';
import topicDict from '../../data/topic_dictionary.json';

class TopicFilters extends Component {

   constructor(props){
      super(props);

      this.state={
         nameFilter:{},
         sort: 'title_asc'
      }

      this.setSort = this.setSort.bind(this);
      this.setNameFilter = this.setNameFilter.bind(this);

   }

   setNameFilter(query){
      var filter = {};
      if(query != null)
         filter = {filter:"topic_name", query:query};
      this.setState({nameFilter: filter}, this.combineFilters);
   }

   setSort(option){
      var sort = "title_asc";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort}, this.combineFilters);
   }


   combineFilters(){
      var allFilters = [];
      if(this.state.nameFilter.filter != null)
         allFilters.push(this.state.nameFilter);

      this.props.setFilters(allFilters, this.state.sort);
   }

   render(){
      return(
         <div>
            <Row>
               <Col xs="10">
                  <h5 className="filter-label">Title:</h5>
                  <NameFilter setFilter={this.setNameFilter} />
               </Col>
               <Col xs="2">
                  <h5 className="filter-label">Sort By:</h5>
                  <TopicSort setFilter={this.setSort} />
               </Col>
            </Row>
            <hr className="divider" />
         </div>
      );
   }
}

export default TopicFilters;
