import React, { Component } from 'react';
import { InputGroup, InputGroupAddon, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
   constructor(props){
      super(props);
      this.state = {value: '', urlVal: '', redirectToResults: false};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event){
      var url = "/search&q=" + event.target.value;
      this.setState({value: event.target.value, urlVal: url});
      console.log(url);
   }

   handleSubmit(event){
      this.setState({redirectToResults: true});
   }

   render(){
      if (this.state.redirectToResults)
         return <Redirect to={this.state.urlVal} />

      return(
         <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.value} onChange={this.handleChange}/>
            <input type="submit" value="Submit"  />
         </form>
      );
   }
}

export default SearchBar;
