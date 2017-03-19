import 'whatwg-fetch';

export const FETCH_RESERVATIONS_REQUEST = "FETCH_RESERVATIONS_REQUEST";
export const FETCH_RESERVATIONS_SUCCESS = "FETCH_RESERVATIONS_SUCCESS";
export const FETCH_RESERVATIONS_FAILURE = "FETCH_RESERVATIONS_FAILURE";
export const NEW_RESERVATION_REQUEST = "NEW_RESERVATION_REQUEST";
export const NEW_RESERVATION_SUCCESS = "NEW_RESERVATION_SUCCESS";
export const NEW_RESERVATION_FAILURE = "NEW_RESERVATION_FAILURE";
export const DISPLAY_NEW_RESERVATION = "DISPLAY_NEW_RESERVATION";
export const RESET_DISPLAY = "RESET_DISPLAY";


function requestReservations() {
  return {
    type: FETCH_RESERVATIONS_REQUEST
  }
}

function successReservations(json) {
  return {
    type: FETCH_RESERVATIONS_SUCCESS,
    reservations: json
  }
}

function failureReservations(error) {
  return {
    type: FETCH_RESERVATIONS_FAILURE,
    error: error
  }
}

export function fetchReservations() {
  return function(dispatch) {
    dispatch(requestReservations());
    return (
      fetch('http://127.0.0.1:8000/api/resas/')
      .then(response => response.json())
      .then(json => dispatch(successReservations(json)))
      .catch(error => dispatch(failureReservations(error)))
    );
  }
}


function requestNewReservation(title, start, end) {
  return {
    type: NEW_RESERVATION_REQUEST,
    title: title,
    start: start,
    end: end,
  }
}

function successNewReservation(json) {
  return {
    type: NEW_RESERVATION_SUCCESS,
    reservation: json
  }
}

function failureNewReservation(error) {
  return {
    type: NEW_RESERVATION_FAILURE,
    error: error
  }
}

export function newReservation(title, start, end) {
  return function(dispatch) {
    dispatch(requestNewReservation(title, start, end));
    const data = new FormData();
    data.append('title', title);
    data.append('start', start.toISOString());
    data.append('end', end.toISOString());
    data.append('owner', 'http://127.0.0.1:8000/api/users/1/');
    return (
      fetch('http://127.0.0.1:8000/api/resas/', {
        method: 'post',
        body: data
      })
      .then(response => response.json())
      .then(json => {
        dispatch(successNewReservation(json));
        dispatch(resetDisplay());
      })
      .catch(error => dispatch(failureNewReservation(error)))
    );
  }
}


export function displayReservation(reservation) {
  return function(dispatch) {
    dispatch({
      type: DISPLAY_NEW_RESERVATION,
      reservation: reservation
    });
  }
}

export function resetDisplay(reservation) {
  return function(dispatch) {
    dispatch({
      type: RESET_DISPLAY
    });
  }
}
