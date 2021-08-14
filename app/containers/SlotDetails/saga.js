/**
 * Gets the repositories of the user from Github
 */
 import { put, all, call, takeLatest } from "redux-saga/effects";
 import { FETCH_SLOT_DETAILS, ADD_SLOT_DETAILS, UPDATE_SLOT_DETAILS } from './constants';
 import {
     fetchSlotDetailsSuccess,
     fetchSlotDetailsError,

     addSlotDetailsSuccess,
     addSlotDetailsError,

     updateSlotDetailsSuccess,
     updateSlotDetailsError
 } from './actions';
 
 import request from '../../utils/request';
 import { browserRedirect } from '../../helpers/helpers';
 import { urls } from '../../config/urls';
 
 //Slot Details API call
 function slotDetailsCall(payload) {
         return request('GET', urls.SLOT_DETAILS_URL + '/' + payload.slot);
     }
 //Add Slot Details API call
 function addSlotDetailsCall(payload) {
    return request('POST', urls.ADD_SLOT_DETAILS_URL, payload);
}
 //Update Slot Details API call
 function updateSlotDetailsCall(payload) {
    return request('PUT', urls.UPDATE_SLOT_DETAILS_URL + '/' + payload.slot, payload);
}
 export function* slotDetailsWorker(payload) {
     try {
         let response = yield call(slotDetailsCall, payload.payload);
         console.log("slot details saga response", response);
         yield put(fetchSlotDetailsSuccess(response && response.data && response.data.data));
     } catch (err) {
         console.log("slot details err", err);
         yield put(fetchSlotDetailsError(err && err.response && err.response.data));
     }
 }

 export function* addSlotDetailsWorker(payload) {
    try {
        let response = yield call(addSlotDetailsCall, payload.payload);
        console.log("add slot details saga response", response);
        yield put(addSlotDetailsSuccess(response && response.data && response.data.message));
        yield call(browserRedirect, '/');
    } catch (err) {
        console.log("add slot details err", err);
        yield put(addSlotDetailsError(err && err.response && err.response.data));
    }
}

export function* updateSlotDetailsWorker(payload) {
    try {
        let response = yield call(updateSlotDetailsCall, payload.payload);
        console.log("update slot details saga response", response);
        yield put(updateSlotDetailsSuccess(response && response.data && response.data.message));
        yield call(browserRedirect, '/');
    } catch (err) {
        console.log("update slot details err", err);
        yield put(updateSlotDetailsError(err && err.response && err.response.data));
    }
}
 
 /**
  * Root saga manages watcher lifecycle
  */
 export default function* SlotDetails() {
     // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
     // By using `takeLatest` only the result of the latest API call is applied.
     // It returns task descriptor (just like fork) so we can continue execution
     // It will be cancelled automatically on component unmount
     yield all([
         takeLatest(FETCH_SLOT_DETAILS, slotDetailsWorker),
         takeLatest(ADD_SLOT_DETAILS, addSlotDetailsWorker),
         takeLatest(UPDATE_SLOT_DETAILS, updateSlotDetailsWorker),
     ]);
 }