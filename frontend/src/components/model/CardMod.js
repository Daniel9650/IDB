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
   var topics = props.topics;
   var name = props.type + props.number;

   if(props.type != "Topics") {
      return (
         <a  name={name} href={props.id}>
            <Card>
               <CardImg top src={image} />
               <CardBody>
                  <CardTitle>{title}</CardTitle>
                  <CardSubtitle>{topics}</CardSubtitle>
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
