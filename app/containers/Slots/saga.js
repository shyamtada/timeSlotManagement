/**
 * Gets the repositories of the user from Github
 */
 import { put, all, call, takeLatest } from "redux-saga/effects";
 import { FETCH_SLOT_DETAILS_LIST } from './constants';
 import {
     fetchSlotDetailsListSuccess,
     fetchSlotDetailsListError,
 } from './actions';
 
 import request from '../../utils/request';
 import { urls } from '../../config/urls';
 
 //Slot Details API call
 function slotDetailsListCall() {
         return request('GET', urls.SLOT_DETAILS_URL);
     }
 
 export function* slotDetailsListWorker() {
     try {
         let response = yield call(slotDetailsListCall);
         console.log("slot details list saga response", response);
         yield put(fetchSlotDetailsListSuccess(response && response.data && response.data.list));
     } catch (err) {
         console.log("slot details err", err);
         yield put(fetchSlotDetailsListError(err && err.response && err.response.data));
     }
 }
 
 /**
  * Root saga manages watcher lifecycle
  */
 export default function* Slots() {
     // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
     // By using `takeLatest` only the result of the latest API call is applied.
     // It returns task descriptor (just like fork) so we can continue execution
     // It will be cancelled automatically on component unmount
     yield all([
         takeLatest(FETCH_SLOT_DETAILS_LIST, slotDetailsListWorker),
     ]);
 }