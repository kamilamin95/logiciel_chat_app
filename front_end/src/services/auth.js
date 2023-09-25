import axios from "axios";

const userLogin = async (data) => {
    const result = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/login',
        data: data
    })
    return result
}

const userSignup = async (data) => {
    const result = await axios({
        method: 'POST',
        url: 'http://localhost:5000/api/signup',
        data: data
    })
    return result
}

const getUserDetails = async () => {
    let token = sessionStorage.getItem('user_accessToken')
    const result = await axios({
        method: 'GET',
        url: 'http://localhost:5000/api/user',
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
