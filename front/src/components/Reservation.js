import React, { Component } from 'react';
import moment from 'moment';
import Datetime from 'react-datetime';


moment.locale('fr');


class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.data.title,
      start: this.props.data.start,
      end: this.props.data.end
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleTitleChange(event) {
    this.setState({
      title: event.target.value
    });
  }

  handleStartChange(moment) {
    this.setState({
      start: moment.toDate()
    });
  }

  handleEndChange(moment) {
    this.setState({
      end: moment.toDate()
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.title, this.state.start, this.state.end,
                        this.props.data.owner);
  }

  handleCancel(event) {
    event.preventDefault();
    this.props.onCancel();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="resa-form">
        <div className="resa-title">
          <h2>Titre</h2>
          <input type="text" name="title" id="resaTitle"
                 value={this.state.title}
                 onChange={this.handleTitleChange}/>
        </div>
        <div className="resa-dates">
          <div className="resa-start">
            <h2>Début</h2>
            {/*<input type="text" name="start" id="resaStart"*/}
                   {/*value={moment(this.state.start).format()}*/}
                   {/*onChange={this.handleStartChange}/>*/}
            <Datetime value={this.state.start}
                      viewMode="time"
                      timeConstraints={{minutes: {step: 5}}}
                      inputProps={{id: 'resaStart', name: 'start', size: 10}}
                      onChange={this.handleStartChange}/>
          </div>
          <div className="resa-end">
            <h2>Fin</h2>
            {/*<input type="text" name="end" id="resaEnd"*/}
                   {/*value={moment(this.state.end).format()}*/}
                   {/*onChange={this.handleEndChange}/>*/}
            <Datetime value={this.state.end}
                      viewMode="time"
                      timeConstraints={{minutes: {step: 5}}}
                      inputProps={{id: 'resaEnd', name: 'end', size: 10}}
                      onChange={this.handleEndChange}/>
          </div>
        </div>
        <div className="resa-buttons">
          <button className="reserve-btn">Réserver</button>
          <button className="cancel-btn" onClick={this.handleCancel}>Annuler</button>
        </div>
      </form>
    );
  }
}


Reservation.PropTypes = {
  data: React.PropTypes.object.isRequired,
  onSubmit: React.PropTypes.func,
  onCancel: React.PropTypes.func
};


export default Reservation;
