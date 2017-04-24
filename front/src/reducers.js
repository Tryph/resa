import { FETCH_RESERVATIONS_SUCCESS, DISPLAY_NEW_RESERVATION,
         NEW_RESERVATION_SUCCESS, RESET_DISPLAY,
         LOGIN_SUCCESS } from './actions';

export default function(state={reservations: []}, action) {
  switch(action.type) {
    case FETCH_RESERVATIONS_SUCCESS:
      return Object.assign({}, state, {
        reservations: action.reservations.map(resa => Object.assign({}, resa, {
          start: new Date(resa.start),
          end: new Date(resa.end)
        }))
      });

    case NEW_RESERVATION_SUCCESS:
      return Object.assign({}, state, {
        reservations: [...state.reservations, {
          title: action.reservation.title,
          start: new Date(action.reservation.start),
          end: new Date(action.reservation.end),
          owner: action.reservation.owner
        }]
      });

    case DISPLAY_NEW_RESERVATION:
      return Object.assign({}, state, {
        display: {
          action: "new",
          reservation: action.reservation
        }
      });

    case RESET_DISPLAY:
      return Object.assign({}, state, {
        display: null
      });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {user: action.user});

    default:
      return state;
  }
}
