import React, { Component } from 'react';
import Select from 'react-select';

class ArtistFilter extends Component {

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
            name="artist-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={[
               {value: 'Damien Rice', label: 'Damien Rice'},
               {value: 'Yoon Mirae', label: 'Yoon Mirae'},
               {value: 'Action', label: 'Action'},
               {value: 'Le', label: 'Le'},
            ]}
         />
      );
   }
}

export default ArtistFilter;
