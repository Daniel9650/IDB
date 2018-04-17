import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

class TopicFilter extends Component {

   constructor(props){
      super(props);
      this.state ={
         selectedOptions: [],
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
      var allTopics =[];
      for (var k in list){
         if (list.hasOwnProperty(k)) {
            if(query == list[k].value){
               allTopics.push(list[k]);
            }
         }
      }
      this.setState({selectedOptions: allTopics},
      this.props.setFilter(this.state.selectedOption, true));

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(selectedOptions) {
     console.log(selectedOptions)
      this.setState({selectedOptions: selectedOptions},
      this.props.setFilter(selectedOptions));

      for(var i = 0; i < selectedOptions.length; i++){
        var args = new URLSearchParams(this.props.location.search);
        if(selectedOptions != null)
           args.set("topic", selectedOptions[i].value);
        else
           args.delete("topic");
        this.props.history.push('?'+args.toString());
      }

   }

   render(){
      return(
         <Select
            multi
            name="topic-filter"
            value={this.state.selectedOptions}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={this.state.suggestions}
         />
      );
   }
}

export default withRouter(TopicFilter);
