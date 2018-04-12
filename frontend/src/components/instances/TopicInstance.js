import React, { Component } from 'react';
import NotFound from '../global/NotFound.js';
import data from '../../data/mock_topic.json';
import RelatedGrid from './RelatedGrid.js';
import APIError from '../global/APIError.js';
import Loading from '../global/Loading.js';

import {
  Container,
  Jumbotron,
  Button,
  Row,
  Col,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
 CardSubtitle,
 CardBody} from 'reactstrap';



class TopicInstance extends Component {
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
     const { id } = this.props.match.params
     fetch("http://api.poptopic.org/topics/"+id)
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

      const {id} = this.props.match.params;
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
         var name = data.topic_name;
         var wikiLink = "https://en.wikipedia.org/wiki/" + data.topic_name;

         return (
            <div className="spacing-div">

               <Container>
                  <h1 name="topic-instance-name" className="general-title">{name}</h1>
                  <hr className="divider"/>
                  <img className="topic-poster" src={data.poster_url} />
                  <br/>
                  <br/>
                  <h6 className="instance-sub">Find on Wikipedia</h6>
                  <p>
                    <a href={wikiLink}>
                        {wikiLink}
                    </a>
                  </p>
                  <br />
                  <h6 className="instance-sub">Related Movies</h6>
                  <RelatedGrid
                     caller_type="topics"
                     request_type="Movies"
                     id={id}
                   />
                  <br/>
                  <h6 className="instance-sub">Related Music</h6>
                  <RelatedGrid
                     caller_type="topics"
                     request_type="Music"
                     id={id}
                  />
                  <br/>
                  <h6 className="instance-sub">Related Books</h6>
                  <RelatedGrid
                     caller_type="topics"
                     request_type="Books"
                     id={id}
                  />
            </Container>
            </div>
         );
      }
   }

}

export default TopicInstance;
