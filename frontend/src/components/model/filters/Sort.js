import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

/* Renders sort component with dropown option menu that is searchable using
   text input and selectable.

   Props:
      options: list of options to show in dropdown
         -each option is an object with value and label
      setFilter: function taking list of selected options and true/false
         variable for loading behavior
      arg: filter name shown in url

*/
class Sort extends Component {

   constructor(props){
      super(props);

      //sets sort filter in accordance with any existing URL parameters
      var list = this.props.options;
      var args = new URLSearchParams(this.props.location.search);
      var query = args.get("sort");
      var select = "";
      if(query == null || query.length <= 0){
        this.props.setFilter(null , true);
      }
      else{
        for (var k in list){
           if (list.hasOwnProperty(k)) {
              if(query === list[k].value){
                select=list[k];
              }
           }
        }
        this.props.setFilter(select , true);
      }

      //sets initial state
      this.state ={
         selectedOption: select,
         suggestions: this.props.options
      };

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(selectedOption) {
      //sets sort filter for API queries for results
      this.setState({selectedOption: selectedOption});
         this.props.setFilter(selectedOption);

      //adds selected option to filters specified in URL paramaters
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
