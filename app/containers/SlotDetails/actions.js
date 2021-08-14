/*
 * Slot Details Actions
 *
 */

import { toast } from "react-toastify";
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


/**
 * Fetches the slot detail, this action starts the request saga
 *
 * @return {object} An action object with a type of FETCH_SLOT_DETAILS
 */

export function fetchSlotDetails(payload) {
    return {
        type: FETCH_SLOT_DETAILS,
        payload
    };
}

/**
 * Dispatched slot details is loaded by the request saga
 *
 * An action object with a type of FETCH_SLOT_DETAILS_SUCCESS passing the payload
 */

export function fetchSlotDetailsSuccess(payload) {
    console.log("Fetch Slot details success called", payload);
    return {
        type: FETCH_SLOT_DETAILS_SUCCESS,
        payload
    };
}



/**
 * Dispatched when get request fails
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of FETCH_SLOT_DETAILS_ERROR passing the error
 */
export function fetchSlotDetailsError(error) {
    toast.error("Error occured while fetching slot details", { autoClose: 4000 });
    console.log("Fetch slot details error called", error);
    return {
        type: FETCH_SLOT_DETAILS_ERROR,
        error,
    };
}

/**
 * add the slot detail, this action starts the request saga
 *
 * @return {object} An action object with a type of ADD_SLOT_DETAILS
 */

 export function addSlotDetails(payload) {
    return {
        type: ADD_SLOT_DETAILS,
        payload
    };
}

/**
 * Dispatched add slot details response is loaded by the request saga
 *
 * An action object with a type of ADD_SLOT_DETAILS_SUCCESS passing the payload
 */

export function addSlotDetailsSuccess(payload) {
    console.log("add Slot details success called", payload);
    return {
        type: ADD_SLOT_DETAILS_SUCCESS,
        payload
    };
}



/**
 * Dispatched when get request fails
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of ADD_SLOT_DETAILS_ERROR passing the error
 */
export function addSlotDetailsError(error) {
    toast.error("Error occured while adding slot details", { autoClose: 4000 });
    console.log("Add slot details error called", error);
    return {
        type: ADD_SLOT_DETAILS_ERROR,
        error,
    };
}

/**
 * add the slot detail, this action starts the request saga
 *
 * @return {object} An action object with a type of UPDATE_SLOT_DETAILS
 */

 export function updateSlotDetails(payload) {
    return {
        type: UPDATE_SLOT_DETAILS,
        payload
    };
}

/**
 * Dispatched update slot details response is loaded by the request saga
 *
 * An action object with a type of UPDATE_SLOT_DETAILS_SUCCESS passing the payload
 */

export function updateSlotDetailsSuccess(payload) {
    console.log("update Slot details success called", payload);
    return {
        type: UPDATE_SLOT_DETAILS_SUCCESS,
        payload
    };
}



/**
 * Dispatched when get request fails
 * @param  {object} error The error
 *
 * @return {object} An action object with a type of UPDATE_SLOT_DETAILS_ERROR passing the error
 */
export function updateSlotDetailsError(error) {
    toast.error("Error occured while updating slot details", { autoClose: 4000 });
    console.log("Update slot details error called", error);
    return {
        type: UPDATE_SLOT_DETAILS_ERROR,
        error,
    };
}

export function clearSlotDetails(){
    return{
        type: CLEAR_SLOT_DETAILS
    }
}