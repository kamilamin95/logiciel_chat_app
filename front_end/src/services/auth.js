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

export {
    userLogin,
    userSignup
}
