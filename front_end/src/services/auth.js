import axios from "axios";
import BASE_URL from '../settings.json'

const userLogin = async (data) => {

    // console.log('BASE_URL', BASE_URL);
    const result = await axios({
        method: 'POST',
        url: `${BASE_URL.BASE_URL}/api/login`,
        data: data
    })
    return result
}

const userSignup = async (data) => {
    const result = await axios({
        method: 'POST',
        url: `${BASE_URL.BASE_URL}/api/signup`,
        data: data
    })
    return result
}

const getUserDetails = async () => {
    let token = sessionStorage.getItem('user_accessToken')
    const result = await axios({
        method: 'GET',
        url: `${BASE_URL.BASE_URL}/api/user`,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    return result
}

export {
    userLogin,
    userSignup,
    getUserDetails
}
