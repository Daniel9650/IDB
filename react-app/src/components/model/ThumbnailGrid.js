import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';
import Thumbnail from './Thumbnail.js';


class ThumbnailGrid extends Component {

   constructor(props) {
      super(props);
      this.createThumbnail = this.createThumbnail.bind(this);
      this.createThumbnails = this.createThumbnails.bind(this);
   }
   createThumbnail(instance) {
      var name = "";
      var id = "";
      if (this.props.type === "Movies") {
         name= instance.movie_name;
         id= instance.movie_id;
      }
      else if (this.props.type === "Music") {
         name= instance.music_name;
         id= instance.music_id;
      }
      else if (this.props.type === "Books") {
         name= instance.book_name;
         id= instance.book_id;
      }
      else {
         name= instance.topic_name;
         id= instance.topic_id;
      }
      
      return <Thumbnail
         image={instance.poster_url}
         title={name}
         topics={instance.topics}
         id= {id}
         />;
   }

   createThumbnails(instances) {
      return instances.map(this.createThumbnail);
   }

   render(props) {
      return (
         <Container>
            <Row>

               {this.createThumbnails(this.props.instances)}

            </Row>
         </Container>
      );
   }
}

export default ThumbnailGrid;
