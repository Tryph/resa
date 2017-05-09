import React, { Component } from 'react';
import { SkyLightStateless } from 'react-skylight';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import ReservationModalContainer from '../containers/ReservationModalContainer';


moment.locale('fr');
BigCalendar.momentLocalizer(moment);


function Event({ event, user }) {
  return (
    <span>
      <strong>{event.title}</strong>
      (<em>{event.owner}</em>)
    </span>
  );
}


class Calendar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      start: "",
      end: ""
    };

    this.handleSlotSelection = this.handleSlotSelection.bind(this);
    this.handleEventSelection = this.handleEventSelection.bind(this);
    this.handleResaSubmission = this.handleResaSubmission.bind(this);
  }

  componentWillMount() {
    this.props.onDataRequest();
  }

  handleSlotSelection(slotInfo) {
    let start = slotInfo.slots[0];
    let end = slotInfo.slots.slice(-1)[0];
    let title = `${moment(start).format()} - ${moment(end).format()}`;

    this.props.onNewDetailDisplay({
      title: title, start: start, end: end
    });
  }

  handleEventSelection(eventInfo) {
    console.log(eventInfo.title, eventInfo);
    this.props.onUpdateDetailDisplay(eventInfo);
  }

  handleResaSubmission(title, start, end) {
    if (this.props.user !== null) {
      this.props.onNewReservation(title, start, end, this.props.user.url);
    } else {
      alert("Vous devez être identifié pour réserver la salle de réunion");
    }
  }

  render() {
    let reservationDetail = null;
    if (this.props.display) {
      reservationDetail = <ReservationModalContainer/>;
    }
    return(
      <div className="calendar">
        <BigCalendar
          selectable defaultView="week"
          events={this.props.reservations}
          onSelectEvent={this.handleEventSelection}
          onSelectSlot={this.handleSlotSelection}
          components={{
            event: Event
          }}
        />
        {reservationDetail}
      </div>
    );
  }
}


Calendar.propTypes = {
  reservations: React.PropTypes.arrayOf(React.PropTypes.object),
  display: React.PropTypes.object,
  user: React.PropTypes.object,
  onDataRequest: React.PropTypes.func.isRequired,
  onNewDetailDisplay: React.PropTypes.func.isRequired,
  onUpdateDetailDisplay: React.PropTypes.func.isRequired,
  onDetailReset: React.PropTypes.func.isRequired,
  onNewReservation: React.PropTypes.func.isRequired,
  onUpdateReservation: React.PropTypes.func.isRequired
  // onSlotSelected: React.PropTypes.func.isRequired
};


// Calendar.defaultProps = {
//   onSlotSelected: () => null
// };


export default Calendar;
