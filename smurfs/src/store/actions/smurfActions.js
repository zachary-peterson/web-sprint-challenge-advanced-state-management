import axios from "axios";

export const FETCHING_SMURFS_START = "FETCHING_SMURFS_START";
export const FETCH_SMURFS_SUCCESS = "FETCH_SMURFS_SUCCESS";
export const POSTING_SMURFS_START = "POSTING_SMURFS_START";
export const POST_SMURF_FAILURE = "POST_SMURF_FAILURE"

const smurfsAPI = 'http://localhost:3333/smurfs';


export const fetchSmurfs = () => (dispatch) => {
    // dispatch FETCHING action
    console.log('Running')
    dispatch({ type: FETCHING_SMURFS_START });
    // make an axios call
    axios
    .get(smurfsAPI)
    .then(res => {
        console.log(res.data);
        dispatch({ type: FETCH_SMURFS_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.dir(err);
        dispatch({ type: POST_SMURF_FAILURE, payload: err})
    })
};

export const postSmurf = (copy) => (dispatch) => {

    console.log('Post Smurf is running');

    console.log(copy);

    dispatch({ type: POSTING_SMURFS_START})
    
    const copyOver = copy;

    axios
    .post(smurfsAPI, copy)
    .then(res => {
        console.log(res);
        dispatch({ type: FETCH_SMURFS_SUCCESS, payload: res.data})
    })
    .catch(err => {
        console.dir(err);
        dispatch({ type: POST_SMURF_FAILURE, payload: err})
    })
};

const thunk = (store) => (next) => (action) => {
    if (typeof action === "object") {
      next(action);
    } else if (typeof action === "function") {
      action(store.dispatch);
    }
  };