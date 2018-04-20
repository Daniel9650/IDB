import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";


/*  Renders filter component that can be searched, and contains dropdown menu
   of selectable options. Multiple options can be selected, and appear wrapped
   in bubble inside search/filter bar upon selection.

   Props:
      options: list of options to show in dropdown
         -each option is an object with value and label
      setFilter: function taking list of selected options and true/false
         variable for loading behavior
      arg: filter name shown in url


*/
class MultiFilter extends Component {

   constructor(props){
      super(props);

      //fetch values from url paramaters to populate GUI component
      var list = this.props.options;
      var args = new URLSearchParams(this.props.location.search);
      var queries = args.getAll(this.props.arg);
      var allTopics =[];
      for(var i = 0; i < queries.length; i++){
         for (var k in list){
            if (list.hasOwnProperty(k)) {
               if(queries[i] === list[k].value){
                  allTopics.push(list[k]);
               }
            }
         }
      }

      //set filters for API query based on values fetched from URL parameters
      this.props.setFilter(allTopics, true);

      //set initial state
      this.state ={
         selectedOptions: allTopics,
         suggestions: this.props.options
      };

      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(selectedOptions) {
      //set filters for API query based on selected options
      this.setState({selectedOptions: selectedOptions},
         this.props.setFilter(selectedOptions));

      /* On change of selected filter values, add filter type and selections
      to URL parameters*/
      var args = new URLSearchParams(this.props.location.search);
      if(selectedOptions[0] != null)
         args.set(this.props.arg, selectedOptions[0].value);
      else
         args.delete(this.props.arg);
      for(var i = 1; i < selectedOptions.length; i++){
         if(selectedOptions[i] != null)
            args.append(this.props.arg, selectedOptions[i].value);
      }
      this.props.history.push('?'+args.toString());
   }

   render(){
      //create unique identifier for name property used in selenium testing
      var name = this.props.arg + "-filter";

      return(
         <Select
            multi
            name={name}
            value={this.state.selectedOptions}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={this.state.suggestions}
         />
      );
   }
}

export default withRouter(MultiFilter);
