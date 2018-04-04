import React, { Component } from 'react';
import Select from 'react-select';

class CastFilter extends Component {

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
            name="cast-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={[
               {value: 'Scarlett Johansson', label: 'Scarlett Johansson'},
               {value: 'Natalie Portman', label: 'Natalie Portman'},
               {value: 'Nat', label: 'Nat'},
               {value: 'Em', label: 'Em'},
            ]}
         />
      );
   }
}

export default CastFilter;
