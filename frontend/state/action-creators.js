import * as types from './action-types'
import axios from 'axios'

export function inputChange({ id, value }) {
  return { type: types.INPUT_CHANGE, payload: { id, value } }
}

export function setMessage(message) {
  return { type: types.SET_INFO_MESSAGE, payload: message }
}

export function register({ username, password }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/auth/register', { username, password })
      .then(res => {
        dispatch(setMessage(res.data.message))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}

export function login({ username, password }) {
  return function (dispatch) {
    axios.post('http://localhost:9000/api/auth/login', { username, password })
      .then(res => {
        localStorage.setItem('token', res.data.token)
        dispatch(setMessage(res.data.message))
      })
      .catch(err => {
        const errToDisplay = err.response ? err.response.data.message : err.message
        dispatch(setMessage(errToDisplay))
      })
  }
}
