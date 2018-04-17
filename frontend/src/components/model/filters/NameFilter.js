import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import { withRouter } from "react-router-dom";

class SearchBar extends Component {
   constructor(props){
      super(props);

      var curr = '';
      if(this.props.currentFilter != null)
         curr = this.props.currentFilter;

      this.state = {value: curr};
      var args = new URLSearchParams(this.props.location.search);
      var query = args.get('q');
      if(query != null && query.length > 0){
         this.setState({value: query},this.props.setFilter(query, true));
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleFormSubmit = this.handleFormSubmit.bind(this);
   }

   handleFormSubmit(event){
      event.preventDefault();
   }


   handleChange(event){
      this.setState({value: event.target.value},this.props.setFilter(event.target.value));
      var args = new URLSearchParams(this.props.location.search);
      if(event.target.value.length > 0)
         args.set("q", event.target.value);
      else
         args.delete("q");
      this.props.history.push('?'+args.toString());
   }

   render(){
      return(
         <Form onSubmit={this.handleFormSubmit}>
            <FormGroup >
               <Input
                  type="text"
                  required
                  placeholder="Search..."
                  value={this.state.value}
                  onChange={this.handleChange}/>
            </FormGroup >
         </Form>
      );
   }
}

export default withRouter(SearchBar);
