/**
 * The global state selectors
 */

 import { createSelector } from 'reselect';
 import { initialState } from './reducer';
 
 const selectSlotDetails = state => state.slotDetails || initialState;
 
 const makeSelectSlotObject = () =>
     createSelector(
        selectSlotDetails,
         slotDetailsState => slotDetailsState
     );
 
 const makeSelectSlotDetails = () =>
     createSelector(
         selectSlotDetails,
         slotState => slotState.slotDetails
     );
 
 export {
     makeSelectSlotObject,
     makeSelectSlotDetails
 };