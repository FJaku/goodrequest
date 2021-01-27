import { dogReducer, step1Reducer, step2Reducer, step3Reducer, isLoadedReducer, shelterChoiceReducer, countryReducer, shelterLoadReducer, firstNameReducer, lastNameReducer, emailReducer, numberReducer, donationReducer } from './formReducer'
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    firstNameReducer,
    lastNameReducer,
    emailReducer,
    numberReducer,
    donationReducer,
    shelterLoadReducer,
    countryReducer,
    shelterChoiceReducer,
    isLoadedReducer, 
    step1Reducer, 
    step2Reducer, 
    step3Reducer,
    dogReducer
})

export default rootReducer;