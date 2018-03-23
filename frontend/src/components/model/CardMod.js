import React from 'react';
import { Card,
   CardImg,
   CardText,
   CardBody,
   CardTitle,
   CardSubtitle,
   Button } from 'reactstrap';

let CardMod = function(props) {
   var image = props.image;
   var title = props.title;

   var name = "card" + props.number;
   var id =  props.id;

   if(props.type != "Topics") {
      var topics = props.topics.join(", ");
      return (
         <a name={name} href={id}>
            <Card>
               <CardImg top src={image} />
               <CardBody>
                  <CardTitle>{title}</CardTitle>
               </CardBody>
            </Card>
         </a>
      );
   }
   else {
      return (
         <a name={name} href={props.id}>
            <Card>
               <CardImg top src={image} />
               <CardBody>
                  <CardTitle>{title}</CardTitle>
               </CardBody>
            </Card>
         </a>
      );
   }
}

export default CardMod;
