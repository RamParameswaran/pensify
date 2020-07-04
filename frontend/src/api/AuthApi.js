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

const UserApi = {
    signInWithFacebook,
    signInWithGoogle,
    getUser,
}

export default UserApi
