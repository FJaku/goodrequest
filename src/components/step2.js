import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react'
import cz from '../img/cz.png'
import svk from '../img/svk.png'
import store from '../redux/store'

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
        if (!isNaN(event.target.value)){
            dispatch({ type: 'LISTENNUMBER', payload: event.target.value}) //Update number state
        } else {
            document.getElementById("numberInput").value =  document.getElementById("numberInput").value.replace(/\D/g,'') //Allow numbers only
        }           
    }

    const step2 = useSelector(state => state.step2Reducer)
    const [prefix, setPrefix] = useState({prefix: '+421', img:svk})

    //Prefix switch
    const chooseSVK = () => {
        setPrefix({prefix: '+421', img:svk})
        console.log(prefix.prefix)
        dispatch({ type: 'LISTENCOUNTRY', payload: '+421'})
    }

    const chooseCZ = () => {
        setPrefix({prefix: '+420', img:cz})
        dispatch({ type: 'LISTENCOUNTRY', payload: '+420'})
    }

    //Validity check + transition
    const secondTransition = () => {
        var firstName = store.getState().firstNameReducer
        var lastName = store.getState().lastNameReducer
        var email = store.getState().emailReducer
        var number = store.getState().numberReducer
        var valid = true

        //First name validation
        if (firstName.length === 0 || (20 >= firstName.length  && firstName.length >= 2)) {
            console.log('First name OK')
        } else {
            valid = false
            let x = document.getElementById('firstNameText')
            x.classList.add('highlight')
            setTimeout(() => 
                x.classList.remove('highlight')
            ,500)
        }

        //Last name validation
        if (30 >= lastName.length  && lastName.length >= 2) {
            console.log('Last name OK')
        } else {
            valid = false
            let x = document.getElementById('lastNameText')
            x.classList.add('highlight')
            setTimeout(() => 
                x.classList.remove('highlight')
            ,500)
        }

        //Email validation
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            console.log('Email OK')
        } else {
            valid = false
            let x = document.getElementById('emailText')
            x.classList.add('highlight')
            setTimeout(() => 
                x.classList.remove('highlight')
            ,500)
        }

        //Number validation
        if (number.length === 9) {
            console.log('Number OK')
        } else {
            valid = false
            let x = document.getElementById('numberText')
            x.classList.add('highlight')
            setTimeout(() => 
                x.classList.remove('highlight')
            ,500)
        }

        //Transition to step3
        if (valid) {
            dispatch({ type: 'HIDESTEP2' })
            dispatch({ type: 'SHOWSTEP3' })
        }
    }

    return (
        <div id="step2" className={step2}>
            <p className="stepMainText">Potrebujeme od Vás zopár informácií</p>
        <form>
            {/*First Name*/}
            <div className="step2Input">
                <p id="firstNameText">Meno</p>
                <input
                    type="text"
                    value={useSelector(state => state.firstNameReducer)}
                    onChange={handleFirstNameChange}
                    placeholder='Zadajte vaše meno'
                    id="fistNameInput"                   
                >
                </input>
            </div>
            {/*Last Name*/}
            <div className="step2Input">
                <p id="lastNameText">Priezvisko</p>
                <input
                    type="text"
                    value={useSelector(state => state.lastNameReducer)}
                    onChange={handleLastNameChange}
                    placeholder='Zadajte vaše priezvisko'
                    id="lastNameInput"
                >
                </input>
            </div>
            {/*Email*/}
            <div className="step2Input">
                <p id="emailText">E-mailová adresa</p>
                <input
                    type='text'
                    value={useSelector(state => state.emailReducer)}
                    onChange={handleEmailChange}
                    placeholder='Zadajte váš e-mail'
                    id="emailInput"
                >
                </input>
            </div>
           
            {/*Number*/}
            <div className="step2Input">
                <p id="numberText">Telefónne číslo</p>
                 {/*Country Prefix*/}
                <div id="prefixChoiceContainer">
                    <p id="prefixText"><img src={prefix.img} alt=''></img><span>{prefix.prefix}</span></p>
                    <ul id="prefixList">
                        <li onClick={chooseSVK} id="svk" className="prefixListItem"><img src={svk} alt=''></img>+421</li>
                        <li onClick={chooseCZ} id="cz" className="prefixListItem"><img src={cz} alt=''></img>+420</li>
                    </ul>
                </div>
                <input
                    type="text"
                    maxLength="9"
                    value={useSelector(state => state.numberReducer)}
                    onChange={handleNumberChange}
                    placeholder='Zadajte vaše číslo'
                    id="numberInput"
                >
                </input>
            </div>            
        </form>
        <p>Späť</p>
        <p 
            className="nextButton" 
            id="step2Button" 
            onClick={secondTransition}
            >Pokračovať
        </p>
        </div>
    )
}

export default Step2

