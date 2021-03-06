import 'whatwg-fetch';

import { getCookie } from './common/cookie';

export const FETCH_RESERVATIONS_REQUEST = "FETCH_RESERVATIONS_REQUEST";
export const FETCH_RESERVATIONS_SUCCESS = "FETCH_RESERVATIONS_SUCCESS";
export const FETCH_RESERVATIONS_FAILURE = "FETCH_RESERVATIONS_FAILURE";
export const NEW_RESERVATION_REQUEST = "NEW_RESERVATION_REQUEST";
export const NEW_RESERVATION_SUCCESS = "NEW_RESERVATION_SUCCESS";
export const NEW_RESERVATION_FAILURE = "NEW_RESERVATION_FAILURE";
export const UPDATE_RESERVATION_REQUEST = "UPDATE_RESERVATION_REQUEST";
export const UPDATE_RESERVATION_SUCCESS = "UPDATE_RESERVATION_SUCCESS";
export const UPDATE_RESERVATION_FAILURE = "UPDATE_RESERVATION_FAILURE";
export const REMOVE_RESERVATION_REQUEST = "REMOVE_RESERVATION_REQUEST";
export const REMOVE_RESERVATION_SUCCESS = "REMOVE_RESERVATION_SUCCESS";
export const REMOVE_RESERVATION_FAILURE = "REMOVE_RESERVATION_FAILURE";
export const DISPLAY_NEW_RESERVATION = "DISPLAY_NEW_RESERVATION";
export const DISPLAY_RESERVATION = "DISPLAY_RESERVATION";
export const RESET_DISPLAY = "RESET_DISPLAY";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";
export const GET_PROFILE_REQUEST = "GET_PROFILE_REQUEST";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAILURE = "GET_PROFILE_FAILURE";


export const API_ROOT = '/api/';
// export const API_ROOT = 'http://127.0.0.1:8000/api/';


function getHeadersObj() {
  const headers = new Headers();
  headers.append('X-CSRFToken', getCookie('csrftoken'));
  return headers
}


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
      fetch(`${API_ROOT}resa/resas/`, {
        headers: getHeadersObj(),
        method: 'get',
        credentials: 'same-origin'}
      )
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
    end: end
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
    return (
      fetch(`${API_ROOT}resa/resas/`, {
        headers: getHeadersObj(),
        method: 'post',
        body: data,
        credentials: 'same-origin'
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


function requestUpdateReservation(id, title, start, end) {
  return {
    type: UPDATE_RESERVATION_REQUEST,
    id: id,
    title: title,
    start: start,
    end: end
  }
}

function successUpdateReservation(json) {
  return {
    type: UPDATE_RESERVATION_SUCCESS,
    reservation: json
  }
}

function failureUpdateReservation(error) {
  return {
    type: UPDATE_RESERVATION_FAILURE,
    error: error
  }
}

export function updateReservation(id, title, start, end) {
  return function(dispatch) {
    dispatch(requestUpdateReservation(id, title, start, end));
    const data = new FormData();
    data.append('id', id);
    data.append('title', title);
    data.append('start', start.toISOString());
    data.append('end', end.toISOString());
    return (
      fetch(`${API_ROOT}resa/resas/${id}/`, {
        headers: getHeadersObj(),
        method: 'put',
        body: data,
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(json => {
        dispatch(successUpdateReservation(json));
        dispatch(resetDisplay());
      })
      .catch(error => dispatch(failureUpdateReservation(error)))
    );
  }
}


function requestRemoveReservation(id) {
  return {
    type: REMOVE_RESERVATION_REQUEST,
    id: id
  }
}

function successRemoveReservation(id) {
  return {
    type: REMOVE_RESERVATION_SUCCESS,
    reservation: {id: id}
  }
}

function failureRemoveReservation(error) {
  return {
    type: REMOVE_RESERVATION_FAILURE,
    error: error
  }
}

export function removeReservation(id) {
  return function(dispatch) {
    dispatch(requestRemoveReservation(id));
    const data = new FormData();
    data.append('id', id);
    return (
      fetch(`${API_ROOT}resa/resas/${id}/`, {
        headers: getHeadersObj(),
        method: 'delete',
        body: data,
        credentials: 'same-origin'
      })
      .then(response => {
        dispatch(successRemoveReservation(id));
        dispatch(resetDisplay());
      })
      .catch(error => dispatch(failureRemoveReservation(error)))
    );
  }
}


export function displayReservation(reservation) {
  return function(dispatch) {
    dispatch({
      type: DISPLAY_RESERVATION,
      reservation: reservation
    });
  }
}

export function displayNewReservation(reservation) {
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


function requestLogin(username, password) {
  return {
    type: LOGIN_REQUEST,
    username: username,
    password: password
  }
}

function successLogin(json) {
  return {
    type: LOGIN_SUCCESS,
    user: json
  }
}

function failureLogin(error) {
  return {
    type: LOGIN_FAILURE,
    error: error
  }
}

export function login(username, password) {
  return function(dispatch) {
    dispatch(requestLogin(username, password));
    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    return (
      fetch(`${API_ROOT}auth/login/`, {
        headers: getHeadersObj(),
        method: 'post',
        body: data,
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(json => {
        dispatch(successLogin(json));
      })
      .catch(error => dispatch(failureLogin(error)))
    );
  }
}


function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  }
}

function successLogout() {
  return {
    type: LOGOUT_SUCCESS,
    user: null
  }
}

function failureLogout(error) {
  return {
    type: LOGOUT_FAILURE,
    error: error
  }
}

export function logout() {
  return function(dispatch) {
    dispatch(requestLogout());
    return (
      fetch(`${API_ROOT}auth/logout/`, {
        headers: getHeadersObj(),
        method: 'post',
        credentials: 'same-origin'
      })
      .then(response => {
        dispatch(successLogout());
      })
      .catch(error => dispatch(failureLogout(error)))
    );
  }
}


function requestProfile() {
  return {
    type: GET_PROFILE_REQUEST
  }
}

function successProfile(json) {
  return {
    type: GET_PROFILE_SUCCESS,
    user: json
  }
}

function failureProfile(error) {
  return {
    type: GET_PROFILE_FAILURE,
    error: error
  }
}

export function getProfile() {
  return function(dispatch) {
    dispatch(requestProfile());
    return (
      fetch(`${API_ROOT}auth/profile/`, {
        headers: getHeadersObj(),
        method: 'get',
        credentials: 'same-origin'
      })
      .then(response => response.json())
      .then(json => {
        dispatch(successProfile(json));
      })
      .catch(error => dispatch(failureProfile(error)))
    );
  }
}
