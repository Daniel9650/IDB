import React from 'react';
import {Col} from 'reactstrap';

let Thumbnail = function(props) {
   var image = props.image;
   var title = props.title;
   var topics = props.topics;

   return (
      <Col>
         <a href="#">
            <div className="model-grid-thumb">
               <img className="model-grid-img" src={image} />
               <h5>{title}</h5>
               <p>{topics}</p>
            </div>
         </a>
      </Col>
   );

}

export default Thumbnail;
