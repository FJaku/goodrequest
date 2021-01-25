import axios from 'axios';
import store from '../redux/store'
import React from 'react'
import { useSelector } from 'react-redux';

const Step3 = () => {
    //Submit form
    const submitForm = (event) => {
        event.preventDefault()
        console.log('success')

    //POST
    /* const finalFormSubmit = {
        
        firstName: store.getState().firstNameReducer,
        lastName: store.getState().lastNameReducer,
        email: store.getState().emailReducer,
        phone: store.getState().countryReducer.concat(store.getState().numberReducer) //Concat number with prefix
        value: store.getState().donationReducer,
        shelterID: store.getState().shelterChoiceReducer.id
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

    const donationSelected =  useSelector(state => state.shelterChoiceReducer)
    const donationAmount = useSelector(state => state.donationReducer)
    const firstLastName = useSelector(state => state.firstNameReducer.concat(' ', state.lastNameReducer))
    const email = useSelector(state => state.emailReducer)
    const phone = useSelector(state => state.countryReducer.concat(state.numberReducer))

    //Form of help - Org or shelter
    const FormOfHelp = () => {
        if (donationSelected === ''){
            return (
                <>
                    <p>Príspevok celej nadácii</p>
                </>
            )
        } else {
            return (
                <>
                    <p>Príspevok pre {donationSelected.name}</p>
                </>
            )
        }
    }

    return (
        <>
            <p>Skontrolujte si zadané údaje</p>
            <p>Akou formou chcem pomôcť?</p>
            <FormOfHelp key={donationSelected}/>
            <p>Suma, ktorou chcem prispieť: {donationAmount}</p>
            <p>Meno a prezvisko</p>
            <p>{firstLastName}</p>
            <p>Emailová adresa</p>
            <p>{email}</p>
            <p>Telefónne číslo</p>
            <p>{phone}</p>
            <form onSubmit={submitForm}>
                {/*Terms and conditions*/}
                <input 
                    id="checkbox"
                    type="checkbox" 
                    required 
                > 
                </input>
                <label>
                    Súhlasím so spracovaním mojich osobných údajov
                </label>
                <br></br>
                {/*Submit button*/}
                <button type="submit" onClick={submitForm}>Send</button>
            </form>
            <p>Späť</p>
        </>
    )
}

export default Step3

