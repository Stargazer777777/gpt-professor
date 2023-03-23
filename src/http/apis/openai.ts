import {openAiInstance2} from '..'

export const listModel = ()=> {
    return openAiInstance2({
        method:'GET',
        url:'https://api.openai.com/v1/models'
    })
}