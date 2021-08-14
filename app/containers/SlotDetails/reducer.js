/*
 * Slot Details Reducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import {
    FETCH_SLOT_DETAILS,
    FETCH_SLOT_DETAILS_SUCCESS,
    FETCH_SLOT_DETAILS_ERROR,

    ADD_SLOT_DETAILS,
    ADD_SLOT_DETAILS_SUCCESS,
    ADD_SLOT_DETAILS_ERROR,

    UPDATE_SLOT_DETAILS,
    UPDATE_SLOT_DETAILS_SUCCESS,
    UPDATE_SLOT_DETAILS_ERROR,

    CLEAR_SLOT_DETAILS
} from './constants';


// The initial state of the App
export const initialState = {
    loading: false,
    successful: false,
    error: false,
    slotDetails: false,
    addSlotResponse: false,
    updateSlotResponse: false
};

/* eslint-disable default-case, no-param-reassign */
const SlotDetailsReducer = (state = initialState, action) =>
    produce(state, draft => {
        switch (action.type) {
            case FETCH_SLOT_DETAILS:
                draft.loading = true;
                break;

            case FETCH_SLOT_DETAILS_SUCCESS:
                draft.successful = true;
                draft.slotDetails = action.payload;
                draft.loading = false;
                break;

            case FETCH_SLOT_DETAILS_ERROR:
                draft.error = action.error;
                draft.successful = false;
                draft.loading = false;
                break;

            case ADD_SLOT_DETAILS:
                draft.loading = true;
                break;

            case ADD_SLOT_DETAILS_SUCCESS:
                draft.successful = true;
                draft.addSlotResponse = action.payload;
                draft.loading = false;
                break;

            case ADD_SLOT_DETAILS_ERROR:
                draft.error = action.error;
                draft.successful = false;
                draft.loading = false;
                break;

            case UPDATE_SLOT_DETAILS:
                draft.loading = true;
                break;

            case UPDATE_SLOT_DETAILS_SUCCESS:
                draft.successful = true;
                draft.updateSlotResponse = action.payload;
                draft.loading = false;
                break;

            case UPDATE_SLOT_DETAILS_ERROR:
                draft.error = action.error;
                draft.successful = false;
                draft.loading = false;
                break;
            
            case CLEAR_SLOT_DETAILS:
                draft.slotDetails = false;
        }
    });

export default SlotDetailsReducer;