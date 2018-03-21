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
   var id = "/" + props.type + "/" + props.id;

      return (
         <a href={id}>
            <Card>
               <CardImg top src={image} />
               <CardBody>
                  <CardTitle>{title}</CardTitle>
               </CardBody>
            </Card>
         </a>
      );

}

export default CardMod;
