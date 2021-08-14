/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import PropTypes, { object } from "prop-types";
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { browserRedirect } from '../../helpers/helpers';
import LoadingIndicator from '../../components/LoadingIndicator';

//Saga calls
import { fetchSlotDetailsList } from './actions';
import { makeSelectSlot, makeSelectSlotList } from './selectors';
import saga from './saga';
import reducer from './reducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';

const key = "slots";

import './slots.css';

const timeSlots = [
    "9", "10", "11", "12", "1", "2", "3", "4", "5"
]

export function Slots({
    slotReducerObj,
    slotDetailsList,
    onInitialize
}) {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    useEffect(() => {
        onInitialize();
    }, [])

    console.log("data", slotReducerObj);

    return (
        <div>
            <ToastContainer />
            <h1 className="head-container">
                TIME SLOTS
            </h1>
            <div className="slots-container">
            {
                slotReducerObj && slotReducerObj.loading ?
                    <LoadingIndicator />
                    :
                    timeSlots.map((slot, index) => {
                        return (
                            <div className={slotDetailsList && slotDetailsList.some(el => el.slot == slot) ? "filled-time-slot-style time-slot-style" : "time-slot-style"} onClick={() => { browserRedirect(`/slot/details/${slot}`) }}>
                                <h2>{slot}{` `}{index >= 3 ? 'PM' : 'AM'}</h2>
                            </div>
                        )
                    })
            }
            </div>
        </div>
    );
}

Slots.propTypes = {
    slotDetailsList: PropTypes.arrayOf(object),
    slotReducerObj: PropTypes.object,
    onInitialize: PropTypes.func,
};


const mapStateToProps = createStructuredSelector({
    slotDetailsList: makeSelectSlotList(),
    slotReducerObj: makeSelectSlot()
});

export function mapDispatchToProps(dispatch) {
    return {
        onInitialize: () => {
            dispatch(fetchSlotDetailsList());
        }
    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default compose(
    withConnect,
    memo,
)(Slots);