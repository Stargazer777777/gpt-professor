import axios from 'axios'

export const listModel = ()=> {
    return axios({
        method:'GET',
        url:'https://api.openai.com/v1/models'
    })
}