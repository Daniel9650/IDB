import React, { Component } from 'react';
import { Card,
   CardImg,
   CardText,
   CardBody,
   CardTitle,
   CardSubtitle,
   Button } from 'reactstrap';
import topicDict from '../../data/topic_dictionary.json';

class CardMod extends Component {
   constructor(props){
      super(props);
      this.render = this.render.bind(this);
      this.textContent = this.textContent.bind(this);
      this.getTopicNames = this.getTopicNames.bind(this);
   }

   getTopicNames(topics){
      var names = [];
      topicDict.pairs.map(function(pair){
         for(let i = 0; i < topics.length; i ++){
            if(topics[i] === pair.key){
               names.push(pair.value);
               break;
            }
         }
      });
      return names.join(", ");
   }

   textContent() {
      switch (this.props.type) {
         case "Movies":
            var actors = this.props.actors.join(", ");
            return (
               <div>
               <CardText>Topics: {this.getTopicNames(this.props.topics)}</CardText>
               <CardText>Release: {this.props.date}</CardText>
               <CardText>Acting: {actors}</CardText>
               <CardText>Directing: {this.props.director}</CardText>
               </div>
            );

         case "Books":
            var authors = this.props.authors.join(", ");
            return (
               <div>
               <CardText>Topics: {this.getTopicNames(this.props.topics)}</CardText>
               <CardText>Release: {this.props.date}</CardText>
               <CardText>Author: {authors}</CardText>
               </div>
            );

         case "Music":
            var artists = this.props.artists.join(", ");
            return (
               <div>
               <CardText>Topics: {this.getTopicNames(this.props.topics)}</CardText>
               <CardText>Release: {this.props.date}</CardText>
               <CardText>Artists: {artists}</CardText>
               <CardText>Album: {this.props.album}</CardText>
               </div>
            );

         case "Topics":
            return null;

      }
   }

   render() {

      var url_model = "/" + this.props.type.toLowerCase() + "/" + this.props.id;
      var name = "card" + this.props.number;

      return (
         <a name={name} href={url_model}>
            <Card>
               <CardImg top src={this.props.image} />
               <CardBody>
                  <CardTitle>{this.props.title}</CardTitle>
                  {this.textContent()}
               </CardBody>
            </Card>
         </a>
      );
   }
}

export default CardMod;
