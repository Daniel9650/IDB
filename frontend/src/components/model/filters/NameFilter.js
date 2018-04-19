import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import { withRouter } from "react-router-dom";

class NameFilter extends Component {
   constructor(props){
      super(props);

      var args = new URLSearchParams(this.props.location.search);
      var query = args.get('q');
      if(query == null || query.length <= 0){
        this.props.setFilter(null, true);
        this.state = {value: ""};
      }
      else{
         this.props.setFilter(query, true);
         this.state = {value: query};
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
                  name="name-filter"
                  type="text"
                  placeholder="Search..."
                  value={this.state.value}
                  onChange={this.handleChange}/>
            </FormGroup >
         </Form>
      );
   }
}

export default withRouter(NameFilter);
