/**
 * The global state selectors
 */

 import { createSelector } from 'reselect';
 import { initialState } from './reducer';
 
 const selectSlotDetailsList = state => state.slots || initialState;
 
 const makeSelectSlot = () =>
     createSelector(
        selectSlotDetailsList,
         slotState => slotState
     );
 
 const makeSelectSlotList = () =>
     createSelector(
         selectSlotDetailsList,
         slotState => slotState.slotDetailsList
     );
 
 export {
     makeSelectSlot,
     makeSelectSlotList
 };