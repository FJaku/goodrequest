import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store'

const Step3 = () => {
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

    return (
        <>
            <form onSubmit={submitForm}>
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
        </>
    )

}

export default Step3

