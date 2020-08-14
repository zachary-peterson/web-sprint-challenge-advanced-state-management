import axios from "axios";

export const FETCHING_SMURFS_START = "FETCHING_SMURFS_START";
export const FETCH_SMURFS_SUCCESS = "FETCH_SMURFS_SUCCESS";

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
    })
};


const thunk = (store) => (next) => (action) => {
    if (typeof action === "object") {
      next(action);
    } else if (typeof action === "function") {
      action(store.dispatch);
    }
  };