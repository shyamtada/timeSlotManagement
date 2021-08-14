/*
 * Slots Actions
 *
 */

import { toast } from "react-toastify";
import {
    FETCH_SLOT_DETAILS_LIST,
    FETCH_SLOT_DETAILS_LIST_SUCCESS,
    FETCH_SLOT_DETAILS_LIST_ERROR,
} from './constants';


/**
 * Fetches the slot detail list, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_SLOT_DETAILS_LIST
 */

export function fetchSlotDetailsList() {
    return {
        type: FETCH_SLOT_DETAILS_LIST,
    };
}

/**
 * Dispatched slot details list is loaded by the request saga
 *
 * An action object with a type of FETCH_SLOT_DETAILS_LIST_SUCCESS passing the payload
 */

export function fetchSlotDetailsListSuccess(payload) {
    console.log("Fetch Slot details list success called", payload);
    return {
        type: FETCH_SLOT_DETAILS_LIST_SUCCESS,
        payload
    };
}



/**
 * Dispatched when get request fails
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_SLOT_DETAILS_LIST_ERROR passing the error
 */
export function fetchSlotDetailsListError(error) {
    toast.error("Error occured while fetching slot details list", { autoClose: 4000 });
    console.log("Fetch slot details list error called", error);
    return {
        type: FETCH_SLOT_DETAILS_LIST_ERROR,
        error,
    };
}