import React, { Component } from 'react';
import Select from 'react-select';

class DirectorFilter extends Component {

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
            name="director-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={[
               {value: 'Joss Whedon', label: 'Joss Whedon'},
               {value: 'Alex Garland', label: 'Alex Garland'},
               {value: 'James', label: 'James'},
               {value: 'Smith', label: 'Smith'},
            ]}
         />
      );
   }
}

export default DirectorFilter;
