import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store'
import Step1 from './step1'

const Form = () => {

    const dispatch = useDispatch();

    //Axios API call
    useEffect (() => {
        axios
            .get('https://frontend-assignment-api.goodrequest.com/api/v1/shelters')
            .then(response => {
                dispatch({ type: 'SHELTERLOAD', payload: response.data });
                dispatch({ type: 'ISLOADED' })
            })
    }, [])

    //Input field change handlers
    const handleFirstNameChange = (event) => {
        dispatch({ type: 'LISTENFIRSTNAME', payload: event.target.value})
    }
    const handleLastNameChange = (event) => {
        dispatch({ type: 'LISTENLASTNAME', payload: event.target.value})
    }
    const handleEmailChange = (event) => {
        dispatch({ type: 'LISTENEMAIL', payload: event.target.value})
    }
    const handleNumberChange = (event) => {
        dispatch({ type: 'LISTENNUMBER', payload: event.target.value})
    }
    const handleCountryChange = (event) => {
        dispatch({ type: 'LISTENCOUNTRY', payload: event.target.value})
    }
     
    
    //Submit form
    const submitForm = (event) => {
        event.preventDefault()

        //POST
        /* const finalFormSubmit = {
            
            firstName: store.getState().firstNameReducer,
            lastName: store.getState().lastNameReducer,
            email: store.getState().emailReducer,
            phone: store.getState().countryReducer.concat(store.getState().numberReducer) //Concat number with prefix
            value: store.getState().donationReducer,
            shelterID: store.getState().shelterChoiceReducer
        }
        axios
            .post('https://frontend-assignment-api.goodrequest.com/api/v1/shelters/contribute', finalFormSubmit)
            .catch(error => {
                console.log({
                    error,
                    'error status': error.response.status, 
                    'error response': error.response.data
                })
                alert('Donation failed')
            }) */   
    }

    
   

    //Form
    return (
        <form onSubmit={submitForm}>
            <Step1 />
            <br></br>
            {/*First Name*/}
            <input
                pattern='.{0}|.{2,20}' //Length - empty or 2-20 char long
                value={useSelector(state => state.firstNameReducer)}
                onChange={handleFirstNameChange}
                placeholder='First Name'
            >
            </input>
            <br></br>
            {/*Last Name*/}
            <input
                pattern='.{2,30}'
                value={useSelector(state => state.lastNameReducer)}
                onChange={handleLastNameChange}
                placeholder='Last Name'
                required
            >
            </input>
            <br></br>
            {/*Email*/}
            <input
                type='email'
                value={useSelector(state => state.emailReducer)}
                onChange={handleEmailChange}
                placeholder='Email'
                required
            >
            </input>
            <br></br>
            {/*Country Prefix*/}
            <select 
                name='country'
                onChange={handleCountryChange}
            >
                <option value='+421'>(+421)</option>
                <option value='+420'>(+420)</option>
            </select>
            {/*Number*/}
            <input
                type="number"
                pattern='.{9}'
                value={useSelector(state => state.numberReducer)}
                onChange={handleNumberChange}
                placeholder='Phone number'
                required
            >
            </input>
            <br></br>
            {/*Terms and conditions*/}
            <input 
                id="checkbox"
                type="checkbox" 
                required 
            > 
            </input>
            <label>
                I accept the terms and conditions
            </label>
            <br></br>
            {/*Submit button*/}
            <button type="submit">Send</button>
        </form>
    )
}

export default Form;