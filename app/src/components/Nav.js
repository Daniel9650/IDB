import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';



class Navigation extends Component {
  render() {
    return (
      <Navbar fluid>
         <Navbar.Header>
            <Navbar.Brand>
               PopTopic
            </Navbar.Brand>
         </Navbar.Header>
         <Nav pullRight>
            <NavItem eventKey={1} href="/">
               Home
            </NavItem>
            <NavItem eventKey={2} href="/topics">
               Topics
            </NavItem>
            <NavItem eventKey={3} href="/movies">
               Movies
            </NavItem>
            <NavItem eventKey={4} href="/music">
               Music
            </NavItem>
            <NavItem eventKey={5} href="/books">
               Books
            </NavItem>
            <NavItem eventKey={6} href="/about">
               About
            </NavItem>
         </Nav>
      </Navbar>
    );
  }
}

export default Navigation;
