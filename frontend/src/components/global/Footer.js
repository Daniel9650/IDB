import React, { Component } from 'react';

class Footer extends Component {

   render(){
      return(
         <footer className="footer">
         <div className="container">
         <p className="float-right">
         <a href="#">Back to top</a>
         </p>
         <p>Copyright © 2018 Double Daniel, Inc.</p>
         <p>New to PopTopic? <a href="http://api.poptopic.org">Visit our API Documentation</a> or read our <a href="https://daniel9650.gitbooks.io/idb-phase-1/content/">technical report</a>.</p>
         </div>
         </footer>
      );
   }
}

export default Footer;
