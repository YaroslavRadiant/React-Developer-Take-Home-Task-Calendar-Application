export const ADD_NEW_EVENT = 'ADD_NEW_EVENT'
export const EDIT_EVENT = 'EDIT_EVENT'
export const DELETE_EVENT = 'DELETE_EVENT'

export const addNewEvent = (payload) => {
  return {type: ADD_NEW_EVENT, payload}
}

export const editEvent = (payload) => {
  return {type: EDIT_EVENT, payload}
}

export const deleteEvent = (payload) => {
  return {type: DELETE_EVENT,payload}
}