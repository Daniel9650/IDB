import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

class Sort extends Component {

   constructor(props){
      super(props);
      this.state ={
         selectedOption:'',
         suggestions: this.props.options
      };
      var list = this.state.suggestions;
      var args = new URLSearchParams(this.props.location.search);
      var query = args.get('sort');
      for (var k in list){
         if (list.hasOwnProperty(k)) {
            if(query == list[k].value){
               this.setState({selectedOption: list[k]},
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
         args.set("sort", selectedOption.value);
      else
         args.delete("sort");
      this.props.history.push('?'+args.toString());
   }
   render(){
      return(
         <Select
            name="sort"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={this.state.suggestions}
         />
      );
   }
}

export default withRouter(Sort);
