import axios from 'axios'
import * as actionTypes from './actionTypes'
import { setCurrentUser, getErrors } from './index'

//////////////////////////////////////
//PROFILE ROUTES

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile')
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})))
}

// profile loading
export const setProfileLoading = () => ({
  type: actionTypes.PROFILE_LOADING
})

// get user profile
export const getProfile = profile => ({
  type: actionTypes.GET_PROFILE,
  profile
})

// clears profile
export const clearCurrentProfile = () => ({
  type: actionTypes.CLEAR_CURRENT_PROFILE
})

// create profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(getErrors(err.response.data)))
}

// delete user account
export const deleteProfile = () => dispatch => {
  // set curent user to null by passing token as empty object
  axios
    .delete('/api/profile')
    .then(res => dispatch(setCurrentUser({})))
    .catch(err => dispatch(getErrors(err.response.data)))
}


////////////////////////////////
//EXPERIENCE ROUTES

// adds experience to user profile
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(getErrors(err.response.data)))
}

// delete Experience
export const deleteExperience = exp_id => dispatch => {
  axios.delete(`/api/profile/experience/${exp_id}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => getErrors(err.response.data))
} 

////////////////////////////////
// EDUCATION ROUTES

// adds education to user profile
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err => dispatch(getErrors(err.response.data)))
}

// delete Education
export const deleteEducation = edu_id => dispatch => {
  axios.delete(`/api/profile/education/${edu_id}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => getErrors(err.response.data))
}

// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios.delete('/api/profile/all')
    .then(res => dispatch({
      type: actionTypes.GET_PROFILES
    }))
    .catch(err => getErrors(err.response.data))
}