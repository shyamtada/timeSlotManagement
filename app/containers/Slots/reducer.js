/*
 * Slots Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
    FETCH_SLOT_DETAILS_LIST,
    FETCH_SLOT_DETAILS_LIST_SUCCESS,
    FETCH_SLOT_DETAILS_LIST_ERROR
} from './constants';


// The initial state of the App
export const initialState = {
    loading: false,
    successful: false,
    error: false,
    slotDetailsList: false
};

/* eslint-disable default-case, no-param-reassign */
const SlotsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case FETCH_SLOT_DETAILS_LIST:
                draft.loading = true;
                break;

            case FETCH_SLOT_DETAILS_LIST_SUCCESS:
                draft.successful = true;
                draft.slotDetailsList = action.payload;
                draft.loading = false;
                break;

            case FETCH_SLOT_DETAILS_LIST_ERROR:
                draft.error = action.error;
                draft.successful = false;
                draft.loading = false;
                break;
        }
    });

export default SlotsReducer;
