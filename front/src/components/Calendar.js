import React, { Component } from 'react';
import { SkyLightStateless } from 'react-skylight';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

import Reservation from './Reservation';


moment.locale('fr');
BigCalendar.momentLocalizer(moment);


class Calendar extends Component {
  constructor(props) {
    super(props);

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
    console.log("Nouvelle réservation:", slotInfo);
    // console.log(moment.format({start, end}));

    this.props.onDetailDisplay({
      title: title, start: start, end: end
    });
  }

  handleEventSelection(eventInfo) {
    console.log(eventInfo.title, eventInfo);
    this.props.onDetailDisplay(eventInfo);
  }

  handleResaSubmission(title, start, end) {
    console.log("Reservation submitted", title, start, end);
    this.props.onNewReservation(title, start, end);
  }

  render() {
    let reservationDetail = null;
    if (this.props.display) {
      reservationDetail = (
        <SkyLightStateless
          title={this.props.display.action === "new"
                 ? 'Nouvelle réservation'
                 : this.props.display.reservation.title}
          onCloseClicked={this.props.onDetailReset}
          isVisible
        >
          <Reservation data={this.props.display.reservation}
                       onSubmit={this.handleResaSubmission}
                       onCancel={this.props.onDetailReset}/>
        </SkyLightStateless>
      );
    }
    return(
      <div className="calendar">
        <BigCalendar
          selectable defaultView="week"
          events={this.props.reservations}
          onSelectEvent={this.handleEventSelection}
          onSelectSlot={this.handleSlotSelection}
        />
        {reservationDetail}
      </div>
    );
  }
}


Calendar.propTypes = {
  onDataRequest: React.PropTypes.func.isRequired,
  onDetailDisplay: React.PropTypes.func.isRequired,
  onDetailReset: React.PropTypes.func.isRequired,
  onNewReservation: React.PropTypes.func.isRequired
  // onSlotSelected: React.PropTypes.func.isRequired
};


// Calendar.defaultProps = {
//   onSlotSelected: () => null
// };


export default Calendar;
