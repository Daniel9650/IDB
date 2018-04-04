import React, { Component } from 'react';
import Select from 'react-select';

class AuthorFilter extends Component {

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
               {value: 'Charles Fuller', label: 'Charles Fuller'},
               {value: 'Agatha Christie', label: 'Agatha Christie'},
               {value: 'Ch', label: 'Ch'},
               {value: 'A', label: 'A'},
            ]}
         />
      );
   }
}

export default AuthorFilter;
