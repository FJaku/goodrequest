import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import store from '../redux/store'

const Step1 = () => {
    const dispatch = useDispatch();
    const [selectedShelter, setSelectedShelter] = useState ('Vyberte si zo zoznamu') //Selected shelter  - ID or empty

    //Donation type
    const DonationType = () => {
        const [selected, setSelected] = useState (['selected', 'notSelected']) //Class selection

        const handleDonationType = () => {
            setSelected([selected[1], selected[0]]) //Swap class of selected option
        }
        return (
            <>
                <div id='wholeOrganization' className={selected[0]} onClick={() => {
                            handleDonationType()
                            setSelectedShelter('Vyberte si zo zoznamu') //List of shelters reset to default
                            dispatch({ type: 'SHELTERCHOICE', payload: ''}) //Selected shelter reset to empty
                        }}>
                    <p>Chcem podporit celu organizaciu</p>
                </div>
                <div id='selectedShelter' className={selected[1]} onClick={handleDonationType}>
                    <p>Chcem podporit konkretny utulok</p>
                </div>
            </>
        )
    }

    //Shelter Choice
    const ShelterChoice = () => {
        const [selected, setSelected] = useState (['selectedShelter', 'notSelectedShelter']) //Class selection

        const handleShelterMenu = () => {
            setSelected([selected[1], selected[0]]) //Swap selected class
        }

            if (typeof store.getState().shelterLoadReducer == 'object'){ //Check if shelters are loaded, otherwise wait for LOADED state to rerender this component
                return (
                    <div onClick={handleShelterMenu}>
                        <p>{selectedShelter}</p> {/*View selected shelter*/}
                        <ul>
                            {Object.values(store.getState().shelterLoadReducer)[0].map(shelter => //Mapping the list
                                <li 
                                    key={shelter.id} 
                                    onClick={() => {
                                        dispatch({ type: 'SHELTERCHOICE', payload: shelter.id }) //Shelter select
                                        setSelectedShelter(shelter.name) //Selected shelter
                                    }}
                                >
                                    {shelter.name}
                                </li>)}
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
                
            </>
        )
    }

    return (
        <>
            <DonationType />
            <ShelterChoice key={useSelector(state => state.isLoadedReducer)} />
            <DonationAmount />
        </>      
    )
}

export default Step1
