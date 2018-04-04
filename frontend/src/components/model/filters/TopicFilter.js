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
               {value: 'Crime', label: 'Crime'},
               {value: 'Drama', label: 'Drama'},
               {value: 'Family', label: 'Family'},
               {value: 'Fantasy', label: 'Fantasy'},
               {value: 'Music', label: 'Music'},
               {value: 'Mystery', label: 'Mystery'},
               {value: 'Romance', label: 'Romance'},
               {value: 'Science Fiction', label: 'Science Fiction'},
               {value: 'Thriller', label: 'Thriller'},
               {value: 'War', label: 'War'},

            ]}
         />
      );
   }
}

export default TopicFilter;
