import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

class MultiFilter extends Component {

   constructor(props){
      super(props);
      this.state ={
         selectedOptions: [],
         suggestions: this.props.options
      };

      this.populateFilters = this.populateFilters.bind(this);
      this.handleChange = this.handleChange.bind(this);

      this.populateFilters();
   }

   populateFilters(){
     var list = this.state.suggestions;
     console.log(this.props.options);
     var args = new URLSearchParams(this.props.location.search);
     var query = args.get(this.props.arg);
     var allTopics =[];
     for (var k in list){
        if (list.hasOwnProperty(k)) {
           if(query === list[k].value){
              allTopics.push(list[k]);
           }
        }
     }
     this.setState({selectedOptions: allTopics},
     this.props.setFilter(this.state.selectedOption, true));
   }

   handleChange(selectedOptions) {
     console.log(selectedOptions)
      this.setState({selectedOptions: selectedOptions},
      this.props.setFilter(selectedOptions));

      for(var i = 0; i < selectedOptions.length; i++){
        var args = new URLSearchParams(this.props.location.search);
        if(selectedOptions != null)
           args.set(this.props.arg, selectedOptions[i].value);
        else
           args.delete(this.props.arg);
        this.props.history.push('?'+args.toString());
      }

   }

   render(){
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
