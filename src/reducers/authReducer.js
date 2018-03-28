const authReducer = (state = {}, action) => {
    switch(action.type) {
        case 'SIGN_IN':
            return action.user 
        case 'LOGOUT':
            return {}
        default:
            return state
    } 
}
export default authReducer;