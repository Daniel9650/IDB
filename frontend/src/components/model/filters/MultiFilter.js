import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

class MultiFilter extends Component {

   constructor(props){
      super(props);

      var list = this.props.options;
      var args = new URLSearchParams(this.props.location.search);
      var queries = args.getAll(this.props.arg);
      console.log(queries);
      var allTopics =[];
      for(var i = 0; i < queries.length; i++){
        console.log(queries[i]);
        for (var k in list){
           if (list.hasOwnProperty(k)) {
              if(queries[i] === list[k].value){
                 allTopics.push(list[k]);
              }
           }
         }
      }

      this.props.setFilter(allTopics, true);

      this.state ={
         selectedOptions: allTopics,
         suggestions: this.props.options
      };

      this.handleChange = this.handleChange.bind(this);

   }

   handleChange(selectedOptions) {
     console.log(selectedOptions)
      this.setState({selectedOptions: selectedOptions},
      this.props.setFilter(selectedOptions));

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
