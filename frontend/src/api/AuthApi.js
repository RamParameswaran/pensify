import ApiHelper from './ApiHelper'

function signInWithFacebook(accessToken) {
    return ApiHelper({
        url: '/user/login-with-facebook',
        method: 'POST',
        data: {
            accessToken: accessToken,
        },
    })
}

function signInWithGoogle(idToken) {
    return ApiHelper({
        url: '/user/login-with-google',
        method: 'POST',
        data: {
            idToken: idToken,
        },
    })
}

function getUser() {
    return ApiHelper({
        url: '/user/me',
        method: 'GET',
    })
}

function logout() {
    localStorage.removeItem('token')
    return Promise.resolve({ msg: 'Logged out' })
}

const UserApi = {
    signInWithFacebook,
    signInWithGoogle,
    getUser,
    logout,
}

export default UserApi
