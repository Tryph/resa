import React, { Component } from 'react';

import CalendarContainer from '../containers/CalendarContainer';


class Content extends Component {
  render() {
    return(
      <div className="content">
        <CalendarContainer/>
      </div>
    );
  }
}


export default Content;
