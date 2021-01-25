import { useSelector, useDispatch } from 'react-redux';

const Step2 = () => {
    const dispatch = useDispatch();
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

    const handleStep2 = (event) => {
        event.preventDefault()

    }
    return (
        <>
        <form>
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
            <button type="submit" onClick={handleStep2}>Pokracovat</button> {/*Checks form validity, proceeds to step3*/}
        </form>
        </>
    )
}

export default Step2

