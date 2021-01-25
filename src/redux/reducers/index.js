import { isLoadedReducer, shelterChoiceReducer, countryReducer, shelterLoadReducer, firstNameReducer, lastNameReducer, emailReducer, numberReducer, donationReducer } from './formReducer'
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
    isLoadedReducer
})

export default rootReducer;