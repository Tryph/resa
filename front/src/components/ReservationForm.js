import React, { Component } from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';


moment.locale('fr');


class ReservationForm extends Component {
  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  handleTitleChange(event) {
    this.props.onTitleChange(event.target.value);
  }

  handleStartChange(moment) {
    this.props.onStartChange(moment.toDate());
  }

  handleEndChange(moment) {
    this.props.onEndChange(moment.toDate());
  }

  render() {
    return (
      <div className="resa-form">
        <div className="resa-title">
          <h2>Titre</h2>
          <input type="text" name="title" id="resaTitle"
                 value={this.props.title}
                 onChange={this.handleTitleChange}/>
        </div>
        <div className="resa-dates">
          <div className="resa-start">
            <h2>Début</h2>
            <Datetime value={this.props.start}
                      viewMode="time"
                      timeConstraints={{minutes: {step: 5}}}
                      inputProps={{id: 'resaStart', name: 'start', size: 10}}
                      onChange={this.handleStartChange}/>
          </div>
          <div className="resa-end">
            <h2>Fin</h2>
            <Datetime value={this.props.end}
                      viewMode="time"
                      timeConstraints={{minutes: {step: 5}}}
                      inputProps={{id: 'resaEnd', name: 'end', size: 10}}
                      onChange={this.handleEndChange}/>
          </div>
        </div>
      </div>
    );
  }
}


ReservationForm.PropTypes = {
  title: React.PropTypes.string,
  start: React.PropTypes.string,
  end: React.PropTypes.string,
  onTitleChange: React.PropTypes.func,
  onStartChange: React.PropTypes.func,
  onEndChange: React.PropTypes.func
};


export default ReservationForm;
