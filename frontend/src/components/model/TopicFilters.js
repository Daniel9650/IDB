import React, { Component } from 'react';
import Select from 'react-select';
import { Row, Col } from 'reactstrap';
import NameFilter from './filters/NameFilter.js';
import Sort from './filters/Sort.js';
import topicDict from '../../data/topic_dictionary.json';

class TopicFilters extends Component {

   constructor(props){
      super(props);

      this.state={
         nameFilter:{},
         sort: 'title_asc',
         isPreLoading: false
      }

      this.setSort = this.setSort.bind(this);
      this.setNameFilter = this.setNameFilter.bind(this);

   }

   setNameFilter(query, isPreLoading = false){
      var filter = {};
      if(query != null)
         filter = {filter:"topic_name", query:query};
      this.setState({nameFilter: filter, isPreLoading: isPreLoading}, this.combineFilters);
   }

   setSort(option, isPreLoading = false){
      var sort = "title_asc";
      if(option != null)
         sort = option.value;
      this.setState({sort: sort, isPreLoading: isPreLoading}, this.combineFilters);
   }


   combineFilters(){
      var allFilters = [];
      if(this.state.nameFilter.filter != null)
         allFilters.push(this.state.nameFilter);

      this.props.setFilters(allFilters, this.state.sort, this.state.isPreLoading);
      this.setState({isPreLoading: false});
   }

   render(){
     var sortOptions = [
           {value: 'title_asc', label: 'Title A-Z'},
           {value: 'title_desc', label: 'Title Z-A'}
      ];
      return(
         <div>
            <Row>
               <Col xs="10">
                  <h5 className="filter-label">Title:</h5>
                  <NameFilter setFilter={this.setNameFilter} />
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

export default TopicFilters;
