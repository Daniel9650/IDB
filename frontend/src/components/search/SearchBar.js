import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, InputGroupAddon, InputGroup } from 'reactstrap';


class SearchBar extends Component {
   constructor(props){
      super(props);
      this.state = {value: '', urlVal: ''};
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event){
      console.log(event.target.value);
      var val = "/search&q=" + event.target.value;
      this.setState({value: event.target.value, urlVal: val});

   }

   render(){
      return(
         <Form inline action={this.state.urlVal}>
               <InputGroup >
                  <Input
                     className="search-field"
                     type="text"
                     placeholder="Search"
                     value={this.state.value}
                     onChange={this.handleChange}/>
               </InputGroup>
               <InputGroupAddon addonType="append">
                  <Button className="search-button" type="submit" href={this.state.urlVal}>
                     <i class="fa fa-search"></i>
                  </Button>
               </InputGroupAddon>

         </Form>
      );
   }
}

export default SearchBar;
