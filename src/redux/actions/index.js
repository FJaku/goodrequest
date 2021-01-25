const listenFirstName = (payload) => {
    return {
        type: 'LISTENFIRSTNAME',
        payload: {...payload}
    }
}

const listenLastName = () => {
    return {
        type: 'LISTENLASTNAME'
    }
}

const listenEmail = () => {
    return {
        type: 'LISTENEMAIL'
    }
}

const listenPhone = () => {
    return {
        type: 'LISTENPHONE'
    }
}

const listenAgree = () => {
    return {
        type: 'LISTENAGREE'
    }
}

const loadShelter = () => {
    return {
        type: 'SHELTERLOAD'
    }
}

const listenCountry = () => {
    return {
        type: 'LISTENCOUNTRY'
    }
}

const listenShelterChoice = () => {
    return {
        type: 'SHELTERCHOICE'
    }
}

const listenIsLoaded = () => {
    return {
        type: 'ISLOADED'
    }
}

export { listenIsLoaded, listenShelterChoice, listenCountry, loadShelter, listenFirstName, listenLastName, listenEmail, listenPhone, listenAgree}

