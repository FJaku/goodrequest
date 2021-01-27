import axios from 'axios';
import store from '../redux/store'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

const Step3 = () => {
    const dispatch = useDispatch();

    //Submit form
    const submitForm = (event) => {
        if (document.getElementById('checkbox').checked) {
            event.preventDefault()
            dispatch({ type: 'BARON3'})
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
           
        } else {
            let x = document.getElementById('agree')
            x.classList.add('highlight')
            setTimeout(() => 
                x.classList.remove('highlight')
            ,500)
        }
        

    
    }

    const donationSelected =  useSelector(state => state.shelterChoiceReducer)
    const donationAmount = useSelector(state => state.donationReducer)
    const firstLastName = useSelector(state => state.firstNameReducer.concat(' ', state.lastNameReducer))
    const email = useSelector(state => state.emailReducer)
    const phone = useSelector(state => state.countryReducer.concat(' ', state.numberReducer))

    const transitionToStep2 = () => {
        dispatch({ type: 'HIDESTEP3' })
        dispatch({ type: 'SHOWSTEP2' })
        dispatch({ type: 'BARON1'})
    }

    //Form of help - Org or shelter
    const FormOfHelp = () => {
        if (donationSelected === ''){
            return (
                <>
                    <p className="inputCheckValue">Príspevok celej nadácii</p>
                </>
            )
        } else {
            return (
                <>
                    <p className="inputCheckValue">Chcem prispieť konkrétnemu útulku   </p>
                    <p className="inputCheckHeader">Najviac mi záleží na útulku</p>
                    <p className="inputCheckValue">{donationSelected.name}</p>
                </>
            )
        }
    }

    const step3 = useSelector(state => state.step3Reducer)

    return (
        <div id="step3" className={step3}>
            <p className="stepMainText">Skontrolujte si zadané údaje</p>
            <p className="inputCheckHeader">Akou formou chcem pomôcť?</p>
            <FormOfHelp key={donationSelected}/>
            <p className="inputCheckHeader">Suma, ktorou chcem prispieť</p>
            <p className="inputCheckValue">{donationAmount}€</p>
            <p className="inputCheckHeader">Meno a prezvisko</p>
            <p className="inputCheckValue">{firstLastName}</p>
            <p className="inputCheckHeader">Emailová adresa</p>
            <p className="inputCheckValue">{email}</p>
            <p className="inputCheckHeader">Telefónne číslo</p>
            <p className="inputCheckValue">{phone}</p>
            <form onSubmit={submitForm}>
                {/*Terms and conditions*/}
                <input 
                    id="checkbox"
                    type="checkbox" 
                    className='css-checkbox'
                > 
                </input>
                <label 
                    className="css-label" 
                    for="checkbox"
                >
                </label>
                <span id="agree">Súhlasím so spracovaním mojich osobných údajov</span>
                {/*Submit button*/}
                <p className="nextButton" id="sendFormButton" onClick={submitForm}>Odoslať formulár</p>
            </form>
            <p
                className="backButton"
                id="backStep2Button"
                onClick={transitionToStep2}
            >Späť</p>
        </div>
    )
}

export default Step3

