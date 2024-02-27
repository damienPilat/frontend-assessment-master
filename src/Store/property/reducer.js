import { createReducer } from '@reduxjs/toolkit';
import {
    getPropertiesResponse,
    getPoliciesResponse
} from './actions';


const initState = {
    properties: [],
    policies: []
};

const reducer = createReducer(initState, (builder) => {
  builder
    .addCase(getPropertiesResponse, (state, action) => {
        state.properties = action.payload;
    })
    .addCase(getPoliciesResponse, (state, action) => {
        state.policies = action.payload
    })
});

export default reducer;
