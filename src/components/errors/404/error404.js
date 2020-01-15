import React from 'react';
import { Link } from 'react-router-dom';
import { routesMap } from '~/router';

class E404 extends React.Component{
   back = () => {
      this.props.history.go(-1);
   }

   render(){
      return <div>
         <h1>Error 404</h1>
         <p>Page not found!</p>
         <p>Try start from <Link to={routesMap.cart}> homepage</Link>
         </p>
         <p>
            Try go <span onClick={this.back}>back</span>!
         </p>
      </div>
   }
}

export default E404;