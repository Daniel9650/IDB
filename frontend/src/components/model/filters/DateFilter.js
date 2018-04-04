import React, { Component } from 'react';
import Select from 'react-select';

class DateFilter extends Component {

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
            name="date-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={[
               {value: '2017', label: '2017'},
               {value: '2015', label: '2015'},
               {value: '1990', label: '1990'},
               {value: '2007', label: '2007'},
            ]}
         />
      );
   }
}

export default DateFilter;
