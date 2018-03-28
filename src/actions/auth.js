const addUser = (user, token) => ({
    type: 'SIGN_IN',
    user: {
        ...user,
        token: token
    }
})
const logout = () => ({
    type: 'LOGOUT'
})
export {addUser, logout}