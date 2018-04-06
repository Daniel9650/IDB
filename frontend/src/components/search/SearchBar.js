import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, InputGroupAddon, InputGroup } from 'reactstrap';
import { withRouter } from "react-router-dom";


class SearchBar extends Component {
   constructor(props){
      super(props);
      this.state = {value: '', urlVal: ''};
      this.handleChange = this.handleChange.bind(this);
      var args = new URLSearchParams(this.props.location.search);
      if(this.props.location.pathname == '/search'){
         this.state.value = args.get('q');
      }
   }

   handleChange(event){
      var val = "/search?q=" + event.target.value;
      this.setState({value: event.target.value, urlVal: val});
   }

   render(){
      return(
         <Form inline method="GET" action="/search">
               <InputGroup >
                  <Input
                     name = "q"
                     className="search-field"
                     type="text"
                     placeholder="Search"
                     value={this.state.value}
                     onChange={this.handleChange}/>
               </InputGroup>
               <InputGroupAddon addonType="append">
                  <Button className="search-button" type="submit">
                     <i className="fa fa-search"></i>
                  </Button>
               </InputGroupAddon>
         </Form>
      );
   }
}

export default withRouter(SearchBar);
