import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { Redirect } from 'react-router-dom';

class SearchBar extends Component {
   constructor(props){
      super(props);
      this.state = {value: ''};

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
