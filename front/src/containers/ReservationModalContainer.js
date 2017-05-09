import { connect } from 'react-redux';

import { newReservation, removeReservation, updateReservation,
         resetDisplay } from '../actions';
import ReservationModal from '../components/ReservationModal';


function stateToProps(state, ownProps) {
  return {
    data: state.display.reservation,
    type: state.display.action,
    ...ownProps
  };
}

function dispatchToProps(dispatch, ownProps) {
  return {
    onCancel: () => dispatch(resetDisplay()),
    onCreate: (title, start, end) => dispatch(newReservation(title, start, end)),
    onUpdate: (id, title, start, end) => dispatch(updateReservation(id, title, start, end)),
    onRemove: (id) => dispatch(removeReservation(id)),
    ...ownProps
  };
}

export default connect(stateToProps, dispatchToProps)(ReservationModal);
