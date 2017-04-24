import { connect } from 'react-redux';

import { displayReservation, fetchReservations, newReservation,
         resetDisplay } from '../actions';
import Calendar from '../components/Calendar';


function stateToProps(state, ownProps) {
  return {
    reservations: state.reservations,
    display: state.display,
    user: state.user,
    ...ownProps
  };
}

function dispatchToProps(dispatch, ownProps) {
  // console.log(dispatch, ownProps);
  return {
    onDataRequest: () => dispatch(fetchReservations()),
    onDetailDisplay: (resa) => dispatch(displayReservation(resa)),
    onDetailReset: () => dispatch(resetDisplay()),
    onNewReservation: (title, start, end, owner) => dispatch(newReservation(title, start, end, owner))
  };
}

export default connect(stateToProps, dispatchToProps)(Calendar);
