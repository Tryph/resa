import { connect } from 'react-redux';

import { displayNewReservation, displayReservation, fetchReservations, newReservation,
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
    onNewDetailDisplay: (resa) => dispatch(displayNewReservation(resa)),
    onUpdateDetailDisplay: (resa) => dispatch(displayReservation(resa)),
    onDetailReset: () => dispatch(resetDisplay()),
    onNewReservation: (title, start, end, owner) => dispatch(newReservation(title, start, end, owner)),
    onUpdateReservation: (id, title, start, end, owner) => dispatch(newReservation(id, title, start, end, owner))
  };
}

export default connect(stateToProps, dispatchToProps)(Calendar);
