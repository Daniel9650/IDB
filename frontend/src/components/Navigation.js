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
      		<Navbar className="navbar navbar-expand-md fixed-top navbar-dark">
      			<NavbarBrand href="/home">
                  <img  name="home-logo-link" className="brand-logo" src={require('../logo.png')} />
               </NavbarBrand>
      			<NavbarToggler onClick={this.toggle} />
      			<Collapse isOpen={this.state.isOpen} navbar>
      				<Nav className="ml-auto" navbar>
                     <NavItem>
                        <NavLink name="home-link" className="navbar-link" href="home">Home</NavLink>
                     </NavItem>
                     <NavItem>
                        <NavLink name="topics-link" className="navbar-link" href="/topics/">Topics</NavLink>
                     </NavItem>
      					<NavItem>
      						<NavLink name="movies-link" className="navbar-link" href="/movies/">Movies</NavLink>
      					</NavItem>
                     <NavItem>
      						<NavLink name="books-link" className="navbar-link" href="/books/">Books</NavLink>
      					</NavItem>
                     <NavItem>
      						<NavLink name="music" className="navbar-link" href="/music/">Music</NavLink>
      					</NavItem>
                     <NavItem>
                        <NavLink name="about-link" className="navbar-link" href="/about/">About</NavLink>
                     </NavItem>
      				</Nav>
      			</Collapse>
      		</Navbar>
      	</div>
      );
   }

}

export default Navigation;
