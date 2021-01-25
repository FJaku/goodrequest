import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store'
import axios from 'axios';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

const Step1 = () => {
    const dispatch = useDispatch();
    const [selectedShelter, setSelectedShelter] = useState ('Vyberte si útulok zo zoznamu (nepovinné)') //Selected shelter  - ID or empty 
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
            <p id="donationChoiceText">Vyberte si možnosť, ako chcete pomôcť </p>
            <div id="donationType">
                <div id='wholeOrganization' className={selected[0]} onClick={() => {
                            setSelected(['selected', 'notSelected'])
                            setSelectedShelter('Vyberte si útulok zo zoznamu (nepovinné)') //List of shelters reset to default
                            dispatch({ type: 'SHELTERCHOICE', payload: ''}) //Selected shelter reset to empty
                        }}>
                    <i className="fa fa-credit-card"></i>
                    <p>Chcem finančne prispieť celej nadácii</p>
                </div>
                <div id='selectedShelter' className={selected[1]} onClick={() => setSelected(['notSelected', 'selected'])}>
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
        dispatch({ type: 'LISTENDONATION', payload: event.target.value})
    }

    //Donation amount
    const DonationAmount = () => {
        return (
            <>
                <p className="donationAmount, selectedAmount" id="10" onClick={() => {
                        dispatch({ type: 'LISTENDONATION', payload: '10'}) //Update state of donation amount
                        document.getElementsByClassName("selectedAmount")[0].classList.remove('selectedAmount') //Clear any prior selection
                        document.getElementById('10').classList.add('selectedAmount') //Select clicked option
                    }}
                >
                    10
                </p>
                <p  className="donationAmount" id="25" onClick={() => {
                        dispatch({ type: 'LISTENDONATION', payload: '25'})
                        document.getElementsByClassName('selectedAmount')[0].classList.remove('selectedAmount')
                        document.getElementById('25').classList.add('selectedAmount')
                    }}
                >
                    25
                </p>
                <p  className="donationAmount" id="50" onClick={() => {
                        dispatch({ type: 'LISTENDONATION', payload: '50'})
                        document.getElementsByClassName('selectedAmount')[0].classList.remove('selectedAmount')
                        document.getElementById('50').classList.add('selectedAmount')
                    }}
                >
                    50
                </p>
                <form>
                    <input 
                        id="customAmount"
                        type='number'
                        pattern='.{5}'
                        onChange={handleDonationChange}
                        onClick={() => {
                            document.getElementsByClassName('selectedAmount')[0].classList.remove('selectedAmount')
                            document.getElementById('customAmount').classList.add('selectedAmount')
                        }}
                    />
                    <button type="submit" style={{display: 'none'}} onClick={(event) => event.preventDefault()}/> {/*Hidden button*/}
                </form>
                <p>Pokračovať</p>
            </>
        )
    }

    return (
        <>
            <DonationType />
            <ShelterChoice key={useSelector(state => state.isLoadedReducer)} />
            <DonationAmount />
            <p className="nextButton">Pokracovat</p>
        </>      
    )
}

export default Step1
