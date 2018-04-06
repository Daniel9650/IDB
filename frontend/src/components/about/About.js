import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import LogoGrid from './LogoGrid.js'
import BioGrid from './BioGrid.js';
import NotFound from '../global/NotFound.js';
import Loading from '../global/Loading.js';
import APIError from '../global/APIError.js';

class About extends Component {
   constructor(props) {
    	super(props);
    	this.toggle = this.toggle.bind(this);
      this.state = {
      		isOpen: false,
          error: null,
          isLoaded: false,
          data: []
    	};
  	}
  	toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  	}

   componentDidMount() {
     fetch("http://api.poptopic.org/git_info")
     .then(res => res.json())
     .then(
      (result) => {
         this.setState({
           isLoaded: true,
           data: result
         });
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
         this.setState({
           isLoaded: true,
           error
         });
      }
     )
   }

   render () {
      const { error, isLoaded, data } = this.state;

      if (error) {
        const status = error.response ? error.response.status : 500
        if(status === 404){
          return <NotFound />;
        }
        else{
          return(
            <Container className='spacing-div'>
            <APIError/>
            </Container>
            );
        }
      }
      else if (!isLoaded) {
        return (
          <Container className='spacing-div'>
          <Loading/>
          </Container>
          );
      }
      else {
      return (
         <Container className='spacing-div'>
            <h1 name="about-concept" className='about-title'>Our Concept</h1>
            <hr className='divider'/>
            <p className='about-text'>
               For our project, we decided to make a website that categorizes books, movies, and music by topic/subject to show related media and correlations between popular media and popular topics. The media makes up a large part of people's lives now and provides a source of entertainment for many of us, no matter how old we are, so we thought it would be interesting to have a way for people to find new books, music, and movies that are currently popular.
            </p>
            <p>
               It can be used for market research when creating a song/movie/book to see if a topic has been covered in a medium, or to see if a topic is trendy. The use of this site as a tool for market research elevates it to a potentially very ludicrous endeavor, since the information gathered and organized into this online database can be used to determine marketing trends and popular topics, which would be invaluable to media creators who want to produce content which will resonate most heavily with people. Users can find different kinds of media based on topics they are interested in. Topics have a number of media links to show how prominent a topic/subject is in media, and possibly in society. For example, a user who is interested in food can look under the topic of food on our Topics page and find different books, songs, and movies about food. The user can then be inspired to look into one of these types of media and find something that would interest them.
            </p>
            <p>
               This online database continuously gathers information from various sources on the internet, and the relationships made between these data points are not immediately obvious to most, which is why this site serves a distinct purpose of compiling data on various media outlets, which may initially seem loosely related at best from an outside perspective, but may actually share many similar characteristics, and may even contribute to identifying discernable patterns on currently popular topics across said media outlets. This aggregation of data could be useful for statistical analysis and marketing research, but, as mentioned briefly above, is also intended to be a platform for discovery, in which individuals are able to find music, films, or books which deal with topics they are interested in, and one which makes more clear the connections between these media outlets.
            </p>
            <br></br>
            <h1 className='about-title'>Meet Our Team: Double Daniel Inc.</h1>
            <hr className='divider'/>
            <BioGrid
               data={data}
            />
            <br></br>
            <h1 className='about-title'>Implementation</h1>
            <hr className='divider'/>
               <h4 className='about-sub'>Statistics</h4>
               <p>Total Number of Commits: {data.total_commits}</p>
               <p>Total Number of Issues: {data.total_issues}</p>
               <p>Total Number of Unit Tests: 50</p>
               <h4 className='about-sub'>Documentation</h4>
               <p>
                  <a name="repo-link" href='https://github.com/Daniel9650/idb'>Github Repository</a>
               </p>
               <p>
                  <a name="tech-report-link" href='https://www.gitbook.com/book/daniel9650/idb-phase-1/details'>Technical Report</a>
               </p>
               <p>
                  <a name="api-link" href='https://www.gitbook.com/book/daniel9650/poptopic-api-documentation/details'>PopTopic API</a>
               </p>

               <h4 className="about-sub">Data</h4>
               <p>
                  The information in poptopic.org comes from four different APIs:
               </p>
               <p>
                  <a href="https://developers.themoviedb.org/3/getting-started/introduction" >
                  MovieDb
                  </a>
               </p>
               <p>
                  <a href="https://developers.google.com/books/">
                  Google Books
                  </a>
               </p>
               <p>
                  <a href="https://developer.spotify.com/web-api/">
                  Spotify
                  </a>
               </p>
               <p>
                  <a href="https://developers.google.com/youtube/">
                  Youtube
                  </a>
               </p>
               <p>
                  We get topic names and movies from MovieDb and then we query Google Books and Spotify for books and songs respectively with that topic. Then, we use the Youtube API to find the trailer for each movie, and the video for each song.
               </p>
               <h4 className="about-sub">Tools</h4>
               <LogoGrid />

         </Container>
      );

   }
}

}

export default About;
