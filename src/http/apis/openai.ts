import {openAiInstance} from '..'

export const listModel = ()=> {
    return openAiInstance({
        method:'GET',
        url:'https://api.openai.com/v1/models'
    })
}