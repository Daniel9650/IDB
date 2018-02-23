import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import kylie from './images/kylie.jpg';
import drew from './images/drew.png';
import gerlou from './images/gerlou.jpg';
import olmos from './images/olmos.jpg';
import talamas from './images/talamas.jpg';
import github from './images/github.png';
import python from './images/python.png';
import bootstrap from './images/bootstrap.png';
import docker from './images/docker.png';
import aws from './images/aws.png';
import react from './images/react.png';

class About extends Component {

   render () {
      return (
         <div>
         <h1 className='about-title'>Our Concept</h1>
         <hr className='divider'/>
         <p className='about-text'>
            PopTopic categorizes books, movies, and music by topic to show
            related media and correlations between popular media and popular topics.
            Our API can be used for market research when starting a new project to
            see if a topic has been covered in a medium, or to see if a topic is
            trendy.
         </p>
         <br></br>
         <h1 className='about-title'>Meet Our Team</h1>
         <hr className='divider'/>
         <Container>
            <Row>
               <Col className= 'col-center'>
                  <img className='headshot center-block' src={kylie} />
                  <h4 className='about-name'>Kylie Sanderson</h4>
                  <p>React Developer</p>
                  <p>Commits:</p>
                  <p>Issues:</p>
                  <p>Unit Tests:</p>
               </Col>
               <Col className='col-center'>
                  <img className='headshot center-block' src={drew} />
                  <h4 className='about-name'>Drew Dearing</h4>
                  <p>Server Manager and Front-end Developer</p>
                  <p>Commits:</p>
                  <p>Issues:</p>
                  <p>Unit Tests:</p>
               </Col>
               <Col className='col-center'>
                  <img className='headshot center-block' src={gerlou} />
                  <h4 className='about-name'>Gerlou Shyy</h4>
                  <p>API Design Specialist</p>
                  <p>Commits:</p>
                  <p>Issues:</p>
                  <p>Unit Tests:</p>
               </Col>
            </Row>
            <Row>
               <Col className='col-center'>
                  <img className='headshot center-block' src={olmos} />
                  <h4 className='about-name'>Daniel Olmos</h4>
                  <p>Server Manager and Python Developer</p>
                  <p>Commits:</p>
                  <p>Issues:</p>
                  <p>Unit Tests:</p>
               </Col>
               <Col className='col-center'>
                  <img className='headshot center-block' src={talamas} />
                  <h4 className='about-name'>Daniel Talamas</h4>
                  <p>Back-end Python Developer</p>
                  <p>Commits:</p>
                  <p>Issues:</p>
                  <p>Unit Tests:</p>
               </Col>
            </Row>
         </Container>
         <br></br>
         <h1 className='about-title'>Implementation</h1>
         <hr className='divider'/>
         <Container>
            <h4 className='about-sub'>Code</h4>
            <p>
               <a href='https://github.com/Daniel9650/idb'>Github Repository</a>
            </p>
            <p>
               <a href='https://www.gitbook.com/book/daniel9650/idb-phase-1/details'>Technical Report</a>
            </p>
            <p>
            <a href='https://www.gitbook.com/book/daniel9650/poptopic-api-documentation/details'>PopTopic API</a>
            </p>
            <br></br>
            <h4 className='about-sub'>Data</h4>
            <p>
               Our data concerning movies is scraped from The Movie Database
               using their API.
            </p>
            <p>
               Our data concerning music is found using the Spotify API and the
               AudioSparx API.
            </p>
            <p>
               Our data concerning books is found using the Google Books API.
            </p>
            <h4 className='about-sub'>Tools</h4>
            <Row>
               <Col>
                  <a href='https://www.python.org/'>
                     <img className='about-logo center-block' src={python}/>
                  </a>
               </Col>
               <Col>
                  <a href='https://github.com/'>
                     <img className='about-logo center-block' src={github}/>
                  </a>
               </Col>
               <Col>
                  <a href='https://aws.amazon.com/'>
                     <img className='about-logo center-block' src={aws}/>
                  </a>
               </Col>
               <Col>
                  <a href='https://www.docker.com/'>
                     <img className='about-logo center-block' src={docker}/>
                  </a>
               </Col>
               <Col>
                  <a href='https://getbootstrap.com/'>
                     <img className='about-logo center-block' src={bootstrap}/>
                  </a>
               </Col>
               <Col>
                  <a href='https://reactjs.org/'>
                     <img className='about-logo center-block' src={react}/>
                  </a>
               </Col>
            </Row>

         </Container>
         </div>
      );

   }

}

export default About;
