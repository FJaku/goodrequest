import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store'
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Step1 = () => {
    const dispatch = useDispatch();
    const [selectedShelter, setSelectedShelter] = useState ('Vyberte si útulok zo zoznamu') //Selected shelter  - ID or empty 
    const [selected, setSelected] = useState (['selected', 'notSelected']) //Class selection of donation type

    //Axios API call
    useEffect (() => {
        axios
            .get('https://frontend-assignment-api.goodrequest.com/api/v1/shelters')
            .then(response => {
                dispatch({ type: 'SHELTERLOAD', payload: response.data });
                dispatch({ type: 'ISLOADED' })
            })
    }, [])

    //Donation type
    const DonationType = () => {
        return (
            <>
            <p className="stepMainText">Vyberte si možnosť, ako chcete pomôcť </p>
            <div id="donationType">
                <div id='wholeOrganization' className={selected[0]} onClick={() => {
                            setSelected(['selected', 'notSelected']) //Swtich donation type
                            setSelectedShelter('Vyberte si útulok zo zoznamu') //List of shelters reset to default
                            dispatch({ type: 'SHELTERCHOICE', payload: ''}) //Selected shelter reset to empty
                        }}>
                    <i className="fa fa-credit-card"></i>
                    <p>Chcem finančne prispieť celej nadácii</p>
                </div>
                <div id='selectedShelter' className={selected[1]} onClick={() => 
                            setSelected(['notSelected', 'selected'],
                            dispatch({ type: 'SHELTERCHOICE', payload: 'required'}),
                            setSelectedShelter('Vyberte si útulok zo zoznamu (povinné)')
                        )}>
                    <i className="fa fa-paw"></i>
                    <p>Chcem finančne prispieť konkrétnemu útulku</p>
                </div>
                <br></br>
            </div>
            </>
        )
    }

    //Shelter Choice
    const ShelterChoice = () => {

        const handleShelterMenu = () => {
            setSelected(['notSelected', 'selected']) //Swap selected class of donation type
        }

            if (typeof store.getState().shelterLoadReducer == 'object'){ //Check if shelters are loaded, otherwise wait for LOADED state to rerender this component
                return (
                    <div id="shelterChoiceContainer">
                        <p id="displaySelectedShelter">{selectedShelter}</p> {/*View selected shelter*/}
                        <ul id="shelterList">
                            <SimpleBar style={{ height: '10vw' }} >
                            {Object.values(store.getState().shelterLoadReducer)[0].map(shelter => //Mapping the list
                                <li 
                                    className="shelterListItem"
                                    key={shelter.id} 
                                    onClick={() => {
                                        dispatch({ type: 'SHELTERCHOICE', payload: {id: shelter.id, name: shelter.name} }) //Shelter select
                                        setSelectedShelter(shelter.name) //Selected shelter
                                        handleShelterMenu()
                                    }}
                                >
                                    <span>{shelter.name}</span>
                                </li>)}
                            </SimpleBar>
                        </ul>  
                    </div>
                )
            } else {
                return (
                    <>
                    </>
                )
            }   
    }

    //Donation change handler
    const handleDonationChange = (event) => {
        if (!isNaN(event.target.value)){
            dispatch({ type: 'LISTENDONATION', payload: event.target.value}) //Update donation amount state
        } else {
            document.getElementById("customAmount").value =  document.getElementById("customAmount").value.replace(/\D/g,'') //Allow numbers only
        }       
    }

    const clearPriorSelection = () => {
        if (document.getElementsByClassName("selectedAmount")[0] !== undefined) { //Check if prior selection exists
            document.getElementsByClassName("selectedAmount")[0].classList.remove('selectedAmount') //Clear prior selection
        } 
    }

    //Donation amount
    const DonationAmount = () => {
        return (
            <div id="donationAmount">
                <p id="donationText">Suma, ktorou chcem prispieť</p>
                <p className="donationAmount" id="10" onClick={() => {
                        dispatch({ type: 'LISTENDONATION', payload: '10'}) //Update state of donation amount
                        clearPriorSelection() //Clear any prior selection
                        document.getElementById('10').classList.add('selectedAmount') //Select clicked option
                    }}
                >
                    10€
                </p>
                <p  className="donationAmount" id="25" onClick={() => {
                        dispatch({ type: 'LISTENDONATION', payload: '25'})
                        clearPriorSelection()
                        document.getElementById('25').classList.add('selectedAmount')
                    }}
                >
                    25€
                </p>
                <p  className="donationAmount" id="50" onClick={() => {
                        dispatch({ type: 'LISTENDONATION', payload: '50'})
                        clearPriorSelection()
                        document.getElementById('50').classList.add('selectedAmount')
                    }}
                >
                    50€
                </p>
                <form>
                    <input 
                        id="customAmount"                        
                        type='text'
                        maxLength='5'
                        placeholder="____€"
                        onChange={handleDonationChange}
                        onClick={() => {
                            dispatch({ type: 'LISTENDONATION', payload: ''})
                            clearPriorSelection()
                            document.getElementById('customAmount').classList.add('selectedAmount')
                        }}
                    />
                    <button type="submit" style={{display: 'none'}} onClick={(event) => event.preventDefault()}/> {/*Hidden button*/}
                </form>
            </div>
        )
    }

    const step1 = useSelector(state => state.step1Reducer)

    const firstTransition = () => {
        if (store.getState().shelterChoiceReducer === 'required'){
            var y = document.getElementById('displaySelectedShelter')
            y.classList.add('highlight')
            setTimeout(() => 
                y.classList.remove('highlight')
            ,500) 
        } else if (!store.getState().donationReducer){ //Check if donation amount has been selected
            var x = document.getElementById('donationText')
            x.classList.add('highlight')
            setTimeout(() => 
                x.classList.remove('highlight')
            ,500)
        } else {
            dispatch({ type: 'HIDESTEP1' }) //Proceed to next step
            dispatch({ type: 'SHOWSTEP2' })
        }
        }   

    return (
        <div id="step1" className={step1}>
            <DonationType />
            <ShelterChoice key={useSelector(state => state.isLoadedReducer)} />
            <DonationAmount />
            <p 
                className="nextButton"
                id="step1Button"
                onClick={firstTransition}
            >Pokračovať</p>
        </div>      
    )
} 

export default Step1
