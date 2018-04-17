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
     var Highlight = require('react-highlighter');
     var highlightStyle = {
       backgroundColor: "#359dba",
       color: "white",
       opacity: 0.75,
       fontWeight: "bold",
     };
      switch (this.props.type) {
         case "Movies":
            var actors = this.props.actors.join(", ");
            return (
               <div>
               <CardTitle>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.title}
                  </Highlight>
               </CardTitle>
               <CardText>
                  <span>Topics: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.getTopicNames(this.props.topics)}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Release: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.date}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Acting: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {actors}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Directing: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.director}
                  </Highlight>
                </CardText>
                {this.getDescription()}
               </div>
            );

         case "Books":
            var authors = this.props.authors.join(", ");
            return (
               <div>
               <CardTitle>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.title}
                  </Highlight>
               </CardTitle>
               <CardText>
                  <span>Topics: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.getTopicNames(this.props.topics)}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Release: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.date}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Author: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {authors}
                  </Highlight>
               </CardText>
               {this.getDescription()}

               </div>
            );

         case "Music":
            var artists = this.props.artists.join(", ");
            return (
               <div>
               <CardTitle>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.title}
                  </Highlight>
               </CardTitle>
               <CardText>
                  <span>Topics: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.getTopicNames(this.props.topics)}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Release: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.date}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Artists: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {artists}
                  </Highlight>
               </CardText>
               <CardText>
                  <span>Album: </span>
                  <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                  {this.props.album}
                  </Highlight>
               </CardText>
               </div>
            );

         case "Topics":
            return (
              <div>
              <CardTitle>
                <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
                {this.props.title}
                </Highlight>
              </CardTitle>
              <CardText>
                {this.props.relatedMedia} Media Entries
              </CardText>
              </div>
            );

      }
   }

   getDescription(){
     var Highlight = require('react-highlighter');
     var highlightStyle = {
       backgroundColor: "#359dba",
       color: "white",
       opacity: 0.75,
       fontWeight: "bold",
     };
     if(this.props.description != null){
       var desc = "";
       var index = this.props.description.indexOf(this.props.highlight);
       if(index < 0)
        index = this.props.description.indexOf(this.props.highlight.toLowerCase());
        
       if(index >= 0){

          var starting  = 0;
          if(index - 50 > 0){
            starting = index - 50;
            desc = desc + "...";
          }
          var ending = index + 50 ;

          if(ending > this.props.description.length){
            ending = this.props.description.length;
            desc = desc +this.props.description.slice(starting, ending);
          }
          else {
            desc = desc +this.props.description.slice(starting, ending) + "...";

          }
       }
       else{
         console.log(this.props.description.includes(this.props.highlight));
         desc = this.props.description.slice(0, 101) + "...";
       }
       return(
         <div>
         <CardText>
            <span>Description: </span>
            <Highlight matchStyle={highlightStyle}  search={this.props.highlight}>
            {desc}
            </Highlight>
         </CardText>
         </div>
       );
     }
     else {
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
                  {this.textContent()}
               </CardBody>
            </Card>
         </a>
      );
   }
}

export default CardMod;
