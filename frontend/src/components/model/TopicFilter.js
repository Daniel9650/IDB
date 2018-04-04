import React, { Component } from 'react';
import Select from 'react-select';

class TopicFilter extends Component {

   constructor(props){
      super(props);
      this.state ={
         selectedOption:''
      };
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(selectedOption) {
      this.setState({selectedOption: selectedOption},
      this.props.setFilter(selectedOption));
   }
   render(){
      return(
         <Select
            name="author-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={[
               {value: 'Action', label: 'Action'},
               {value: 'Adventure', label: 'Adventure'},
               {value: 'Animation', label: 'Animation'},
               {value: 'Comedy', label: 'Comedy'},
               {value: 'Mystery', label: 'Mystery'},
            ]}
         />
      );
   }
}

export default TopicFilter;
