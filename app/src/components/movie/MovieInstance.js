import React, { Component } from 'react';
import data from '../../data/mock_movie.json';
import book_data from '../../data/mock_book.json';
import song_data from '../../data/mock_song.json';
import {
  Container,
  Jumbotron,
  Button,
  Row,
  Card,
  CardImg,
  CardTitle,
  CardText,
  CardDeck,
 CardSubtitle,
 CardBody} from 'reactstrap';



class MovieInstance extends Component {
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

      //Todo: fetch related movie json file.
      var movie_id = this.props.id;

      //get movie instance data
      var name = data.movie_name;
      var video = "https://www.youtube.com/embed/"+data.trailer_url+"?origin=http://poptopic.org";
      var desc = data.description;
      var date = data.release_date;
      var tronbg = { backgroundImage: "url("+data.poster_url+")"};
      var bookCards = [];
      var songCards = [];
      var topics = [];
      var first = true;

      //create a tag object for each topic in movie instance
      for(var topic in data.topics){
        if(!first)
          topics.push(", ");
        topics.push(<a href="/topics/topic">topic</a>);
        first = false;
      }

      //Todo: fetch related book json files.
      for(var book in data.similar_books){
        var book_json = book_data; //temporary
        bookCards.push(
        <Card>
          <CardImg top width="100%" src={book_json.poster_url} alt="Card image cap" />
          <CardBody>
            <CardTitle>{book_json.book_name}</CardTitle>
            <CardSubtitle>{book_json.author}, {book_json.release_date}</CardSubtitle>
            <CardText>{book_json.description}</CardText>
            <Button>View</Button>
          </CardBody>
        </Card>
        );
      }

      //Todo: fetch related book json files.
      for(var song in data.similar_songs){
        var song_json = song_data; //temporary
        songCards.push(
        <Card>
          <CardImg top width="100%" src={song_json.poster_url} alt="Card image cap" />
          <CardBody>
            <CardTitle>{song_json.music_name}</CardTitle>
            <CardSubtitle>{song_json.artists}, {song_json.release_date}</CardSubtitle>
            <CardText>{song_json.album}</CardText>
            <Button>View</Button>
          </CardBody>
        </Card>
        );
      }

      return (
         <div className="spacing-div">
            <Container>
               <h1 className="general-title">{name}</h1>
               <Row>
                  <div className="col-sm text-right">
                     <div className="youtube-holder">
                        <iframe className="youtube-player" type="text/html" width="100%" height="auto" src={video} frameBorder="0"/>
                     </div>
                  </div>
                  <div className="col-sm text-left">
                     <h6>Movie Description</h6>
                     <p>{ desc }</p>
                     <h6>Release Date</h6>
                     <p>{ date }</p>
                  </div>
               </Row>
               <hr className="my-4" />
               <h6>Topics: <small className="text-muted"> {topics} </small> </h6>
            </Container>
            <Container>
               <h4>Related Music</h4>
               <CardDeck>
                  {songCards}
               </CardDeck>
               <h4>Related Books</h4>
               <CardDeck>
                  {bookCards}
               </CardDeck>
            </Container>
         </div>
      );
   }

}

export default MovieInstance;
