import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
   constructor(props){
      super(props);

      var curr = '';
      if(this.props.currentFilter != null)
         curr = this.props.currentFilter;

      this.state = {value: curr};
      console.log(this.props.currentFilter);
      this.handleChange = this.handleChange.bind(this);
   }


   handleChange(event){
      this.setState({value: event.target.value},this.props.setFilter(event.target.value));
   }

   render(){
      return(
         <Form>
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

export default SearchBar;
