import React, { Component } from 'react';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
   constructor(props){
      super(props);
      this.state = {value: ''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleChange(event){
      console.log(event.target.value);
      this.setState({value: event.target.value});
   }

   handleSubmit(){
      this.props.handleSearch(this.state.value);
   }

   render(){
      return(
         <form onSubmit={this.handleSubmit}>
            <FormGroup>
               <Input
                  type="text"
                  id="search"
                  name="search"
                  required
                  placeholder="Search"
                  value={this.state.value}
                  onChange={this.handleChange}/>
            </FormGroup >
            <Button type="submit" />
         </form>
      );
   }
}

export default SearchBar;
