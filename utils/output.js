import moment from 'moment'


export const messageForm =(userName, text) => {
    return {
        userName, 
        text,
        time: moment().format('LT')
    }

}
