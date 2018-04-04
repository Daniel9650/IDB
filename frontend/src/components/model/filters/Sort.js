import React, { Component } from 'react';
import Select from 'react-select';

class Sort extends Component {

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
            name="sort"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={[
               {value: 'title_asc', label: 'Title A-Z'},
               {value: 'title_desc', label: 'Title Z-A'},
               {value: 'release_year_desc', label: 'Year 2018-1900'},
               {value: 'release_year_asc', label: 'Year 1900--2018'},
            ]}
         />
      );
   }
}

export default Sort;
