import { connect } from 'react-redux';

import { displayReservation, fetchReservations, newReservation,
         resetDisplay } from '../actions';
import Calendar from '../components/Calendar';


function stateToProps(state, ownProps) {
  return {
    reservations: state.reservations,
    display: state.display,
    ...ownProps
  };
}

function dispatchToProps(dispatch, ownProps) {
  // console.log(dispatch, ownProps);
  return {
    onDataRequest: () => dispatch(fetchReservations()),
    onDetailDisplay: (resa) => dispatch(displayReservation(resa)),
    onDetailReset: () => dispatch(resetDisplay()),
    onNewReservation: (title, start, end) => dispatch(newReservation(title, start, end))
  };
}

export default connect(stateToProps, dispatchToProps)(Calendar);
