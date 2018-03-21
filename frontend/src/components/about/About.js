import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LogoGrid from './LogoGrid.js'
import BioGrid from './BioGrid.js';

class About extends Component {

   render () {
      return (
         <Container className='spacing-div'>
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
            <h1 className='about-title'>Meet Our Team: Double Daniel Inc.</h1>
            <hr className='divider'/>
            <BioGrid />
            <br></br>
            <h1 className='about-title'>Implementation</h1>
            <hr className='divider'/>
               <h4 className='about-sub'>Statistics</h4>
               <p>Total Number of Commits: </p>
               <p>Total Number of Issues: </p>
               <p>Total Number of Unit Tests: </p>
               <h4 className='about-sub'>Documentation</h4>
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
               <h4 className="about-sub">Data</h4>
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
               <h4 className="about-sub">Tools</h4>
               <LogoGrid />

         </Container>
      );

   }

}

export default About;
