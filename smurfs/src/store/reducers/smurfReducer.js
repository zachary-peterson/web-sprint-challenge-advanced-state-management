import { FETCHING_SMURFS_START, FETCH_SMURFS_SUCCESS, POSTING_SMURFS_START, POST_SMURF_FAILURE } from '../actions'

const initialState = {
    smurfs: [],
    isLoading: false,
    error: ''
};

const POST_SMURF = 'ADD_NEW_SMURF'

export const smurfReducer = (state = initialState, action) => {
    switch(action.type){
        case FETCHING_SMURFS_START:
            return {
                ...state,
                isLoading: true,
                error: ""
            };
        case FETCH_SMURFS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                smurfs: action.payload
            };
        case POSTING_SMURFS_START:
            return {
                ...state,
                isLoading: true
            };
        case POST_SMURF_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        default:
            return state;
    }
}