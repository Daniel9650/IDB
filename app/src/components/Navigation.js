import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';


class Navigation extends Component {
	constructor(props) {
    	super(props);
    	this.toggle = this.toggle.bind(this);
    	this.state = {
      		isOpen: false
    	};
  	}
  	toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  	}
	render () {
      return (
      	<div>
      		<Navbar className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      			<NavbarBrand href="/home">
                  <img className="brand-logo" src={require('../logo.png')} />
               </NavbarBrand>
      			<NavbarToggler onClick={this.toggle} />
      			<Collapse isOpen={this.state.isOpen} navbar>
      				<Nav className="ml-auto" navbar>
                     <NavItem>
                        <NavLink href="/topics/">Topics</NavLink>
                     </NavItem>
      					<NavItem>
      						<NavLink href="/movies/">Movies</NavLink>
      					</NavItem>
                     <NavItem>
      						<NavLink href="/books/">Books</NavLink>
      					</NavItem>
                     <NavItem>
      						<NavLink href="/music/">Music</NavLink>
      					</NavItem>
                     <NavItem>
                        <NavLink href="/about/">About</NavLink>
                     </NavItem>
      				</Nav>
      			</Collapse>
      		</Navbar>
      	</div>
      );
   }

}

export default Navigation;
