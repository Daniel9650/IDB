import React, { Component } from 'react';
import NotFound from '../global/NotFound.js';
import RelatedGrid from './RelatedGrid.js';
import APIError from '../global/APIError.js';
import Loading from '../global/Loading.js';
import $ from "jquery";
import { Container } from 'reactstrap';



class TopicInstance extends Component {
	constructor(props) {
    	super(props);
    	this.toggle = this.toggle.bind(this);
      this.state = {
      		isOpen: false,
          error: null,
          isLoaded: false,
          data: [],
          load_attempts: 0
    	};
      this.request_data = this.request_data.bind(this);
  	}
  toggle() {
    	this.setState({
      	isOpen: !this.state.isOpen
    	});
  }
  componentDidMount() {
     this.request_data(5);
  }

  request_data(max_attempts){
    const { id } = this.props.match.params;
     $.ajax({
        url: "http://api.poptopic.org/topics/"+id,
        method: "GET",
        success: (data, textStatus, jqXHR)=>{
          console.log("success");
          this.setState({
            isLoaded: true,
            data: data
          });
        },
        error: (jqXHR, textStatus, errorThrown)=>{
          console.log("in error" + max_attempts);
          if(this.state.load_attempts >= max_attempts){
            this.setState({
              isLoaded: true,
              error: errorThrown
            });
          }
          else{
            this.setState({load_attempts: this.state.load_attempts + 1});
            this.request_data(max_attempts);
          }
        },
        timeout: 1500
      });
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
            <APIError/>
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
         var wikiLink = "https://en.wikipedia.org/wiki/" + data.topic_name;

         return (
            <div className="spacing-div-instance">

               <Container>
                  <h1 name="topic-instance-name" className="general-title">{data.topic_name}</h1>
                  <hr className="divider"/>
                  <img className="topic-poster" alt="topic poster" src={data.poster_url} />
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
