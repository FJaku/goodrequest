import baron1 from '../../img/baron1.jpg'
import baron3 from '../../img/baron3.jpg'

const firstNameReducer = ( state = (''), action) => {
    switch(action.type){
        case 'LISTENFIRSTNAME':
            return action.payload    
        default:
            return state
    }
}

const lastNameReducer = ( state = (''), action) => {
    switch(action.type){
        case 'LISTENLASTNAME':
            return action.payload    
        default:
            return state
    }
}

const emailReducer = ( state = (''), action) => {
    switch(action.type){
        case 'LISTENEMAIL':
            return action.payload    
        default:
            return state
    }
}

const numberReducer = ( state = (''), action) => {
    switch(action.type){
        case 'LISTENNUMBER':
            return action.payload  
        default:
            return state
    }
}

const donationReducer = ( state = (''), action) => { //Default 10, in case the donation doesn't change
    switch(action.type){
        case 'LISTENDONATION':
            return action.payload    
        default:
            return state
    }
}

const shelterLoadReducer = ( state = (''), action) => {
    switch(action.type){
        case 'SHELTERLOAD':
            return action.payload
        default:
            return state
    }
}

const shelterChoiceReducer = ( state = (''), action) => {
    switch(action.type){
        case 'SHELTERCHOICE':
            return action.payload
        default:
            return state
    }
}

const countryReducer = ( state = ('+421'), action) => {
    switch(action.type){
        case 'LISTENCOUNTRY':
            return action.payload
        default:
            return state
    }
}

const isLoadedReducer = ( state = false, action) => {
    switch(action.type){
        case 'ISLOADED':
            return true
        default:
            return state
    }
}

const step1Reducer = ( state = 'showStep1', action) => {
    switch(action.type){
        case 'HIDESTEP1':
            return 'hideStep1'
        case 'SHOWSTEP1':
            return 'showStep1'
        default:
            return state
    }
}

const step2Reducer = ( state = 'hideStep2', action) => {
    switch(action.type){
        case 'HIDESTEP2':
            return 'hideStep2'
        case 'SHOWSTEP2':
            return 'showStep2'
        default:
            return state
    }
}

const step3Reducer = ( state = 'hideStep3', action) => {
    switch(action.type){
        case 'HIDESTEP3':
            return 'hideStep3'
        case 'SHOWSTEP3':
            return 'showStep3'
        default:
            return state
    }
}

const dogReducer = ( state = baron1, action) => {
    switch(action.type){
        case 'BARON1':
            return baron1
        case 'BARON3':
            return baron3
        default:
            return state
    }
}

export { dogReducer, step1Reducer, step2Reducer, step3Reducer, isLoadedReducer, shelterChoiceReducer, countryReducer, shelterLoadReducer, firstNameReducer, lastNameReducer, emailReducer, numberReducer, donationReducer } 