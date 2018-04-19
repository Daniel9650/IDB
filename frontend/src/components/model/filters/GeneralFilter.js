import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";
import $ from "jquery"

class GeneralFilter extends Component {

   constructor(props){
      super(props);
      this.state ={
         selectedOption:'',
         data: [],
         suggestions: [],
         isLoaded: false,
         isOpen: false,
         error: null,
         load_attempts: 0
      };

      this.getSuggestions = this.getSuggestions.bind(this);
      this.fetchData = this.fetchData.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }

   getSuggestions(){
      var list = this.state.data.map((item)=>{
         return {value: item, label: item};
      });
      this.setState({suggestions: list});
      var select = null;
      var args = new URLSearchParams(this.props.location.search);
      var query = args.get(this.props.arg);
      for (var k in list){
         if (list.hasOwnProperty(k)) {
            if(query === list[k].value){
               select = list[k];
            }
         }
      }
      if(select != null)
        this.setState({selectedOption: select});
      this.props.setFilter(select, true);
   }

   componentDidMount(){
      this.fetchData(5);
   }

   fetchData(max_attempts){
      var self = this;
      this.setState({load_attempts: this.state.load_attempts + 1});
      $.ajax({
        url: "http://api.poptopic.org/all_" + this.props.apiCall,
        method: "GET",
        success: function(data, textStatus, jqXHR){
          console.log("success");
          self.setState({
            isLoaded: true,
            data: data
          }, self.getSuggestions);
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log("all_"+self.props.apiCall+" in error");
          console.log("status: "+textStatus);
          if(self.state.load_attempts >= max_attempts){
            console.log("all_"+self.props.apiCall + "at max attempts. failed.");
            self.setState({
              isLoaded: true,
              error: errorThrown
            });
            self.props.setError();
          }
          else{
            self.setState({load_attempts: self.state.load_attempts + 1});
            self.fetchData(max_attempts);
          }
        },
        timeout: 2500
      });

   }

   handleChange(selectedOption) {
      this.setState({selectedOption: selectedOption});
      this.props.setFilter(selectedOption);
      var args = new URLSearchParams(this.props.location.search);
      if(selectedOption != null)
         args.set(this.props.arg, selectedOption.value);
      else
         args.delete(this.props.arg);
      this.props.history.push('?'+args.toString());
   }
   render(){

     var name = this.props.arg + "-filter";
      return(
         <Select
            name={name}
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={this.state.suggestions}
         />
      );
   }
}

export default withRouter(GeneralFilter);
