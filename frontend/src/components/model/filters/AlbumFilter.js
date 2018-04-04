import React, { Component } from 'react';
import Select from 'react-select';

class AlbumFilter extends Component {

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
            name="album-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={[
               {value: '9', label: '9'},
               {value: 'Vikings', label: 'Vikings'},
               {value: 'Big', label: 'Big'},
               {value: 'A', label: 'A'},
            ]}
         />
      );
   }
}

export default AlbumFilter;
