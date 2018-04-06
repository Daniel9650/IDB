import React, { Component } from 'react';
import Select from 'react-select';
import { withRouter } from "react-router-dom";

class DirectorFilter extends Component {

   constructor(props){
      super(props);
      this.state ={
         selectedOption:'',
         data: [],
         suggestions: [],
         isLoaded: false,
         isOpen: false,
         error: null
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
      var args = new URLSearchParams(this.props.location.search);
      var query = args.get('director');
      for (var k in list){
         if (list.hasOwnProperty(k)) {
            if(query == list[k].value){
               this.state.selectedOption = list[k];
               this.props.setFilter(this.state.selectedOption);
            }
         }
      }
   }

   componentDidMount(){
      this.fetchData();
   }

   fetchData(){
      fetch("http://api.poptopic.org/all_directors")
      .then(res => res.json())
      .then(
       (result) => {
          this.setState({
            isLoaded: true,
            data: result
         }, this.getSuggestions);
       },
       // Note: it's important to handle errors here
       // instead of a catch() block so that we don't swallow
       // exceptions from actual bugs in components.
       (error) => {
          this.setState({
            isLoaded: true,
            error
          });
       }
      )

   }

   handleChange(selectedOption) {
      this.setState({selectedOption: selectedOption},
      this.props.setFilter(selectedOption));
      var args = new URLSearchParams(this.props.location.search);
      if(selectedOption != null)
         args.set("director", selectedOption.value);
      else
         args.delete("director");
      this.props.history.push('?'+args.toString());
   }
   render(){
      return(
         <Select
            name="director-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={this.state.suggestions}
         />
      );
   }
}

export default withRouter(DirectorFilter);
