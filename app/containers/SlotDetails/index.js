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
import { isMobile } from 'react-device-detect';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TextField, Grid } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { browserRedirect } from '../../helpers/helpers';
import LoadingIndicator from '../../components/LoadingIndicator';

//saga call
import { makeSelectSlotDetails, makeSelectSlotObject } from './selectors';
import { fetchSlotDetails, addSlotDetails, updateSlotDetails, clearSlotDetails } from './actions';
import reducer from './reducer';
import saga from './saga';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';

const key = 'slotDetails';

import './slotDetails.css';



export function SlotDetails({
    match,
    slotDetails,
    slotDetailsReducerObj,
    onInitialize,
    addSlotDetails,
    updateSlotDetails,
    clearSlotDetails
}) {

    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    useEffect(() => {
        const { params = {} } = match;
        const { slot = 0 } = params;
        onInitialize({ slot: slot })
    }, []);

    useEffect(() => {
        return () => {
            clearSlotDetails();
        }
    }, [])

    const phoneRegExp = /^[6-9][0-9]{9}$/;

    const validationSchema = Yup.object().shape({
        first_name: Yup.string()
            .required("First name is required"),
        last_name: Yup.string()
            .required("Last name is required"),
        phone: Yup.string()
            .required("Mobile number is required.")
            .matches(phoneRegExp, "Mobile number is invalid"),
    })

    const handleOnSave = (data) => {
        console.log("clicked on save");
        const { params = {} } = match;
        const { slot = 0 } = params;
        if (slotDetails) {
            updateSlotDetails({ ...data, slot: slot });
        }
        else {
            addSlotDetails({ ...data, slot: slot });
        }
    }

    const { first_name = "", last_name = "", phone = "" } = slotDetails || {};

    return (
        <div>
            <ToastContainer />
            <h1 className="head-container" style={isMobile ? { letterSpacing: '0px' } : null}>
                Slot Details
            </h1>
            {
                slotDetailsReducerObj && slotDetailsReducerObj.loading ?
                    <LoadingIndicator />
                    :
                    <React.Fragment>
                        <div className="input-container-div">
                            <Formik
                                initialValues={{ first_name: first_name, last_name: last_name, phone: phone }}
                                enableReinitialize={true}
                                onSubmit={handleOnSave}
                                validationSchema={validationSchema}
                            >
                                {(props) => {
                                    const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
                                    return (
                                        <form onSubmit={handleSubmit}>
                                            <div className="p-10">
                                                <TextField
                                                    variant="outlined"
                                                    label="First Name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.first_name}
                                                    name="first_name"
                                                    style={{ width: "100%" }}
                                                />
                                                {errors.first_name && touched.first_name && <div className="feedback">{errors.first_name}</div>}
                                            </div>
                                            <div className="p-10">
                                                <TextField
                                                    variant="outlined"
                                                    label="Last Name"
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.last_name}
                                                    name="last_name"
                                                    style={{ width: "100%" }}
                                                />
                                                {errors.last_name && touched.last_name && <div className="feedback">{errors.last_name}</div>}
                                            </div>
                                            <div className="p-10">
                                                <TextField
                                                    type="number"
                                                    variant="outlined"
                                                    label="Phone no."
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    value={values.phone}
                                                    name="phone"
                                                    style={{ width: "100%" }}
                                                />
                                                {errors.phone && touched.phone && <div className="feedback">{errors.phone}</div>}
                                            </div>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <div style={{ margin: '10px' }}>
                                                        <button className="cancel-button" onClick={() => { browserRedirect('/') }}>Cancel</button>
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <div style={{ margin: '10px' }}>
                                                        <button type="submit" className="save-button">Save</button>
                                                    </div>
                                                </Grid>
                                            </Grid>
                                        </form>)
                                }}
                            </Formik>
                        </div>
                    </React.Fragment>
            }
        </div >
    );
}

SlotDetails.propTypes = {
    slotDetails: PropTypes.object,
    slotDetailsReducerObj: PropTypes.object,
    onInitialize: PropTypes.func,
    addSlotDetails: PropTypes.func,
    updateSlotDetails: PropTypes.func,
    clearSlotDetails: PropTypes.func
};


const mapStateToProps = createStructuredSelector({
    slotDetailsReducerObj: makeSelectSlotObject(),
    slotDetails: makeSelectSlotDetails()
});

export function mapDispatchToProps(dispatch) {
    return {
        onInitialize: (payload) => {
            dispatch(fetchSlotDetails(payload));
        },
        addSlotDetails: (payload) => {
            dispatch(addSlotDetails(payload));
        },
        updateSlotDetails: (payload) => {
            dispatch(updateSlotDetails(payload));
        },
        clearSlotDetails: () => {
            dispatch(clearSlotDetails());
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
)(SlotDetails);