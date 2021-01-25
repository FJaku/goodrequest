//Initial states set for testing purposes

const firstNameReducer = ( state = ('John'), action) => {
    switch(action.type){
        case 'LISTENFIRSTNAME':
            return action.payload    
        default:
            return state
    }
}

const lastNameReducer = ( state = ('Doe'), action) => {
    switch(action.type){
        case 'LISTENLASTNAME':
            return action.payload    
        default:
            return state
    }
}

const emailReducer = ( state = ('j@d.com'), action) => {
    switch(action.type){
        case 'LISTENEMAIL':
            return action.payload    
        default:
            return state
    }
}

const numberReducer = ( state = ('123456789'), action) => {
    switch(action.type){
        case 'LISTENNUMBER':
            return action.payload  
        default:
            return state
    }
}

const donationReducer = ( state = ('10'), action) => { //Default 10, in case the donation doesn't change
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

export { isLoadedReducer, shelterChoiceReducer, countryReducer, shelterLoadReducer, firstNameReducer, lastNameReducer, emailReducer, numberReducer, donationReducer } 