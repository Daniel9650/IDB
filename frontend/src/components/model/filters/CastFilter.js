import React, { Component } from 'react';
import Select from 'react-select';

class CastFilter extends Component {

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
   }

   componentDidMount(){
      this.fetchData();
   }

   fetchData(){
      fetch("http://api.poptopic.org/all_actors")
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
   }
   render(){
      return(
         <Select
            name="cast-filter"
            value={this.state.selectedOption}
            onChange={this.handleChange}
            clearable={true}
            searchable={true}
            options={this.state.suggestions}
         />
      );
   }
}

export default CastFilter;
