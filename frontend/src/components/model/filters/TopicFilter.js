import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

class TopicFilter extends Component {

   constructor(props){
      super(props);
      this.state ={
         selectedOption:'',
         suggestions: [{value: 'Action', label: 'Action'},
               {value: 'Adventure', label: 'Adventure'},
               {value: 'Animation', label: 'Animation'},
               {value: 'Comedy', label: 'Comedy'},
               {value: 'Crime', label: 'Crime'},
               {value: 'Drama', label: 'Drama'},
               {value: 'Family', label: 'Family'},
               {value: 'Fantasy', label: 'Fantasy'},
               {value: 'History', label: 'History'},
               {value: 'Music', label: 'Music'},
               {value: 'Mystery', label: 'Mystery'},
               {value: 'Romance', label: 'Romance'},
               {value: 'Science Fiction', label: 'Science Fiction'},
               {value: 'Thriller', label: 'Thriller'},
               {value: 'War', label: 'War'}
            ]
      };
      var list = this.state.suggestions;
      var args = new URLSearchParams(this.props.location.search);
      var query = args.get('topic');
      for (var k in list){
         if (list.hasOwnProperty(k)) {
            if(query == list[k].value){
               this.setState({selectedOption:list[k]},
               this.props.setFilter(this.state.selectedOption, true));
            }
         }
      }
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(selectedOption) {
      this.setState({selectedOption: selectedOption},
      this.props.setFilter(selectedOption));
      var args = new URLSearchParams(this.props.location.search);
      if(selectedOption != null)
         args.set("topic", selectedOption.value);
      else
         args.delete("topic");
      this.props.history.push('?'+args.toString());
   }

   render(){
      return(
         <Select
            name="author-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={this.state.suggestions}
         />
      );
   }
}

export default withRouter(TopicFilter);
